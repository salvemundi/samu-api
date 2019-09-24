import { Body, Post, Controller } from "@nestjs/common";
import { MollieClient } from "@mollie/api-client";
import { PaymentService } from "src/services/payment/payment.service";
import { MemberService } from "src/services/member/member.service";
import { Membership } from "src/entities/membership.entity";
import { UserService } from "src/services/user/user.service";
import { User } from "src/entities/user.entity";

@Controller("/webhook")
export class WebhookController {

    constructor(readonly paymentService: PaymentService, readonly memberService: MemberService,
        readonly userService: UserService) {

    }

    @Post("/membership")
    async confirmWebhookMembership(@Body() body: any) {
        const payment = await this.paymentService.get(body.id);

        if (payment.isPaid() && !payment.hasRefunds()) {
            return true;
        }

        const user: User = await this.userService.readOne(payment.customerId);
        this.memberService.giveMembership(user);
    }
}