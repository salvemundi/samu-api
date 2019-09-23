import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommissionController } from './controllers/commission/commission.controller';
import { CommissionService } from './services/commission/commission.service';
import { MemberController } from './controllers/member/member.controller';
import { MemberService } from './services/member/member.service';
import { UserService } from './services/user/user.service';
import { UserController } from './controllers/user/user.controller';
import { AuthorizationController } from './controllers/authorization/authorization.controller';
import { AuthorizationService } from './services/authorization/authorization.service';
import * as ormconfig from './typeormConfig';
import { APP_GUARD } from '@nestjs/core';
import { DefaultGuard } from './guards/default.guard';
import { JwtModule } from '@nestjs/jwt';
import { ScopeSeeder } from './seed/scope.seed';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [
    CommissionController,
    MemberController,
    UserController,
    AuthorizationController,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: DefaultGuard,
    },
    CommissionService,
    MemberService,
    UserService,
    AuthorizationService,
    ScopeSeeder,
  ],
})
export class AppModule {}
