"use client";
import React, { useState } from "react";
import {
  Mail,
  Lock,
  Phone,
  Globe,
  User,
  Briefcase,
  Building,
  Shield,
  Award,
  ArrowRight,
  AlertCircle
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SkyStructRegister() {
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
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!formData.name || !formData.email || !formData.phone_number || !formData.password || !role) {
        setError("All fields are required");
        setLoading(false);
        return;
      }

      if (role === "member" && !subRole) {
        setError("Sub-role is required for member");
        setLoading(false);
        return;
      }

      const userData = {
        name: formData.name,
        email: formData.email,
        phone_number: formData.countryCode + formData.phone_number,
        password: formData.password,
        role: role,
        memberRole: role === "member" ? subRole : null
      };

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
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

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <div className="h-screen flex bg-slate-50 overflow-hidden">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-4 relative">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-orange-50 rounded-full opacity-20 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-slate-100 rounded-full opacity-30 blur-3xl translate-x-1/3 translate-y-1/3"></div>

        <div className="w-full max-w-sm relative z-10">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center mr-3">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-slate-800">SkyStruct</span>
                <span className="text-xs bg-orange-600 text-white px-2 py-1 rounded ml-2 font-bold">
                  v2lite
                </span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">
              Join SkyStruct
            </h1>
            <p className="text-slate-600 text-sm">
              Create your construction management account
            </p>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs">{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
              <Shield className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs">{success}</span>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name & Email Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800 placeholder-slate-400 text-sm"
                    placeholder="John Doe"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800 placeholder-slate-400 text-sm"
                    placeholder="you@company.com"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Role</label>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800 text-sm appearance-none"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    disabled={loading}
                  >
                    <option value="">Select role</option>
                    <option value="superadmin">Super Admin</option>
                    <option value="vendor">Vendor</option>
                    <option value="member">Team Member</option>
                  </select>
                </div>

                {role === "member" && (
                  <div className="flex-1 relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select
                      className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800 text-sm appearance-none"
                      value={subRole}
                      onChange={(e) => setSubRole(e.target.value)}
                      required
                      disabled={loading}
                    >
                      <option value="">Specialty</option>
                      <option value="project-admin">Project Admin</option>
                      <option value="consultant">Consultant</option>
                      <option value="contractor">Contractor</option>
                      <option value="approver">Approver</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
              <div className="flex gap-2">
                <div className="relative">
                  <Globe className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                    className="pl-8 pr-2 py-2.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800 text-sm appearance-none w-20"
                    disabled={loading}
                  >
                    <option value="+91">🇮🇳</option>
                    <option value="+1">🇺🇸</option>
                    <option value="+44">🇬🇧</option>
                    <option value="+61">🇦🇺</option>
                    <option value="+971">🇦🇪</option>
                  </select>
                </div>
                <div className="flex-1 relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800 placeholder-slate-400 text-sm"
                    placeholder="98765 43210"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800 placeholder-slate-400 text-sm"
                  placeholder="Create a strong password"
                  required
                  disabled={loading}
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Include uppercase, lowercase, number & special character
              </p>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-4 text-center">
            <p className="text-slate-600 text-sm">
              Already have an account?{" "}
              <button
                onClick={handleLoginClick}
                className="text-orange-600 hover:text-orange-700 font-semibold"
              >
                Sign In
              </button>
            </p>
          </div>

          <div className="mt-3 text-xs text-slate-500 text-center">
            By creating an account you agree to our{" "}
            <a href="#terms" className="text-slate-600 hover:underline">Terms</a>{" "}
            and{" "}
            <a href="#privacy" className="text-slate-600 hover:underline">Privacy Policy</a>
          </div>
        </div>
      </div>

      {/* Right Side - Construction Theme */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-slate-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/image.jpeg"
            alt="Construction site background"
            fill
            className="object-cover opacity-40"
            quality={100}
            priority
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/70 via-slate-800/60 to-slate-900/80"></div>

        <div className="relative z-10 text-center text-white max-w-md px-6">
          <div className="w-16 h-16 bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto shadow-lg mb-6">
            <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
              <Building className="w-7 h-7 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4">Join SkyStruct</h2>
          <p className="text-slate-200 text-lg mb-8">
            Connect with construction professionals worldwide
          </p>

          <div className="flex justify-center gap-3 mb-8">
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg text-white text-sm font-medium flex items-center gap-2 border border-white/20">
              <Shield className="w-4 h-4" />
              Secure
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg text-white text-sm font-medium flex items-center gap-2 border border-white/20">
              <Award className="w-4 h-4" />
              Trusted
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-orange-400">500+</div>
              <div className="text-xs text-slate-300">Companies</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-400">94%</div>
              <div className="text-xs text-slate-300">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}