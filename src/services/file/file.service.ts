import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { FileServiceInterface } from './file.service.interface';

@Injectable()
export class FileService implements FileServiceInterface {
    private pathAccountancyAccessToken = process.env.STORAGE_PATH + '/accountancy/accessToken.txt';
    private pathAccountancyRefreshToken = process.env.STORAGE_PATH + '/accountancy/refreshToken.txt';
    private pathAccountancyResourceId = process.env.STORAGE_PATH + '/accountancy/resourceId.txt';

    private async saveFile(type: FileType, name: string, buffer: Buffer): Promise<void> {
        return new Promise<void>((resolve, rejects) => {
            this.ensureDirectoryExistence(process.env.STORAGE_PATH + type + name);
            fs.writeFile(process.env.STORAGE_PATH + type + name, buffer, (err) => {
                if (err) {
                    rejects(err);
                }

                resolve();
            });
        });
    }

    private ensureDirectoryExistence(filePath) {
        const dirname = path.dirname(filePath);
        if (fs.existsSync(dirname)) {
          return true;
        }
        this.ensureDirectoryExistence(dirname);
        fs.mkdirSync(dirname);
    }

    public async saveProfilePicture(name: string, buffer: Buffer): Promise<void> {
        await this.saveFile(FileType.PROFILE_PICTURE, name, buffer);
    }

    public getProfilePicturePath(name: string): string {
        return process.env.STORAGE_PATH + FileType.PROFILE_PICTURE + name;
    }

    public saveAccessTokenAccountancy(token: string): void {
        this.ensureDirectoryExistence(this.pathAccountancyAccessToken);
        fs.writeFileSync(this.pathAccountancyAccessToken, token);
    }

    public getAccessTokenAccountancy(): string {
        return fs.readFileSync(this.pathAccountancyAccessToken).toString('utf8');
    }

    public saveRefreshTokenAccountancy(token: string): void {
        this.ensureDirectoryExistence(this.pathAccountancyRefreshToken);
        fs.writeFileSync(this.pathAccountancyRefreshToken, token);
    }

    public getRefreshTokenAccountancy(): string {
        return fs.readFileSync(this.pathAccountancyRefreshToken).toString('utf8');
    }

    public saveResourceIdAccountancy(id: string): void {
        this.ensureDirectoryExistence(this.pathAccountancyResourceId);
        fs.writeFileSync(this.pathAccountancyResourceId, id);
    }

    public getResourceIdAccountancy(): string {
        return fs.readFileSync(this.pathAccountancyResourceId).toString('utf8');
    }
}

export interface FileInterface {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
}

enum FileType {
    PROFILE_PICTURE = '/profiles/',
}
