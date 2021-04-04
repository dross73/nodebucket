/*
============================================
; Title: employee.interface.ts
; Author: Dan Ross
; Date: 30 March 2021
; Modified By: Dan Ross
; Description: This is the interface for our employee model on the node.js server.
;===========================================
*/

/**
 * Import our Item interface
 */
import { Item } from './item.interface';

/**
 * Export so that any file that wants to use this interface just needs to import it.
 */
export interface Employee {
    empId: string;
    todo: Item[];
    done: Item[];
}
