/*
============================================
; Title: base-layout.component.ts
; Author: Dan Ross
; Date: 20 March 2021
; Modified By: Dan Ross
; Description: This is the base layout component.
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})

export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();

  constructor(private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
  }

  logOut() {
    //Delete the session cookies when the user signs out.
    this.cookieService.deleteAll();
    //After they sign out, route them back to the sign-in screen.
    this.router.navigate(['/session/login']);

  }

}
