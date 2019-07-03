import { Test } from '@nestjs/testing';
import { DatabaseSeeder } from '../../config/databaseSeeder';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { TestModule } from 'src/test.module';

describe('Commission Controller', () => {
  let databaseSeeder: DatabaseSeeder;
  let app: INestApplication;

  beforeAll(async () => {
    databaseSeeder = new DatabaseSeeder();
    await databaseSeeder.before();

    const module = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await databaseSeeder.after();
    await app.close();
  });

  it('Can read all commissions', () => {
    return request(app.getHttpServer())
      .get('/commissions')
      .expect(200)
      .expect({
        data: [],
      });
  });
});
