/*
============================================
; Title: employee.js
; Author: Dan Ross
; Date: 20 March 2021
; Modified By: Dan Ross
; Description: This is our employee schema.
;===========================================
*/
//Import over the mongoose library
const mongoose = require("mongoose");
const Item = require('./item');

//Create employee schema and map to employees collection.
let employeeSchema = mongoose.Schema(
  {
    empId: { type: String, unique: true },
    todo: [Item],
    done: [Item],
  },
  { collection: "employees" }
);

//Export this so we can access this file from our server file where we create our APIs.
module.exports = mongoose.model("Employee", employeeSchema);
