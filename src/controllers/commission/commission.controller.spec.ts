import 'reflect-metadata';
import { Test } from '@nestjs/testing';
import { CommissionController } from './commission.controller';
import { CommissionService } from './../../services/commission/commission.service';
import { CreateCommissionDto } from './../../dto/commission/create-commission-dto';
import { DatabaseSeeder } from '../../config/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { Commission } from 'dist/entities/Commission.entity';
import * as request from 'supertest';

describe('Commission Controller', () => {
  let controller: CommissionController;
  let service: CommissionService;
  let databaseSeeder: DatabaseSeeder;

  beforeAll(async () => {
    databaseSeeder = new DatabaseSeeder();
    await databaseSeeder.before();

    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
        TypeOrmModule.forRootAsync({
            useFactory: () => databaseSeeder.getConnectionString(),
        }),
      ],
      controllers: [CommissionController],
      providers: [CommissionService],
    }).compile();

    service = module.get<CommissionService>('CommissionService');
    controller = module.get<CommissionController>('CommissionController');
  });

  afterAll(async () => {
    await databaseSeeder.after();
  });

  it('Can read all commissions', async () => {
    const expect: Commission[] = [new Commission()];

    const create = new CreateCommissionDto();
    create.name = 'Bastiaan';
    create.created = new Date();
    create.description = 'reee';
    // await controller.create(create);

    expect((await controller.readAll(0, 100))).toBe(expect);
  });
});
