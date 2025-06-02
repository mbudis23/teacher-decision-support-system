"use client";

import React, { useState } from "react";
import { BellIcon } from "lucide-react";

export default function Header() {
  const [notifications, setNotifications] = useState([]);
  const [showNoNotifMessage, setShowNoNotifMessage] = useState(false);

  const handleBellClick = () => {
    if (notifications.length === 0) {
      setShowNoNotifMessage((prev) => !prev);
    } else {
      setShowNoNotifMessage(false);
    }
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <div className="flex items-end gap-4">
        <div className="relative">
          <button
            onClick={handleBellClick}
            className="p-2 text-gray-600 hover:text-gray-800 rounded-full cursor-pointer"
          >
            <BellIcon className="w-6 h-6" />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 inline-flex h-2 w-2 bg-red-500 rounded-full"></span>
            )}
          </button>

          {showNoNotifMessage && notifications.length === 0 && (
            <div className="absolute top-full -mt-10 ml-10 left-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg p-2 text-gray-700 text-sm">
              No notifications
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
