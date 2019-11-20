import { Event } from "../../entities/event.entity";

export interface IEventService {
    create(event: Event): Promise<Event>;
    readOne(id: number): Promise<Event>;
}
