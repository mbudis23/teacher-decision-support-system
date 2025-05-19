# 📘 API Documentation – `/api/students/`

Endpoint untuk manajemen data **Siswa (Student)**, termasuk CRUD dan import dari file CSV.

---

## ✅ POST `/api/students/`

**Deskripsi:** Tambahkan satu siswa baru

### Request Body

```json
{
  "nis": "20240101",
  "name": "Bintang Pramudya Putra",
  "semester": "2",
  "className": "XI IPA 2",
  "homeroomTeacher": "<ObjectId Guru>",
  "subjects": {
    "agama": { "knowledge": 85, "skill": 80 },
    "ppkn": { "knowledge": 82, "skill": 78 },
    "bahasaIndonesia": { "knowledge": 88, "skill": 85 },
    "bahasaInggris": { "knowledge": 90, "skill": 87 },
    "matematikaUmum": { "knowledge": 84, "skill": 80 },
    "sejarahIndonesia": { "knowledge": 79, "skill": 76 },
    "seniBudaya": { "knowledge": 86, "skill": 88 },
    "penjasorkes": { "knowledge": 90, "skill": 92 },
    "prakaryaKewirausahaan": { "knowledge": 83, "skill": 85 },
    "bahasaDaerah": { "knowledge": 80, "skill": 78 }
  }
}
```

### Response

```json
{
  "_id": "<id>",
  "nis": "20240101",
  "name": "Bintang Pramudya Putra",
  ...
}
```

---

## 🔍 GET `/api/students/`

**Deskripsi:** Ambil semua siswa

### Response

```json
[
  {
    "_id": "...",
    "name": "...",
    "homeroomTeacher": {
      "_id": "...",
      "name": "..."
    },
    ...
  },
  ...
]
```

---

## 🔎 GET `/api/students/:id`

**Deskripsi:** Ambil detail satu siswa berdasarkan ID

### Response

```json
{
  "_id": "...",
  "nis": "...",
  "name": "...",
  "semester": "...",
  "className": "...",
  "subjects": {
    "agama": { "knowledge": 85, "skill": 80 },
    ...
  }
}
```

---

## ✏️ PUT `/api/students/:id`

**Deskripsi:** Update data siswa berdasarkan ID

### Request Body

- Format sama seperti POST

### Response

```json
{
  "_id": "...",
  "updatedFields": "..."
}
```

---

## ❌ DELETE `/api/students/:id`

**Deskripsi:** Hapus siswa berdasarkan ID

### Response

```json
{
  "message": "Siswa dihapus"
}
```

---

## 📂 POST `/api/students/import`

**Deskripsi:** Import banyak data siswa dari file `.csv`

### Form-data Field

- `file` (type: `file`) — file CSV yang diunggah

### CSV Header Format

```
nis,name,semester,className,homeroomTeacher,agama_p,agama_k,ppkn_p,ppkn_k,bindo_p,bindo_k,bing_p,bing_k,mtk_p,mtk_k,sejarah_p,sejarah_k,seni_p,seni_k,penjas_p,penjas_k,kwu_p,kwu_k,bahda_p,bahda_k
```

### Response

```json
{
  "message": "Import berhasil",
  "inserted": [ { "_id": "...", "name": "..." }, ... ]
}
```

---

## ⚠️ Error Format

```json
{
  "error": "Pesan kesalahan"
}
```

---

**📂 Versi:** 1.0
**🗕️ Terakhir diperbarui:** 20 Mei 2025
**👨‍💻 Developer:** Tim Backend SPK Siswa
