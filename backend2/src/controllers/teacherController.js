const jwt = require("jsonwebtoken");
const Teacher = require("../models/teacher");

exports.registerTeacher = async (req, res) => {
  const { name, school, email, password } = req.body;

  // Validate input
  if (!name || !school || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if email is already registered
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ message: "Email is already in use." });
    }

    // Create new teacher account
    const newTeacher = await Teacher.create({ name, school, email, password });

    res.status(201).json({
      message: "Registration successful.",
      teacher: {
        id: newTeacher._id,
        name: newTeacher.name,
        school: newTeacher.school,
        email: newTeacher.email,
      },
    });
  } catch (error) {
    console.error("Error during teacher registration:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

exports.loginTeacher = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await teacher.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Generate JWT token (or you can use teacher._id as session token)
    const token = jwt.sign(
      { id: teacher._id, name: teacher.name },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1d" }
    );

    // Set token as HTTP-only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .status(200)
      .json({
        message: "Login successful.",
        teacher: {
          id: teacher._id,
          name: teacher.name,
          school: teacher.school,
          email: teacher.email,
        },
      });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
