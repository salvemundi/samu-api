import { Controller, Post, Body } from "@nestjs/common";
import CreateEventDto from "src/dto/event/create-event-dto";
import { EventService } from "src/services/event/event.service";
import { Event } from "src/entities/event.entity";

@Controller("/events")
export default class EventController {


    constructor(private readonly eventService: EventService) {}

    @Post("create")
    async createEvent(@Body() eventDto: CreateEventDto) : Promise<Event> {
        const event: Event = new Event();
        event.title = eventDto.title;
        event.description = eventDto.description;
        event.signupBefore = eventDto.signupBefore;
        event.startDate = eventDto.startDate;
        event.endDate = eventDto.endDate;
        event.memberOnly = eventDto.memberOnly;
        event.memberPrice = eventDto.memberPrice;
        event.notMemberPrice = eventDto.notMemberPrice;
        return await event.save();
    }

}