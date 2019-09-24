import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { TestModule } from 'src/test.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { ShortedUserDto } from 'src/dto/user/shorted-user-dto';
import { CreateUserDto } from 'src/dto/user/create-user-dto';
import { UpdateUserDto } from 'src/dto/user/update-user-dto';
import randomUser from 'src/services/user/mock.user.service';

describe('Users Controller', () => {
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
    describe('/user/:id - Get one request', () => {
        it('Correct call - Should return 200 and a user', () => {
            return request(app.getHttpServer()).get('/user/1')
                .set('Cookie', ['auth=awsomeJWT; path=/; domain=localhost;'])
                .send()
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200)
                .expect((response: request.Response) => {
                    response.body.user = randomUser;
                });
        });

        it('Wrong id - Should return 404', () => {
            return request(app.getHttpServer()).get('/user/2')
                .set('Cookie', ['auth=awsomeJWT; path=/; domain=localhost;'])
                .send()
                .expect(404);
        });
    });

    describe('/user/ - Get all request', () => {
        it('Correct call - Should return 200 and the users', () => {
            return request(app.getHttpServer()).get('/user/')
                .set('Cookie', ['auth=awsomeJWT; path=/; domain=localhost;'])
                .send()
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200)
                .expect((response: request.Response) => {
                    response.body.users = [randomUser] as ShortedUserDto[];
                });
        });
    });

    describe('/user/ - Put request', () => {
        it('Correct call - Should return 200 and the users', () => {
            const userDto = new UpdateUserDto();
            userDto.id = 1;
            userDto.pcn = 123456;
            userDto.firstName = 'Salve';
            userDto.middleName = null;
            userDto.lastName = 'Mundi';
            userDto.birthday = new Date(1970, 1, 1);
            userDto.address = 'Rachelsmolen 1';
            userDto.postalcode = '5612MA';
            userDto.city = 'Eindhoven';
            userDto.country = 'Nederland';
            userDto.phoneNumber = '+31 6 12346789';
            userDto.email = 'no-reply@salvemundi.nl';

            const expectedUser = userDto as User;
            expectedUser.member = null;

            return request(app.getHttpServer()).put('/user/').send(userDto)
                .set('Cookie', ['auth=awsomeJWT; path=/; domain=localhost;'])
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200)
                .expect((response: request.Response) => {
                    response.body.user = expectedUser;
                });
        });

        it('Missing info in body - Should return 400', () => {
            const userDto = new UpdateUserDto();
            userDto.id = 1;
            userDto.pcn = 123456;
            userDto.firstName = 'Salve';
            userDto.middleName = null;
            userDto.lastName = 'Mundi';
            userDto.birthday = new Date(1970, 1, 1);
            userDto.address = 'Rachelsmolen 1';
            userDto.postalcode = '5612MA';
            userDto.city = 'Eindhoven';
            userDto.country = 'Nederland';
            userDto.phoneNumber = '+31 6 12346789';

            return request(app.getHttpServer()).put('/user/').send(userDto)
                .set('Cookie', ['auth=awsomeJWT; path=/; domain=localhost;'])
                .expect(400);
        });

        it('Wrong id - Should return 404', () => {
            const userDto = new UpdateUserDto();
            userDto.id = 3;
            userDto.pcn = 123456;
            userDto.firstName = 'Salve';
            userDto.middleName = null;
            userDto.lastName = 'Mundi';
            userDto.birthday = new Date(1970, 1, 1);
            userDto.address = 'Rachelsmolen 1';
            userDto.postalcode = '5612MA';
            userDto.city = 'Eindhoven';
            userDto.country = 'Nederland';
            userDto.phoneNumber = '+31 6 12346789';
            userDto.email = 'no-reply@salvemundi.nl';

            return request(app.getHttpServer()).put('/user/').send(userDto)
                .set('Cookie', ['auth=awsomeJWT; path=/; domain=localhost;'])
                .expect(404);
        });
    });
});
