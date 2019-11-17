import { Confirmation } from '../../entities/confirmation.entity';
import { User } from '../../entities/user.entity';

export interface IEventService {
    create(event: Event): Promise<Event>;
    readOne(token: string): Promise<Event>;
}
