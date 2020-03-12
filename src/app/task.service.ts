import {Injectable} from '@angular/core';
import {Task} from './task';
import {TaskFilter} from './task-filter';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../environments/environment';
import {switchMap} from 'rxjs/operators';

const taskService = {
  getTasks: environment.apiUrl + '/getTasks/' + environment.user,
  createTask: environment.apiUrl + '/createTask/' + environment.user,
  updateTask: environment.apiUrl + '/updateTask/' + environment.user,
  deleteTask: environment.apiUrl + '/deleteTask/' + environment.user,
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {
  }

  listTasks(filter: TaskFilter): Observable<Task[]> {
    return this.http.get<Task[]>(taskService.getTasks + '?filter=' + filter);
  }

  createTask(description: string): Observable<Task> {
    return this.http.post<Task>(taskService.createTask, {description});
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.patch<Task>(taskService.updateTask, task);
  }

  deleteTask(task: Task): Observable<Task> {
    return this.http.delete<Task>(taskService.deleteTask + '?id=' + task.id);
  }

  tasksLeft(): Observable<number> {
    return this.http
      .get<Task[]>(taskService.getTasks + '?filter=' + TaskFilter.Pending)
      .pipe(switchMap(tasks => of(tasks.length)));
  }
}
