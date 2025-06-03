const express = require("express");
const router = express.Router();
const {
  getAllStudents,
  createStudent,
} = require("../controllers/studentController");
const verifyTeacher = require("../middlewares/verifyTeacher");

router.get("/", verifyTeacher, getAllStudents);
router.post("/", verifyTeacher, createStudent); // optional: create new student

module.exports = router;
