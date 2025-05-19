const Student = require('../models/Students');
const fs = require('fs');
const csv = require('csv-parser');

exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllStudents = async (req, res) => {
  const students = await Student.find().populate('homeroomTeacher', 'name nip');
  res.json(students);
};

exports.getStudentById = async (req, res) => {
  const student = await Student.findById(req.params.id).populate('homeroomTeacher', 'name nip');
  if (!student) return res.status(404).json({ message: 'Siswa tidak ditemukan' });
  res.json(student);
};

exports.updateStudent = async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Siswa tidak ditemukan' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  const deleted = await Student.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Siswa tidak ditemukan' });
  res.json({ message: 'Siswa dihapus' });
};

exports.importFromCSV = async (req, res) => {
  const filePath = req.file.path;
  const students = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      // Sesuaikan field csv sesuai dengan struktur
      const subjects = {
        agama: { knowledge: Number(row.agama_p), skill: Number(row.agama_k) },
        ppkn: { knowledge: Number(row.ppkn_p), skill: Number(row.ppkn_k) },
        bahasaIndonesia: { knowledge: Number(row.bindo_p), skill: Number(row.bindo_k) },
        bahasaInggris: { knowledge: Number(row.bing_p), skill: Number(row.bing_k) },
        matematikaUmum: { knowledge: Number(row.mtk_p), skill: Number(row.mtk_k) },
        sejarahIndonesia: { knowledge: Number(row.sejarah_p), skill: Number(row.sejarah_k) },
        seniBudaya: { knowledge: Number(row.seni_p), skill: Number(row.seni_k) },
        penjasorkes: { knowledge: Number(row.penjas_p), skill: Number(row.penjas_k) },
        prakaryaKewirausahaan: { knowledge: Number(row.kwu_p), skill: Number(row.kwu_k) },
        bahasaDaerah: { knowledge: Number(row.bahda_p), skill: Number(row.bahda_k) }
      };

      students.push({
        nis: row.nis,
        name: row.name,
        semester: row.semester,
        className: row.className,
        homeroomTeacher: row.homeroomTeacher, // harus _id guru valid
        subjects
      });
    })
    .on('end', async () => {
      try {
        const inserted = await Student.insertMany(students);
        res.status(201).json({ message: 'Import berhasil', inserted });
      } catch (err) {
        res.status(400).json({ message: 'Gagal menyimpan data', error: err.message });
      } finally {
        fs.unlinkSync(filePath); // hapus file setelah diproses
      }
    });
};
