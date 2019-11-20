import { Injectable } from "@nestjs/common";
import { IEventService } from "./ievent.service";
import { Event } from "../../entities/event.entity";

@Injectable()
export class EventService implements IEventService {
    
    async create(event: Event): Promise<Event> {
        throw new Error("Method not implemented.");
    }    
    
    async readOne(token: number): Promise<Event> {
        throw new Error("Method not implemented.");
    }

 
}