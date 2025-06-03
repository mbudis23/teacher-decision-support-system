const express = require("express");
const {
  registerTeacher,
  loginTeacher,
  getProfile,
  updateProfile,
  updatePassword,
} = require("../controllers/teacherController");
const router = express.Router();
const verifyTeacher = require("../middlewares/verifyTeacher");

router.post("/register", registerTeacher);
router.post("/login", loginTeacher);
router.get("/profile", verifyTeacher, getProfile);
router.put("/profile", verifyTeacher, updateProfile);
router.put("/password", verifyTeacher, updatePassword);

module.exports = router;
