"use client";

import React from "react";
import { BellIcon } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <div className="flex items-end gap-4">
        <button className="p-2 text-gray-600 hover:text-gray-800 rounded-full relative">
          <BellIcon className="w-6 h-6" />
          <span className="absolute top-0 right-0 inline-flex h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </header>
  );
}
