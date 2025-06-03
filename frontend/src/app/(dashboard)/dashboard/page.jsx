"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardPage() {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URI}/api/students`,
          {
            method: "GET",
            credentials: "include", // jika backend pakai cookie
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch students");
        }

        const data = await res.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const avgAttendance = useMemo(() => {
    if (students.length === 0) return 0;
    const sum = students.reduce((acc, s) => acc + s.attendance, 0);
    return (sum / students.length).toFixed(1);
  }, [students]);

  const totalViolations = useMemo(() => {
    return students.reduce((acc, s) => acc + s.violations, 0);
  }, [students]);

  const avgGrade = useMemo(() => {
    if (students.length === 0) return 0;
    const sum = students.reduce((acc, s) => acc + s.grade, 0);
    return (sum / students.length).toFixed(1);
  }, [students]);

  const gradeDistribution = useMemo(() => {
    const buckets = Array(10).fill(0);
    students.forEach((s) => {
      let idx = Math.min(Math.floor(s.grade / 10), 9);
      buckets[idx] += 1;
    });
    return buckets;
  }, [students]);

  const barData = {
    labels: [
      "0–9",
      "10–19",
      "20–29",
      "30–39",
      "40–49",
      "50–59",
      "60–69",
      "70–79",
      "80–89",
      "90–100",
    ],
    datasets: [
      {
        label: "Jumlah Siswa",
        data: gradeDistribution,
        backgroundColor: "#3b82f6",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#374151",
          font: { size: 14 },
        },
      },
      title: {
        display: true,
        text: "Distribusi Nilai Siswa",
        color: "#1f2937",
        font: { size: 18 },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#374151",
          font: { size: 12 },
        },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#374151",
          font: { size: 12 },
          stepSize: 1,
        },
        grid: {
          color: "#e5e7eb",
        },
      },
    },
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
          <span className="text-sm font-medium text-gray-500">
            Rata-rata Attendance (%)
          </span>
          <span className="mt-2 text-3xl font-semibold text-gray-800">
            {avgAttendance}
          </span>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
          <span className="text-sm font-medium text-gray-500">
            Total Violations
          </span>
          <span className="mt-2 text-3xl font-semibold text-gray-800">
            {totalViolations}
          </span>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
          <span className="text-sm font-medium text-gray-500">
            Rata-rata Grade
          </span>
          <span className="mt-2 text-3xl font-semibold text-gray-800">
            {avgGrade}
          </span>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <Bar data={barData} options={barOptions} />
      </div>
    </div>
  );
}
