import { Controller, Post, Body, HttpCode, GoneException, InternalServerErrorException } from '@nestjs/common';
import { SaveAuthorizationDTO } from '../../dto/accountancy/saveAuthorization.dto';
import { FileService } from '../../services/file/file.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import axios from 'axios';
import { AccountancyJop } from '../../jops/accountancy.jop';
import { AccessResponse } from '../../dto/accountancy/accessResponse.dto';

@Controller('accountancy')
@ApiTags('Accountancy')
export class AccountancyController {
    constructor(
        private fileService: FileService,
    ) {}

    @Post('activate')
    @HttpCode(200)
    @ApiOperation({
        operationId: 'ActivateApi',
        summary: 'Activates the Accountancy api',
        description: '',
    })
    @ApiResponse({ status: 200, description: 'The Accountancy api is activated!' })
    @ApiResponse({ status: 400, description: 'Validation error...'})
    @ApiResponse({ status: 410, description: 'Authorization code already used...'})
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
                                                    { headers: AccountancyJop.getHttpsHeader(this.fileService.getAccessTokenAccountancy()),
                                                    httpsAgent: AccountancyJop.getAccountancyHttpAgent(),
                                                },
                                        )).data;

            this.fileService.saveResourceIdAccountancy(response2.accounts[0].resourceId);
        } catch (e) {
            throw new InternalServerErrorException('Failed to get ResourceId');
        }
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
