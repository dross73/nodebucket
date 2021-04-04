
/*
============================================
; Title: create-task-dialog.component.ts
; Author: Dan Ross
; Date: 1 April 2021
; Modified By: Dan Ross
; Description: This is the create task component file.
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.css']
})
export class CreateTaskDialogComponent implements OnInit {

  taskForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<CreateTaskDialogComponent>, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      text: [null, Validators.compose([Validators.required, Validators.maxLength(250)])]

    })
  }
/**
 * Create task - Will close the dialog and add the task to the to do list.
 */
  createTask() {
    this.dialogRef.close(this.taskForm.value);
  }

  //This will close the dialog without adding anything to the list.
  cancel() {
    this.dialogRef.close();
  }
}
