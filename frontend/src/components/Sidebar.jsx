"use client";

import React from "react";
import SidebarItem from "./SidebarItem";
import {
  HomeIcon,
  UsersIcon,
  SlidersIcon,
  ClipboardListIcon,
  LifeBuoyIcon,
  UserIcon,
  LogOutIcon,
} from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

export default function Sidebar() {
  const searchParams = useSearchParams();
  const schoolName = searchParams.get("schoolName") || "My School";
  const router = useRouter();

  const handleLogout = () => {
    router.push("/Login");
  };

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
          <span className="font-semibold text-lg">{schoolName}</span>
        </div>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        <SidebarItem
          href={`/dashboard?schoolName=${encodeURIComponent(schoolName)}`}
          icon={HomeIcon}
          label="Dashboard"
        />
        <SidebarItem
          href={`/data-siswa?schoolName=${encodeURIComponent(schoolName)}`}
          icon={UsersIcon}
          label="Data Siswa"
        />
        <SidebarItem
          href={`/bobot-kriteria?schoolName=${encodeURIComponent(schoolName)}`}
          icon={SlidersIcon}
          label="Bobot Kriteria"
        />
        <SidebarItem
          href={`/bantuan?schoolName=${encodeURIComponent(schoolName)}`}
          icon={LifeBuoyIcon}
          label="Bantuan & Dokumentasi"
        />
        <SidebarItem
          href={`/swa-calculator?schoolName=${encodeURIComponent(schoolName)}`}
          icon={ClipboardListIcon}
          label="SWA Calculator"
        />
        <SidebarItem
          href={`/profile?schoolName=${encodeURIComponent(schoolName)}`}
          icon={UserIcon}
          label="Profile"
        />
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
