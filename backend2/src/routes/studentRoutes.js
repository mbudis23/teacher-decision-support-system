const express = require("express");
const router = express.Router();
const {
  getAllStudents,
  createStudent,
  rankStudents,
} = require("../controllers/studentController");
const verifyTeacher = require("../middlewares/verifyTeacher");

router.get("/", verifyTeacher, getAllStudents);
router.post("/", verifyTeacher, createStudent); // optional: create new student
router.get("/ranking-desc", verifyTeacher, rankStudents);

module.exports = router;
