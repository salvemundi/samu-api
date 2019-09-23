import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { TestModule } from 'src/test.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { IUserService } from 'src/services/user/iuser.service';
import { ShortedUserDto } from 'src/dto/user/shorted-user-dto';
import { CreateUserDto } from 'src/dto/user/create-user-dto';
import { UserService } from 'src/services/user/user.service';
import { UpdateUserDto } from 'src/dto/user/update-user-dto';

describe('Users Controller', () => {
    let app: INestApplication;

    // Mock entity
    const randomUser: User = new User();
    randomUser.id = 1;
    randomUser.pcn = 123456;
    randomUser.firstName = 'Random';
    randomUser.middleName = null;
    randomUser.lastName = 'User';
    randomUser.birthday = new Date(1990, 1, 1);
    randomUser.address = 'Rachelsmolen 1';
    randomUser.postalcode = '5612 MA';
    randomUser.city = 'Eindhoven';
    randomUser.country = 'Nederland';
    randomUser.phoneNumber = '+31 6 12346789';
    randomUser.email = 'no-reply@salvemundi.nl';
    randomUser.registeredSince = new Date();
    randomUser.member = null;

    // Mock service
    const userService: IUserService = {
        readOne: (id: number) => new Promise<User>((resolve) => {
            if (id === 1) {
                resolve(randomUser);

            } else {
                resolve(undefined);
            }
        }),
        readAll: (skip: number, take: number) => new Promise<User[]>((resolve) => {
            resolve([randomUser]);
        }),
        update: (user: User) => new Promise<User>((resolve) => {
            resolve(user);
        }),
        create: (user: User) => new Promise<User>((resolve) => {
            user.id = 2;
            resolve(user);
        }),
    };

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [TestModule],
        })
            .overrideProvider(UserService)
            .useValue(userService)
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
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200)
                .expect((response: request.Response) => {
                    response.body.user = randomUser;
                });
        });

        it('Wrong id - Should return 404', () => {
            return request(app.getHttpServer()).get('/user/2')
                .expect(404);
        });
    });

    describe('/user/ - Get all request', () => {
        it('Correct call - Should return 200 and the users', () => {
            return request(app.getHttpServer()).get('/user/')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200)
                .expect((response: request.Response) => {
                    response.body.users = [randomUser] as ShortedUserDto[];
                });
        });
    });

    describe('/user/ - Post request', () => {
        it('Correct call - Should return 200 and the users', () => {
            const userDto = new CreateUserDto();
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
            expectedUser.id = 2;
            expectedUser.member = null;

            return request(app.getHttpServer()).post('/user/').send(userDto)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200)
                .expect((response: request.Response) => {
                    response.body.user = expectedUser;
                });
        });

        it('Missing info in body - Should return 400', () => {
            const userDto = new CreateUserDto();
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

            return request(app.getHttpServer()).post('/user/').send(userDto)
                .expect(400);
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
                .expect(404);
        });
    });
});
