import { createParamDecorator } from '@nestjs/common';

export const Me = createParamDecorator((data, req) => {
  console.log(data, req);
  return req.user;
});
