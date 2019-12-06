import { Controller, Post, Body, Get, Query, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { PaymentService } from '../../services/payment/payment.service';
import { UserService } from '../../services/user/user.service';
import { User } from '../../entities/user.entity';
import IPurchasable from '../../entities/interface/purchasable.interface';
import { membershipPrice, membershipDescription } from '../../../constants';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Payment } from '@mollie/api-client';
import { PaymentDTO } from '../../dto/payment/paymentDTO';

@Controller('/payments')
@ApiTags('Payments')
export class PaymentController {
    constructor(
        readonly paymentService: PaymentService,
        readonly userService: UserService,
    ) { }

    @Get('/membership')
    @ApiOperation({
        summary: 'membership',
        description: 'This call is creates a payment for a new membership',
    })
    @ApiResponse({ status: 200, description: 'Payment created', type: PaymentDTO })
    @ApiResponse({ status: 404, description: 'User is not found' })
    @ApiResponse({ status: 500, description: 'Internal server error...' })
    public async createPaymentForMembership(@Query('id') userId: number): Promise<PaymentDTO> {
        const user: User = await this.userService.readOne(userId);
        if (!user) {
            throw new NotFoundException('User is not found...');
        }

        const membership: IPurchasable = {
            price: membershipPrice,
            description: membershipDescription,
        };

        const payment: Payment = await this.paymentService.createPayment(user, membership, 'checkEmail', 'membership');
        if (!payment) {
            throw new ServiceUnavailableException();
        }

        const result: PaymentDTO = {
            expiresAt: payment.expiresAt,
            url: payment._links.checkout,
        };
        return result;
    }
}
