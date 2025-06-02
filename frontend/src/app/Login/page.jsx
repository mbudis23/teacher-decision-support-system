"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginName() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    schoolName: "",
    schoolPassword: "",
  });

  const [visibility, setVisibility] = useState({
    schoolPassword: false,
  });

  const inputs = [
    {
      name: "schoolName",
      placeholder: "Enter the name of school",
      type: "text",
      extra: null,
    },
    {
      name: "schoolPassword",
      placeholder: "Enter password for your school",
      type: "password",
      extra: "minLength",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleVisibility = (fieldName) => {
    setVisibility((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  const handleLogin = () => {
    if (!formData.schoolName.trim()) {
      toast.error("School Name is required.");
      return;
    }
    if (formData.schoolPassword.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    toast.success("Login successful!");
    router.push(`/dashboard?schoolName=${encodeURIComponent(formData.schoolName)}`);
  };

  const handleSignUp = () => {
    router.push("/SignUp");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
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

      <h1 className="text-2xl font-semibold text-gray-700">
        Welcome, login to your account
      </h1>

      <div className="mt-8 w-full max-w-md bg-white rounded-lg shadow-lg px-8 py-8">
        <p className="text-center text-gray-600 mb-6">
          It is our great pleasure to have you on board!
        </p>

        {inputs.map((field) => {
          const isPasswordField = field.name === "schoolPassword";
          return (
            <div key={field.name} className="mb-4">
              <div className="relative">
                <input
                  name={field.name}
                  type={
                    isPasswordField && visibility.schoolPassword
                      ? "text"
                      : field.type
                  }
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full pr-10 border border-gray-300 rounded-md px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {isPasswordField && (
                  <button
                    type="button"
                    onClick={() => toggleVisibility("schoolPassword")}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {visibility.schoolPassword ? (
                      <EyeIcon className="w-5 h-5 cursor-pointer" />
                    ) : (
                      <EyeOffIcon className="w-5 h-5 cursor-pointer" />
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md transition-colors cursor-pointer"
        >
          Login
        </button>

        <p className="mt-4 text-center text-gray-600 text-sm">
          Doesn't have an account?
          <a
            className="text-blue-500 hover:underline cursor-pointer ml-1"
            onClick={handleSignUp}
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
