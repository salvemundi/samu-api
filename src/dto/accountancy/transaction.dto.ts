export interface TransactionDTO {
    account: {
        iban: string;
        currency: string;
    };
    transactions: {
        booked: [
            {
                entryReference: number;
                bookingDate: Date;
                valueDate: Date;
                transactionAmount: {
                    currency: string,
                    amount: string;
                },
                creditorAccount: {
                    iban: string;
                    currency: string;
                },
                creditorAgent: string;
                ultimateCreditor: string;
                debtorAccount: {
                    iban: string;
                    currency: string;
                },
                debtorName: string;
                debtorAgent: string;
                ultimateDebtor: string;
                remittanceInformationUnstructured: string;
                purposeCode: string;
                initiatingPartyName: string;
                raboBookingDateTime: Date;
                raboDetailedTransactionType: number;
                raboTransactionTypeName: string;
                reasonCode: string;
            },
        ],
        _links: {
            account: string;
            first: string;
            last: string;
            next: string;
        };
    };
}
