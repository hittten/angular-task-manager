import {Component, OnInit} from '@angular/core';
import {TaskService} from '../task.service';
import {TaskFilter} from '../task-filter';
import { Task } from '../task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks = this.taskService.listTasks(TaskFilter.All);
  updatingTaskId: number;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

  create(e: KeyboardEvent) {
    const input = e.target as HTMLInputElement;
    if (e.key === 'Enter' && input.value) {
      input.focus();
      this.taskService.createTask(input.value);
      input.value = '';
    }
  }

  update(task: Task, description: string) {
    task.description = description;
    this.taskService.updateTask(task);
    this.updatingTaskId = null;
  }

  complete(task: Task, checked: boolean) {
    task.done = checked;
    this.taskService.updateTask(task);
  }
}
