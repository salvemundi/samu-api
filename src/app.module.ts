import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommitteeController } from './controllers/committee/committee.controller';
import { CommitteeService } from './services/committee/committee.service';
import { MemberController } from './controllers/member/member.controller';
import { MemberService } from './services/member/member.service';
import { UserService } from './services/user/user.service';
import { UserController } from './controllers/user/user.controller';
import { AuthorizationController } from './controllers/authorization/authorization.controller';
import { AuthorizationService } from './services/authorization/authorization.service';
import { APP_GUARD } from '@nestjs/core';
import { DefaultGuard } from './guards/default.guard';
import { JwtModule } from '@nestjs/jwt';
import { ScopeSeeder } from './seed/scope.seed';
import { PaymentController } from './controllers/payment/payment.controller';
import { PaymentService } from './services/payment/payment.service';
import { EmailService } from './services/email/email.service';
import { typeormconfig } from './typeormConfig';
import { WebhookController } from './controllers/payment/webhook.controller';
import { ConfirmationService } from './services/confirmation/confirmation.service';
import { EventService } from './services/event/event.service';
import EventController from './controllers/event/event.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormconfig),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [
    CommitteeController,
    MemberController,
    UserController,
    AuthorizationController,
    PaymentController,
    WebhookController,
    EventController
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: DefaultGuard,
    },
    CommitteeService,
    MemberService,
    UserService,
    AuthorizationService,
    PaymentService,
    ScopeSeeder,
    EmailService,
    ConfirmationService,
    EventService
  ],
})
export class AppModule {}
