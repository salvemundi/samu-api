import { Test, TestingModule } from '@nestjs/testing';
import { AccountancyController } from './accountancy.controller';

describe('Accountancy Controller', () => {
  let controller: AccountancyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountancyController],
    }).compile();

    controller = module.get<AccountancyController>(AccountancyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
