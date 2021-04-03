import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AboutComponent } from './pages/about/about.component';
/*
============================================
; Title: app-routing.module.ts
; Author: Dan Ross
; Date: 20 March 2021
; Modified By: Dan Ross
; Description: This is the app routing module where we can set up our routes.
;===========================================
*/
//These are our imports.
import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './shared/auth.guard';

//These are routes which will load the corresponding component based on the URL path.
const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        //Apply a guard to our Home Component so users that are not logged in cannot access.
        canActivate: [AuthGuard]
      },
      {
        path: 'about',
        component: AboutComponent
      }
    ]
  },

  {
    path: 'session',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'not-found',
        component: NotFoundComponent
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  {
    //If an invalid URL is entered, this will redirect them to the not-found component.
    path: '**',
    redirectTo: 'session/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
