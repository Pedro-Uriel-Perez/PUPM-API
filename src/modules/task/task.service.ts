import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/task.dto';
import type { Task } from './interface/task.interface';
import type { Connection } from 'mysql2/promise';
import type { Client } from 'pg';

@Injectable()
export class TaskService {
  constructor(
    @Inject('MYSQL_CONNECTION') private db: Connection,
    @Inject('POSTGRES_CONNECTION') private pg: Client,
  ) {}

  private tasks: Task[] = [];

  public async getTasks(): Promise<Task[]> {
    const query = 'SELECT * FROM tasks';
    const [result] = await this.db.query(query);

    return result as Task[];
  }

  public async getTasksPg(): Promise<Task[]> {
    const query = 'SELECT * FROM tasks';
    const result = await this.pg.query(query);

    return result.rows as Task[];
  }

  public getTaskById(id: number): string {
    return `Tarea con el id: ${id}`;
  }

  public insert(task: CreateTaskDto): Task {
    const id = this.tasks.length + 1;
    const newTask: Task = { ...task, id };
    this.tasks.push(newTask);
    return newTask;
  }

  public update(id: number, task: Task): Task[] {
    this.tasks = this.tasks.map((t) => {
      if (t.id === id) {
        if (task.name) t.name = task.name;
        if (task.description) t.description = task.description;
        if (task.priority) t.priority = task.priority;
      }
      return t;
    });
    return this.tasks;
  }

  public delete(id: number): string {
    this.tasks = this.tasks.filter((t) => t.id !== id);
    return 'Tarea eliminada correctamente';
  }
}
