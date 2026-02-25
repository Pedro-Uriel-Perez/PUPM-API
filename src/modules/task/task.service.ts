import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';
import type { Client } from 'pg';
import type { Connection } from 'mysql2/promise';
import type { Task } from './entities/task.entitie';

@Injectable()
export class TaskService {
  constructor(
    @Inject('POSTGRES_CONNECTION') private pg: Client,
    @Inject('MYSQL_CONNECTION') private mysql: Connection,
  ) {}

  async getTasks(): Promise<Task[]> {
    const query = 'SELECT * FROM tasks';
    const result = await this.pg.query(query);
    return result.rows as Task[];
  }

  async getTaskById(id: number): Promise<Task | undefined> {
    const query = 'SELECT * FROM tasks WHERE id = $1';
    const result = await this.pg.query(query, [id]);
    return result.rows[0] as Task | undefined;
  }

  async insertTasks(task: CreateTaskDto): Promise<Task> {
    const sql = `INSERT INTO tasks (name, description, priority, user_id) VALUES ($1, $2, $3, $4) RETURNING *`;
    const result = await this.pg.query(sql, [
      task.name,
      task.description,
      task.priority,
      task.user_id,
    ]);
    return result.rows[0] as Task;
  }

  async updateTask(
    id: number,
    taskUpdate: UpdateTaskDto,
  ): Promise<Task | undefined> {
    const task = await this.getTaskById(id);

    if (!task) {
      return undefined;
    }

    const sql = `UPDATE tasks SET name = $1, description = $2, priority = $3 WHERE id = $4 RETURNING *`;
    const result = await this.pg.query(sql, [
      taskUpdate.name ?? task.name,
      taskUpdate.description ?? task.description,
      taskUpdate.priority ?? task.priority,
      id,
    ]);
    return result.rows[0] as Task;
  }

  async deleteTask(
    id: number,
  ): Promise<{ message: string; task: Task } | undefined> {
    const sql = 'DELETE FROM tasks WHERE id = $1 RETURNING *';
    const result = await this.pg.query(sql, [id]);

    if (result.rows.length === 0) {
      return undefined;
    }

    return {
      message: 'Tarea eliminada correctamente',
      task: result.rows[0] as Task,
    };
  }
}
