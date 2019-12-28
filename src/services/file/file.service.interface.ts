export interface FileServiceInterface {
    saveProfilePicture(name: string, buffer: Buffer): Promise<void>;
    getProfilePicturePath(name: string): string;
    saveAccessTokenAccountancy(token: string): void;
    getAccessTokenAccountancy(): string;
    saveRefreshTokenAccountancy(token: string): void;
    getRefreshTokenAccountancy(): string;
    saveResourceIdAccountancy(id: string): void;
    getResourceIdAccountancy(): string;
}
