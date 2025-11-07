import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { RahbarService } from './rahbar.service';
import { CreateRahbarDto } from './dto/create-rahbar.dto';
import { UpdateRahbarDto } from './dto/update-rahbar.dto';

@Controller('rahbar')
export class RahbarController {
  constructor(private readonly rahbarService: RahbarService) {}

  @Post()
  create(@Body() createRahbarDto: CreateRahbarDto) {
    return this.rahbarService.create(createRahbarDto);
  }

  @Get()
  findAll() {
    return this.rahbarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rahbarService.findOne(+id);
  }

  @Get('/by/:email')
  async findbyEmail(@Param('email') email: string) {
    const rahbar = await this.rahbarService.findByEmail(email);
    return rahbar??(()=>{throw new NotFoundException('Rahbar Not Found')})();; 
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRahbarDto: UpdateRahbarDto) {
    return this.rahbarService.update(+id, updateRahbarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rahbarService.remove(+id);
  }
}
