import { Controller, Get, Param } from '@nestjs/common';

@Controller('test')
export class TestController {
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `:) ${id}`;
  }
}
