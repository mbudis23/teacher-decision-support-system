"use client";

import React, { useEffect, useState } from "react";

const API_URI = process.env.NEXT_PUBLIC_API_URI;

export default function RankingPage() {
  const [rankingData, setRankingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await fetch(
          `${API_URI}/api/students/rank-low-recomendations?className=Pendidikan Kewarganegaraan`,
          {
            method: "GET",
            credentials: "include", // memastikan cookies dikirim
          }
        );

        if (!response.ok) {
          throw new Error("Gagal mengambil data dari server");
        }

        const data = await response.json();
        setRankingData(data);
      } catch (err) {
        setError("Gagal memuat data ranking siswa.");
      } finally {
        setLoading(false);
      }
    };

    fetchRanking();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Ranking Siswa</h2>
        <p className="mt-2 text-gray-600">
          Berikut adalah daftar ranking siswa berdasarkan skor SWA dan
          rekomendasi.
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
                <td className="px-4 py-3 text-sm text-gray-700">
                  {item.score}
                </td>
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
