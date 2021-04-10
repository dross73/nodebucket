 /*
============================================
; Title: main-nav.component.ts
; Author: Dan Ross
; Date: 10 April 2021
; Modified By: Dan Ross
; Description: This is the main-nav component file
;===========================================
*/

import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private cookieService: CookieService, private router: Router) {}

  logOut() {
    //Delete the session cookies when the user signs out.
    this.cookieService.deleteAll();
    //After they sign out, route them back to the sign-in screen.
    this.router.navigate(['/session/login']);

  }
}
