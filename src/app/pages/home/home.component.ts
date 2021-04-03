
/*
============================================
; Title: home.component.ts
; Author: Dan Ross
; Date: 20 March 2021
; Modified By: Dan Ross
; Description: This is the home component file.
;===========================================
*/
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { CreateTaskDialogComponent } from 'src/app/shared/create-task-dialog/create-task-dialog.component';
import { Employee } from 'src/app/shared/employee.interface';
import { Item } from 'src/app/shared/item.interface';
import { TaskService } from 'src/app/shared/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  todo: Item[];
  done: Item[];
  employee: Employee;
  empId: string;

  /**
   *
   * @param taskService
   * @param cookieService
   * @param dialog
   */
  constructor(private taskService: TaskService, private cookieService: CookieService, private dialog: MatDialog) {

    this.empId = this.cookieService.get('session_user');
    //Make our API call through the taskService. Returns an http client where we use a subscription to subscribe to that event.
    this.taskService.findAllTasks(this.empId).subscribe(res => {
      console.log('--Server response from findAllTasks--');
      console.log(res);

      this.employee = res.data;// This is the data we're getting back from the API.
      console.log('--Employee object--');
      console.log(this.employee);

    }, err => {
      console.log(err);
    }, () => {
      //on complete
      this.todo = this.employee.todo;
      this.done = this.employee.done;

      console.log('This is in the complete section.');
      console.log(this.todo);
      console.log(this.done);
    })
  }

  ngOnInit(): void {
  }

  /**
   * This is the code for our dialog to create a new task.
   */
  openCreateTaskDialog()  {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this. taskService.createTask(this.empId, data.text).subscribe(res => {
          this.employee = res.data;
        }, err => {
          console.log(err);
        }, () => {
          //on complete

          //Update with the data we get back from the server.
          this.todo = this.employee.todo;
          this.done = this.employee.done;

        })
      }
    })
  }
  /**
   *
   * @param event
   */
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      //If the item is being reordered in same section.

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      console.log("Reordered item in an existing column/array");

      this.updateTaskList(this.empId, this.todo, this.done);

    } else {

      //If the item is being moved to different section.

      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);

      console.log("Moved task item to a different column/array");

      this.updateTaskList(this.empId, this.todo, this.done);

    }
  }

  /**
   *
   * @param taskId
   *
   * This will delete a task from our list.
   */
deleteTask(taskId: string): void {

  if (taskId) {
    console.log(`Task item ${taskId} was deleted`);
    this.taskService.deleteTask(this.empId, taskId).subscribe(res => {

      this.employee = res.data;

    }, err => {
      console.log(err);
    }, () => {
      this.todo = this.employee.todo;
      this.done = this.employee.done;
    })
  }
}


 /**
  *
  * @param empId
  * @param todo
  * @param done
  */
  private updateTaskList(empId: string, todo: Item[], done: Item[]): void{

    this.taskService.updateTask(empId, todo, done).subscribe(res => {
      this.employee = res.data;

    }, err => {
      console.log(err);
    }, () => {
      this.todo = this.employee.todo;
      this.done = this.employee.done;
    })
  }
}
