import { ICommitteeService } from './icommittee.service';
import { Committee } from '../../entities/committee.entity';

const randomCommission = new Committee('Random commission', 'Random commission to test this controller', new Date(), 1);

export default randomCommission;
export class MockCommissionService implements ICommitteeService {
    create(model: Committee): Promise<Committee> {
        return new Promise<Committee>((resolve) => {
            model.id = 2;
            resolve(model);
        });
    }

    read(skip: number, take: number): Promise<Committee[]> {
        return new Promise<Committee[]>((resolve) => {
            resolve([randomCommission]);
        });
    }

    readOne(id: number): Promise<Committee> {
        return new Promise<Committee>((resolve) => {
            id = +id;
            if (id === 1) {
              resolve(randomCommission);

            } else {
              resolve(null);
            }
        });
    }

    update(model: Committee): Promise<Committee> {
        return new Promise<Committee>((resolve) => {
            resolve(model);
        });
    }

    delete(model: Committee): Promise<Committee> {
        return new Promise<any>((resolve) => {
            resolve(model);
        });
    }
}
