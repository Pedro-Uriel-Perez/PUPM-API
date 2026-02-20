import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { mysqlProvider } from 'src/common/providers/mysql.provider';
import { pgProvider } from 'src/common/providers/pg.provider';

@Module({
  controllers: [TaskController],
  providers: [TaskService, mysqlProvider[0], pgProvider[0]],
})
export class TaskModule {}
