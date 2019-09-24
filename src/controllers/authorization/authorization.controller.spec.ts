import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TestModule } from '../../test.module';
import { LoginDTO } from '../../dto/authorization/LoginDTO';

describe('Authorization Controller', () => {
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
  describe('/authentication/login - Login user', () => {
    it('Correct call - Should return 200 with a cookie', () => {
      const loginDto: LoginDTO = {
        email: 'admin@test.com',
        password: 'admin',
      };

      return request(app.getHttpServer()).post('/authorization/login').send(loginDto)
        .expect(200)
        .expect((response: request.Response) => {
            response.header.Cookie = 'awsomeJWT';
        });
    });
  });
});
