import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
import {EventController} from './controllers/event/event.controller';
import { EventService } from './services/event/event.service';
import { FileService } from './services/file/file.service';
import { ScopeInterceptor } from './interceptor/scope.interceptor';

@Module({
  imports: [
    TypeOrmModule.forRoot(require('./typeormConfig')),
  ],
  controllers: [
    CommitteeController,
    UserController,
    AuthorizationController,
    PaymentController,
    WebhookController,
    EventController,
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
  ],
})
export class AppModule {}
