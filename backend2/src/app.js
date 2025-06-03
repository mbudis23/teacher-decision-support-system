const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectMongoDB = require("./configs/mongoDB");

const app = express();
connectMongoDB();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser);
// app.use('/api', routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

module.exports = app;
