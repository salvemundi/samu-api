import { MailerOptions, HandlebarsAdapter } from '@nest-modules/mailer';
import { MailerAsyncOptions } from '@nest-modules/mailer/dist/interfaces/mailer-async-options.interface';

export const mailerconfig: MailerOptions = {
        transport: 'smtps://user@domain.nl:pass@smtp.domain.com',
        defaults: {
            from: '"nest-modules" <modules@nestjs.com>',
        },
        template: {
            dir: __dirname + '/mail/templates',
            adapter: new HandlebarsAdapter(), // or new PugAdapter()
            options: {
                strict: true,
            },
        },
};
