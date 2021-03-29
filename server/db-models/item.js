/*
============================================
; Title: item.js
; Author: Dan Ross
; Date: 20 March 2021
; Modified By: Dan Ross
; Description: This is our item schema.
;===========================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let itemSchema = new Schema({
  text: { type: String },
});

module.exports = itemSchema;
