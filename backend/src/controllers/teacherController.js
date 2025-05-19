const Teacher = require('../models/Teacher');
const generateToken = require('../utils/generateToken');

exports.register = async (req, res) => {
  const { nip, name, password } = req.body;

  try {
    const existing = await Teacher.findOne({ nip });
    if (existing) return res.status(400).json({ message: 'NIP sudah terdaftar' });

    const teacher = await Teacher.create({ nip, name, password });
    const token = generateToken(teacher._id);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ message: 'Registrasi berhasil', teacher: { id: teacher._id, nip: teacher.nip, name: teacher.name } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { nip, password } = req.body;

  try {
    const teacher = await Teacher.findOne({ nip });
    if (!teacher || !(await teacher.matchPassword(password))) {
      return res.status(401).json({ message: 'NIP atau password salah' });
    }

    const token = generateToken(teacher._id);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ message: 'Login berhasil', teacher: { id: teacher._id, nip: teacher.nip, name: teacher.name } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token').json({ message: 'Logout berhasil' });
};

exports.profile = (req, res) => {
  const { id, nip, name } = req.teacher;
  res.json({ id, nip, name });
};
