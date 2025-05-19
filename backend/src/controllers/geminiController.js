const Student = require('../models/Student');
const axios = require('axios');

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
const headers = { 'Content-Type': 'application/json' };

exports.rekomendasiSiswaTerbawah = async (req, res) => {
  try {
    const { semester, className, count = 5 } = req.query;
    const filter = {};
    if (semester) filter.semester = semester;
    if (className) filter.className = className;

    const Student = require('../models/Student');
    const { calculateSAWRanking } = require('../services/sawService');
    const students = await Student.find(filter);
    if (students.length === 0) return res.status(404).json({ message: 'Tidak ada siswa ditemukan.' });

    const ranked = calculateSAWRanking(students);
    const lowest = ranked.slice(-count);

    const summary = lowest.map(s => `- ${s.name} (NIS: ${s.nis}) skor akhir: ${s.finalScore.toFixed(3)}`).join('\n');

    const prompt = `Berikut adalah daftar siswa dengan skor akademik terendah:\n${summary}\n\nRekomendasikan tindakan konkret yang bisa diambil wali kelas untuk membantu mereka secara akademik dan psikologis.`;

    const geminiRes = await axios.post(GEMINI_URL, {
      contents: [{ parts: [{ text: prompt }] }]
    }, { headers });

    const text = geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Tidak ada rekomendasi.';

    res.json({ siswaTerbawah: lowest, rekomendasi: text });

  } catch (err) {
    res.status(500).json({ message: 'Gagal mendapatkan rekomendasi siswa terbawah', error: err.message });
  }
};

exports.analisisSiswa = async (req, res) => {
  try {
    const siswa = await Student.findById(req.params.id).populate('homeroomTeacher', 'name');
    if (!siswa) return res.status(404).json({ message: 'Siswa tidak ditemukan' });

    const nilai = Object.entries(siswa.subjects)
      .map(([mapel, { knowledge, skill }]) => `- ${mapel}: pengetahuan ${knowledge}, keterampilan ${skill}`)
      .join('\n');

    const prompt = `Analisis kekuatan dan kelemahan siswa berikut:\nNama: ${siswa.name}\nKelas: ${siswa.className}\nWali Kelas: ${siswa.homeroomTeacher.name}\nNilai:\n${nilai}\n\nBerikan evaluasi dan saran pembinaan.`;

    const geminiRes = await axios.post(GEMINI_URL, {
      contents: [{ parts: [{ text: prompt }] }]
    }, { headers });

    const analisis = geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Tidak tersedia.';

    res.json({ analisis });
  } catch (err) {
    res.status(500).json({ message: 'Gagal melakukan analisis siswa', error: err.message });
  }
};

exports.pesanUntukOrangtua = async (req, res) => {
  try {
    const siswa = await Student.findById(req.params.id).populate('homeroomTeacher', 'name');
    if (!siswa) return res.status(404).json({ message: 'Siswa tidak ditemukan' });

    const nilai = Object.entries(siswa.subjects)
      .map(([mapel, { knowledge, skill }]) => `- ${mapel}: pengetahuan ${knowledge}, keterampilan ${skill}`)
      .join('\n');

    const prompt = `Buat pesan pendek dan sopan dari wali kelas ${siswa.homeroomTeacher.name} untuk orang tua siswa:\nNama: ${siswa.name}, Kelas: ${siswa.className}\nNilai:\n${nilai}\n\nIsi pesan harus jujur, empatik, dan mengajak kerja sama.`;

    const geminiRes = await axios.post(GEMINI_URL, {
      contents: [{ parts: [{ text: prompt }] }]
    }, { headers });

    const pesan = geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Tidak tersedia.';

    res.json({ pesan });
  } catch (err) {
    res.status(500).json({ message: 'Gagal membuat pesan orang tua', error: err.message });
  }
};
