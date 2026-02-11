import { Injectable } from '@nestjs/common';
import { Task } from './interface/task.interface';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];

  public getTask(): Task[] {
    return this.tasks;
  }

  public getTaskById(id: number): Task | undefined {
    const task = this.tasks.find((t) => t.id === id);
    return task;
  }

  public insert(task: Task): Task {
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
    return `Tarea con ID: ${id}, eliminada`;
  }
}
