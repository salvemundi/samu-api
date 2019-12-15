import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
    private async saveFile(type: FileType, name: string, buffer: Buffer): Promise<void> {
        return new Promise<void>((resolve, rejects) => {
            this.ensureDirectoryExistence(process.env.STORAGE_PATH + type + name);
            fs.writeFile(process.env.STORAGE_PATH + type + name, buffer, (err) => {
                if (err) {
                    console.log(err);
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
