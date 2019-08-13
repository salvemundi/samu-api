import { Module } from '@nestjs/common';
import { MemberController } from '../../controllers/member/member.controller';
import { MemberService } from '../../services/member/member.service';

@Module({
    controllers: [MemberController],
    providers: [MemberService],
})
export class MemberModule {}
