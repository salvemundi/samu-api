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
import { EmailService } from './services/email/email.service';
import { MockEmailService } from './services/email/mock.email.service';
import { FileService } from './services/file/file.service';
import { MockFileService } from './services/file/file.service.mock';
import { AccountancyController } from './controllers/accountancy/accountancy.controller';
import { AccountancyService } from './services/accountancy/accountancy.service';
import { MockAccountancyService } from './services/accountancy/accountancy.service.mock';

@Module({
  controllers: [
    CommitteeController,
    AuthorizationController,
    UserController,
    AccountancyController,
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
    {
      provide: EmailService,
      useClass: MockEmailService,
    },
    {
      provide: FileService,
      useClass: MockFileService,
    },
    {
      provide: AccountancyService,
      useClass: MockAccountancyService,
    }
  ],
})
export class TestModule {}
