# 📘 API Documentation – `/api/teachers/`

Endpoint untuk autentikasi dan manajemen akun **Guru (Teacher)**.

---

## 🔐 Register Guru

- **URL:** `/api/teachers/register`
- **Method:** `POST`
- **Deskripsi:** Mendaftarkan akun guru baru.

### 🧾 Request Body

```json
{
  "nip": "197804121999032001",
  "name": "Ibu Dwi Danik",
  "password": "guru123"
}
```

### ✅ Response (201 Created)

```json
{
  "message": "Registrasi berhasil",
  "teacher": {
    "id": "664ee471f34e0b5af5c0e31d",
    "nip": "197804121999032001",
    "name": "Ibu Dwi Danik"
  }
}
```

📌 Akan mengatur cookie `token` berisi JWT (`httpOnly`).

---

## 🔑 Login Guru

- **URL:** `/api/teachers/login`
- **Method:** `POST`
- **Deskripsi:** Login dan mendapatkan token autentikasi.

### 🧾 Request Body

```json
{
  "nip": "197804121999032001",
  "password": "guru123"
}
```

### ✅ Response (200 OK)

```json
{
  "message": "Login berhasil",
  "teacher": {
    "id": "664ee471f34e0b5af5c0e31d",
    "nip": "197804121999032001",
    "name": "Ibu Dwi Danik"
  }
}
```

📌 Akan mengatur cookie `token` berisi JWT (`httpOnly`).

---

## 🔓 Logout Guru

- **URL:** `/api/teachers/logout`
- **Method:** `POST`
- **Deskripsi:** Logout dan menghapus cookie token.

### ✅ Response (200 OK)

```json
{
  "message": "Logout berhasil"
}
```

---

## 👤 Profil Guru Login

- **URL:** `/api/teachers/profile`
- **Method:** `GET`
- **Auth Required:** ✅ Yes (via cookie `token`)
- **Deskripsi:** Mendapatkan informasi guru yang sedang login.

### ✅ Response (200 OK)

```json
{
  "id": "664ee471f34e0b5af5c0e31d",
  "nip": "197804121999032001",
  "name": "Ibu Dwi Danik"
}
```

📌 Token disimpan di cookie (`httpOnly`), dan akan dibaca oleh server untuk otentikasi.

---

## ❌ Format Error

Semua error memiliki format sebagai berikut:

```json
{
  "message": "Pesan error deskriptif"
}
```

Contoh:

```json
{
  "message": "NIP sudah terdaftar"
}
```

---

## 🔐 Middleware

### `protect`

Digunakan untuk melindungi endpoint sensitif seperti `/profile`, hanya dapat diakses oleh guru yang telah login.

- Memeriksa token dari `cookie`
- Menolak akses jika tidak ada token atau token tidak valid

---

## 🛠️ Catatan Tambahan

- Semua response sukses akan menyertakan informasi guru dan mengatur cookie token.
- Pastikan frontend menggunakan `credentials: "include"` saat fetch API agar cookie bisa dikirim.
- Untuk keamanan, `JWT_SECRET` dan `MONGODB_URI` disimpan di file `.env`.

---

**📂 Versi:** 1.0
**🗕️ Terakhir diperbarui:** 20 Mei 2025
**👨‍💻 Developer:** Tim Backend SPK Siswa
