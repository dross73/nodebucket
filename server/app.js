/*
============================================
; Title: app.js
; Author: Dan Ross
; Date: 20 March 2021
; Modified By: Dan Ross
; Description: Main app entry for NodeBucket server.
;===========================================
*/

/**
 * Require statements
 */
const express = require('express');
const cors = require('cors');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
require("dotenv").config();

const EmployeeAPI = require('./routes/employee-route');

/**
 * App configurations
 */
const app = express();

// CORS configuration
const corsOptions = {
  origin: 'https://nodebucket-front-end.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // preflight
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Serve static Angular files
app.use(express.static(path.join(__dirname, '../dist/nodebucket')));
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')));

/**
 * Variables
 */
const port = process.env.PORT || 3000;

const conn = `mongodb+srv://bcrs_user:${process.env.MONGO_ATLAS_PW}@bcrs-cluster.qwxox9f.mongodb.net/nodebucket?retryWrites=true&w=majority&appName=bcrs-cluster`;

/**
 * Database connection
 */
mongoose.connect(conn)
  .then(() => {
    console.debug('✅ Connection to MongoDB was successful');
  })
  .catch(err => {
    console.error(`❌ MongoDB connection error: ${err.message}`);
  });

/**
 * Route imports/resources
 */
app.use('/api/employees', EmployeeAPI);

/**
 * Create and start server
 */
http.createServer(app).listen(port, () => {
  console.log(`🚀 Application started and listening on port: ${port}`);
});
