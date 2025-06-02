"use client";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChevronDown } from "lucide-react";

export default function SWACalculatorPage() {
  const weights = {
    academic: 0.3,
    absence: 0.2,
    violation: 0.15,
    observation: 0.2,
    motivation: 0.15,
  };

  const rubrics = {
    violation: [
      { label: "Tanpa Pelanggaran", value: 100 },
      { label: "Pelanggaran Ringan (1–2 kali)", value: 75 },
      { label: "Pelanggaran Sedang (3–4 kali)", value: 50 },
      { label: "Pelanggaran Berat (≥ 5 kali)", value: 25 },
    ],
    observation: [
      { label: "Sangat Stabil / Baik", value: 100 },
      { label: "Relatif Stabil", value: 75 },
      { label: "Cukup Terganggu", value: 50 },
      { label: "Perlu Pemantauan Intensif", value: 25 },
    ],
    motivation: [
      { label: "Sangat Tinggi", value: 100 },
      { label: "Tinggi", value: 75 },
      { label: "Sedang", value: 50 },
      { label: "Rendah", value: 25 },
    ],
  };

  const [inputs, setInputs] = useState({
    academic: "",
    absence: "",
    violation: rubrics.violation[0].value,
    observation: rubrics.observation[0].value,
    motivation: rubrics.motivation[0].value,
  });
  const [selectFocus, setSelectFocus] = useState({
    violation: false,
    observation: false,
    motivation: false,
  });
  const [result, setResult] = useState(null);

  const fields = [
    {
      name: "academic",
      label: "Rata-rata Nilai Akademik (0–100)",
      type: "number",
      placeholder: "Contoh: 85",
      min: 0,
      max: 100,
    },
    {
      name: "absence",
      label: "Jumlah Ketidakhadiran (dalam sebulan, 0–30)",
      type: "number",
      placeholder: "Contoh: 3",
      min: 0,
      max: 30,
    },
    {
      name: "violation",
      label: "Catatan Pelanggaran Tata Tertib",
      type: "select",
      options: rubrics.violation,
    },
    {
      name: "observation",
      label: "Hasil Observasi Guru BK (Kondisi Psikologis)",
      type: "select",
      options: rubrics.observation,
    },
    {
      name: "motivation",
      label: "Hasil Angket Motivasi Belajar",
      type: "select",
      options: rubrics.motivation,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const normalizeAcademic = (x) => {
    const num = parseFloat(x);
    if (isNaN(num) || num < 0 || num > 100) return null;
    return num / 100;
  };
  const normalizeAbsence = (x) => {
    const num = parseFloat(x);
    const max = 30;
    if (isNaN(num) || num < 0 || num > max) return null;
    return (max - num) / max;
  };
  const normalizeRubric = (x) => {
    const num = parseFloat(x);
    return (num - 25) / 75;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { academic, absence, violation, observation, motivation } = inputs;

    if (
      academic === "" ||
      absence === "" ||
      !violation ||
      !observation ||
      !motivation
    ) {
      toast.error("Semua field wajib diisi.");
      return;
    }

    const normAcademic = normalizeAcademic(academic);
    const normAbsence = normalizeAbsence(absence);
    const normViolation = normalizeRubric(violation);
    const normObservation = normalizeRubric(observation);
    const normMotivation = normalizeRubric(motivation);

    if (
      normAcademic === null ||
      normAbsence === null ||
      isNaN(normViolation) ||
      isNaN(normObservation) ||
      isNaN(normMotivation)
    ) {
      toast.error("Masukkan nilai yang valid sesuai rentang.");
      return;
    }

    const sAcademic = normAcademic * weights.academic;
    const sAbsence = normAbsence * weights.absence;
    const sViolation = normViolation * weights.violation;
    const sObservation = normObservation * weights.observation;
    const sMotivation = normMotivation * weights.motivation;

    const finalScore = parseFloat(
      (sAcademic + sAbsence + sViolation + sObservation + sMotivation).toFixed(
        3
      )
    );

    let recommendation = "";
    if (finalScore >= 0.8) {
      recommendation = "Tidak perlu intervensi khusus. Terus pantau rutin.";
    } else if (finalScore >= 0.6) {
      recommendation =
        "Perlu perhatian ringan: jadwalkan sesi konseling singkat.";
    } else {
      recommendation =
        "Perlu intervensi intensif: rujuk ke Tim BK untuk pendampingan.";
    }

    toast.success(`Perhitungan selesai. Skor: ${finalScore}`);
    setResult({ score: finalScore, recommendation });
  };

  return (
    <div className="space-y-8 -mt-8">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div>
        <h2 className="text-2xl font-semibold text-gray-800">SWA Calculator</h2>
        <p className="mt-2 text-gray-600">
          Masukkan nilai untuk kelima kriteria berikut, kemudian tekan "Hitung"
          untuk mendapatkan skor akhir dan rekomendasi.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6 w-full space-y-6"
      >
        {fields.map((field) =>
          field.type === "number" ? (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {field.label}
              </label>
              <input
                type="number"
                id={field.name}
                name={field.name}
                value={inputs[field.name]}
                onChange={handleChange}
                min={field.min}
                max={field.max}
                placeholder={field.placeholder}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                required
              />
            </div>
          ) : (
            <div key={field.name} className="relative">
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {field.label}
              </label>
              <select
                id={field.name}
                name={field.name}
                value={inputs[field.name]}
                onChange={handleChange}
                onFocus={() =>
                  setSelectFocus((prev) => ({ ...prev, [field.name]: true }))
                }
                onBlur={() =>
                  setSelectFocus((prev) => ({ ...prev, [field.name]: false }))
                }
                className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                required
              >
                {field.options.map((opt, idx) => (
                  <option key={idx} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className={`absolute right-3 top-9 w-5 h-5 text-gray-500 pointer-events-none transform transition-transform duration-200 ${
                  selectFocus[field.name] ? "rotate-180" : ""
                }`}
              />
            </div>
          )
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors cursor-pointer"
        >
          Hitung
        </button>
      </form>

      {result && (
        <div className="bg-white rounded-lg shadow-md p-6 w-full space-y-4">
          <h3 className="text-lg font-medium text-gray-800">Hasil SWA</h3>
          <p className="text-gray-700">
            Skor Akhir:{" "}
            <span className="font-semibold text-gray-900">{result.score}</span>
          </p>
          <h4 className="text-md font-medium text-gray-800">Rekomendasi:</h4>
          <p className="text-gray-700">{result.recommendation}</p>
        </div>
      )}
    </div>
  );
}
