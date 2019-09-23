import { ICommissionService } from './icommission.service';
import { Commission } from '../../entities/commission.entity';

const randomCommission = new Commission('Random commission', 'Random commission to test this controller', new Date(), 1);

export default randomCommission;
export class MockCommissionService implements ICommissionService {
    create(model: Commission): Promise<Commission> {
        return new Promise<Commission>((resolve) => {
            model.id = 2;
            resolve(model);
        });
    }

    read(skip: number, take: number): Promise<Commission[]> {
        return new Promise<Commission[]>((resolve) => {
            resolve([randomCommission]);
        });
    }

    readOne(id: number): Promise<Commission> {
        return new Promise<Commission>((resolve) => {
            if (id === 1) {
              resolve(randomCommission);

            } else {
              resolve(null);
            }
        });
    }

    update(model: Commission): Promise<Commission> {
        return new Promise<Commission>((resolve) => {
            resolve(model);
        });
    }
}
