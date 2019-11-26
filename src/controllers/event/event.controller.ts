import { Controller, Post, Body, Get, Put, Delete, Param } from "@nestjs/common";
import { EventService } from "../../services/event/event.service";
import { Me } from "../../decorators/me.decorator";
import { User } from "../../entities/user.entity";
import { CreateEventDto } from "../../dto/event/create-event-dto";
import { Event } from "../../entities/event.entity";
import EventSignupDto from "../../dto/event/signup-event-dto";
import { EventSignup } from "../../entities/eventsignup.entity";
import UpdateEventDto from "../../dto/event/update-event-dto";
import DeleteEventDto from "src/dto/event/delete-event-dto";
import EventResponseDto from "src/dto/event/event-response-dto";
import EventPreviewResponseDto from "src/dto/event/event-preview-response-dto";
import EventSignupResponseDto from "src/dto/event/event-signup-response-dto";

@Controller("/events")
export class EventController {

    constructor(private readonly eventService: EventService) { }

    @Get("/page/{page}")
    async getEvents(@Param("page") page: number): Promise<EventPreviewResponseDto[]> {
        // return this.eventService.
        return null;
    }

    @Get("{id}")
    async getEvent(@Param("id") id: number): Promise<EventResponseDto> {
        return new EventResponseDto(await this.eventService.readOne(id));
    }

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
    async signup(@Me() user: User, @Body() eventSignupDto: EventSignupDto) : Promise<EventSignupResponseDto> {
        const event: Event = await this.eventService.readOne(eventSignupDto.eventId);
        await this.eventService.signUp(user, event);
        
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

    @Delete("delete")
    async deleteEvent(@Me() user: User, deleteEventDto: DeleteEventDto) {
        var event: Event = await this.eventService.readOne(deleteEventDto.eventId);
        this.eventService.remove(deleteEventDto.eventId, deleteEventDto.contactSignups);
    }
}