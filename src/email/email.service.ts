import { User } from 'src/entities/user.entity';
import * as nodemailer from 'nodemailer';
import * as sgTransport from 'nodemailer-sendgrid-transport';
import * as hbs from 'nodemailer-express-handlebars';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
    public sendTestMail(): void {
        const sgOptions = {
            auth: {
                api_user: 'SENDGRID_USERNAME',
                api_key: 'SENDGRID_PASSWORD',
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

        const email = {
            from: 'noreply@salvemundi.nl',
            to: 'test@salvemundi.nl',
            subject: 'Welkom bij Salve Mundi',
            template: 'default',
            context: {  // Data to be sent to template engine.
                title: 'Welkom bij Salve Mundi',
                firstname: 'test',
                lastname: 'test',
            },
        };

        const mailer = nodemailer.createTransport(sgTransport(sgOptions));
        mailer.use('compile', hbs(hbsOptions));
        mailer.sendMail(email, (error, response) => {
            mailer.close();
        });
    }
}
