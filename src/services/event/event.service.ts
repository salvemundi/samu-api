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
        throw new Error("Method not implemented.");
    }

    async readOne(token: number): Promise<Event> {
        throw new Error("Method not implemented.");
    }

    async getUserSignup(user: User, event: Event): Promise<EventSignup> {
        throw new Error("Method not implemented.");
    }


}