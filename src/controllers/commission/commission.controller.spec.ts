import { CommissionController } from './commission.controller';
import { CommissionService } from './../../services/commission/commission.service';
import { CreateCommissionDto } from './../../dto/commission/create-commission-dto';
import { DatabaseSeeder } from './../../config/testing';

describe('Commission Controller', () => {
  let controller: CommissionController;
  let service: CommissionService;
  let database: DatabaseSeeder;

  beforeAll(async () => {
    database = new DatabaseSeeder();
    await database.before();

    service = new CommissionService();
    controller = new CommissionController(service);
  });

  it('Can read all commissions', async () => {
    const result = [];
    // jest.spyOn(service, 'read').mockImplementation(() => Promise.resolve(result));

    const create = new CreateCommissionDto();
    create.name = "Bastiaan";
    create.created = new Date();
    create.description = "reee";
    await controller.create(create);

    expect((await controller.readAll(0, 100)).commissions).toBe(result);
  });
});
