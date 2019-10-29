import { IConfirmationService } from './iconfirmation.service';
import { Confirmation } from '../../entities/confirmation.entity';
import { User } from '../../entities/user.entity';

export class MockConfirmationService implements IConfirmationService {
    create(user: User): Promise<Confirmation> {
        return new Promise<Confirmation>((resolve) => {
            resolve(null);
        });
    }
    readOne(token: string): Promise<Confirmation> {
        return new Promise<Confirmation>((resolve) => {
            resolve(null);
        });
    }

}
