"use client";

import React, { useState, useEffect, useMemo } from "react";
import DataTable from "@/components/DataTable";
import StudentModal from "@/components/StudentModal";
import { FilePlusIcon, DownloadIcon } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DataSiswaPage() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    className: "",
    email: "",
    gender: "",
    grade: "",
    attendance: "",
    violations: "",
  });

  useEffect(() => {
    setData([
      {
        name: "Andi Wijaya",
        className: "CS50",
        email: "andi.wijaya@example.com",
        gender: "Male",
        grade: 85,
        attendance: 95,
        violations: 2,
      },
      {
        name: "Siti Rahma",
        className: "CS52",
        email: "siti.rahma@example.com",
        gender: "Female",
        grade: 90,
        attendance: 98,
        violations: 1,
      },
      {
        name: "Budi Santoso",
        className: "CS51",
        email: "budi.santoso@example.com",
        gender: "Male",
        grade: 78,
        attendance: 88,
        violations: 3,
      },
      {
        name: "Rina Kartika",
        className: "CS50",
        email: "rina.kartika@example.com",
        gender: "Female",
        grade: 88,
        attendance: 92,
        violations: 0,
      },
    ]);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return data;

    return data.filter(
      (row) =>
        row.name.toLowerCase().includes(term) ||
        row.email.toLowerCase().includes(term)
    );
  }, [data, searchTerm]);

  const handleExportCSV = () => {
    if (filteredData.length === 0) return;

    const headers = [
      "Name",
      "Class",
      "Email",
      "Gender",
      "Grade",
      "Attendance (%)",
      "Violations",
    ];
    const csvRows = [headers.join(",")];

    filteredData.forEach((row) => {
      const values = [
        row.name,
        row.className,
        row.email,
        row.gender,
        row.grade,
        row.attendance,
        row.violations,
      ].map((val) => {
        const str = String(val);
        if (str.includes(",") || str.includes('"') || str.includes("\n")) {
          return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
      });
      csvRows.push(values.join(","));
    });

    const csvString = csvRows.join("\r\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "data_siswa.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const openModal = () => {
    setNewStudent({
      name: "",
      className: "",
      email: "",
      gender: "",
      grade: "",
      attendance: "",
      violations: "",
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleNewStudentChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    const { name, className, email, gender, grade, attendance, violations } =
      newStudent;
    if (
      !name ||
      !className ||
      !email ||
      !gender ||
      !grade ||
      !attendance ||
      !violations
    ) {
      toast.error("Semua field wajib diisi.");
      return;
    }
    const gradeNum = parseFloat(grade);
    const attendanceNum = parseFloat(attendance);
    const violationsNum = parseInt(violations);
    if (isNaN(gradeNum) || gradeNum < 0 || gradeNum > 100) {
      toast.error("Grade harus angka antara 0 hingga 100.");
      return;
    }
    if (isNaN(attendanceNum) || attendanceNum < 0 || attendanceNum > 100) {
      toast.error("Attendance harus angka antara 0 hingga 100.");
      return;
    }
    if (isNaN(violationsNum) || violationsNum < 0) {
      toast.error("Violations harus angka ≥ 0.");
      return;
    }

    setData((prev) => [
      ...prev,
      {
        name,
        className,
        email,
        gender,
        grade: gradeNum,
        attendance: attendanceNum,
        violations: violationsNum,
      },
    ]);
    setShowModal(false);
    toast.success("Data siswa berhasil ditambahkan.");
  };

  return (
    <div className="space-y-6 -mt-8">
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
      <div className="flex gap-3">
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <DownloadIcon className="w-5 h-5" />
          <span>Export CSV</span>
        </button>
        <button
          onClick={openModal}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
        >
          <FilePlusIcon className="w-5 h-5" />
          <span>Tambah Data Siswa</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search for a student by name or email"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <DataTable data={filteredData} />

      <StudentModal
        showModal={showModal}
        onClose={closeModal}
        onChange={handleNewStudentChange}
        onSubmit={handleAddStudent}
        newStudent={newStudent}
      />
    </div>
  );
}
