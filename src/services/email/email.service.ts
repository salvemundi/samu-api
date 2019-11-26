import * as nodemailer from 'nodemailer';
import * as sendgridTransporter from 'nodemailer-sendgrid';
import * as hbs from 'nodemailer-express-handlebars';
import { Injectable } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { Confirmation } from '../../entities/confirmation.entity';

@Injectable()
export class EmailService {
    private fromEmailAddress = 'noreply@salvemundi.nl';
    private sgOptions  = {
        apiKey: process.env.SENDGIRD_APIKEY,
    };

    private hbsOptions = {
        viewEngine: {
            extname: '.hbs',
            layoutsDir: __dirname + '/templates',
            defaultLayout: 'template',
            partialsDir: __dirname + '/partials',
        },
        viewPath: __dirname + '/templates',
        extName: '.hbs',
    };

    public sendEmailConfirmationEmail(user: User, confirmation: Confirmation): Promise<nodemailer.SentMessageInfo> {
        const mail = {
            from: this.fromEmailAddress,
            to: user.email,
            subject: 'Bevestig je email adres',
            template: 'email-confirmation',
            context: {
                firstName: user.firstName,
                lastName: user.lastName,
                token: confirmation.token,
            },
        };

        return this.sendEmail(mail);
    }

    public sendRegistrationConfirmationEmail(user: User): Promise<nodemailer.SentMessageInfo> {
        const mail = {
            from: this.fromEmailAddress,
            to: user.email,
            subject: 'Welkom!',
            template: 'new-member-confirmation',
            context: {
                firstName: user.firstName,
                lastName: user.lastName,
            },
        };

        return this.sendEmail(mail);
    }

    private sendEmail(email: nodemailer.SendMailOptions): Promise<nodemailer.SentMessageInfo> {
        console.log(this.sgOptions)
        return new Promise((resolve, reject) => {
            const mailer = nodemailer.createTransport(sendgridTransporter(this.sgOptions));
            mailer.use('compile', hbs(this.hbsOptions));

            mailer.sendMail(email, (err, response) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(response);
                }
            });
        });
    }
}
