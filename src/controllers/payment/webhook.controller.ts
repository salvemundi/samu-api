import { Body, Post, Controller, HttpCode, BadRequestException, NotFoundException } from '@nestjs/common';
import { PaymentService } from '../../services/payment/payment.service';
import { MemberService } from '../../services/member/member.service';
import { UserService } from '../../services/user/user.service';
import { User } from '../../entities/user.entity';
import { PaymentStatus } from './paymentstatus.enum';

@Controller('/webhook')
export class WebhookController {

    constructor(readonly paymentService: PaymentService,
                readonly memberService: MemberService,
                readonly userService: UserService) {
    }

    @Post('/membership')
    @HttpCode(200)
    async confirmWebhookMembership(@Body() body: any) {
        const payment = await this.paymentService.getMolliePayment(body.id);
        if (!payment) {
            throw new NotFoundException('Payment is not found by Mollie');
        }

        const paymentMetadata: any[] = payment.metadata;
        const transaction = await this.paymentService.getTransaction(+paymentMetadata[0].transaction_id);
        if (!transaction) {
            throw new NotFoundException('Transaction is not found...');
        }

        const user: User = await this.userService.readOne(payment.customerId);
        if (!user) {
            throw new NotFoundException('User is not found...');
        }

        if (payment.isPaid() && !payment.hasRefunds()) {
            await this.memberService.giveMembership(user);
            await this.paymentService.transactionPaid(transaction);
            return;

        } else if (payment.hasRefunds) {
            await this.paymentService.transactionRefunded(transaction);
            await this.memberService.removeMembership(user);
            return;
        }

        throw new BadRequestException('No action has been taken...');
    }
}
