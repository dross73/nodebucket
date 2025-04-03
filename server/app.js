/*
============================================
; Title: app.js
; Author: Dan Ross
; Date: 20 March 2021
; Modified By: Dan Ross
; Description: This is the our main app.js file.
;===========================================
*//**
 * Require statements
 */
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const path = require('path');
const mongoose = require('mongoose');
require("dotenv").config();

const EmployeeAPI = require('./routes/employee-route');

/**
 * App configurations
 */
let app = express();
app.use(express.json());
app.use(express.urlencoded({'extended': true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist/nodebucket')));
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')));
const cors = require('cors');
app.use(cors());
/**
 * Variables
 */
const port = process.env.PORT || 3000; // server port

const conn =
  "mongodb+srv://bcrs_user:" +
  process.env.MONGO_ATLAS_PW +
  "@bcrs-cluster.qwxox9f.mongodb.net/nodebucket?retryWrites=true&w=majority&appName=bcrs-cluster";
/**
 * Database connection
 */
mongoose.connect(conn, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => {
  console.debug(`Connection to the database instance was successful`);
}).catch(err => {
  console.log(`MongoDB Error: ${err.message}`)
}); // end mongoose connection

/**
 * Route imports/resources
 */

app.use('/api/employees', EmployeeAPI);


/**
 * Create and start server
 */
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`)
}); // end http create server function
