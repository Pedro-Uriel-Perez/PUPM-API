import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';
import type { Task } from './entities/task.entitie';

@Controller('api/task')
@ApiTags('Task')
export class TaskController {
  constructor(private readonly taskSvc: TaskService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las tareas' })
  public async getTask(): Promise<Task[]> {
    return await this.taskSvc.getTasks();
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Obtener tarea por ID' })
  public async getTaskById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Task> {
    return await this.taskSvc.getTaskById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva tarea' })
  public async insertTask(@Body() task: CreateTaskDto): Promise<Task> {
    return await this.taskSvc.insertTask(task);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una tarea' })
  public async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() task: UpdateTaskDto,
  ): Promise<Task> {
    return await this.taskSvc.updateTask(id, task);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una tarea' })
  public async deleteTask(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ deleted: boolean; message: string }> {
    const result = await this.taskSvc.deleteTask(id);

    if (!result) {
      throw new HttpException(
        'No se pudo eliminar la tarea',
        HttpStatus.NOT_FOUND,
      );
    }

    return { deleted: true, message: 'Tarea eliminada correctamente' };
  }
}
