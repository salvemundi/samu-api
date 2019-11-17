import { Controller, Post } from "@nestjs/common";
import CreateEventDto from "src/dto/event/create-event-dto";
import { EventService } from "src/services/event/event.service";

@Controller("/events")
export default class EventController {


    constructor(private readonly eventService: EventService) {}

    @Post("create")
    async createEvent(eventDto: CreateEventDto) : Event {
    }

}