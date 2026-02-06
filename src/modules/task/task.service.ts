import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  getAll(): string {
    return 'Todas las tareas';
  }
}
