import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ScopeSeeder } from './seed/scope.seed';
import swaggerOptions from './swagger/document';
import { createConnection } from 'typeorm';

async function bootstrap() {
  await createConnection(require('./typeormConfig'));
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:8080', 'https://localhost:8080', 'https://salvemundi.nl', 'http://salvemundi.nl', 'http://beta.salvemundi.nl', 'https://beta.salvemundi.nl'],
    credentials: true,
  });

  await app.get(ScopeSeeder).seed();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, document);

  await app.listen(+process.env.SERVER_PORT);
}

bootstrap();
