import { EventSignup } from "src/entities/eventsignup.entity";

export default class EventSignupResponseDto {

    constructor(readonly signup: EventSignup) { }
}