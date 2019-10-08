import { Body, Post, Controller } from '@nestjs/common';
import { PaymentService } from '../../services/payment/payment.service';
import { MemberService } from '../../services/member/member.service';
import { UserService } from '../../services/user/user.service';
import { User } from '../../entities/user.entity';

@Controller('/webhook')
export class WebhookController {

    constructor(readonly paymentService: PaymentService,
                readonly memberService: MemberService,
                readonly userService: UserService) {
    }

    @Post('/membership')
    async confirmWebhookMembership(@Body() body: any) {
        const payment = await this.paymentService.get(body.id);

        if (payment.isPaid() && !payment.hasRefunds()) {
            return true;
        }

        const user: User = await this.userService.readOne(payment.customerId);
        this.memberService.giveMembership(user);
    }
}