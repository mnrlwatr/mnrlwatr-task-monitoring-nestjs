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

  async findAll() {
    try {
      return await this.knex<Rahbar>('rahbarlar').select();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number) {
    try {
      return await this.knex<Rahbar>('rahbarlar').where('id', id).first();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.knex<Rahbar>('rahbarlar').where('email', email).first();
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
