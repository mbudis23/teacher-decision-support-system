"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginName() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [visibility, setVisibility] = useState({
    password: false,
  });

  const inputs = [
    {
      name: "email",
      placeholder: "Enter the school email",
      type: "text",
      extra: null,
    },
    {
      name: "password",
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

  const handleLogin = async () => {
    if (!formData.email.trim()) {
      toast.error("School Name is required.");
      return;
    }
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URI}/api/teachers/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
          credentials: "include", // ✅ penting agar browser kirim & terima cookie
        }
      );

      let data;
      try {
        data = await res.json();
      } catch (e) {
        const text = await res.text();
        console.error("Invalid response:", text);
        toast.error("Invalid server response.");
        return;
      }

      if (!res.ok) {
        toast.error(data.message || "Login failed.");
        return;
      }

      toast.success("Login successful!");
      router.push(`/dashboard?email=${encodeURIComponent(formData.email)}`);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Failed to connect to the server.");
    }
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
          const isPasswordField = field.name === "password";
          return (
            <div key={field.name} className="mb-4">
              <div className="relative">
                <input
                  name={field.name}
                  type={
                    isPasswordField && visibility.password ? "text" : field.type
                  }
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full pr-10 border border-gray-300 rounded-md px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {isPasswordField && (
                  <button
                    type="button"
                    onClick={() => toggleVisibility("password")}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {visibility.password ? (
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
