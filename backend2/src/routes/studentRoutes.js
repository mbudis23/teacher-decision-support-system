const express = require("express");
const router = express.Router();
const {
  getAllStudents,
  createStudent,
  getStudentRankLow,
} = require("../controllers/studentController");
const verifyTeacher = require("../middlewares/verifyTeacher");

router.get("/", verifyTeacher, getAllStudents);
router.post("/", verifyTeacher, createStudent); // optional: create new student
router.get("/rank-low-recomendations", verifyTeacher, getStudentRankLow);

module.exports = router;
