import { Test, TestingModule } from '@nestjs/testing';
import { CommissionService } from './commission.service';

describe('CommissionService', () => {
  let service: CommissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommissionService],
    }).compile();

    service = module.get<CommissionService>(CommissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
