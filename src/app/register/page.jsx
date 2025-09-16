'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Phone, Globe, Key, ShieldCheck, User, Briefcase, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RegisterPagePreview() {
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [role, setRole] = useState("");
  const [subRole, setSubRole] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    countryCode: "+91"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 5) {
      const nextEl = document.getElementById(`otp-${index + 1}`);
      if (nextEl) nextEl.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.phone_number || !formData.password || !role) {
        setError("All fields are required");
        setLoading(false);
        return;
      }

      // If role is member, subRole is required
      if (role === "member" && !subRole) {
        setError("Sub-role is required for member");
        setLoading(false);
        return;
      }

      // Prepare data for API
      const userData = {
        name: formData.name,
        email: formData.email,
        phone_number: formData.countryCode + formData.phone_number,
        password: formData.password,
        role: role,
        memberRole: role === "member" ? subRole : null
      };

      console.log("Sending registration data:", userData);

      // Send registration request
      const response = await fetch("/api/auth/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      console.log(data);
      

      if (data.success) {
        setSuccess("Registration successful! Please verify your phone with OTP.");
        // setShowOTP(true);
        router.push("/login");
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  // const handleOtpVerification = async () => {
    
  //   alert("OTP verification would be implemented here");
  // };

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
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Create your account</h1>
          <p className="text-sm text-gray-500 mb-6">
            Secure your projects and collaborate with your team — quick signup with phone OTP.
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
              {success}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
              <div className="flex items-center gap-3 px-4 py-3 border rounded-xl bg-white focus-within:ring-2 focus-within:ring-blue-500 shadow-sm">
                <User className="w-5 h-5 text-gray-400" />
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"
                  placeholder="Jane Doe"
                  aria-label="Full name"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <div className="flex items-center gap-3 px-4 py-3 border rounded-xl bg-white focus-within:ring-2 focus-within:ring-blue-500 shadow-sm">
                <Mail className="w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"
                  placeholder="you@company.com"
                  aria-label="Email address"
                  required
                />
              </div>
            </div>

            {/* Role and Sub Role Container */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <div className="flex gap-3">
                {/* Role Selection */}
                <div className="flex-1 flex items-center gap-3 px-4 py-3 border rounded-xl bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
                  <User className="w-5 h-5 text-gray-400" />
                  <select
                    className="flex-1 bg-transparent outline-none text-gray-800 w-full"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="">Select role</option>
                    <option value="superadmin">Superadmin</option>
                    <option value="vendor">Vendor</option>
                    <option value="member">Member</option>
                  </select>
                </div>

                {/* Sub Role (only if Member is selected) */}
                {role === "member" && (
                  <div className="flex-1 flex items-center gap-3 px-4 py-3 border rounded-xl bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
                    <Briefcase className="w-5 h-5 text-gray-400" />
                    <select
                      className="flex-1 bg-transparent outline-none text-gray-800 w-full"
                      value={subRole}
                      onChange={(e) => setSubRole(e.target.value)}
                      required
                    >
                      <option value="">Select sub-role</option>
                      <option value="project-admin">Project Admin</option>
                      <option value="consultant">Consultant</option>
                      <option value="contractor">Contractor</option>
                      <option value="approver">Approver</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
              <div className="flex gap-3">
                <div className="flex items-center gap-2 px-3 py-3 border rounded-xl bg-white shadow-sm">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <select 
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                    className="bg-transparent outline-none text-gray-800"
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+61">🇦🇺 +61</option>
                    <option value="+971">🇦🇪 +971</option>
                  </select>
                </div>
                <div className="flex-1 flex items-center gap-3 px-4 py-3 border rounded-xl bg-white focus-within:ring-2 focus-within:ring-blue-500 shadow-sm">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"
                    placeholder="98765 43210"
                    aria-label="Phone number"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="flex items-center gap-3 px-4 py-3 border rounded-xl bg-white focus-within:ring-2 focus-within:ring-blue-500 shadow-sm">
                <Lock className="w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"
                  placeholder="Create a strong password"
                  aria-label="Password"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Must include uppercase, lowercase, number, and special character
              </p>
            </div>

            {/* Register Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-gray-800 transition-all mt-2 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Registering...
                </>
              ) : (
                'Register'
              )}
            </motion.button>
          </form>

          <div className="mt-5 text-sm text-gray-600 text-center">
            Already have an account?{' '}
            <a href="/auth/login" className="text-blue-600 font-semibold hover:underline">
              Sign in
            </a>
          </div>

          <div className="mt-4 text-xs text-gray-400 text-center">
            By signing up you agree to our{' '}
            <a href="/terms" className="underline text-gray-600">
              Terms
            </a>{' '}
            &{' '}
            <a href="/privacy" className="underline text-gray-600">
              Privacy
            </a>
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
          transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
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
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight">SkyStruct</h2>
            <p className="mt-2 text-blue-100 max-w-xs text-sm">
              Build. Track. Deliver. A modern platform to manage construction projects & teams.
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
          <h3 className="text-xl font-bold text-gray-900">176.18</h3>
          <p className="text-xs text-gray-500 mt-1">Active Users</p>
        </motion.div>

        {/* floating info card - bottom-left */}
        <motion.div
          whileHover={{ y: -6 }}
          className="absolute bottom-10 left-10 bg-white rounded-xl shadow-lg p-4 w-60"
        >
          <div className="flex items-start gap-3">
            <Key className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-800 text-sm">Your data, your rules</p>
              <p className="text-xs text-gray-500 mt-1">Client-side encryption & enterprise controls.</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ===== OTP Modal (shared theme) ===== */}
      <AnimatePresence>
        {showOTP && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 12, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 12, scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">S</div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Verify your phone</h3>
                    <p className="text-xs text-gray-500">Enter the 6-digit code sent to your number</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowOTP(false)}
                  className="text-sm text-gray-500 hover:underline"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-6 gap-2 mb-6">
                {otp.map((v, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    value={v}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    className="w-12 h-12 text-center border rounded-lg shadow-sm text-lg font-semibold text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                    inputMode="numeric"
                    maxLength={1}
                  />
                ))}
              </div>

              <div className="space-y-3">
                <motion.button
                  onClick={handleOtpVerification}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-all"
                >
                  Verify OTP
                </motion.button>

                <button
                  className="w-full text-sm text-gray-600 hover:underline"
                >
                  Resend code
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}