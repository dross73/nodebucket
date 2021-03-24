/*
============================================
; Title: employee.js
; Author: Dan Ross
; Date: 20 March 2021
; Modified By: Dan Ross
; Description: This is our employee schema.
;===========================================
*/

const mongoose = require("mongoose");
const Item = require('./item');

let employeeSchema = mongoose.Schema(
  {
    empId: { type: String, unique: true },
    todo: [Item],
    done: [Item],
  },
  { collection: "employees" }
);

module.exports = mongoose.model("Employee", employeeSchema);
