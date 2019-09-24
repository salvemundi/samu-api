import { Controller, Post, Body } from "@nestjs/common";
import { PaymentService } from "src/services/payment/payment.service";

@Controller("/payments")
export class PaymentController {
    constructor(readonly paymentService: PaymentService) {

    }

    @Post("/webhook")
    webhook(@Body() body: any): void {

    }
}