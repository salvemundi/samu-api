import 'reflect-metadata';
import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ScopeSeeder } from './seed/scope.seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors();

  const scopeSeeder = app.get(ScopeSeeder);
  await scopeSeeder.seed();

  const options = new DocumentBuilder()
    .setTitle('Salve mundi API')
    .setDescription('Salve mundi API documentation')
    .setVersion('1.0')
    .addTag('SaMu')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(+process.env.SERVER_PORT);
}
bootstrap();
