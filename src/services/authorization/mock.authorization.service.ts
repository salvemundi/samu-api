import { IAuthorizationService } from './iAuthorization.service';
import { User } from '../../entities/user.entity';
import randomUser from '../user/mock.user.service';
import { JWT } from './authorization.service';

export const testJWToken = 'awesomeJWT';

export default JWT;
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
        return new Promise<string>((resolve) => {
            resolve(testJWToken);
        });
    }

    verifyJWT(jwt: string): boolean {
        return (jwt === testJWToken);
    }

    decodeJWT(jwt: any): JWT {
        if (jwt === testJWToken) {
            return {
                email: 'admin@gmail.com',
                userId: 1,
            };
        }

        return null;
    }
}
