import { Controller, Get, HttpCode, Param, NotFoundException, Post, Body, Put } from '@nestjs/common';
import { MemberService } from 'src/services/member/member.service';
import { ApiResponse } from '@nestjs/swagger';
import { Member } from 'src/entities/member.entity';
import { CreateMemberDto } from 'src/dto/member/create-member-dto';
import { UpdateMemberDto } from 'src/dto/member/update-member-dto';
import { ShortedMemberDto } from 'src/dto/member/shorted-member-dto';

@Controller('member')
export class MemberController {
    constructor(private memberService: MemberService) {}

    @Get('/:id')
    @HttpCode(200)
    @ApiResponse({status: 200, description: 'Member is found.', type: Member})
    @ApiResponse({status: 404, description: 'No member was found with the provided id.'})
    async readOne(@Param('id') id: number) {
        const member: Member = await this.memberService.readOne(+id);
        if (!member) {
            throw new NotFoundException(`No member found exists with id: ${id}`);
        }

        return { member };
    }

    @Get()
    @HttpCode(200)
    @ApiResponse({status: 200, description: 'Members that match the skip and take parameters.', type: Array<ShortedMemberDto>()})
    async readAll(@Param('skip') skip: number, @Param('take') take: number) {
        const members: Member[] = await this.memberService.readAll(skip, take);
        return { members: members as ShortedMemberDto[] };
    }

    @Post()
    @HttpCode(200)
    @ApiResponse({status: 200, description: 'Member is created.', type: Member})
    @ApiResponse({status: 400, description: 'Validation errors.'})
    async create(@Body() body: CreateMemberDto) {
        const member = new Member();

        member.pcn = body.pcn;
        member.firstName = body.firstName;
        member.middleName = body.middleName;
        member.lastName = body.lastName;
        member.birthday = body.birthday;
        member.address = body.address;
        member.postalcode = body.postalcode;
        member.city = body.city;
        member.country = body.country;
        member.phoneNumber = body.phoneNumber;
        member.email = body.email;
        member.registeredSince = new Date();
        member.memberships = [];

        return { member: await this.memberService.create(member) };
    }

    @Put()
    @HttpCode(200)
    @ApiResponse({status: 200, description: 'Commission is updated.', type: Member})
    @ApiResponse({status: 400, description: 'Validation errors.'})
    @ApiResponse({status: 404, description: 'No member was found with the provided id.'})
    async update(@Body() body: UpdateMemberDto) {
        const member = await this.memberService.readOne(body.id);
        if (!member) {
            throw new NotFoundException(`No commission exists with id: ${body.id}.`);
        }

        member.pcn = body.pcn;
        member.firstName = body.firstName;
        member.middleName = body.middleName;
        member.lastName = body.lastName;
        member.birthday = body.birthday;
        member.address = body.address;
        member.postalcode = body.postalcode;
        member.city = body.city;
        member.country = body.country;
        member.phoneNumber = body.phoneNumber;
        member.email = body.email;

        return { member: await this.memberService.update(member) };
    }
}
