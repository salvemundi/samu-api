import { Module } from '@nestjs/common';
import { CommissionController } from './controllers/commission/commission.controller';
import { CommissionService } from './services/commission/commission.service';
import { MemberController } from './controllers/member/member.controller';
import { MemberService } from './services/member/member.service';

@Module({
  imports: [],
  controllers: [CommissionController, MemberController],
  providers: [CommissionService, MemberService],
})
export class TestModule {}
