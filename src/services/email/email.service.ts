import * as nodemailer from 'nodemailer';
import * as sgTransport from 'nodemailer-sendgrid-transport';
import * as hbs from 'nodemailer-express-handlebars';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
    private mailer;

    constructor() {
        const sgOptions = {
            auth: {
                api_user: process.env.SENDGRID_USERNAME,
                api_key: process.env.SENDGRID_PASSWORD,
            },
        };
        const hbsOptions = {
            viewEngine: {
                extname: '.hbs',
                layoutsDir: '/templates',
                defaultLayout: 'template',
                partialsDir: '/partials',
            },
            viewPath: '/templates',
            extName: '.hbs',
        };

        this.mailer = nodemailer.createTransport(sgTransport(sgOptions));
        this.mailer.use('compile', hbs(hbsOptions));
    }

    public sendTestMail(email: {from: string, to: string[], subject: string, template: string, context: any}): Promise<nodemailer.SentMessageInfo> {
        return this.mailer.sendMail(email);
    }
}
