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

/**
 * API CreateTask
 */

router.post("/:empId/tasks", async (req, res) => {
  //Catch any server level exceptions that may occur in the application.
  try {
    //Retrieve the employee record that we're looking for.
    Employee.findOne({ 'empId': req.params.empId }, function (err, employee) {
      if (err) {
        console.log(err);

        const createTaskMongoDbError = new BaseResponse(
          '500',
          `MongoDb Exception: ${err.message}`,
          null
        );

        res.status(500).send(createTaskMongoDbError.toObject());
      } else {
        console.log(employee);

        const item = {
          text: req.body.text,
        };
        //Push item to todo array
        employee.todo.push(item);

        employee.save(function (err, updatedEmployee) {
          if (err) {
            console.log(err);

            const createTaskOnSaveMongoDbError = new BaseResponse(
              '500',
              `MongoDB onSave() exception: ${err.message}`,
              null
            );

            res.status(500).send(createTaskOnSaveMongoDbError.toObject());
          } else {
            console.log(updatedEmployee);

            const createTaskOnSaveSuccessResponse = new BaseResponse(
              '200',
              'Successful query',
              updatedEmployee
            );

            res.status(200).send(createTaskOnSaveSuccessResponse.toObject());
          }
        });
      }
    });
  } catch (e) {
    console.log(e);

    const createTaskCatchException = new BaseResponse(
      '500',
      `Internal Server Error: ${e.message}`,
      null
    );

    res.status(500).send(createTaskCatchException.toObject());
  }
});

module.exports = router;
