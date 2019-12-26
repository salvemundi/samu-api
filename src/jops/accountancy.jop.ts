import { Injectable } from '@nestjs/common';
import { Cron, NestSchedule } from 'nest-schedule';
import { FileService } from '../services/file/file.service';
import * as axios from 'axios';

@Injectable()
export class AccountancyJop extends NestSchedule {

    constructor(
        private fileService: FileService,
    ) {
        super();
        this.ensureTokenFilesExists();
    }

  @Cron('45 * * * * *')
  async handleCron() {
      const accessToken = this.fileService.getAccessTokenAccountancy();
      if (accessToken === '') {
          return;
      }

      console.log(this.fileService.getAccessTokenAccountancy())
  }

  private ensureTokenFilesExists() {
    try {
        this.fileService.getAccessTokenAccountancy();
    } catch (e) {
        this.fileService.saveAccessTokenAccountancy('');
    }

    try {
        this.fileService.getRefreshTokenAccountancy();
    } catch (e) {
        this.fileService.saveRefreshTokenAccountancy('');
    }
  }
}
