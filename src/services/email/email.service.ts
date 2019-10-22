import * as nodemailer from 'nodemailer';
import * as sgTransport from 'nodemailer-sendgrid-transport';
import * as hbs from 'nodemailer-express-handlebars';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
    private sgOptions  = {
        auth: {
            api_key: process.env.SENDGIRD_APIKEY,
        },
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

    public sendEmail(email: nodemailer.SendMailOptions): Promise<nodemailer.SentMessageInfo> {
        const mailer = nodemailer.createTransport(sgTransport(this.sgOptions));
        mailer.use('compile', hbs(this.hbsOptions));

        return new Promise((resolve, reject) => {
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
