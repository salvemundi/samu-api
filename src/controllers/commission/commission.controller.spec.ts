import { CommissionController } from './commission.controller';
import { CommissionService } from './../../services/commission/commission.service';

describe('Commission Controller', () => {
  let controller: CommissionController;
  let service: CommissionService;

  beforeAll(async () => {
    service = new CommissionService();
    controller = new CommissionController(service);
  });

  it('Can read all commissions', async () => {
    const result = [];
    jest.spyOn(service, 'read').mockImplementation(() => Promise.resolve(result));

    expect((await controller.readAll(0, 100)).commissions).toBe(result);
  });
});
