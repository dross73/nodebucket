/*
============================================
; Title: item.interface.ts
; Author: Dan Ross
; Date: 30 March 2021
; Modified By: Dan Ross
; Description: This is the interface for our to-do and done items.
;===========================================
*/
/**
 * Export so that any file that wants to use this interface just needs to import it.
 */
export interface Item {
  _id: string;
  text: string;
}

