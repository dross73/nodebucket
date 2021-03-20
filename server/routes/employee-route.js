/*
============================================
; Title: employee-route.js
; Author: Dan Ross
; Date: 20 March 2021
; Modified By: Dan Ross
; Description: This is the employee route file.
;===========================================
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

router.get("/:empId", async (req, res) => {
  try {

    Employee.findOne({ empId: req.params.empId }, function (err, employee) {

      if (err) {

        console.log(err);

        const mongoDBErrorResponse = new BaseResponse(
          '500',
          `MongoDB Native Error: ${err}`,
          null
        );
        res.json(mongoDBErrorResponse.toObject());

      } else {

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
