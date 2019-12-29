import { Test, TestingModule } from '@nestjs/testing';
import { AccountancyService } from './accountancy.service';

describe('AccountancyService', () => {
  let service: AccountancyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountancyService],
    }).compile();

    service = module.get<AccountancyService>(AccountancyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
