const jwt = require("jsonwebtoken");
const Teacher = require("../models/teacher");

const verifyTeacher = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(401).json({ message: "Unauthorized. No token." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const teacher = await Teacher.findById(decoded.id).select("-password");

    if (!teacher)
      return res.status(403).json({ message: "Forbidden. Teacher not found." });

    req.user = teacher;
    next();
  } catch (err) {
    console.error("verifyTeacher error:", err.message);
    return res.status(403).json({ message: "Forbidden. Invalid token." });
  }
};

module.exports = verifyTeacher;
