import { createParamDecorator } from '@nestjs/common';

export const Me = createParamDecorator((data, req) => {
  return req.user;
});
