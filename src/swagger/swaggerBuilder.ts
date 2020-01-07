import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import swaggerOptions from './document';
import * as dotenv from 'dotenv';

dotenv.config();

async function build() {
    const app = await NestFactory.create(AppModule);
    const document = SwaggerModule.createDocument(app, swaggerOptions);

    fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));
    process.exit();
}

build();
