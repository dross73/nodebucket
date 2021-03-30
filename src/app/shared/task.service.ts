/*
============================================
; Title: task.service.ts
; Author: Dan Ross
; Date: 30 March 2021
; Modified By: Dan Ross
; Description: This file is responsible for making all of the HTTP requests we're going to need in our application.
;===========================================
*/

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from './item.interface';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  //Use HttpClient to make API calls from Angular
  constructor(private http: HttpClient) { }

  /**
   * @param empId
   * @returns An observable typ of 'any' and the tasks associate with the empId passed in.
   */
  findAllTasks(empId: string): Observable<any> {

    return this.http.get('/api/employees/' + empId + '/tasks')

  }

  /**
   *
   * @param empId
   * @param task
   * @returns the task that needs to be updated based on the empId passed.
   */
  createTask(empId: string, task: string): Observable<any> {

    return this.http.post('/api/employees/' + empId + '/tasks', {
      text: task
    })
  }

  /**
   *
   * @param empId
   * @param todo
   * @param done
   * @returns the updated task based on the empId passed.
   */
  updateTask(empId: string, todo: Item[], done: Item[]): Observable<any> {

    return this.http.put('/api/employees/' + empId + '/tasks', {
      todo,
      done
    })
  }

  /**
   *
   * @param empId
   * @param taskId
   * @returns the task that needs to be deleted based on the empId and the taskId that's passed.
   */
  deleteTask(empId: string, taskId: string): Observable<any> {
    return this.http.delete('/api/employees/' + empId + 'tasks/' + taskId);
  }
}
