import { Controller, Get, Param } from "@nestjs/common";
import { UserService } from "src/services/user/user.service";
import { User } from "src/entities/user.entity";

@Controller("user")
export class UserController {
    constructor(readonly userService: UserService) {

    }

    
}