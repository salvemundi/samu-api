import { CreateEventDto } from './create-event-dto';

export default class UpdateEventDto extends CreateEventDto {
    public eventId: number;

}