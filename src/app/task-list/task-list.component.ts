import {Component, OnInit} from '@angular/core';
import {TaskService} from '../task.service';
import {TaskFilter} from '../task-filter';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks = this.taskService.listTasks(TaskFilter.All);

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

}
