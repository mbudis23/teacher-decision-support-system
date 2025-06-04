"use client";

import React, { useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";
import {
  HomeIcon,
  UsersIcon,
  SlidersIcon,
  ClipboardListIcon,
  LifeBuoyIcon,
  UserIcon,
  LogOutIcon,
  TrophyIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const API_BASE = process.env.NEXT_PUBLIC_API_URI;

export default function Sidebar() {
  const router = useRouter();
  const [schoolName, setSchoolName] = useState("Loading...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URI}/api/teachers/profile`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!res.ok) throw new Error("Gagal memuat profil");
        const data = await res.json();
        setSchoolName(data.schoolName);
      } catch (err) {
        setSchoolName("Tidak diketahui");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout gagal:", err);
    }
    router.push("/Login");
  };

  if (loading) {
    return <div className="p-4 text-white">Memuat sidebar...</div>;
  }

  return (
    <aside className="w-64 bg-blue-800 text-gray-200 flex flex-col">
      <div className="h-20 flex items-center justify-center bg-blue-900">
        <div className="flex items-center">
          <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
            <Image
              src="/school_logo.png"
              alt="Logo Sekolah"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
          <span className="font-semibold text-lg truncate max-w-[150px]">
            {schoolName}
          </span>
        </div>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        <SidebarItem href="/dashboard" icon={HomeIcon} label="Dashboard" />
        <SidebarItem href="/data-siswa" icon={UsersIcon} label="Data Siswa" />
        <SidebarItem
          href="/bobot-kriteria"
          icon={SlidersIcon}
          label="Bobot Kriteria"
        />
        <SidebarItem
          href="/swa-calculator"
          icon={ClipboardListIcon}
          label="SWA Calculator"
        />
        <SidebarItem
          href="/bantuan"
          icon={LifeBuoyIcon}
          label="Bantuan & Dokumentasi"
        />
        <SidebarItem href="/ranking" icon={TrophyIcon} label="Ranking" />
        <SidebarItem href="/profile" icon={UserIcon} label="Profile" />
      </nav>

      <div className="px-4 py-4 border-t border-blue-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full text-gray-200 hover:text-white hover:bg-blue-700 px-3 py-2 rounded-md transition-colors cursor-pointer"
        >
          <LogOutIcon className="w-5 h-5" />
          <span className="font-medium">Log out</span>
        </button>
      </div>
    </aside>
  );
}
