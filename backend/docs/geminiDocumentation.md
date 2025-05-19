# 🤖 API Documentation – Gemini Integration `/api/`

Endpoint yang memanfaatkan **Gemini API** untuk membantu wali kelas dalam membuat rekomendasi, analisis siswa, dan komunikasi dengan orang tua.

---

## 🔗 GET `/api/rekomendasi`

**Deskripsi:** Menghasilkan rekomendasi tindakan untuk siswa dengan skor terendah berdasarkan metode SAW.

### Query Parameters

- `semester` (opsional): Semester siswa
- `className` (opsional): Nama kelas
- `count` (opsional): Jumlah siswa terbawah yang dianalisis (default: 5)

### Response

```json
{
  "siswaTerbawah": [
    { "name": "Siswa A", "finalScore": 0.643, "rank": 28 },
    ...
  ],
  "rekomendasi": "Wali kelas disarankan untuk mengadakan sesi konseling pribadi..."
}
```

---

## 🤔 GET `/api/analisis-siswa/:id`

**Deskripsi:** Menghasilkan analisis personal kekuatan dan kelemahan akademik berdasarkan semua mata pelajaran siswa.

### Path Parameter

- `:id`: ID siswa (MongoDB ObjectId)

### Response

```json
{
  "analisis": "Siswa menunjukkan kekuatan dalam Bahasa Inggris..."
}
```

---

## 💬 GET `/api/pesan-orangtua/:id`

**Deskripsi:** Menghasilkan pesan pribadi untuk orang tua berdasarkan kinerja akademik siswa secara menyeluruh.

### Path Parameter

- `:id`: ID siswa

### Response

```json
{
  "pesan": "Kepada Orang Tua Bintang Pramudya, kami ingin menyampaikan apresiasi atas..."
}
```

---

## ⚠️ Error Format

Semua error menggunakan format standar berikut:

```json
{
  "message": "Penjelasan error",
  "error": "Detail error opsional"
}
```

---

**📂 Versi:** 1.0
**🗕️ Terakhir diperbarui:** 20 Mei 2025
**👨‍💻 Developer:** Tim Backend SPK Siswa
