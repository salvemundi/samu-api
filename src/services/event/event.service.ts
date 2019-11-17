import { Injectable } from "@nestjs/common";
import { IEventService } from "./ievent.service";

@Injectable()
export class EventService implements IEventService {
    
    async create(event: Event): Promise<Event> {
        throw new Error("Method not implemented.");
    }    
    
    async readOne(token: string): Promise<Event> {
        throw new Error("Method not implemented.");
    }

 
}