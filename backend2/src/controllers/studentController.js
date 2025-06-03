const Student = require("../models/students");

// GET all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Failed to fetch students" });
  }
};

// POST create new student (optional for seeding/testing)
const createStudent = async (req, res) => {
  const { name, className, email, gender, grade, attendance, violations } =
    req.body;

  // Manual validation
  if (
    !name ||
    !className ||
    !email ||
    !gender ||
    grade == null ||
    attendance == null ||
    violations == null
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (!["Male", "Female"].includes(gender)) {
    return res
      .status(400)
      .json({ message: "Gender must be 'Male' or 'Female'." });
  }

  if (typeof grade !== "number" || grade < 0 || grade > 100) {
    return res
      .status(400)
      .json({ message: "Grade must be a number between 0 and 100." });
  }

  if (typeof attendance !== "number" || attendance < 0 || attendance > 100) {
    return res
      .status(400)
      .json({ message: "Attendance must be a number between 0 and 100." });
  }

  if (typeof violations !== "number" || violations < 0) {
    return res
      .status(400)
      .json({ message: "Violations must be a non-negative number." });
  }

  try {
    // Check if a student with the same email and className exists
    const existing = await Student.findOne({ email, className });
    if (existing) {
      return res.status(409).json({
        message: "A student with this email and class already exists.",
      });
    }

    const newStudent = new Student({
      name,
      className,
      email,
      gender,
      grade,
      attendance,
      violations,
    });

    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    console.error("Error creating student:", error);
    res
      .status(500)
      .json({ message: "Server error. Failed to create student." });
  }
};

module.exports = {
  getAllStudents,
  createStudent,
};
