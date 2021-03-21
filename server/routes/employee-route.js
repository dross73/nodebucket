/*
============================================
; Title: employee-route.js
; Author: Dan Ross
; Date: 20 March 2021
; Modified By: Dan Ross
; Description: This is the employee route file.
;===========================================
*/
/**
 * These are our require statements.
 */
const express = require("express");
const Employee = require("../db-models/employee");
const BaseResponse = require("../service/base-response");

const router = express.Router();


/**
 * API findEmployeeById
 * @param empId
 * @returns Employee document or null
 */
//These will go through http://localhost:3000/api/employees/:empId

router.get("/:empId", async (req, res) => {
  try {

    Employee.findOne({ empId: req.params.empId }, function (err, employee) {
      //Do this if there's an error.
      if (err) {

        console.log(err);

        const mongoDBErrorResponse = new BaseResponse(
          '500',
          `MongoDB Native Error: ${err}`,
          null
        );
        res.json(mongoDBErrorResponse.toObject());

      } else {
        //Do this for successful query.
        console.log(employee);

        const employeeResponse = new BaseResponse(
          '200',
          'Successful query',
          employee
        );

        res.json(employeeResponse.toObject());
      }
    });

  } catch (e) {

    console.log(e);

    const findEmployeeCatchError = new BaseResponse(
      '500',
      `Internal Server Error: ${e.message}`,
      null
    );

    res.json(findEmployeeCatchError.toObject());
  }
});

module.exports = router;
