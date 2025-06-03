const express = require("express");
const {
  registerTeacher,
  loginTeacher,
} = require("../controllers/teacherController");
const router = express.Router();

router.post("/register", registerTeacher);
router.post("/login", loginTeacher);

module.exports = router;
