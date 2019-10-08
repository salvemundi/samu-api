import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ScopeSeeder } from './seed/scope.seed';
import swaggerOptions from './swagger/document';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({
    //origin: ['http://localhost:8080', 'https://localhost:8080', 'https://salvemundi.nl', 'http://salvemundi.nl'],
    credentials: true,
  });

  app.use(async (ctx, next, par2) => {
    const start = Date.now();
    await par2();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  });

  const scopeSeeder = app.get(ScopeSeeder);
  await scopeSeeder.seed();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, document);

  await app.listen(+process.env.SERVER_PORT);
}
bootstrap();
