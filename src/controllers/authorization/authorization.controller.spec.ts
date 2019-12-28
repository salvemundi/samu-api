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
            response.header.Cookie = 'awesomeJWT';
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
      return request(app.getHttpServer()).post('/authorization/register')
        .attach('profilePicture', __dirname + '/../../../Logo_paars.png')
        .field('email', 'admin@test.com')
        .field('firstName', 'Salve')
        .field('lastName', 'Mundi')
        .field('address', 'Rachelsmolen 1')
        .field('city', 'Eindhoven')
        .field('country', 'Nederland')
        .field('postalcode', '5612MA')
        .field('birthday', (new Date(2017, 1, 1)).toString())
        .field('phoneNumber', '+31 6 24827777')
        .field('pcn', '')
        .expect(200)
        .expect((response: request.Response) => {
            response.header.Cookie = 'awesomeJWT';
        });
    });

    it('Correct call - Should return 400 without a cookie', () => {
      return request(app.getHttpServer()).post('/authorization/register')
        .attach('profilePicture', __dirname + '/../../../Logo_paars.png')
        .field('email', 'admin@gmail.com')
        .field('firstName', 'Salve')
        .field('lastName', 'Mundi')
        .field('address', 'Rachelsmolen 1')
        .field('city', 'Eindhoven')
        .field('country', 'Nederland')
        .field('postalcode', '5612MA')
        .field('birthday', (new Date(2017, 1, 1)).toString())
        .field('phoneNumber', '+31 6 24827777')
        .field('pcn', '')
        .expect(409);
    });
  });
});
