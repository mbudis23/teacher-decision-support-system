"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProfilPage() {
  const searchParams = useSearchParams();
  const schoolNameParam = searchParams.get("schoolName") || "";

  const [profile, setProfile] = useState({ adminName: "", schoolName: schoolNameParam, schoolEmail: "" });
  const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
  const [visibility, setVisibility] = useState({ currentPassword: false, newPassword: false, confirmNewPassword: false });

  useEffect(() => {
    setProfile({ adminName: "Admin Sekolah", schoolName: schoolNameParam, schoolEmail: "admin@sekolah.com" });
  }, [schoolNameParam]);

  const handleChange = (e, setter) => {
    const { name, value } = e.target;
    setter(prev => ({ ...prev, [name]: value }));
  };

  const toggleVisibility = field => setVisibility(prev => ({ ...prev, [field]: !prev[field] }));

  const handleSaveProfile = e => {
    e.preventDefault();
    const { adminName, schoolEmail } = profile;
    if (!adminName || !schoolEmail) {
      toast.error("Semua field profil wajib diisi.");
      return;
    }
    toast.success("Profil berhasil disimpan.");
  };

  const handleChangePassword = e => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmNewPassword } = passwordData;
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      toast.error("Semua field password wajib diisi.");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("Password baru harus minimal 8 karakter.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast.error("New password dan konfirmasi tidak cocok.");
      return;
    }
    toast.success("Password berhasil diubah.");
    setPasswordData({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
  };

  const profileFields = [
    { label: "Nama Admin", name: "adminName", type: "text", placeholder: "Masukkan nama admin" },
    { label: "Nama Sekolah", name: "schoolName", type: "text", placeholder: "", disabled: true },
    { label: "Email Sekolah", name: "schoolEmail", type: "email", placeholder: "Masukkan email sekolah" }
  ];

  const passwordFields = [
    { label: "Password Saat Ini", name: "currentPassword", placeholder: "Masukkan password lama" },
    { label: "Password Baru", name: "newPassword", placeholder: "Masukkan password baru" },
    { label: "Konfirmasi Password Baru", name: "confirmNewPassword", placeholder: "Ulangi password baru" }
  ];

  return (
    <div className="space-y-8 -mt-8">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar draggable />
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Pengaturan Profil</h2>
        <p className="mt-2 text-gray-600">Kelola data profil admin dan ubah kata sandi akun Anda.</p>
      </div>

      <div className="flex flex-wrap gap-5">
        <div className="bg-white rounded-lg shadow-md p-6 flex-1 min-w-[300px]">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Data Profil</h3>
          <form onSubmit={handleSaveProfile} className="space-y-4">
            {profileFields.map(({ label, name, type = "text", placeholder, disabled }) => (
              <div key={name}>
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                  {label}
                </label>
                <input
                  type={type}
                  id={name}
                  name={name}
                  value={profile[name]}
                  onChange={e => handleChange(e, setProfile)}
                  placeholder={placeholder}
                  disabled={disabled}
                  className={`w-full border ${disabled ? 'bg-gray-100 text-gray-600 cursor-not-allowed' : 'border-gray-300'} rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            ))}
            <button type="submit" className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors cursor-pointer">
              Simpan Profil
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 flex-1 min-w-[300px]">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Ubah Kata Sandi</h3>
          <form onSubmit={handleChangePassword} className="space-y-4">
            {passwordFields.map(({ label, name, placeholder }) => (
              <div key={name}>
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                  {label}
                </label>
                <div className="relative">
                  <input
                    type={visibility[name] ? "text" : "password"}
                    id={name}
                    name={name}
                    value={passwordData[name]}
                    onChange={e => handleChange(e, setPasswordData)}
                    placeholder={placeholder}
                    className="w-full pr-10 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => toggleVisibility(name)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
                  >
                    {visibility[name] ? <EyeIcon className="w-5 h-5" /> : <EyeOffIcon className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            ))}
            <button type="submit" className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors cursor-pointer">
              Ubah Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
