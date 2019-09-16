import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommissionController } from './controllers/commission/commission.controller';
import { CommissionService } from './services/commission/commission.service';
import { MemberController } from './controllers/member/member.controller';
import { MemberService } from './services/member/member.service';
import { MemberModule } from './modules/member/member.module';
import * as ormconfig from './typeormConfig';
import { UserService } from './services/user/user.service';
import { UserController } from './controllers/user/user.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    MemberModule,
  ],
  controllers: [CommissionController, MemberController, UserController],
  providers: [CommissionService, MemberService, UserService],
})
export class AppModule {}
