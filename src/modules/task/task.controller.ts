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
import { CreateTaskDto } from './dto/task.dto';

@Controller('api/tasks')
//@UsePipes(ValidationPipe) realizar un pipe de manera interna
export class TaskController {
  constructor(private taskSvc: TaskService) {}

  @Get()
  public async getTasks(): Promise<any> {
    return await this.taskSvc.getTasks();
  }

  @Get('pg')
  public async getTasksPg(): Promise<any> {
    return await this.taskSvc.getTasksPg();
  }

  @Get(':id')
  public getTasksById(@Param('id', ParseIntPipe) id: number): string {
    return this.taskSvc.getTaskById(id);
  }

  @Post()
  public insertTask(@Body() task: CreateTaskDto): any {
    return this.taskSvc.insert(task);
  }

  @Put(':id')
  public updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() task: any,
  ): any[] {
    return this.taskSvc.update(id, task);
  }

  @Delete(':id')
  public deleteTask(@Param('id', ParseIntPipe) id: number): string {
    return this.taskSvc.delete(id);
  }
}
