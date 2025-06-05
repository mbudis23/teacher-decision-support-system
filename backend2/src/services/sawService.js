function calculateSAWRanking(students) {
  if (!students || students.length === 0) return [];

  // Ekstraksi nilai mentah
  const grades = students.map((s) => s.grade);
  const attendance = students.map((s) => s.attendance);
  const violations = students.map((s) => s.violations);

  // Tentukan nilai maksimum (untuk benefit) dan minimum (untuk cost)
  const maxGrade = Math.max(...grades);
  const maxAttendance = Math.max(...attendance);
  const minViolations = Math.min(...violations);

  // Bobot kriteria (total = 1.0)
  const weights = {
    grade: 0.4, // benefit
    attendance: 0.3, // benefit
    violations: 0.3, // cost
  };

  const ranked = students.map((s) => {
    // Normalisasi
    const normGrade = s.grade / (maxGrade || 1); // benefit
    const normAttendance = s.attendance / (maxAttendance || 1); // benefit

    // Hindari pembagian dengan nol: tambahkan +1 pada pembagi untuk cost
    const normViolations =
      1 / (s.violations + 1) / (1 / (minViolations + 1) || 1); // cost

    // Skor akhir SAW
    const finalScore =
      weights.grade * normGrade +
      weights.attendance * normAttendance +
      weights.violations * normViolations;

    return {
      ...s.toObject(),
      finalScore: parseFloat(finalScore.toFixed(3)),
    };
  });

  // Urutkan ascending (terendah = prioritas tertinggi untuk dibantu)
  ranked.sort((a, b) => a.finalScore - b.finalScore);
  return ranked;
}

module.exports = { calculateSAWRanking };
