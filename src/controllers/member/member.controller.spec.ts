import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { TestModule } from 'src/test.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { MemberService } from 'src/services/member/member.service';
import { IMemberService } from 'src/services/member/imember.service';
import { Member } from 'src/entities/member.entity';
import { ShortedMemberDto } from 'src/dto/member/shorted-member-dto';
import { CreateMemberDto } from 'src/dto/member/create-member-dto';
import { UpdateMemberDto } from 'src/dto/member/update-member-dto';

describe('Member Controller', () => {
  let app: INestApplication;

  // Mock entity
  const randomMember: Member = new Member();
  randomMember.id = 1;
  randomMember.pcn = 123456;
  randomMember.firstName = 'Random';
  randomMember.middleName = null;
  randomMember.lastName = 'Member';
  randomMember.birthday = new Date(1990, 1, 1);
  randomMember.address = 'Rachelsmolen 1';
  randomMember.postalcode = '5612 MA';
  randomMember.city = 'Eindhoven';
  randomMember.country = 'Nederland';
  randomMember.phoneNumber = '+31 6 12346789';
  randomMember.email = 'no-reply@salvemundi.nl';
  randomMember.registeredSince = new Date();
  randomMember.memberships = [];

  // Mock service
  const memberService: IMemberService = {
    readOne: (id: number) => new Promise<Member>((resolve) => {
      if (id === 1) {
        resolve(randomMember);

      } else {
        resolve(undefined);
      }
    }),
    readAll: (skip: number, take: number) => new Promise<Member[]>((resolve) => {
      resolve([randomMember]);
    }),
    update: (member: Member) => new Promise<Member>((resolve) => {
      resolve(member);
    }),
    create: (member: Member) => new Promise<Member>((resolve) => {
      member.id = 2;
      resolve(member);
    }),
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [TestModule],
    })
    .overrideProvider(MemberService)
    .useValue(memberService)
    .compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // Tests
  describe('/member/:id - Get one request', () => {
    it('Correct call - Should return 200 and a member', () => {
      return request(app.getHttpServer()).get('/member/1')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .expect((response: request.Response) => {
        response.body.member = randomMember;
      });
    });

    it('Wrong id - Should return 404', () => {
      return request(app.getHttpServer()).get('/member/2')
      .expect(404);
    });
  });

  describe('/member/ - Get all request', () => {
    it('Correct call - Should return 200 and the members', () => {
      return request(app.getHttpServer()).get('/member/')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .expect((response: request.Response) => {
        response.body.members = [randomMember] as ShortedMemberDto[];
      });
    });
  });

  describe('/member/ - Post request', () => {
    it('Correct call - Should return 200 and the members', () => {
      const memberDto = new CreateMemberDto();
      memberDto.pcn = 123456;
      memberDto.firstName = 'Salve';
      memberDto.middleName = null;
      memberDto.lastName = 'Mundi';
      memberDto.birthday = new Date(1970, 1, 1);
      memberDto.address = 'Rachelsmolen 1';
      memberDto.postalcode = '5612MA';
      memberDto.city = 'Eindhoven';
      memberDto.country = 'Nederland';
      memberDto.phoneNumber = '+31 6 12346789';
      memberDto.email = 'no-reply@salvemundi.nl';

      const expectedMember = memberDto as Member;
      expectedMember.id = 2;
      expectedMember.memberships = [];

      return request(app.getHttpServer()).post('/member/').send(memberDto)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .expect((response: request.Response) => {
        response.body.member = expectedMember;
      });
    });

    it('Missing info in body - Should return 400', () => {
      const memberDto = new CreateMemberDto();
      memberDto.pcn = 123456;
      memberDto.firstName = 'Salve';
      memberDto.middleName = null;
      memberDto.lastName = 'Mundi';
      memberDto.birthday = new Date(1970, 1, 1);
      memberDto.address = 'Rachelsmolen 1';
      memberDto.postalcode = '5612MA';
      memberDto.city = 'Eindhoven';
      memberDto.country = 'Nederland';
      memberDto.phoneNumber = '+31 6 12346789';

      return request(app.getHttpServer()).post('/member/').send(memberDto)
      .expect(400);
    });
  });

  describe('/member/ - Put request', () => {
    it('Correct call - Should return 200 and the members', () => {
      const memberDto = new UpdateMemberDto();
      memberDto.id = 1;
      memberDto.pcn = 123456;
      memberDto.firstName = 'Salve';
      memberDto.middleName = null;
      memberDto.lastName = 'Mundi';
      memberDto.birthday = new Date(1970, 1, 1);
      memberDto.address = 'Rachelsmolen 1';
      memberDto.postalcode = '5612MA';
      memberDto.city = 'Eindhoven';
      memberDto.country = 'Nederland';
      memberDto.phoneNumber = '+31 6 12346789';
      memberDto.email = 'no-reply@salvemundi.nl';

      const expectedMember = memberDto as Member;
      expectedMember.memberships = [];

      return request(app.getHttpServer()).put('/member/').send(memberDto)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .expect((response: request.Response) => {
        response.body.member = expectedMember;
      });
    });

    it('Missing info in body - Should return 400', () => {
      const memberDto = new UpdateMemberDto();
      memberDto.id = 1;
      memberDto.pcn = 123456;
      memberDto.firstName = 'Salve';
      memberDto.middleName = null;
      memberDto.lastName = 'Mundi';
      memberDto.birthday = new Date(1970, 1, 1);
      memberDto.address = 'Rachelsmolen 1';
      memberDto.postalcode = '5612MA';
      memberDto.city = 'Eindhoven';
      memberDto.country = 'Nederland';
      memberDto.phoneNumber = '+31 6 12346789';

      return request(app.getHttpServer()).put('/member/').send(memberDto)
      .expect(400);
    });

    it('Wrong id - Should return 404', () => {
      const memberDto = new UpdateMemberDto();
      memberDto.id = 3;
      memberDto.pcn = 123456;
      memberDto.firstName = 'Salve';
      memberDto.middleName = null;
      memberDto.lastName = 'Mundi';
      memberDto.birthday = new Date(1970, 1, 1);
      memberDto.address = 'Rachelsmolen 1';
      memberDto.postalcode = '5612MA';
      memberDto.city = 'Eindhoven';
      memberDto.country = 'Nederland';
      memberDto.phoneNumber = '+31 6 12346789';
      memberDto.email = 'no-reply@salvemundi.nl';

      return request(app.getHttpServer()).put('/member/').send(memberDto)
      .expect(404);
    });
  });
});
