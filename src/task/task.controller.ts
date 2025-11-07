import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '../guards/auth.guard';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return await this.taskService.create(createTaskDto);
  }

  @Get('/completed')
  findAllCompletedTasks(
    @Query('project') project: number,
    @Query('employee') employee: number,
  ) {
    return this.taskService.findTasksCompleted(employee, project);
  }

  @Get('/not-completed')
  findAllNotCompletedTasks(
    @Query('project') project: number,
    @Query('employee') employee: number,
  ) {
    return this.taskService.findTasksNotCompleted(employee, project);
  }

  @UseGuards(AuthGuard)
  @Get('/all')
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }

  @Get('by/employee/:id')
  findAllTasksByEmployee(@Param('id') employee_id: string) {
    return this.taskService.findTasksByEmployee(+employee_id);
  }

  @Get('by/employee/:id/project/:pid')
  findAllTasksByEmployeeByProject(
    @Param('id') employee_id: string,
    @Param('pid') project_id: string,
  ) {
    return this.taskService.findTasksByEmployee(+employee_id, +project_id);
  }

  @Get('by/project/:id')
  findAllTasksByProject(@Param('id') project_id: string) {
    return this.taskService.findTasksByProject(+project_id);
  }
}
