import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';
import { CommissionController } from './controllers/commission/commission.controller';
import { CommissionService } from './services/commission/commission.service';

// ConfigService.rootPath = path.resolve(__dirname, '..');

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
        useFactory: (config: ConfigService) => config.get('db'),
        inject: [ConfigService],
    }),
  ],
  controllers: [CommissionController],
  providers: [CommissionService],
})
export class AppModule {}
