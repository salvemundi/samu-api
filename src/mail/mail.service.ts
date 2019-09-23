import { Injectable } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';
import { User } from 'src/entities/user.entity';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    public sendTestMail(): void {
        this.mailerService.sendMail({
            to: 'test@salvemundi.nl',
            from: 'noreply@salvemundi.nl',
            subject: 'Welkom bij Salve Mundi',
            template: __dirname + 'default', // The `.hbs` extension is appended automatically.
            context: {  // Data to be sent to template engine.
                title: 'Welkom bij Salve Mundi',
                firstname: 'test',
                lastname: 'test',
            },
        })
        .then(() => {})
        .catch(() => {});
    }
}
