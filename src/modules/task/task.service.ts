import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  public getTask(): string {
    return 'Lista de tareas';
  }

  public getTaskById(id: number): string {
    return `Tarea con el id ${id}`;
  }

  public insert(task: any): any {
    return task;
  }

  public update(id: number, task: any): any {
    return task;
  }

  public delete(id: number): string {
    return `Tarea ${id} eliminada`;
  }
}
