import { Controller, Post, Body, Get, Query, NotFoundException, Param } from '@nestjs/common';
import { PaymentService } from '../../services/payment/payment.service';
import { UserService } from '../../services/user/user.service';
import { User } from '../../entities/user.entity';
import IPurchasable from '../../entities/interface/purchasable.interface';
import { membershipPrice, membershipDescription } from '../../../constants';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Payment } from '@mollie/api-client';
import { PaymentDto } from '../../dto/payment/payment-dto';
import { Event } from '../../entities/event.entity';
import { EventService } from '../../services/event/event.service';
import { EventSignup } from '../../entities/eventsignup.entity';
import { Me } from '../../decorators/me.decorator';

@Controller('/payments')
@ApiUseTags('Payments')
export class PaymentController {
    constructor(
        readonly paymentService: PaymentService,
        readonly userService: UserService,
        readonly eventService: EventService
    ) { }

    @Get('/membership')
    @ApiOperation({
        title: 'membership',
        description: 'This call is creates a payment for a new membership',
    })
    @ApiResponse({ status: 200, description: 'Payment created', type: PaymentDto })
    @ApiResponse({ status: 404, description: 'User is not found' })
    @ApiResponse({ status: 500, description: 'Internal server error...' })
    public async createPaymentForMembership(@Query('id') userId: number): Promise<PaymentDto> {
        const user: User = await this.userService.readOne(userId);
        if (!user) {
            throw new NotFoundException('User is not found...');
        }

        const membership: IPurchasable = {
            price: membershipPrice,
            description: membershipDescription,
        };

        const payment: Payment = await this.paymentService.createPayment(user, membership, 'checkEmail', 'membership');
        const result: PaymentDto = {
            expiresAt: payment.expiresAt,
            url: payment._links.checkout,
        };
        return result;
    }


    @Get('/event/{id}')
    @ApiOperation({
        title: 'event',
        description: 'This call is creates a payment for an event',
    })
    @ApiResponse({ status: 200, description: 'Payment created', type: PaymentDto })
    @ApiResponse({ status: 500, description: 'Internal server error...' })
    async createPaymentForEvent(@Me() user: User, @Param("id") eventId: number): Promise<PaymentDto> {
        const event: Event = await this.eventService.readOne(eventId);

        const eventSignup: IPurchasable = {
            price: event.memberPrice,
            description: event.title,
        };

        const payment: Payment = await this.paymentService.createPayment(user, eventSignup, 'checkMail', 'event');
        const signUp: EventSignup = await this.eventService.getUserSignup(user, event);
        const metadata: any = payment.metadata;

        // watch out this might break at some point.
        signUp.transaction = metadata[0].transaction_id;
        signUp.save();

        const result: PaymentDto = {
            expiresAt: payment.expiresAt,
            url: payment._links.checkout,
        };
        return result;
    }
}
