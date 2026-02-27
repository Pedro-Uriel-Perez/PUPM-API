import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';
import type { Client } from 'pg';
import type { Task } from './entities/task.entitie';

@Injectable()
export class TaskService {
  constructor(@Inject('POSTGRES_CONNECTION') private db: Client) {}

  async getTasks(): Promise<Task[]> {
    const query = 'SELECT * FROM tasks';
    const result = await this.db.query(query);
    return result.rows as Task[];
  }

  async getTaskById(id: number): Promise<Task> {
    const query = 'SELECT * FROM tasks WHERE id = $1';
    const result = await this.db.query(query, [id]);

    if (!result.rows[0]) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }

    return result.rows[0] as Task;
  }

  async insertTask(task: CreateTaskDto): Promise<Task> {
    const sql = `INSERT INTO tasks (name, description, priority, user_id) VALUES ($1, $2, $3, $4) RETURNING *`;
    const result = await this.db.query(sql, [
      task.name,
      task.description,
      task.priority,
      task.user_id,
    ]);

    return result.rows[0] as Task;
  }

  async updateTask(id: number, taskUpdate: UpdateTaskDto): Promise<Task> {
    const task = await this.getTaskById(id);

    const updatedName = taskUpdate.name ?? task.name;
    const updatedDescription = taskUpdate.description ?? task.description;
    const updatedPriority = taskUpdate.priority ?? task.priority;

    const query = `UPDATE tasks SET name = $1, description = $2, priority = $3 WHERE id = $4 RETURNING *`;

    const result = await this.db.query(query, [
      updatedName,
      updatedDescription,
      updatedPriority,
      id,
    ]);

    return result.rows[0] as Task;
  }

  async deleteTask(id: number): Promise<boolean> {
    const query = `DELETE FROM tasks WHERE id = $1`;
    const result = await this.db.query(query, [id]);

    return (result.rowCount ?? 0) > 0;
  }
}
