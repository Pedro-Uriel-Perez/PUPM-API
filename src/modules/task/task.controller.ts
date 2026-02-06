import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('api/task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  public getAll(): string {
    return this.taskService.getTask();
  }
  @Get(':id')
  public getTaskById(@Param('id') id: string) {
    return this.taskService.getTaskById(parseInt(id));
  }
  @Post()
  public insertTask(@Body() task: any): any {
    return this.taskService.insert(task);
  }
  @Put(':id')
  public updateTask(@Param('id') id: string, @Body() task: any): any {
    return this.taskService.update(parseInt(id), task);
  }
  @Delete(':id')
  public deleteTask(@Param('id') id: string) {
    return this.taskService.delete(parseInt(id));
  }
}
