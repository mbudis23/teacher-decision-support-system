"use client";

import React from "react";

export default function BobotKriteriaPage() {
  const criteria = [
    {
      no: 1,
      name: "Rata-rata nilai akademik",
      weight: 0.3,
      type: "Benefit",
    },
    {
      no: 2,
      name: "Jumlah ketidakhadiran (tanpa keterangan)",
      weight: 0.2,
      type: "Cost",
    },
    {
      no: 3,
      name: "Catatan pelanggaran tata tertib",
      weight: 0.15,
      type: "Cost",
    },
    {
      no: 4,
      name: "Hasil observasi guru BK (kondisi psikologis)",
      weight: 0.2,
      type: "Benefit",
    },
    {
      no: 5,
      name: "Hasil angket motivasi belajar siswa",
      weight: 0.15,
      type: "Benefit",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Bobot dan Kriteria
        </h2>
        <p className="mt-2 text-gray-600">
          Berikut adalah lima kriteria utama yang digunakan untuk membantu guru
          mengambil keputusan terkait kondisi siswa:
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-2">
          Penjelasan Tipe Kriteria
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>
            <span className="font-semibold">Benefit</span>: Semakin tinggi skor,
            semakin baik. Contohnya nilai akademik dan motivasi belajar.
          </li>
          <li>
            <span className="font-semibold">Cost</span>: Semakin rendah nilainya,
            semakin baik. Contohnya jumlah ketidakhadiran dan pelanggaran tata
            tertib.
          </li>
        </ul>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                No
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Kriteria
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Bobot (w)
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Tipe
              </th>
            </tr>
          </thead>
          <tbody>
            {criteria.map((item, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-100"}
              >
                <td className="px-4 py-3 text-sm text-gray-700">{item.no}</td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {item.name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">{item.weight}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{item.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-2">
          Catatan:
        </h3>
        <p className="text-gray-700">
          Bobot (w) digunakan untuk memberi bobot relatif pada setiap kriteria.
          Pastikan bahwa bobot tersebut dijumlahkan menjadi 1 (100%). Informasi
          ini akan menjadi dasar perhitungan Simple Weighted Average maupun
          metode fuzzy logic dalam menentukan siswa yang membutuhkan perhatian
          khusus.
        </p>
      </div>
    </div>
  );
}
