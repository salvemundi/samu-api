import { User } from '../../entities/user.entity';
import { Confirmation } from '../../entities/confirmation.entity';
import * as nodemailer from 'nodemailer';

export class MockEmailService {
    public sendEmailConfirmationEmail(user: User, confirmation: Confirmation): Promise<nodemailer.SentMessageInfo> {
        return new Promise<nodemailer.SentMessageInfo>((resolve) => {
            resolve(null);
        });
    }

    public sendRegistrationConfirmationEmail(user: User): Promise<nodemailer.SentMessageInfo> {
        return new Promise<nodemailer.SentMessageInfo>((resolve) => {
            resolve(null);
        });
    }

    public sendLaunchEmail(user: User, confirmation: Confirmation): Promise<nodemailer.SentMessageInfo> {
        return new Promise<nodemailer.SentMessageInfo>((resolve) => {
            resolve(null);
        });
    }
}
