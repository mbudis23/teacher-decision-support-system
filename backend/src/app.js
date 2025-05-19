const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');

const teacherRoutes = require('./routes/teacherRoutes')
const studentRoutes = require('./routes/studentRoutes');
const dssRoutes = require('./routes/dssRoutes');
const geminiRoutes = require('./routes/geminiRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser()); 


app.use('/api/teachers', teacherRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/dss', dssRoutes);
app.use('/api/gemini', geminiRoutes);

module.exports = app;
