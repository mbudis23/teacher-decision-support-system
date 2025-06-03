const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const connectMongoDB = require("./configs/mongoDB");
const healthRoutes = require("./routes/healthRoutes");
const teacherRoutes = require("./routes/teacherRoutes");

const app = express();
connectMongoDB();

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // alamat frontend kamu
    credentials: true, // agar cookie dikirim
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", healthRoutes);
app.use("/api/teachers", teacherRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

module.exports = app;
