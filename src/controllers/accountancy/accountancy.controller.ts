import { Controller, Post, Body, HttpCode, GoneException, InternalServerErrorException, Get, Put, NotFoundException, BadRequestException, Param } from '@nestjs/common';
import { SaveAuthorizationDTO } from '../../dto/accountancy/saveAuthorization.dto';
import { FileService } from '../../services/file/file.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import axios from 'axios';
import { AccountancyJop } from '../../jops/accountancy.jop';
import { AccessResponse } from '../../dto/accountancy/accessResponse.dto';
import { IncomeStatementDTO } from '../../dto/accountancy/incomeStatement.dto';
import { Auth } from '../../decorators/auth.decorator';
import { AccountancyService } from '../../services/accountancy/accountancy.service';
import { BalanceDTO } from '../../dto/accountancy/balance.dto';
import { NotImportedMutationDTO } from '../../dto/accountancy/notImportedMutation.dto';
import { Mutation } from '../../entities/accountancy/mutation.entity';
import { PaymentMethod } from '../../entities/accountancy/paymentMethod.entity';
import { ImportMutationDTO } from '../../dto/accountancy/importMutation.dto';
import { IncomeStatement } from '../../entities/accountancy/incomeStatement.entity';

@Controller('accountancy')
@ApiTags('Accountancy')
export class AccountancyController {
    constructor(
        private fileService: FileService,
        private accountancyService: AccountancyService,
    ) {}

    @Post('activate')
    @HttpCode(200)
    @Auth('accountancy:write')
    @ApiOperation({
        operationId: 'ActivateApi',
        summary: 'Activates the Accountancy api',
        description: 'Activates the accountancy api using a Authorization code from the rabo api',
    })
    @ApiResponse({ status: 200, description: 'The Accountancy api is activated!' })
    @ApiResponse({ status: 400, description: 'Validation error...'})
    @ApiResponse({ status: 403, description: 'U do not have the permission to do this...' })
    @ApiResponse({ status: 410, description: 'Authorization code already used...'})
    @ApiResponse({ status: 500, description: 'Internal server error...' })
    async ActivateApi(@Body() body: SaveAuthorizationDTO) {
        // Redeem Authorization code and saves the access & refresh token
        try {
            const response: AccessResponse = (await axios.post(process.env.RABOBANK_URL + '/oauth2/token',
                                                'grant_type=authorization_code&code=' + body.code,
                                                { headers: {
                                                    'Content-Type': 'application/x-www-form-urlencoded',
                                                    'Authorization': 'Basic ' + Buffer.from(process.env.RABOBANK_CLIENT_ID + ':' + process.env.RABOBANK_CLIENT_SECRET).toString('base64'),
                                                }},
                                    )).data;

            this.fileService.saveAccessTokenAccountancy(response.access_token);
            this.fileService.saveRefreshTokenAccountancy(response.refresh_token);
        } catch (e) {
            throw new GoneException('Authorization code already used or invalid...');
        }

        // Get the account_id and saves it
        try {
            const response2: AccountsResponse = (await axios.get(process.env.RABOBANK_URL + '/payments/account-information/ais/v3/accounts',
                                                    { headers: AccountancyJop.getHttpsHeader(this.fileService.getAccessTokenAccountancy(), AccountancyJop.getCertificate(), AccountancyJop.getPrivateKey(), process.env.RABOBANK_CLIENT_ID, +process.env.RABOBANK_CERTIFICATE_KEY_ID),
                                                    httpsAgent: AccountancyJop.getAccountancyHttpAgent(),
                                                },
                                        )).data;

            this.fileService.saveResourceIdAccountancy(response2.accounts[0].resourceId);
        } catch (e) {
            throw new InternalServerErrorException('Failed to get ResourceId');
        }
    }

    @Get('incomeStatement')
    @HttpCode(200)
    @Auth('accountancy:read')
    @ApiOperation({
        operationId: 'GetIncomeStatements',
        summary: 'Gets the income statements',
        description: '',
    })
    @ApiResponse({ status: 200, description: 'Income statements', type: IncomeStatementDTO, isArray: true })
    @ApiResponse({ status: 403, description: 'U do not have the permission to do this...' })
    @ApiResponse({ status: 500, description: 'Internal server error...' })
    async getIncomeStatements(): Promise<IncomeStatementDTO[]> {
        const response: IncomeStatementDTO[] = [];

        for (const incomeStatement of await this.accountancyService.readAllIncomeStatements()) {
            const sum = incomeStatement.mutations.reduce((a, b) => a + (b.amount || 0), 0);

            const dto: IncomeStatementDTO = {
                id: incomeStatement.id,
                code: incomeStatement.code,
                name: incomeStatement.name,
                profit: sum >= 0 ? sum : null,
                lost: sum < 0 ? sum * -1 : null,
            };

            response.push(dto);
        }

        return response;
    }

    @Get('balance')
    @HttpCode(200)
    @Auth('accountancy:read')
    @ApiOperation({
        operationId: 'GetBalance',
        summary: 'Gets the balance',
        description: '',
    })
    @ApiResponse({ status: 200, description: 'Balance', type: BalanceDTO, isArray: true })
    @ApiResponse({ status: 403, description: 'U do not have the permission to do this...' })
    @ApiResponse({ status: 500, description: 'Internal server error...' })
    async getBalance(): Promise<BalanceDTO[]> {
        const response: BalanceDTO[] = [];

        for (const paymentMethod of await this.accountancyService.readAllPaymentMethods()) {
            const sum = paymentMethod.mutations.reduce((a, b) => a + (b.amount || 0), 0);
            const total = sum + paymentMethod.startAssets;

            const dto: BalanceDTO = {
                id: paymentMethod.id,
                code: paymentMethod.code,
                name: paymentMethod.name,
                assets: total >= 0 ? total : null,
                liabilities: total < 0 ? total : null,
            };

            response.push(dto);
        }

        return response;
    }

    @Get('import')
    @HttpCode(200)
    @Auth('accountancy:read')
    @ApiOperation({
        operationId: 'GetNotImportedMutations',
        summary: 'Gets the mutations that are not imported yet',
        description: '',
    })
    @ApiResponse({ status: 200, description: 'Balance', type: NotImportedMutationDTO, isArray: true })
    @ApiResponse({ status: 403, description: 'U do not have the permission to do this...' })
    @ApiResponse({ status: 500, description: 'Internal server error...' })
    async getNotImportedMutations(): Promise<NotImportedMutationDTO[]> {
        const response: NotImportedMutationDTO[] = [];

        for (const mutation of await this.accountancyService.readAllNotImportedMutations()) {
            const dto: NotImportedMutationDTO = {
                id: mutation.id,
                description: mutation.description,
                debtorIban: mutation.debtorIban,
                amount: mutation.amount,
                date: mutation.date,
            };

            response.push(dto);
        }
        return response;
    }

    @Put('/import/:id')
    @HttpCode(200)
    @Auth('accountancy:write')
    @ApiOperation({
        operationId: 'importMutation',
        summary: 'Imports a mutation',
        description: '',
    })
    @ApiResponse({ status: 200, description: 'Imported!' })
    @ApiResponse({ status: 400, description: 'Invalid payment method or income statement selected...' })
    @ApiResponse({ status: 403, description: 'U do not have the permission to do this...' })
    @ApiResponse({ status: 404, description: 'Mutation not found...' })
    @ApiResponse({ status: 500, description: 'Internal server error...' })
    async importMutation(@Param('id') id: number, @Body() body: ImportMutationDTO): Promise<void> {
        const mutation: Mutation = await this.accountancyService.readOneMutations(id);
        if (!mutation) {
            throw new NotFoundException('Mutation not found using this id: ' + id);
        }

        const paymentMethod: PaymentMethod = await this.accountancyService.readOnePaymentMethod(body.paymentMethodId);
        if (!paymentMethod) {
            throw new BadRequestException('Invalid payment method selected...');
        }

        const incomeStatement: IncomeStatement = await this.accountancyService.readOneIncomeStatement(body.incomeStatementId);
        if (!incomeStatement) {
            throw new BadRequestException('Invalid income statement selected...');
        }

        mutation.incomeStatement = incomeStatement;
        mutation.paymentMethod = paymentMethod;
        await this.accountancyService.saveMutation(mutation);
    }
}

// Only needed once in this controller, that is why it is not globally available
interface AccountsResponse {
    accounts: Array<{
        resourceId: string;
        iban: string;
        currency: string;
        status: string;
        name: string;
        _links: {
            balances: string;
            transactions: string;
        },
    }>;
}
