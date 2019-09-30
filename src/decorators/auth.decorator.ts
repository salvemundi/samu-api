import { SetMetadata } from '@nestjs/common';

export const Auth = (scope: string) => SetMetadata('scope', scope);
