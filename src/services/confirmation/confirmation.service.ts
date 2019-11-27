import { Injectable } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { Confirmation } from '../../entities/confirmation.entity';
import * as uuidv4 from 'uuid/v4';
import { IConfirmationService } from './iconfirmation.service';

@Injectable()
export class ConfirmationService implements IConfirmationService {
    create(user: User) {
        const confirmation = new Confirmation();
        confirmation.user = user;
        confirmation.token = uuidv4();

        return confirmation.save();
    }

    readOne(token: string) {
        return Confirmation.findOne({where: {token}, relations: ['user']});
    }
}
