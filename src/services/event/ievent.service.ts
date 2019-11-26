import { Event } from "../../entities/event.entity";
import { User } from "src/entities/user.entity";
import { EventSignup } from "src/entities/eventsignup.entity";

export interface IEventService {
    create(event: Event): Promise<Event>;
    readOne(id: number): Promise<Event>;

    deleteEvent(id: number, contactSignups: boolean);
    getUserSignup(user: User, event: Event): Promise<EventSignup>;

}
