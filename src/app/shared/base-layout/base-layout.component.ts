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


@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})

export class BaseLayoutComponent implements OnInit {
  //Generate today's date
  year: number = Date.now();

  constructor() { }

  ngOnInit(): void {
  }



}
