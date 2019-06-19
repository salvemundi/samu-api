import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { TestController } from './controller/test/test.controller';
import * as path from 'path';

// ConfigService.rootPath = path.resolve(__dirname, '..');

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
        useFactory: (config: ConfigService) => config.get('db'),
        inject: [ConfigService]
    }),
  ],
  controllers: [TestController],
})
export class AppModule {}
