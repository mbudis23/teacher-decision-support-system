"use client";

import React from "react";

export default function RankingPage() {
  const rankingData = [
    {
      name: "Ahmad Nur",
      score: 0.85,
      recommendation: "Tidak perlu intervensi khusus. Terus pantau rutin.",
    },
    {
      name: "Budi Santoso",
      score: 0.65,
      recommendation: "Perlu perhatian ringan: jadwalkan sesi konseling singkat.",
    },
    {
      name: "Citra Dewi",
      score: 0.45,
      recommendation: "Perlu intervensi intensif: rujuk ke Tim BK untuk pendampingan.",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Ranking Siswa</h2>
        <p className="mt-2 text-gray-600">
          Berikut adalah daftar ranking siswa berdasarkan skor SWA dan rekomendasi.
        </p>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Nama Siswa
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Skor SWA
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Rekomendasi
              </th>
            </tr>
          </thead>
          <tbody>
            {rankingData.map((item, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-100"}
              >
                <td className="px-4 py-3 text-sm text-gray-700">{item.name}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{item.score}</td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {item.recommendation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
