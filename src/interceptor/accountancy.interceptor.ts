import { NestInterceptor, ExecutionContext, CallHandler, ConflictException, Injectable, HttpException, ImATeapotException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { FileService } from '../services/file/file.service';

@Injectable()
export class AccountancyInterceptor implements NestInterceptor {

    constructor(
        private fileService: FileService,
    ) {}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        if (context.getArgs()[0].url !== '/accountancy/activate' && this.fileService.getAccessTokenAccountancy() === '') {
            throw new ImATeapotException('Accountancy API is not activated...');
        }

        return next.handle();
    }
}
