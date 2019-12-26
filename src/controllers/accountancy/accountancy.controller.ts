import { Controller, Post, Body, HttpCode, GoneException } from '@nestjs/common';
import { SaveAuthorizationDTO } from '../../dto/accountancy/saveAuthorization.dto';
import { FileService } from '../../services/file/file.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import axios from 'axios';
import uuid from 'uuid/v4';

@Controller('accountancy')
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
        let response: AccessResponse;

        try {
            response = (await axios.post(process.env.RABOBANK_URL + '/oauth2/token',
                                                'grant_type=authorization_code&code=' + body.code,
                                                { headers: {
                                                    'Content-Type': 'application/x-www-form-urlencoded',
                                                    'Authorization': 'Basic ' + Buffer.from(process.env.RABOBANK_CLIENT_ID + ':' + process.env.RABOBANK_CLIENT_SECRET).toString('base64'),
                                                }},
                                    )).data;
        } catch (e) {
            throw new GoneException('Authorization code already used...');
        }

        this.fileService.saveAccessTokenAccountancy(response.access_token);
        this.fileService.saveRefreshTokenAccountancy(response.refresh_token);

        const currentDate = new Date();
        const response2 = (await axios.get(process.env.RABOBANK_URL + '/payments/account-information/ais/v3/accounts',
                                                { headers: {
                                                    'Authorization': 'Bearer ' + this.fileService.getAccessTokenAccountancy(),
                                                    'Date': currentDate.getMonth() + '/' + currentDate.getDate() + '/' + currentDate.getFullYear(),
                                                    'X-Request-ID': uuid(),
                                                    'Digest': '',
                                                    'Signature': '',
                                                    'TPP-Signature-Certificate': '',
                                                }},
                                    )).data;
    }
}

interface AccessResponse {
    'token_type': string;
    'access_token': string;
    'expires_in': number;
    'consented_on': number;
    'scope': string;
    'refresh_token': string;
    'refresh_token_expires_in': number;
}
