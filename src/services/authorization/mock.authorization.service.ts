import { IAuthorizationService } from './iAuthorization.service';
import { User } from '../../entities/user.entity';
import randomUser from '../user/mock.user.service';
import { JWT } from './authorization.service';

export class MockAuthorizationService implements IAuthorizationService {
    validateUser(email: string, password: string): Promise<User> {
        return new Promise<User>((resolve) => {
            if (email === 'admin@test.com' && password === 'admin') {
                resolve(randomUser);

            } else {
                resolve(null);
            }
        });
    }

    genJWT(userId: number, email: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

    verifyJWT(jwt: string): boolean {
        return (jwt === 'awsomeJWT');
    }

    decodeJWT(jwt: any): JWT {
        throw new Error("Method not implemented.");
    }
}
