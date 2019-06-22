import { Test, TestingModule } from '@nestjs/testing';
import { CommissionController } from './commission.controller';

describe('Commission Controller', () => {
  let controller: CommissionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommissionController],
    }).compile();

    controller = module.get<CommissionController>(CommissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
