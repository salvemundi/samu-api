import { Module } from '@nestjs/common';
import { CommitteeController } from './controllers/committee/committee.controller';
import { CommitteeService } from './services/committee/committee.service';
import { MemberService } from './services/member/member.service';
import { UserService } from './services/user/user.service';
import { UserController } from './controllers/user/user.controller';
import { AuthorizationController } from './controllers/authorization/authorization.controller';
import { AuthorizationService } from './services/authorization/authorization.service';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthorizationGuard } from './guards/auth.guard';
import { ScopeSeeder } from './seed/scope.seed';
import { PaymentController } from './controllers/payment/payment.controller';
import { PaymentService } from './services/payment/payment.service';
import { EmailService } from './services/email/email.service';
import { WebhookController } from './controllers/payment/webhook.controller';
import { ConfirmationService } from './services/confirmation/confirmation.service';
import { EventController } from './controllers/event/event.controller';
import { EventService } from './services/event/event.service';
import { FileService } from './services/file/file.service';
import { ScopeInterceptor } from './interceptor/scope.interceptor';
import { AccountancyJop } from './jops/accountancy.jop';
import { ScheduleModule } from 'nest-schedule';
import { AccountancyController } from './controllers/accountancy/accountancy.controller';
import { AccountancyService } from './services/accountancy/accountancy.service';

@Module({
  imports: [
    ScheduleModule.register(),
  ],
  controllers: [
    CommitteeController,
    UserController,
    AuthorizationController,
    PaymentController,
    WebhookController,
    EventController,
    AccountancyController,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ScopeInterceptor,
    },
    AccountancyJop,
    CommitteeService,
    MemberService,
    UserService,
    AuthorizationService,
    PaymentService,
    ScopeSeeder,
    EmailService,
    ConfirmationService,
    EventService,
    FileService,
    AccountancyService,
  ],
})
export class AppModule {}
