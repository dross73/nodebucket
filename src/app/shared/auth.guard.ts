/*
============================================
; Title: auth.guard.ts
; Author: Dan Ross
; Date: 20 March 2021
; Modified By: Dan Ross
; Description: This is the auth guard file.
;===========================================
*/
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const sessionUser = this.cookieService.get('session_user');
    if (sessionUser) {
      return true;
    }
    else {
      //If there's no active session, redirect to login page.
      this.router.navigate(['/session/login']);
      return false;
    }
  }

}
