import {Injectable} from '@angular/core';
import {Task} from './task';
import {TaskFilter} from './task-filter';
import {TASKS} from './mock-task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks = TASKS;

  constructor() {
  }

  getData(): Task[] {
    // const tasks = JSON.parse(localStorage.getItem('tasks'));
    const tasks = this.tasks;

    return tasks ? tasks : [];
  }

  saveData(tasks: Task[]) {
    // localStorage.setItem('tasks', JSON.stringify(tasks));
    this.tasks = tasks;
  }

  listTasks(filter: TaskFilter): Task[] {
    const tasks = this.getData();
    if (filter === TaskFilter.All) {
      return tasks;
    }
    if (filter === TaskFilter.Pending) {
      return tasks.filter(task => task.done === false);
    }
    if (filter === TaskFilter.Completed) {
      return tasks.filter(task => task.done === true);
    }
  }

  createTask(description: string): Task {
    const tasks = this.getData();
    const newTask: Task = {
      id: tasks.length + 1,
      description,
      done: false,
    };

    tasks.push(newTask);
    this.saveData(tasks);

    return newTask;
  }

  updateTask(task: Task): Task {
    const tasks = this.getData();
    const index = tasks.findIndex(currentTask => currentTask.id === task.id);

    tasks[index] = task;
    this.saveData(tasks);

    return task;
  }

  deleteTask(task: Task): Task {
    const tasks = this.getData();
    const index = tasks.findIndex(currentTask => currentTask.id === task.id);
    const deletedTask = tasks[index];

    tasks.splice(index, 1);
    this.saveData(tasks);

    return deletedTask;
  }

  tasksLeft(): number {
    const tasks = this.getData();
    return tasks.filter(task => task.done === false).length;
  }
}
