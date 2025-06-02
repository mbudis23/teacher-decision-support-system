"use client";

import React from "react";

const tableSections = [
  {
    title: "1. Catatan Pelanggaran Tata Tertib",
    rows: [
      {
        level: "Tanpa Pelanggaran",
        desc: "Siswa tidak pernah tercatat melakukan pelanggaran.",
        encode: 100,
      },
      {
        level: "Pelanggaran Ringan (1–2 kali)",
        desc: "Pelanggaran ringan seperti terlambat 1–2 kali atau absen tanpa izin sekali.",
        encode: 75,
      },
      {
        level: "Pelanggaran Sedang (3–4 kali)",
        desc: "Pelanggaran sedang seperti bolos satu hari atau menyontek beberapa kali.",
        encode: 50,
      },
      {
        level: "Pelanggaran Berat (≥ 5 kali)",
        desc: "Pelanggaran serius atau sering bolos berulang kali.",
        encode: 25,
      },
    ],
  },
  {
    title: "2. Hasil Observasi Guru BK (Kondisi Psikologis)",
    rows: [
      {
        level: "Sangat Stabil / Baik",
        desc: "Siswa sangat tenang, percaya diri, tanpa masalah emosional.",
        encode: 100,
      },
      {
        level: "Relatif Stabil",
        desc: "Umumnya baik, kadang cemas ringan tetapi cepat pulih.",
        encode: 75,
      },
      {
        level: "Cukup Terganggu",
        desc: "Kadang terlihat stres/cemas signifikan, perlu perhatian rutin.",
        encode: 50,
      },
      {
        level: "Perlu Pemantauan Intensif",
        desc: "Sering menunjukkan gejala tekanan/masalah psikologis, butuh intervensi besar.",
        encode: 25,
      },
    ],
  },
  {
    title: "3. Hasil Angket Motivasi Belajar Siswa",
    rows: [
      {
        level: "Sangat Tinggi",
        desc: "Siswa sangat termotivasi, aktif belajar dan inisiatif tinggi.",
        encode: 100,
      },
      {
        level: "Tinggi",
        desc: "Cukup termotivasi, disiplin tugas dan partisipasi baik.",
        encode: 75,
      },
      {
        level: "Sedang",
        desc: "Motivasi rata-rata, kadang rajin, kadang butuh dorongan ekstra.",
        encode: 50,
      },
      {
        level: "Rendah",
        desc: "Motivasi rendah, kesulitan menyelesaikan tugas, perlu dukungan besar.",
        encode: 25,
      },
    ],
  },
];

export default function BantuanPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Bantuan & Dokumentasi</h2>
        <p className="mt-2 text-gray-600">
          Di halaman ini dijelaskan cara melakukan <strong>encoding</strong> untuk kriteria kualitatif
          sehingga dapat diolah dalam metode Simple Weighted Average.
        </p>
      </div>

      {tableSections.map((section, sectionIdx) => (
        <div key={sectionIdx} className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">{section.title}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Tingkatan</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Deskripsi Singkat</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Nilai Encoding</th>
                </tr>
              </thead>
              <tbody>
                {section.rows.map((item, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-3 text-sm text-gray-700">{item.level}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{item.desc}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{item.encode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
