import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRahbarDto } from './dto/create-rahbar.dto';
import { UpdateRahbarDto } from './dto/update-rahbar.dto';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { Rahbar } from './entities/rahbar.entity';

@Injectable()
export class RahbarService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async create(createRahbarDto: CreateRahbarDto) {
    try {
      await this.knex('rahbarlar').insert(createRahbarDto);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return `This action returns all rahbar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rahbar`;
  }

  async findByEmail(email: string): Promise<Rahbar | undefined> {
    try {
      const data = await this.knex<Rahbar>('rahbarlar')
        .select()
        .where({ email });
      return data[0];
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  update(id: number, updateRahbarDto: UpdateRahbarDto) {
    return `This action updates a #${id} rahbar`;
  }

  remove(id: number) {
    return `This action removes a #${id} rahbar`;
  }
}
