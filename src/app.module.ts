import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { CommissionController } from './controllers/commission/commission.controller';
import { CommissionService } from './services/commission/commission.service';
import { MemberController } from './controllers/member/member.controller';
import { MemberService } from './services/member/member.service';
import { MemberModule } from './modules/member/member.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
        useFactory: (config: ConfigService) => config.get('db'),
        inject: [ConfigService],
    }),
    MemberModule,
  ],
  controllers: [CommissionController, MemberController],
  providers: [CommissionService, MemberService],
})
export class AppModule {}
