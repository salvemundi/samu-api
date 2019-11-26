import { Injectable } from "@nestjs/common";
import { IEventService } from "./ievent.service";
import { Event } from "src/entities/event.entity";
import { User } from "src/entities/user.entity";
import { promises } from "dns";
import { EventSignup } from "src/entities/eventsignup.entity";
import { sign } from "crypto";

@Injectable()
export class EventService implements IEventService {

    async create(event: Event): Promise<Event> {
        return event.save();
    }

    async readOne(id: number): Promise<Event> {
        return Event.findOne({ where: { id } });
    }

    async getUserSignup(user: User, event: Event): Promise<EventSignup> {
        return event.eventSignUps.find((eventSignup) => eventSignup.user.id === user.id);
    }

    async deleteEvent(id: number, contactSignups: boolean) {
        const event = await this.readOne(id);

        if (contactSignups) {
            // TODO send signups mails
        }

        event.remove();
    }
}