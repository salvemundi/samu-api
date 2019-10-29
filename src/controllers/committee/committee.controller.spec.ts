import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TestModule } from 'src/test.module';
import { Committee } from 'src/entities/committee.entity';
import randomCommission from 'src/services/committee/mock.committee.service';

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
  describe('/committee/ - Get all request', () => {
    it('Correct call - Should return 200 and all of the committee', () => {
      return request(app.getHttpServer()).get('/committee')
        .set('Cookie', ['auth=awesomeJWT; path=/; domain=localhost;'])
        .expect(200)
        .expect((response: request.Response) => {
          response.body.committee = [randomCommission];
        });
    });
  });

  describe('/committee/:id - Get one request', () => {
    it('Correct call - Should return 200 and one commission', () => {
      return request(app.getHttpServer()).get('/committee/1')
        .set('Cookie', ['auth=awesomeJWT; path=/; domain=localhost;'])
        .expect(200)
        .expect((response: request.Response) => {
          response.body.commission = randomCommission;
        });
    });

    it('Wrong id - Should return 404', () => {
      return request(app.getHttpServer()).get('/committee/2')
        .set('Cookie', ['auth=awesomeJWT; path=/; domain=localhost;'])
        .expect(404);
    });
  });

  describe('/committee/ - Post request', () => {
    it('Correct call - Should return 200', () => {
      const date = new Date();

      return request(app.getHttpServer()).post('/committee')
        .set('Cookie', ['auth=awesomeJWT; path=/; domain=localhost;'])
        .send({name: 'ICT commissie', description: 'De ICT commissie is geweldig!', created: date})
        .expect(200)
        .expect((response: request.Response) => {
          response.body.commission = new Committee('ICT commissie', 'De ICT commissie is geweldig!', date, 2);
        });
    });

    it('Missing info in body - Should return 400', () => {
      return request(app.getHttpServer()).post('/committee')
        .set('Cookie', ['auth=awesomeJWT; path=/; domain=localhost;'])
        .send({description: 'De ICT commissie is geweldig!', created: new Date()})
        .expect(400);
    });

    it('No auth cookie - Should return 401', () => {
      const date = new Date();

      return request(app.getHttpServer()).post('/committee')
          .send({name: 'ICT commissie', description: 'De ICT commissie is geweldig!', created: date})
          .expect(401);
    });
  });

  describe('/committee/ - Put request', () => {
    it('Correct call - Should return 200', () => {
      const date = new Date();

      return request(app.getHttpServer()).put('/committee')
        .set('Cookie', ['auth=awesomeJWT; path=/; domain=localhost;'])
        .send({id: 1, name: 'ICT commissie', description: 'De ICT commissie is geweldig!', created: date})
        .expect(200)
        .expect((response: request.Response) => {
          response.body.commission = new Committee('ICT commissie', 'De ICT commissie is geweldig!', date, 1);
        });
    });

    it('Missing info in body - Should return 400', () => {
      return request(app.getHttpServer()).put('/committee')
        .set('Cookie', ['auth=awesomeJWT; path=/; domain=localhost;'])
        .send({id: 1, description: 'De ICT commissie is geweldig!', created: new Date()})
        .expect(400);
    });

    it('Wrong id - Should return 404', () => {
      return request(app.getHttpServer()).put('/committee')
        .set('Cookie', ['auth=awesomeJWT; path=/; domain=localhost;'])
        .send({id: 3, name: 'Dames commissie', description: 'De ICT commissie is geweldig!', created: new Date()})
        .expect(404);
    });

    it('No auth cookie - Should return 401', () => {
      return request(app.getHttpServer()).put('/committee')
        .send({id: 1, name: 'ICT commissie', description: 'De ICT commissie is geweldig!', created: new Date()})
        .expect(401);
    });
  });

  describe('/committee/:id - Delete request', () => {
    it('Correct call - Should return 200', () => {
      return request(app.getHttpServer()).del('/committee/1')
        .set('Cookie', ['auth=awesomeJWT; path=/; domain=localhost;'])
        .expect(200);
    });

    it('Wrong id - Should return 404', () => {
      return request(app.getHttpServer()).del('/committee/2')
        .set('Cookie', ['auth=awesomeJWT; path=/; domain=localhost;'])
        .expect(404);
    });

    it('No auth cookie - Should return 401', () => {
      return request(app.getHttpServer()).del('/committee/1')
          .expect(401);
    });
  });
});
