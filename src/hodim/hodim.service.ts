import { Injectable } from '@nestjs/common';
import { CreateHodimDto } from './dto/create-hodim.dto';
import { UpdateHodimDto } from './dto/update-hodim.dto';

@Injectable()
export class HodimService {
  create(createHodimDto: CreateHodimDto) {
    return 'This action adds a new hodim';
  }

  findAll() {
    return `This action returns all hodim`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hodim`;
  }

  update(id: number, updateHodimDto: UpdateHodimDto) {
    return `This action updates a #${id} hodim`;
  }

  remove(id: number) {
    return `This action removes a #${id} hodim`;
  }
}
