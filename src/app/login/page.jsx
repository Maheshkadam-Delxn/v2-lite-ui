"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  Phone,
  Key,
  ShieldCheck,
  User,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_PATH}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      const data = await response.json();

      console.log(data);

      if (data.success) {
        // Store token in localStorage or cookies
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect to dashboard or home page
        router.push("/admin/projects");
      } else {
        setError(data.error || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* ===== LEFT: FORM (white) ===== */}
      <div className="flex-1 flex items-center justify-center px-8 py-8 relative overflow-hidden">
        {/* subtle left abstract */}
        <div className="absolute -top-20 -left-10 w-56 h-56 bg-blue-50 rounded-full opacity-60 transform rotate-12 blur-xl" />
        <div className="absolute bottom-4 left-8 w-40 h-40 bg-gradient-to-br from-blue-50 to-white rounded-full opacity-40 blur-lg" />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-md"
        >
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            Welcome back
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Sign in to your SkyStruct account to continue managing your
            projects.
          </p>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm"
            >
              <AlertCircle className="w-4 h-4" />
              {error}
            </motion.div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <div className="flex items-center gap-3 px-4 py-3 border rounded-xl bg-white focus-within:ring-2 focus-within:ring-blue-500 shadow-sm">
                <Mail className="w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleInputChange}
                  className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"
                  placeholder="you@company.com"
                  aria-label="Email address"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="flex items-center gap-3 px-4 py-3 border rounded-xl bg-white focus-within:ring-2 focus-within:ring-blue-500 shadow-sm">
                <Lock className="w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"
                  placeholder="Enter your password"
                  aria-label="Password"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                  disabled={isLoading}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 hover:underline disabled:opacity-50"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-gray-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                "Sign in"
              )}
            </motion.button>
          </form>

          <div className="mt-5 text-sm text-gray-600 text-center">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </div>

          <div className="mt-4 text-xs text-gray-400 text-center">
            By signing in you agree to our{" "}
            <Link href="/terms" className="underline text-gray-600">
              Terms
            </Link>{" "}
            &{" "}
            <Link href="/privacy" className="underline text-gray-600">
              Privacy
            </Link>
          </div>
        </motion.div>
      </div>
      {/* ===== RIGHT: DECORATIVE (blue) ===== */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-blue-600 to-blue-500 relative overflow-hidden px-6 py-8">
        {/* Curved edge separator */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-blue-600 overflow-hidden">
          <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-16 h-64 bg-blue-50 rounded-full"></div>
        </div>

        {/* large background abstract shapes */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/6 rounded-full blur-2xl transform rotate-12" />
        <div className="absolute -bottom-32 -left-32 w-[520px] h-[520px] bg-white/4 rounded-full blur-3xl" />
        <div className="absolute right-8 top-8 w-56 h-56 bg-white/8 rounded-tl-[90px] rounded-br-[40px] transform rotate-12" />
        <div className="absolute left-10 bottom-6 w-40 h-40 bg-white/6 rounded-full rotate-6" />

        {/* animated subtle blob */}
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
          className="absolute left-1/3 top-1/4 w-96 h-96 bg-gradient-to-tr from-white/8 to-white/6 rounded-full blur-2xl"
        />

        {/* Big platform logo & name (center-right, larger) */}
        <motion.div
          initial={{ opacity: 0, x: 24, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex items-center gap-6 pr-16"
        >
          <div className="w-32 h-32 rounded-2xl bg-white flex items-center justify-center shadow-2xl">
            <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center text-white text-3xl font-extrabold shadow-inner">
              S
            </div>
          </div>

          <div className="text-white">
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight">
              SkyStruct
            </h2>
            <p className="mt-2 text-blue-100 max-w-xs text-sm">
              Build. Track. Deliver. A modern platform to manage construction
              projects & teams.
            </p>

            <div className="mt-4 flex gap-2">
              <div className="bg-white/10 px-3 py-1.5 rounded-lg text-white text-xs font-semibold shadow-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Secure by design
              </div>
              <div className="bg-white/10 px-3 py-1.5 rounded-lg text-white text-xs font-semibold shadow-sm">
                Enterprise ready
              </div>
            </div>
          </div>
        </motion.div>

        {/* floating stat card - top-right */}
        <motion.div
          whileHover={{ y: -6 }}
          className="absolute top-8 right-8 bg-white rounded-xl shadow-lg p-4 w-40"
        >
          <h3 className="text-xl font-bold text-gray-900">2,450+</h3>
          <p className="text-xs text-gray-500 mt-1">Projects Managed</p>
        </motion.div>

        {/* floating info card - bottom-left */}
        <motion.div
          whileHover={{ y: -6 }}
          className="absolute bottom-10 left-10 bg-white rounded-xl shadow-lg p-4 w-60"
        >
          <div className="flex items-start gap-3">
            <Key className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-800 text-sm">
                Secure access
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Multi-factor authentication available for all accounts.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
