import { Body, Post, Controller, HttpCode, BadRequestException, NotFoundException } from '@nestjs/common';
import { PaymentService } from '../../services/payment/payment.service';
import { MemberService } from '../../services/member/member.service';
import { UserService } from '../../services/user/user.service';
import { EmailService } from '../../services/email/email.service';
import { ConfirmationService } from '../../services/confirmation/confirmation.service';

@Controller('/webhook')
export class WebhookController {

    constructor(private readonly paymentService: PaymentService,
                private readonly memberService: MemberService,
                private readonly emailService: EmailService,
                private readonly confirmationService: ConfirmationService) {
    }

    @Post('/membership')
    @HttpCode(200)
    async confirmWebhookMembership(@Body() body: any) {
        const payment = await this.paymentService.getMolliePayment(body.id);
        if (!payment) {
            throw new NotFoundException('Payment is not found by Mollie');
        }

        const paymentMetadata: Array<{transaction_id: number}> = payment.metadata;
        const transaction = await this.paymentService.getTransaction(+paymentMetadata[0].transaction_id);
        if (!transaction) {
            throw new NotFoundException('Transaction is not found...');
        }

        if (payment.isPaid() && !payment.hasRefunds()) {
            await this.memberService.giveMembership(transaction.user);
            await this.paymentService.transactionPaid(transaction);

            const confirmation = await this.confirmationService.create(transaction.user);
            await this.emailService.sendEmailConfirmationEmail(transaction.user, confirmation);
            return;

        } else if (payment.hasRefunds) {
            await this.paymentService.transactionRefunded(transaction);
            await this.memberService.removeMembership(transaction.user);
            return;
        }

        throw new BadRequestException('No action has been taken...');
    }
}
