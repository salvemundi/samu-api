import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TestModule } from '../../test.module';
import { LoginDTO } from '../../dto/authorization/LoginDTO';
import { RegisterDTO } from 'src/dto/authorization/RegisterDTO';

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

    it('Wrong credentials - Should return 401', () => {
      const loginDto: LoginDTO = {
        email: 'admin@gmail.com',
        password: 'admin',
      };

      return request(app.getHttpServer()).post('/authorization/login').send(loginDto)
        .expect(401);
    });
  });

  describe('/authentication/register - Register user', () => {
    it('Correct call - Should return 200 with a cookie', () => {
      const registerDto: RegisterDTO = {
        email: 'admin@test.com',
        password: 'admin',
        firstName: 'Salve',
        middleName: '',
        lastName: 'Mundi',
        address: 'Rachelsmolen 1',
        city: 'Eindhoven',
        country: 'Nederland',
        postalcode: '5612MA',
        birthday: new Date(2017, 1, 1),
        phoneNumber: '+31 6 24827777',
        pcn: null,
      };

      return request(app.getHttpServer()).post('/authorization/register').send(registerDto)
        .expect(200)
        .expect((response: request.Response) => {
            response.header.Cookie = 'awsomeJWT';
        });
    });

    it('Correct call - Should return 400 without a cookie', () => {
      const registerDto: RegisterDTO = {
        email: 'admin@gmail.com',
        password: 'admin',
        firstName: 'Salve',
        middleName: '',
        lastName: 'Mundi',
        address: 'Rachelsmolen 1',
        city: 'Eindhoven',
        country: 'Nederland',
        postalcode: '5612MA',
        birthday: new Date(2017, 1, 1),
        phoneNumber: '+31 6 24827777',
        pcn: null,
      };

      return request(app.getHttpServer()).post('/authorization/register').send(registerDto)
        .expect(400);
    });
  });
});
