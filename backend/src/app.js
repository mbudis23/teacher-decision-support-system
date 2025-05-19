const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');

const teacherRoutes = require('./routes/teacherRoutes')

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser()); 


app.use('api/teachers', teacherRoutes);
// const studentRoutes = require('./routes/studentRoutes');
// app.use('/api/students', studentRoutes);

module.exports = app;
