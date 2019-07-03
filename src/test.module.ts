import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';
import { CommissionController } from './controllers/commission/commission.controller';
import { CommissionService } from './services/commission/commission.service';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
        useFactory: (config: ConfigService) => config.get('testdb'),
        inject: [ConfigService],
    }),
  ],
  controllers: [CommissionController],
  providers: [CommissionService],
})
export class TestModule {}
