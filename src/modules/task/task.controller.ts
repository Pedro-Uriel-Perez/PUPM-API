import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';

@Controller('api/task')
export class TaskController {
  constructor(private readonly taskSvc: TaskService) {}

  @Get()
  public async getTask(): Promise<any> {
    return await this.taskSvc.getTasks();
  }

  @Get(':id')
  public async getTaskById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    const result = await this.taskSvc.getTaskById(id);

    if (result === undefined) {
      throw new HttpException(
        `Tarea con ID ${id} no encontrada`,
        HttpStatus.NOT_FOUND,
      );
    }
    return result;
  }

  @Post()
  public async insertTask(@Body() task: CreateTaskDto): Promise<any> {
    const result = await this.taskSvc.insertTasks(task);

    if (result === undefined) {
      throw new HttpException(
        'Tarea no registrada',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return result;
  }

  @Put(':id')
  public async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() task: UpdateTaskDto,
  ): Promise<any> {
    return await this.taskSvc.updateTask(id, task);
  }

  @Delete(':id')
  public async deleteTask(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    return await this.taskSvc.deleteTask(id);
  }
}
