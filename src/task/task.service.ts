import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async create(createTaskDto: CreateTaskDto) {
    try {
      return await this.knex<Task>('tasks')
        .returning('id')
        .insert(createTaskDto);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      return await this.knex<Task>('tasks').select();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number) {
    try {
      return await this.knex<Task>('tasks').where('id', id).first();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  async remove(id: number) {
    try {
      return await this.knex<Task>('tasks')
        .where('id', id)
        .del()
        .returning('id');
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  // Shu xodimga biriktirilgan barcha vazifalarni statuslar kesmida ro'yxati
  // Shu xodimga biriktirilgan barcha vazifalarni loyihalar kesmida ro'yxati
  findTasksByEmployee(employee_id: number, project_id?: number) {
    return project_id
      ? this.knex<Task>('tasks')
          .where({ employee_id: employee_id, project_id: project_id })
          .select()
      : this.knex<Task>('tasks').where('employee_id', employee_id).select();
  }

  // Barcha vazifalarni loyihalar kesmida ro'yxati
  findTasksByProject(project_id: number) {
    return this.knex<Task>('tasks').where('project_id', project_id).select();
  }

  findTasksNotCompleted(employee_id?: number, project_id?: number) {
    if (employee_id && project_id) {
      return this.knex.select().from('tasks').where({
        completed: false,
        employee_id: employee_id,
        project_id: project_id,
      });
    } else if (project_id) {
      return this.knex
        .select()
        .from('tasks')
        .where({ completed: false, project_id: project_id });
    } else if (employee_id) {
      // Shu xodimga biriktirilgan barcha vazifalarni statuslar (bajarilmagan) kesmida ro'yxati
      return this.knex
        .select()
        .from('tasks')
        .where({ completed: false, employee_id: employee_id });
    } else {
      return this.knex.select().from('tasks').where('completed', false);
    }
  }

  findTasksCompleted(employee_id?: number, project_id?: number) {
    if (employee_id && project_id) {
      return this.knex.select().from('tasks').where({
        completed: true,
        employee_id: employee_id,
        project_id: project_id,
      });
    } else if (project_id) {
      return this.knex
        .select()
        .from('tasks')
        .where({ completed: true, project_id: project_id });
    } else if (employee_id) {
      // Shu xodimga biriktirilgan barcha vazifalarni statuslar (bajarilgan) kesmida ro'yxati
      return this.knex
        .select()
        .from('tasks')
        .where({ completed: true, employee_id: employee_id });
    } else {
      return this.knex.select().from('tasks').where('completed', true);
    }
  }
}
