import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { TestModule } from 'src/test.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { MemberService } from 'src/services/member/member.service';
import { IMemberService } from 'src/services/member/imember.service';
import { Member } from 'src/entities/member.entity';

describe('Member Controller', () => {
  let app: INestApplication;
});
