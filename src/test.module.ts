import { Module } from '@nestjs/common';
import { MemberService } from './services/member/member.service';
import { AuthorizationController } from './controllers/authorization/authorization.controller';
import { CommissionService } from './services/commission/commission.service';
import { AuthorizationService } from './services/authorization/authorization.service';
import { UserService } from './services/user/user.service';
import { UserController } from './controllers/user/user.controller';
import { APP_GUARD } from '@nestjs/core';
import { DefaultGuard } from './guards/default.guard';
import { JwtModule } from '@nestjs/jwt';
import { CommissionController } from './controllers/commission/commission.controller';
import { MemberController } from './controllers/member/member.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'VerySecretToken',
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [
    CommissionController,
    MemberController,
    AuthorizationController,
    UserController,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: DefaultGuard,
    },
    CommissionService,
    MemberService,
    AuthorizationService,
    UserService,
  ],
})
export class TestModule {}
