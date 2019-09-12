import { Controller, Get, HttpCode, Param, NotFoundException, Post, Body, Put } from '@nestjs/common';
import { MemberService } from '../../services/member/member.service';
import { ApiResponse } from '@nestjs/swagger';
import { Member } from '../../entities/member.entity';

@Controller('member')
export class MemberController {
    constructor(private memberService: MemberService) { }

}
