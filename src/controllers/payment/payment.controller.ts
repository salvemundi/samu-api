import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { PaymentService } from '../../services/payment/payment.service';
import { UserService } from '../../services/user/user.service';
import { User } from '../../entities/user.entity';
import IPurchasable from '../../entities/interface/purchasable.interface';
import { membershipPrice, membershipDescription } from '../../../constants';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Payment } from '@mollie/api-client';
import { PaymentDTO } from '../../dto/payment/paymentDTO';
import { Me } from 'src/decorators/me.decorator';
import { Event } from 'src/entities/event.entity';

@Controller('/payments')
@ApiUseTags('Payments')
export class PaymentController {
    constructor(
        readonly paymentService: PaymentService,
        readonly userService: UserService,
    ) { }

    @Get('/membership')
    @ApiOperation({
        title: 'membership',
        description: 'This call is creates a payment for a new membership',
    })
    @ApiResponse({ status: 200, description: 'Payment created', type: PaymentDTO })
    @ApiResponse({ status: 500, description: 'Internal server error...' })
    public async createPaymentForMembership(@Query('id') userId: number): Promise<PaymentDTO> {
        const user: User = await this.userService.readOne(userId);
        const membership: IPurchasable = {
            price: membershipPrice,
            description: membershipDescription,
        };

        const payment: Payment = await this.paymentService.createPayment(user, membership);
        const result: PaymentDTO = {
            expiresAt: payment.expiresAt,
            url: payment._links.checkout,
        };
        return result;
    }


    @Get('/event')
    @ApiOperation({
        title: 'membership',
        description: 'This call is creates a payment for a new membership',
    })
    @ApiResponse({ status: 200, description: 'Payment created', type: PaymentDTO })
    @ApiResponse({ status: 500, description: 'Internal server error...' })
    public async createPaymentForEvent(@Me() user: User, event: Event): Promise<PaymentDTO> {
        const eventSignup: IPurchasable = {
            price: event.memberPrice,
            description: membershipDescription,
        };

        const payment: Payment = await this.paymentService.createPayment(user, eventSignup);
        
        const result: PaymentDTO = {
            expiresAt: payment.expiresAt,
            url: payment._links.checkout,
        };
        return result;
    }
}
