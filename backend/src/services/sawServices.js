function calculateSAWRanking(students) {
  const weights = {
    agama: 0.08,
    ppkn: 0.07,
    bahasaIndonesia: 0.10,
    bahasaInggris: 0.10,
    matematikaUmum: 0.15,
    sejarahIndonesia: 0.07,
    seniBudaya: 0.05,
    penjasorkes: 0.05,
    prakaryaKewirausahaan: 0.08,
    bahasaDaerah: 0.05
  };

  const studentScores = students.map((s) => {
    const scores = {};
    for (let subject in weights) {
      const nilai = s.subjects[subject];
      scores[subject] = (nilai.knowledge + nilai.skill) / 2;
    }
    return { ...s._doc, scores };
  });

  const maxScores = {};
  for (let subject in weights) {
    maxScores[subject] = Math.max(...studentScores.map(s => s.scores[subject]));
  }

  const scored = studentScores.map((s) => {
    let finalScore = 0;
    for (let subject in weights) {
      const r = s.scores[subject] / (maxScores[subject] || 1);
      finalScore += weights[subject] * r;
    }
    return { ...s, finalScore };
  });

  const ranked = scored
    .sort((a, b) => b.finalScore - a.finalScore)
    .map((s, i) => ({ ...s, rank: i + 1 }));

  return ranked;
}

module.exports = { calculateSAWRanking };
