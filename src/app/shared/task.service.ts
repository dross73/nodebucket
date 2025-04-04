/*
============================================
; Title: task.service.ts
; Author: Dan Ross
; Date: 30 March 2021
; Modified By: Dan Ross
; Description: This is our task service page
;===========================================
*/

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from './item.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  private apiUrl = environment.apiUrl; 
  //Use HttpClient to make API calls from Angular
  constructor(private http: HttpClient) { }

  /**
   * @param empId
   * @returns An observable type of 'any' and the tasks associate with the empId passed in.
   */
  findAllTasks(empId: string): Observable<any> {

    return this.http.get(`${this.apiUrl}/employees/${empId}/tasks`);

  }

  /**
   *
   * @param empId
   * @param task
   * @returns the task that needs to be updated based on the empId passed.
   */
  createTask(empId: string, task: string): Observable<any> {

    return this.http.post(`${this.apiUrl}/employees/${empId}/tasks`, { text: task });
  }

  /**
   *
   * @param empId
   * @param todo
   * @param done
   * @returns the updated task based on the empId passed.
   */
  updateTask(empId: string, todo: Item[], done: Item[]): Observable<any> {
    return this.http.put(`${this.apiUrl}/employees/${empId}/tasks`, { todo, done });
  }

  /**
   *
   * @param empId
   * @param taskId
   * @returns the task that needs to be deleted based on the empId and the taskId that's passed.
   */
  deleteTask(empId: string, taskId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/employees/${empId}/tasks/${taskId}`);
  }
}
