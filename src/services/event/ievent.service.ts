import { Event } from "../../entities/event.entity";
import { User } from "src/entities/user.entity";
import { EventSignup } from "src/entities/eventsignup.entity";

export interface IEventService {
    create(event: Event): Promise<Event>;
    readOne(id: number): Promise<Event>;
    update(event: Event): Promise<Event>;
    remove(id: number, contactSignups?: boolean): void;
    getUserSignup(user: User, event: Event): Promise<EventSignup>;
    signUp(user: User, event: Event): void;
}
