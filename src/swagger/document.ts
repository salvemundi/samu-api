import { DocumentBuilder } from '@nestjs/swagger';

const swaggerOptions = new DocumentBuilder()
    .setTitle('Salve mundi API')
    .setDescription('Salve mundi API documentation')
    .setVersion('1.0')
    .build();

export default swaggerOptions;
