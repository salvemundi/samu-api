import { Injectable } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { Confirmation } from '../../entities/confirmation.entity';
import { uuidv4 } from 'uuid/v4';

@Injectable()
export class ConfirmationService {
    create(user: User) {
        const confirmation = new Confirmation();
        confirmation.user = user;
        confirmation.token = uuidv4();

        return confirmation.save();
    }
}
