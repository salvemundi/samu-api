import { Controller, Post, Body, Get, Put } from "@nestjs/common";
import { EventService } from "../../services/event/event.service";
import { Me } from "../../decorators/me.decorator";
import { User } from "../../entities/user.entity";
import { CreateEventDto } from "../../dto/event/create-event-dto";
import { Event } from "../../entities/event.entity";
import EventSignupDto from "../../dto/event/signup-event-dto";
import { EventSignup } from "../../entities/eventsignup.entity";
import UpdateEventDto from "../../dto/event/update-event-dto";

@Controller("/events")
export class EventController {

    constructor(private readonly eventService: EventService) { }

    @Post("create")
    async createEvent(@Me() user: User, @Body() eventDto: CreateEventDto): Promise<Event> {
        const event: Event = new Event();
        event.createdBy = user;
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

    @Post("signup")
    async signup(@Me() user: User, @Body() eventSignupDto: EventSignupDto) {
        let eventSignup: EventSignup = new EventSignup();
        eventSignup.user = user;
        eventSignup.event = await this.eventService.readOne(eventSignupDto.eventId);
        await eventSignup.save();
    }

    @Put("update")
    async updateEvent(@Me() user: User, updateEventDto: UpdateEventDto) {
        var event: Event = await this.eventService.readOne(updateEventDto.eventId);
        event.createdBy = user;
        event.title = updateEventDto.title;
        event.description = updateEventDto.description;
        event.signupBefore = updateEventDto.signupBefore;
        event.startDate = updateEventDto.startDate;
        event.endDate = updateEventDto.endDate;
        event.memberOnly = updateEventDto.memberOnly;
        event.memberPrice = updateEventDto.memberPrice;
        event.notMemberPrice = updateEventDto.notMemberPrice;
        return await event.save();
    }
}