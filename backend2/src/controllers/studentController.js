const Student = require("../models/students");
const axios = require("axios");
const { calculateSAWRanking } = require("../services/sawService");

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
const headers = { "Content-Type": "application/json" };

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    const ranked = calculateSAWRanking(students);

    const withSWA = ranked.map((s) => ({
      ...s,
      SWA_Score: s.finalScore,
    }));

    res.status(200).json(withSWA);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Failed to fetch students" });
  }
};

const createStudent = async (req, res) => {
  const { name, className, email, gender, grade, attendance, violations } =
    req.body;

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

const getStudentRankLow = async (req, res) => {
  try {
    const { className } = req.query;

    if (!className) {
      return res.status(400).json({
        message: "className harus disertakan sebagai query parameter.",
      });
    }

    const students = await Student.find({ className });

    if (students.length === 0) {
      return res.status(404).json({
        message: "Tidak ada siswa ditemukan pada kelas tersebut.",
      });
    }

    // --- Normalisasi dan Pembobotan SAW ---
    const weights = {
      grade: 0.5, // benefit
      attendance: 0.3, // benefit
      violations: 0.2, // cost
    };

    // Nilai maksimum dan minimum
    const maxGrade = Math.max(...students.map((s) => s.grade));
    const maxAttendance = Math.max(...students.map((s) => s.attendance));
    const minViolations = Math.min(...students.map((s) => s.violations));

    const scoredStudents = students.map((s) => {
      const normGrade = s.grade / (maxGrade || 1); // benefit
      const normAttendance = s.attendance / (maxAttendance || 1); // benefit
      const normViolations =
        minViolations === 0
          ? 1 / (s.violations + 1) // cost, hindari pembagian 0
          : minViolations / (s.violations + 1); // cost + handling 0

      const finalScore =
        normGrade * weights.grade +
        normAttendance * weights.attendance +
        normViolations * weights.violations;

      return {
        ...s.toObject(),
        finalScore: Number(finalScore.toFixed(4)),
      };
    });

    const sorted = [...scoredStudents].sort(
      (a, b) => a.finalScore - b.finalScore
    );

    const daftarDetail = sorted
      .map((s, i) => {
        return `${i + 1}. Nama: ${s.name}
   - Kelas: ${s.className}
   - Nilai Akademik (Grade): ${s.grade}
   - Kehadiran: ${s.attendance}%
   - Jumlah Pelanggaran: ${s.violations}
   - Skor SAW: ${s.finalScore}`;
      })
      .join("\n\n");

    const prompt = `Saya adalah seorang guru wali kelas dan ingin memberikan bimbingan kepada seluruh siswa. Berikut data siswa diurutkan berdasarkan skor SAW yang mempertimbangkan nilai akademik, kehadiran, dan pelanggaran:

${daftarDetail}

Tolong berikan satu rekomendasi singkat dan personal untuk masing-masing siswa, agar saya bisa membantu mereka secara akademik, sosial, atau disiplin. Format hasil seperti:

1. Nama Siswa - Rekomendasi guru`;

    const geminiRes = await axios.post(
      GEMINI_URL,
      { contents: [{ parts: [{ text: prompt }] }] },
      { headers }
    );

    const rekomendasiText =
      geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const rekomendasiList = rekomendasiText
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line) => {
        const match = line.match(/^\d+\.\s*(.*?)\s*[-–—]\s*(.*)$/);
        if (match) {
          return {
            name: match[1].trim(),
            recommendation: match[2].trim(),
          };
        }
        return null;
      })
      .filter(Boolean);

    const finalResult = sorted.map((s) => {
      const rec = rekomendasiList.find(
        (r) => r.name.toLowerCase() === s.name.toLowerCase()
      );
      return {
        name: s.name,
        className: s.className,
        grade: s.grade,
        attendance: s.attendance,
        violations: s.violations,
        score: s.finalScore,
        recommendation: rec?.recommendation || "Tidak ada rekomendasi.",
      };
    });

    res.json(finalResult);
  } catch (error) {
    console.error("Gagal mengambil data rekomendasi siswa:", error);
    res.status(500).json({
      message: "Terjadi kesalahan server.",
      error: error.message,
    });
  }
};

module.exports = {
  getAllStudents,
  createStudent,
  getStudentRankLow,
};
