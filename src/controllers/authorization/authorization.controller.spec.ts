import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TestModule } from '../../test.module';
import { LoginDTO } from 'src/dto/authorization/LoginDTO';
import { AuthorizationService } from 'src/services/authorization/authorization.service';
import { MockAuthorizationService } from 'src/services/authorization/mock.authorization.service';
import { UserService } from 'src/services/user/user.service';
import { MockUserService } from 'src/services/user/mock.user.service';

describe('Authorization Controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [TestModule],
    })
    .overrideProvider(AuthorizationService)
    .useValue(MockAuthorizationService)
    .overrideProvider(UserService)
    .useValue(MockUserService)
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
        email: 'admin@gmail.com',
        password: 'admin',
      };

      return request(app.getHttpServer()).post('/authentication/login').send(loginDto)
        .expect(200)
        .expect((response: request.Response) => {
            response.header['Set-Cookie'] = 'awsomeJWT';
        });
    });
  });
});
