import { Injectable } from '@nestjs/common';
import createMollieClient, { MollieClient, Payment } from '@mollie/api-client';
import { User } from '../../entities/user.entity';
import { Transaction } from '../../entities/transaction.entity';
import IPurchasable from '../../entities/interface/purchasable.interface';

@Injectable()
export class PaymentService {
    private readonly mollieClient: MollieClient;

    constructor() {
        this.mollieClient = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY });
    }

    async createPayment(user: User, product: IPurchasable): Promise<Payment> {
        let transaction: Transaction = new Transaction();
        transaction.amount = product.getPrice().toString();
        transaction.description = product.getDescription();
        transaction.user = user;
        transaction = await transaction.save();

        const payment: Payment = await this.mollieClient.payments.create({
            amount: {
                value: product.getPrice().toString(),
                currency: 'EUR'
            }, description: product.getDescription(),
            metadata: [{
                transaction_id: transaction.id
            }]
        });

        transaction.status = payment.status;
        transaction.save();

        return payment;
    }

    async get(payment_id: string): Promise<Payment> {
        return await this.mollieClient.payments.get(payment_id);
    }
}