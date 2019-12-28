import { FileServiceInterface } from './file.service.interface';

export class MockFileService implements FileServiceInterface {
    saveProfilePicture(name: string, buffer: Buffer): Promise<void> {
        return;
    }
    getProfilePicturePath(name: string): string {
        return '';
    }
    saveAccessTokenAccountancy(token: string): void {
        return;
    }
    getAccessTokenAccountancy(): string {
        return '';
    }
    saveRefreshTokenAccountancy(token: string): void {
        return;
    }
    getRefreshTokenAccountancy(): string {
        return '';
    }
    saveResourceIdAccountancy(id: string): void {
        return;
    }
    getResourceIdAccountancy(): string {
        return '';
    }
}
