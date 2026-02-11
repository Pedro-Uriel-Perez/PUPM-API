import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './dto/task.dto';
import type { Task } from './interface/task.interface';

@Controller('api/task')
export class TaskController {
  constructor(private taskSvc: TaskService) {}

  @Get()
  public getTasks(): Task[] {
    return this.taskSvc.getTask();
  }

  @Get(':id')
  public getTasksById(@Param('id', ParseIntPipe) id: number): Task | undefined {
    return this.taskSvc.getTaskById(id);
  }

  @Post()
  public insertTask(@Body() task: TaskDto): Task {
    return this.taskSvc.insert(task);
  }

  @Put(':id')
  public updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() task: TaskDto,
  ): Task[] {
    return this.taskSvc.update(id, task);
  }

  @Delete(':id')
  public deleteTask(@Param('id', ParseIntPipe) id: number): string {
    return this.taskSvc.delete(id);
  }
}
