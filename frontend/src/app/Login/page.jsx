"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginName() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    schoolName: "",
    schoolPassword: "",
  });

  const inputs = [
    {   name: "schoolName", 
        placeholder: "Enter the name of school", 
        type: "text" 
    },
    {
      name: "schoolPassword",
      placeholder: "Enter password for your school",
      type: "text",
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    router.push(`/dashboard?schoolName=${encodeURIComponent(formData.schoolName)}`);
  };

  const handleSignUp = () => {
    router.push('/SignUp')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-semibold text-gray-700">
        Welcome, login to your account
      </h1>

      <div className="mt-8 w-full max-w-md bg-white rounded-lg shadow-lg px-8 py-8">
        <p className="text-center text-gray-600 mb-6">
          It is our great pleasure to have you on board!
        </p>

        {inputs.map((field) => (
          <input
            key={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={formData[field.name]}
            onChange={handleChange}
            className="w-full mb-4 border border-gray-300 rounded-md px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}

        <button
          onClick={handleNext}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md transition-colors cursor-pointer"
        >
          Login
        </button>

        <p className="mt-4 text-center text-gray-600 text-sm">
          Doesn't have an account? 
          <a className="text-blue-500 hover:underline cursor-pointer ml-1" onClick={handleSignUp}>
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
