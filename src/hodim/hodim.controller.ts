import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HodimService } from './hodim.service';
import { CreateHodimDto } from './dto/create-hodim.dto';
import { UpdateHodimDto } from './dto/update-hodim.dto';

@Controller('hodim')
export class HodimController {
  constructor(private readonly hodimService: HodimService) {}

  @Post()
  create(@Body() createHodimDto: CreateHodimDto) {
    return this.hodimService.create(createHodimDto);
  }

  @Get()
  findAll() {
    return this.hodimService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hodimService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHodimDto: UpdateHodimDto) {
    return this.hodimService.update(+id, updateHodimDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hodimService.remove(+id);
  }
}
