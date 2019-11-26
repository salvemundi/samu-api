import { Injectable } from '@nestjs/common';
import createMollieClient, { MollieClient, Payment } from '@mollie/api-client';
import { User } from '../../entities/user.entity';
import { Transaction } from '../../entities/transaction.entity';
import IPurchasable from '../../entities/interface/purchasable.interface';
import { PaymentStatus } from '../../controllers/payment/paymentstatus.enum';

@Injectable()
export class PaymentService {
    private readonly mollieClient: MollieClient;

    constructor() {
        this.mollieClient = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY });
    }

    async createPayment(user: User, product: IPurchasable, redirectUrl: string, webhookUrl: string): Promise<Payment> {
        const transaction: Transaction = new Transaction();
        transaction.price = product.price;
        transaction.description = product.description + user.firstName + ' ' + user.lastName;
        transaction.user = user;
        transaction.status = PaymentStatus.OPEN;
        await transaction.save();

        const payment: Payment = await this.mollieClient.payments.create({
            amount: {
                value: product.price.toFixed(2),
                currency: 'EUR',
            },
            description: product.description,
            metadata: [
                { transaction_id: transaction.id },
            ],
            redirectUrl: process.env.REDIRECT_URL + redirectUrl,
            webhookUrl: process.env.MOLLIE_WEBHOOK_URL + webhookUrl,
        }).catch(async (err) => {
            console.error(err);
            transaction.status = PaymentStatus.FAILED;
            await transaction.save();

            return null;
        });

        return payment;
    }

    async transactionPaid(transaction: Transaction) {
        transaction.status = PaymentStatus.PAID;
        await transaction.save();
    }

    async transactionRefunded(transaction: Transaction) {
        transaction.status = PaymentStatus.CANCELED;
        await transaction.save();
    }

    async getMolliePayment(paymentId: string): Promise<Payment> {
        return this.mollieClient.payments.get(paymentId);
    }

    async getTransaction(id: number) {
        return Transaction.findOne({where: {id}, relations: ['user']});
    }
}
