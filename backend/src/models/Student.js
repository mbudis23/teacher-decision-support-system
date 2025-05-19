const mongoose = require('mongoose');

const nilaiSchema = new mongoose.Schema({
  knowledge: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  skill: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  }
}, { _id: false });

const subjectSchema = new mongoose.Schema({
  agama: { type: nilaiSchema, required: true },
  ppkn: { type: nilaiSchema, required: true },
  bahasaIndonesia: { type: nilaiSchema, required: true },
  bahasaInggris: { type: nilaiSchema, required: true },
  matematikaUmum: { type: nilaiSchema, required: true },
  sejarahIndonesia: { type: nilaiSchema, required: true },
  seniBudaya: { type: nilaiSchema, required: true },
  penjasorkes: { type: nilaiSchema, required: true },
  prakaryaKewirausahaan: { type: nilaiSchema, required: true },
  bahasaDaerah: { type: nilaiSchema, required: true }
}, { _id: false });

const studentSchema = new mongoose.Schema({
  nis: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  semester: {
    type: String,
    required: true,
    trim: true,
  },
  className: {
    type: String,
    required: true,
    trim: true,
  },
  homeroomTeacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  },
  subjects: {
    type: subjectSchema,
    required: true
  }
}, { timestamps: true });

// Kombinasi NIS + Semester harus unik
studentSchema.index({ nis: 1, semester: 1 }, { unique: true });

module.exports = mongoose.model('Student', studentSchema);
