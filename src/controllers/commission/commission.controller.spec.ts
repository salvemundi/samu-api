import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TestModule } from 'src/test.module';
import { CommissionService } from 'src/services/commission/commission.service';
import { ICommissionService } from 'src/services/commission/icommission.service';
import { Commission } from 'src/entities/Commission.entity';

// TODO: Add test for authorization
describe('Commission Controller', () => {
  let app: INestApplication;

  // Mock entity
  const randomCommission = new Commission('Random commission', 'Random commission to test this controller', new Date(), 1);

  // Mock service
  const commissionService: ICommissionService = {
    create: (commission: Commission) => new Promise<Commission>((resolve) => {
      commission.id = 2;
      resolve(commission);
    }),
    read: (skip: number, take: number) => new Promise<Commission[]>((resolve) => {
      resolve([randomCommission]);
    }),
    readOne: (id: number) => new Promise<Commission>((resolve) => {
      if (id === 1) {
        resolve(randomCommission);

      } else {
        resolve(undefined);
      }
    }),
    update: (commission: Commission) => new Promise<Commission>((resolve) => {
      resolve(commission);
    }),
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [TestModule],
    })
    .overrideProvider(CommissionService)
    .useValue(commissionService)
    .compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // Tests
  describe('/commissions/ - Get all request', () => {
    it('Correct call - Should return 200 and all of the commissions', () => {
      return request(app.getHttpServer()).get('/commissions')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .expect((response: request.Response) => {
          response.body.commissions = [randomCommission];
        });
    });
  });

  describe('/commission/:id - Get one request', () => {
    it('Correct call - Should return 200 and one commission', () => {
      return request(app.getHttpServer()).get('/commissions/1')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .expect((response: request.Response) => {
          response.body.commission = randomCommission;
        });
    });

    it('Wrong id - Should return 404', () => {
      return request(app.getHttpServer()).get('/commissions/2')
        .expect(404);
    });
  });

  describe('/commission/ - Post request', () => {
    it('Correct call - Should return 200', () => {
      const date = new Date();

      return request(app.getHttpServer()).post('/commissions')
        .send({name: 'ICT commissie', description: 'De ICT commissie is geweldig!', created: date})
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .expect((response: request.Response) => {
          response.body.commission = new Commission('ICT commissie', 'De ICT commissie is geweldig!', date, 2);
        });
    });

    it('Missing info in body - Should return 400', () => {
      return request(app.getHttpServer()).post('/commissions')
        .send({description: 'De ICT commissie is geweldig!', created: new Date()})
        .expect(400);
    });
  });

  describe('/commission/ - Put request', () => {
    it('Correct call - Should return 200', () => {
      const date = new Date();

      return request(app.getHttpServer()).put('/commissions')
        .send({id: 1, name: 'ICT commissie', description: 'De ICT commissie is geweldig!', created: date})
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .expect((response: request.Response) => {
          response.body.commission = new Commission('ICT commissie', 'De ICT commissie is geweldig!', date, 1);
        });
    });

    it('Missing info in body - Should return 400', () => {
      return request(app.getHttpServer()).put('/commissions')
        .send({id: 1, description: 'De ICT commissie is geweldig!', created: new Date()})
        .expect(400);
    });

    it('Wrong id - Should return 404', () => {
      return request(app.getHttpServer()).put('/commissions')
        .send({id: 3, name: 'Dames commissie', description: 'De ICT commissie is geweldig!', created: new Date()})
        .expect(404);
    });
  });
});
