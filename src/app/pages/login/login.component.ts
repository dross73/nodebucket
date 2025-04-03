/*
============================================
; Title: login.component.ts
; Author: Dan Ross
; Date: 20 March 2021
; Modified By: Dan Ross
; Description: This is the login component file.
;===========================================
*/
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string;
  /**
   *
   * @param fb - import FormBuilder
   * @param router - When someone enters valid employee ID, we take them to the router
   * @param cookieService - Give a user access.
   * @param http - So we can make an API call
   * @param snackbar - The Material Design Snack Bar will show our errors.
   */

  constructor(private fb: FormBuilder, private router: Router, private cookieService: CookieService, private http: HttpClient, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // Build our form.
    this.loginForm = this.fb.group({
      empId: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
    });
  }
  //This will handles the API request when someone logs into the system.
  login() {
    const empId = this.loginForm.controls['empId'].value;
  
    this.http.get(`${environment.apiUrl}/employees/${empId}`).subscribe(res => {
      if (res['data']) {
        this.cookieService.set('session_user', empId, 1);
        this.router.navigate(['/']);
      }
      else if (!(res['data']) && (res['httpCode'] === '200')) {
        this.openSnackBar('Invalid employeeId, please try again', 'WARNING');
      }
      else {
        this.openSnackBar(res['message'], 'ERROR');
      }
    });
  }
  
  //Open our error message in Snack Bar.
  openSnackBar(message: string, notificationType: string): void {
    this.snackBar.open(message, notificationType, {
      duration: 3000,
      verticalPosition: 'top'
    })
  }

}
