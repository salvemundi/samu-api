import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TestModule } from 'src/test.module';
import { Commission } from 'src/entities/commission.entity';
import randomCommission, { MockCommissionService } from 'src/services/commission/mock.commission.service';

// TODO: Add test for authorization
describe('Commission Controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [TestModule],
    })
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
        .set('Cookie', ['auth=awesomeJWT; path=/; domain=localhost;'])
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .expect((response: request.Response) => {
          response.body.commissions = [randomCommission];
        });
    });

    it('No auth cookie - Should return 401', () => {
      return request(app.getHttpServer()).get('/commissions')
          .send()
          .expect(401);
    });
  });

  describe('/commission/:id - Get one request', () => {
    it('Correct call - Should return 200 and one commission', () => {
      return request(app.getHttpServer()).get('/commissions/1')
        .set('Cookie', ['auth=awesomeJWT; path=/; domain=localhost;'])
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .expect((response: request.Response) => {
          response.body.commission = randomCommission;
        });
    });

    it('Wrong id - Should return 404', () => {
      return request(app.getHttpServer()).get('/commissions/2')
        .set('Cookie', ['auth=awesomeJWT; path=/; domain=localhost;'])
        .expect(404);
    });

    it('No auth cookie - Should return 401', () => {
      return request(app.getHttpServer()).get('/commissions/1')
          .send()
          .expect(401);
    });
  });

  describe('/commission/ - Post request', () => {
    it('Correct call - Should return 200', () => {
      const date = new Date();

      return request(app.getHttpServer()).post('/commissions')
        .set('Cookie', ['auth=awesomeJWT; path=/; domain=localhost;'])
        .send({name: 'ICT commissie', description: 'De ICT commissie is geweldig!', created: date})
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .expect((response: request.Response) => {
          response.body.commission = new Commission('ICT commissie', 'De ICT commissie is geweldig!', date, 2);
        });
    });

    it('Missing info in body - Should return 400', () => {
      return request(app.getHttpServer()).post('/commissions')
        .set('Cookie', ['auth=awesomeJWT; path=/; domain=localhost;'])
        .send({description: 'De ICT commissie is geweldig!', created: new Date()})
        .expect(400);
    });

    it('No auth cookie - Should return 401', () => {
      const date = new Date();

      return request(app.getHttpServer()).post('/commissions')
          .send({name: 'ICT commissie', description: 'De ICT commissie is geweldig!', created: date})
          .send()
          .expect(401);
    });
  });

  describe('/commission/ - Put request', () => {
    it('Correct call - Should return 200', () => {
      const date = new Date();

      return request(app.getHttpServer()).put('/commissions')
        .set('Cookie', ['auth=awesomeJWT; path=/; domain=localhost;'])
        .send({id: 1, name: 'ICT commissie', description: 'De ICT commissie is geweldig!', created: date})
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .expect((response: request.Response) => {
          response.body.commission = new Commission('ICT commissie', 'De ICT commissie is geweldig!', date, 1);
        });
    });

    it('Missing info in body - Should return 400', () => {
      return request(app.getHttpServer()).put('/commissions')
        .set('Cookie', ['auth=awesomeJWT; path=/; domain=localhost;'])
        .send({id: 1, description: 'De ICT commissie is geweldig!', created: new Date()})
        .expect(400);
    });

    it('Wrong id - Should return 404', () => {
      return request(app.getHttpServer()).put('/commissions')
        .set('Cookie', ['auth=awesomeJWT; path=/; domain=localhost;'])
        .send({id: 3, name: 'Dames commissie', description: 'De ICT commissie is geweldig!', created: new Date()})
        .expect(404);
    });

    it('No auth cookie - Should return 401', () => {
      return request(app.getHttpServer()).put('/commissions')
        .send({id: 1, name: 'ICT commissie', description: 'De ICT commissie is geweldig!', created: new Date()})
        .send()
        .expect(401);
    });
  });
});
