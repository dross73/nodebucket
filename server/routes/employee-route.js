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
 * GET /api/employees/:empId
 */
router.get('/:empId', async (req, res) => {
  try {
    const employee = await Employee.findOne({ empId: req.params.empId });

    if (employee) {
      res.status(200).json(new BaseResponse("200", "Success", employee).toObject());
    } else {
      res.status(200).json(new BaseResponse("200", "Invalid employeeId", null).toObject());
    }
  } catch (err) {
    res.status(500).json(new BaseResponse("500", `Internal Server Error: ${err.message}`, null).toObject());
  }
});

/**
 * POST /api/employees/:empId/tasks
 */
router.post("/:empId/tasks", async (req, res) => {
  try {
    const employee = await Employee.findOne({ empId: req.params.empId });

    if (employee) {
      const item = { text: req.body.text };
      employee.todo.push(item);

      const updatedEmployee = await employee.save();
      res.status(200).json(new BaseResponse("200", "Task added", updatedEmployee).toObject());
    } else {
      res.status(200).json(new BaseResponse("200", "Invalid employeeId", null).toObject());
    }
  } catch (err) {
    res.status(500).json(new BaseResponse("500", `Internal Server Error: ${err.message}`, null).toObject());
  }
});

/**
 * GET /api/employees/:empId/tasks
 */
router.get("/:empId/tasks", async (req, res) => {
  try {
    const employee = await Employee.findOne(
      { empId: req.params.empId },
      "empId todo done"
    );

    if (employee) {
      res.status(200).json(new BaseResponse("200", "Query successful", employee).toObject());
    } else {
      res.status(200).json(new BaseResponse("200", "Invalid employeeId", null).toObject());
    }
  } catch (err) {
    res.status(500).json(new BaseResponse("500", `Internal Server Error: ${err.message}`, null).toObject());
  }
});

/**
 * PUT /api/employees/:empId/tasks
 */
router.put("/:empId/tasks", async (req, res) => {
  try {
    const employee = await Employee.findOne({ empId: req.params.empId });

    if (employee) {
      employee.todo = req.body.todo;
      employee.done = req.body.done;

      const updatedEmployee = await employee.save();
      res.status(200).json(new BaseResponse("200", "Tasks updated", updatedEmployee).toObject());
    } else {
      res.status(200).json(new BaseResponse("200", "Invalid employeeId", null).toObject());
    }
  } catch (err) {
    res.status(500).json(new BaseResponse("500", `Internal Server Error: ${err.message}`, null).toObject());
  }
});

/**
 * DELETE /api/employees/:empId/tasks/:taskId
 */
router.delete("/:empId/tasks/:taskId", async (req, res) => {
  try {
    const employee = await Employee.findOne({ empId: req.params.empId });

    if (!employee) {
      return res.status(200).json(new BaseResponse("200", "Invalid employeeId", null).toObject());
    }

    const todoItem = employee.todo.id(req.params.taskId);
    const doneItem = employee.done.id(req.params.taskId);

    if (todoItem) {
      todoItem.remove();
    } else if (doneItem) {
      doneItem.remove();
    } else {
      return res.status(200).json(new BaseResponse("200", "Invalid taskId", null).toObject());
    }

    const updatedEmployee = await employee.save();
    res.status(200).json(new BaseResponse("200", "Task deleted", updatedEmployee).toObject());
  } catch (err) {
    res.status(500).json(new BaseResponse("500", `Internal Server Error: ${err.message}`, null).toObject());
  }
});

module.exports = router;
