import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarItem({ href, icon: Icon, label }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} passHref className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors
          ${
            isActive
              ? "bg-blue-600 text-white"
              : "text-gray-200 hover:bg-blue-500 hover:text-white"
          }`}>
        {Icon && <Icon className="w-5 h-5" />}
        <span className="font-medium">{label}</span>
    </Link>
  );
}
