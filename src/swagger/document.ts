import { DocumentBuilder } from '@nestjs/swagger';

const swaggerOptions = new DocumentBuilder()
    .setTitle('Salve mundi API')
    .setDescription('Salve mundi API documentation')
    .setContact('ICT-commissie', 'https://www.salvemundi.nl', 'ict@salvemundi.nl')
    // tslint:disable-next-line: no-var-requires
    .setVersion(require('../../package.json').version)
    .build();

export default swaggerOptions;
