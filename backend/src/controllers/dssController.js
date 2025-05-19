const Student = require('../models/Student');
const { calculateSAWRanking } = require('../services/sawServices');

exports.getDSSRanking = async (req, res) => {
  const { semester, className } = req.query;

  const filter = {};
  if (semester) filter.semester = semester;
  if (className) filter.className = className;

  try {
    const students = await Student.find(filter);
    if (students.length === 0) {
      return res.status(404).json({ message: 'Tidak ada siswa ditemukan untuk filter tersebut.' });
    }

    const ranking = calculateSAWRanking(students);
    res.json(ranking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
