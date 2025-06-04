"use client";

import React, { useState, useEffect, useMemo } from "react";
import DataTable from "@/components/DataTable";
import StudentModal from "@/components/StudentModal";
import { FilePlusIcon, DownloadIcon, ChevronDown } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DataSiswaPage() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // State untuk filter & sort
  const [filterClass, setFilterClass] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [sortKey, setSortKey] = useState("");

  // State untuk memantau focus tiap dropdown
  const [selectFocus, setSelectFocus] = useState({
    filterClass: false,
    filterGender: false,
    sortKey: false,
  });

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
    const fetchStudents = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URI}/api/students`,
          {
            credentials: "include",
          }
        );
        if (!res.ok) throw new Error("Failed to fetch students");
        const data = await res.json();
        setData(data);
      } catch (error) {
        toast.error("Failed to load student data");
      }
    };

    fetchStudents();
  }, []);

  // Hitung daftar unik className & gender untuk opsi filter
  const uniqueClasses = useMemo(() => {
    const classes = new Set();
    data.forEach((row) => {
      if (row.className) classes.add(row.className);
    });
    return Array.from(classes).sort();
  }, [data]);

  const uniqueGenders = useMemo(() => {
    const genders = new Set();
    data.forEach((row) => {
      if (row.gender) genders.add(row.gender);
    });
    return Array.from(genders).sort();
  }, [data]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtering & sorting data
  const filteredData = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    let temp = data;

    // 1. Search by name/email
    if (term) {
      temp = temp.filter(
        (row) =>
          row.name.toLowerCase().includes(term) ||
          row.email.toLowerCase().includes(term)
      );
    }

    // 2. Filter by kelas
    if (filterClass) {
      temp = temp.filter((row) => row.className === filterClass);
    }

    // 3. Filter by gender
    if (filterGender) {
      temp = temp.filter((row) => row.gender === filterGender);
    }

    // 4. Sort descending berdasarkan sortKey
    if (sortKey) {
      temp = [...temp].sort((a, b) => {
        const aVal = parseFloat(a[sortKey] ?? 0);
        const bVal = parseFloat(b[sortKey] ?? 0);
        return bVal - aVal;
      });
    }

    return temp;
  }, [data, searchTerm, filterClass, filterGender, sortKey]);

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
      "SWA Score",
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
        row.SWA_Score,
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

  const handleAddStudent = async (e) => {
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

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URI}/api/students`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name,
            className,
            email,
            gender,
            grade: gradeNum,
            attendance: attendanceNum,
            violations: violationsNum,
          }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Failed to add student.");
        return;
      }

      setData((prev) => [...prev, result]);
      setShowModal(false);
      toast.success("Data siswa berhasil ditambahkan.");
    } catch (error) {
      toast.error("Server error. Cannot add student.");
    }
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

      {/* Filter, Order By, dan Search */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Filter Kelas */}
        <div className="relative">
          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            onFocus={() =>
              setSelectFocus((prev) => ({ ...prev, filterClass: true }))
            }
            onBlur={() =>
              setSelectFocus((prev) => ({ ...prev, filterClass: false }))
            }
            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
          >
            <option value="">Semua Kelas</option>
            {uniqueClasses.map((cls, idx) => (
              <option key={idx} value={cls}>
                {cls}
              </option>
            ))}
          </select>
          <ChevronDown
            className={`absolute right-3 top-3 w-5 h-5 text-gray-500 pointer-events-none transform transition-transform duration-200 ${
              selectFocus.filterClass ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* Filter Gender */}
        <div className="relative">
          <select
            value={filterGender}
            onChange={(e) => setFilterGender(e.target.value)}
            onFocus={() =>
              setSelectFocus((prev) => ({ ...prev, filterGender: true }))
            }
            onBlur={() =>
              setSelectFocus((prev) => ({ ...prev, filterGender: false }))
            }
            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
          >
            <option value="">Semua Gender</option>
            {uniqueGenders.map((g, idx) => (
              <option key={idx} value={g}>
                {g}
              </option>
            ))}
          </select>
          <ChevronDown
            className={`absolute right-3 top-3 w-5 h-5 text-gray-500 pointer-events-none transform transition-transform duration-200 ${
              selectFocus.filterGender ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* Order By */}
        <div className="relative">
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            onFocus={() =>
              setSelectFocus((prev) => ({ ...prev, sortKey: true }))
            }
            onBlur={() =>
              setSelectFocus((prev) => ({ ...prev, sortKey: false }))
            }
            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
          >
            <option value="">Urutkan</option>
            <option value="attendance">Attendance % (tinggi ke rendah)</option>
            <option value="grade">Grade (tinggi ke rendah)</option>
            <option value="violations">Violations (tinggi ke rendah)</option>
            <option value="SWA_Score">SWA Score (tinggi ke rendah)</option>
          </select>
          <ChevronDown
            className={`absolute right-3 top-3 w-5 h-5 text-gray-500 pointer-events-none transform transition-transform duration-200 ${
              selectFocus.sortKey ? "rotate-180" : ""
            }`}
          />
        </div>
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
