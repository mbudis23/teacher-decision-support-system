const express = require('express');
const router = express.Router();
const {
  rekomendasiSiswaTerbawah,
  analisisSiswa,
  pesanUntukOrangtua
} = require('../controllers/geminiController');

router.get('/rekomendasi', rekomendasiSiswaTerbawah);
router.get('/analisis-siswa/:id', analisisSiswa);
router.get('/pesan-orangtua/:id', pesanUntukOrangtua);

module.exports = router;
