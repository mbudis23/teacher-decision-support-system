const Student = require("../models/students");
const axios = require("axios");

// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
const headers = { "Content-Type": "application/json" };

const weights = {
  grade: 0.3,
  attendance: 0.3,
  violations: 0.4,
};

function normalize(arr, isBenefit = true) {
  const max = Math.max(...arr);
  let min = Math.min(...arr);

  // Hindari pembagian nol
  if (min === 0) min = 1;

  return arr.map((val) => {
    // Tambahan keamanan jika ada nilai nol
    const safeVal = val === 0 ? 1 : val;

    if (isBenefit) {
      return max === 0 ? 0 : val / (max || 1);
    } else {
      return safeVal === 0 ? 0 : min / safeVal;
    }
  });
}

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

const rankStudents = async (req, res) => {
  try {
    const { className, limit } = req.query;
    const query = className ? { className } : {};

    const students = await Student.find(query);
    if (students.length === 0) {
      return res.status(404).json({ message: "No student data found" });
    }

    const grades = students.map((s) => s.grade || 0);
    const attendance = students.map((s) => s.attendance || 0);
    const violations = students.map((s) => s.violations || 0);

    const normGrades = normalize(grades, false);
    const normAttendance = normalize(attendance, false);
    const normViolations = normalize(violations, false);

    const ranked = students.map((student, i) => {
      const score =
        weights.grade * normGrades[i] +
        weights.attendance * normAttendance[i] +
        weights.violations * normViolations[i];
      return {
        student,
        score: isNaN(score) || !isFinite(score) ? 0 : score,
      };
    });

    ranked.sort((a, b) => a.score - b.score);
    const concernLimit = parseInt(limit) || 3;
    const topConcerns = ranked.slice(0, concernLimit);

    const prompt = `
Berikut adalah ${concernLimit} siswa dengan performa terendah:
${topConcerns
  .map(
    (s, i) =>
      `${i + 1}. ${s.student.name} (Nilai: ${s.student.grade}, Hadir: ${
        s.student.attendance
      }, Pelanggaran: ${s.student.violations})`
  )
  .join("\n")}

Sebagai guru, bagaimana pendekatan terbaik untuk membimbing mereka secara edukatif dan psikologis?
`;

    const geminiRes = await axios.post(
      GEMINI_URL,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      { headers }
    );

    const recommendation =
      geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Rekomendasi tidak tersedia.";

    res.json({
      className: className || "All Classes",
      rankedStudents: ranked.map((r) => ({
        name: r.student.name,
        className: r.student.className,
        score: r.score.toFixed(3),
      })),
      recommendation,
    });
  } catch (error) {
    console.error("Error in SAW ranking:", error);
    res.status(500).json({
      message: "Gagal memproses peringkat siswa dan rekomendasi Gemini",
      error: error.message,
    });
  }
};

module.exports = {
  getAllStudents,
  createStudent,
  rankStudents,
};
