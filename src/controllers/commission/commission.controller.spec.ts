import { Test } from '@nestjs/testing';
import { CommissionController } from './commission.controller';
import { CommissionService } from './../../services/commission/commission.service';
import { CreateCommissionDto } from './../../dto/commission/create-commission-dto';
import { DatabaseSeeder } from './../../config/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { ConfigModule, ConfigService } from 'nestjs-config';

describe('Commission Controller', () => {
  let controller: CommissionController;
  let service: CommissionService;
  let database: DatabaseSeeder;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
        TypeOrmModule.forRootAsync({
            useFactory: (config: ConfigService) => ({
              retryAttempts: 10,
              type: 'mysql',
              host: process.env.DB_HOST,
              port: +process.env.DB_PORT,
              username: process.env.DB_USER,
              password: process.env.DB_PASSWORD,
              entities: [path.resolve(__dirname, '../entities', '**/!(*.d).{ts,js}')],
              migrations: [path.resolve(__dirname, '../migrations', '**/!(*.d).{ts,js}')],
              database: process.env.DB_NAME,
              synchronize: false,
          }),
            inject: [ConfigService],
        }),
      ],
      controllers: [CommissionController],
      providers: [CommissionService],
    }).compile();

    service = module.get<CommissionService>('CommissionService');
    controller = module.get<CommissionController>('CommissionController');
    // database = new DatabaseSeeder();
    // await database.before();

    // service = new CommissionService();
    // controller = new CommissionController(service);
  });

  it('Can read all commissions', async () => {
    const result = [];
    // jest.spyOn(service, 'read').mockImplementation(() => Promise.resolve(result));

    const create = new CreateCommissionDto();
    create.name = "Bastiaan";
    create.created = new Date();
    create.description = "reee";
    await controller.create(create);

    expect((await controller.readAll(0, 100)).commissions).toBe(result);
  });
});
