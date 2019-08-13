import { Module } from '@nestjs/common';
import { MemberController } from 'src/controllers/member/member.controller';
import { MemberService } from 'src/services/member/member.service';

@Module({
    controllers: [MemberController],
    providers: [MemberService],
})
export class MemberModule {}
