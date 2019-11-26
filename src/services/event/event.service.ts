import { Injectable } from "@nestjs/common";
import { IEventService } from "./ievent.service";
import { Event } from "../../entities/event.entity";
import { User } from "../../entities/user.entity";
import { EventSignup } from "../../entities/eventsignup.entity";

@Injectable()
export class EventService implements IEventService {

    async update(event: Event): Promise<Event> {
        return await event.save();
    }

    async create(event: Event): Promise<Event> {
        return event.save();
    }

    async readOne(id: number): Promise<Event> {
        return Event.findOne({ where: { id } });
    }

    async remove(id: number, contactSignups?: boolean) {
        const event = await this.readOne(id);

        if (contactSignups) {
            // TODO send signups mails
        }

        event.active = false;
        await this.update(event);
    }

    async getUserSignup(user: User, event: Event): Promise<EventSignup> {
        return event.eventSignUps.find((eventSignup) => eventSignup.user.id === user.id);
    }

    async signUp(user: User, event: Event): Promise<EventSignup> {
        const eventSignup: EventSignup = new EventSignup();
        eventSignup.user = user;
        eventSignup.event = event;
        return await eventSignup.save();
    }
}