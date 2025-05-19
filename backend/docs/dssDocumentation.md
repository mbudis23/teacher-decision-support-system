# 🧰 API Documentation – `/api/dss/`

Endpoint untuk sistem **Decision Support System (DSS)** yang menghitung **ranking siswa** menggunakan metode **Simple Additive Weighting (SAW)** berdasarkan nilai-nilai semua mata pelajaran dengan pembobotan.

---

## 🔢 GET `/api/dss/ranking`

**Deskripsi:** Mengambil hasil ranking siswa berdasarkan nilai seluruh mata pelajaran menggunakan metode SAW.

### Query Parameters (Opsional)

- `semester`: filter berdasarkan semester (contoh: `2`)
- `className`: filter berdasarkan nama kelas (contoh: `XI IPA 2`)

### Contoh Request

```
GET /api/dss/ranking?semester=2&className=XI IPA 2
```

### Response Body

```json
[
  {
    "_id": "664f123...",
    "name": "Bintang Pramudya",
    "nis": "20240101",
    "className": "XI IPA 2",
    "semester": "2",
    "scores": {
      "agama": 85.5,
      "matematikaUmum": 92.0,
      ...
    },
    "finalScore": 0.925,
    "rank": 1
  },
  ...
]
```

### Mekanisme SAW

- Nilai rata-rata dari setiap mata pelajaran = (`knowledge` + `skill`) / 2
- Dilakukan normalisasi terhadap skor tiap mata pelajaran (semua kriteria adalah **benefit**):

  - `rij = xij / xjmax`

- Bobot tiap mata pelajaran digunakan untuk menghitung skor akhir:

  - `Vi = Σ(wj * rij)`

### Bobot Mata Pelajaran

| Mata Pelajaran           | Bobot    |
| ------------------------ | -------- |
| Agama                    | 0.08     |
| PPKn                     | 0.07     |
| Bahasa Indonesia         | 0.10     |
| Bahasa Inggris           | 0.10     |
| Matematika Umum          | 0.15     |
| Sejarah Indonesia        | 0.07     |
| Seni Budaya              | 0.05     |
| Penjasorkes              | 0.05     |
| Prakarya & Kewirausahaan | 0.08     |
| Bahasa Daerah            | 0.05     |
| **Total**                | **1.00** |

---

## ⚠️ Format Error

```json
{
  "message": "Tidak ada siswa ditemukan untuk filter tersebut."
}
```

---

**📂 Versi:** 1.0
**🗕️ Terakhir diperbarui:** 20 Mei 2025
**👨‍💻 Developer:** Tim Backend SPK Siswa
