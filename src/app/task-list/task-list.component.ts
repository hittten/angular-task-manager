import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from '../task.service';
import {TaskFilter} from '../task-filter';
import {Task} from '../task';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks$ = this.taskService.listTasks(TaskFilter.All);
  updatingTaskId: number;
  deletingTaskId: number;
  tasksLeft$ = this.taskService.tasksLeft();
  currentFilter = TaskFilter.All;
  TaskFilter = TaskFilter;

  private subscriptions: Subscription[] = [];

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
  }

  create(e: KeyboardEvent) {
    const input = e.target as HTMLInputElement;
    if (e.key === 'Enter' && input.value) {
      input.disabled = true;
      const subs = this.taskService.createTask(input.value)
        .subscribe(task => {
          input.value = '';
          input.disabled = false;
          input.focus();
          this.tasksLeft$ = this.taskService.tasksLeft();
          this.tasks$ = this.taskService.listTasks(this.currentFilter);
        });
      this.subscriptions.push(subs);
    }
  }

  update(task: Task, description: string) {
    task.description = description;
    const subs = this.taskService.updateTask(task)
      .subscribe(() => this.updatingTaskId = null);
    this.subscriptions.push(subs);
  }

  complete(task: Task, checked: boolean) {
    task.done = checked;
    const subs = this.taskService.updateTask(task)
      .subscribe(() => {
        this.tasksLeft$ = this.taskService.tasksLeft();
      });
    this.subscriptions.push(subs);
  }

  delete(task: Task) {
    const subs = this.taskService.deleteTask(task)
      .subscribe(() => {
        this.deletingTaskId = null;
        this.tasksLeft$ = this.taskService.tasksLeft();
        this.tasks$ = this.taskService.listTasks(this.currentFilter);
      });
    this.subscriptions.push(subs);
  }

  filter(filter: TaskFilter) {
    this.currentFilter = filter;
    this.tasks$ = this.taskService.listTasks(filter);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
