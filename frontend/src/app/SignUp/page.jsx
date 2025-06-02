"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignupUnified() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    adminName: "",
    schoolName: "",
    schoolEmail: "",
    password: "",
    confirmPassword: "",
  });

  const [visibility, setVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const fields = [
    {
      name: "adminName",
      placeholder: "Enter the name of admin",
      type: "text",
      extra: "required",
    },
    {
      name: "schoolName",
      placeholder: "Enter the name of school",
      type: "text",
      extra: "required",
    },
    {
      name: "schoolEmail",
      placeholder: "Enter the school email",
      type: "email",
      extra: "required",
    },
    {
      name: "password",
      placeholder: "Choose a password",
      type: "password",
      extra: "minLength",
    },
    {
      name: "confirmPassword",
      placeholder: "Confirm password",
      type: "password",
      extra: "confirmMatch",
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

  const handleNext = () => {
    if (!formData.adminName.trim()) {
      toast.error("Admin Name is required.");
      return;
    }
    if (!formData.schoolName.trim()) {
      toast.error("School Name is required.");
      return;
    }
    if (!formData.schoolEmail.trim()) {
      toast.error("School Email is required.");
      return;
    }
    if (!formData.password) {
      toast.error("Password is required.");
      return;
    }
    if (!formData.confirmPassword) {
      toast.error("Confirm Password is required.");
      return;
    }
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Password and Confirm Password do not match.");
      return;
    }

    toast.success("Account created successfully!");
    router.push("/Login");
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen min-w-screen bg-gray-100 px-4">
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

      <h1 className="text-2xl font-semibold text-gray-700 text-center">
        Welcome, create your school account
      </h1>
      <div className="mt-8 w-full max-w-md bg-white rounded-lg shadow-lg px-8 py-8">
        <p className="text-center text-gray-600 mb-6">
          It is our great pleasure to have you on board!
        </p>

        {fields.map((field) => {
          const isPasswordField = field.name === "password";
          const isConfirmField = field.name === "confirmPassword";

          return (
            <div key={field.name} className="mb-4">
              <div className="relative">
                <input
                  name={field.name}
                  type={
                    (isPasswordField && visibility.password) ||
                    (isConfirmField && visibility.confirmPassword)
                      ? "text"
                      : field.type
                  }
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full pr-10 border border-gray-300 rounded-md px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {(isPasswordField || isConfirmField) && (
                  <button
                    type="button"
                    onClick={() =>
                      toggleVisibility(
                        isPasswordField ? "password" : "confirmPassword"
                      )
                    }
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {isPasswordField ? (
                      visibility.password ? (
                        <EyeIcon className="w-5 h-5 cursor-pointer" />
                      ) : (
                        <EyeOffIcon className="w-5 h-5 cursor-pointer" />
                      )
                    ) : visibility.confirmPassword ? (
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
          onClick={handleNext}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md transition-colors cursor-pointer"
        >
          Next
        </button>

        <p className="mt-4 text-center text-gray-600 text-sm">
          Already have an account?
          <span
            className="text-blue-500 hover:underline cursor-pointer ml-1"
            onClick={() => router.push("/Login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
