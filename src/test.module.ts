import { Module } from '@nestjs/common';
import { MemberService } from './services/member/member.service';
import { AuthorizationController } from './controllers/authorization/authorization.controller';
import { CommitteeService } from './services/committee/committee.service';
import { AuthorizationService } from './services/authorization/authorization.service';
import { UserService } from './services/user/user.service';
import { UserController } from './controllers/user/user.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthorizationGuard } from './guards/auth.guard';
import { CommitteeController } from './controllers/committee/committee.controller';
import { MockCommissionService } from './services/committee/mock.committee.service';
import { MockUserService } from './services/user/mock.user.service';
import { MockAuthorizationService } from './services/authorization/mock.authorization.service';
import { ConfirmationService } from './services/confirmation/confirmation.service';
import { MockConfirmationService } from './services/confirmation/mock.confirmation.service';

@Module({
  controllers: [
    CommitteeController,
    AuthorizationController,
    UserController,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
    {
      provide: CommitteeService,
      useClass: MockCommissionService,
    },
    MemberService,
    {
      provide: AuthorizationService,
      useClass: MockAuthorizationService,
    },
    {
      provide: UserService,
      useClass: MockUserService,
    },
    {
      provide: ConfirmationService,
      useClass: MockConfirmationService,
    },
  ],
})
export class TestModule {}
