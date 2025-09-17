
"use client";
import React, { useState } from "react";
import {
  Mail,
  Lock,
  Building,
  Eye,
  EyeOff,
  AlertCircle,
  Shield,
  Award,
} from "lucide-react";
import Image from "next/image";

// Shared styles for reusability
const styles = {
  inputField: "w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800 placeholder-slate-400 transition-all",
  button: "w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed",
  badge: "bg-slate-700/80 backdrop-blur-sm px-4 py-2 rounded-lg text-white text-sm font-medium flex items-center gap-2 border border-slate-600 hover:bg-slate-600/80 transition-colors",
};

export default function SkyStructLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  // Form validation
  const validateForm = () => {
    if (!credentials.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!credentials.password.trim()) {
      setError("Password is required");
      return false;
    }
    if (credentials.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Login successful with credentials:", credentials);
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to sign in. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle image load
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Handle image error
  const handleImageError = () => {
    console.error("Failed to load background image: /image.jpeg");
    setImageLoaded(true); // Prevent infinite loading state
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mr-3">
                <Building className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-slate-800">SkyStruct</span>
                <span className="text-sm bg-orange-600 text-white px-2 py-1 rounded ml-2 font-semibold">
                  v2lite
                </span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome Back</h1>
            <p className="text-slate-600">Sign in to your construction management platform</p>
          </div>

          {/* Error Message */}
          {error && (
            <div
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700"
              role="alert"
              aria-live="assertive"
            >
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleInputChange}
                  className={styles.inputField}
                  placeholder="you@company.com"
                  disabled={isLoading}
                  aria-describedby={error && credentials.email === "" ? "email-error" : undefined}
                  aria-required="true"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  className={styles.inputField}
                  placeholder="Enter your password"
                  disabled={isLoading}
                  aria-describedby={error && credentials.password === "" ? "password-error" : undefined}
                  aria-required="true"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                  disabled={isLoading}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-slate-300 rounded"
                  disabled={isLoading}
                />
                <label htmlFor="remember-me" className="ml-2 text-sm text-slate-700">
                  Remember me
                </label>
              </div>
              <a
                href="#forgot"
                className="text-sm text-orange-600 hover:text-orange-700 font-medium focus-visible:underline focus-visible:outline-none"
              >
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <button type="submit" disabled={isLoading} className={styles.button}>
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                "Sign In to SkyStruct"
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-orange-600 hover:text-orange-700 font-semibold focus-visible:underline focus-visible:outline-none"
              >
                Request Access
              </a>
            </p>
          </div>

          <div className="mt-4 text-xs text-slate-500 text-center">
            By signing in you agree to our{" "}
            <a href="#terms" className="text-slate-600 hover:underline focus-visible:underline">
              Terms
            </a>{" "}
            and{" "}
            <a href="#privacy" className="text-slate-600 hover:underline focus-visible:underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>

      {/* Right Side - Professional Construction Theme */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-slate-800 relative overflow-hidden">
        {/* Construction Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/image.jpeg"
            alt="Construction site background"
            fill
            style={{ objectFit: "cover" }}
            quality={85}
            className={`opacity-50 transition-opacity duration-500 ${imageLoaded ? "opacity-50" : "opacity-0"}`}
            priority
            onLoad={handleImageLoad}
            onError={handleImageError}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Loading placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-slate-800 animate-pulse"></div>
          )}
        </div>

        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/70 to-slate-900/50 z-10"></div>

        {/* Main Content */}
        <div className="relative z-20 text-center text-white max-w-lg px-8">
          {/* Logo */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center mx-auto shadow-lg mb-6">
              <div className="w-14 h-14 bg-slate-700 rounded-lg flex items-center justify-center">
                <Building className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4">SkyStruct v2lite</h2>
            <p className="text-slate-200 text-lg">
              Professional construction project management platform for modern teams.
            </p>
          </div>

          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <div className={styles.badge}>
              <Shield className="w-4 h-4" />
              Enterprise Security
            </div>
            <div className={styles.badge}>
              <Award className="w-4 h-4" />
              Industry Leading
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400 mb-1">500+</div>
              <div className="text-sm text-slate-200">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400 mb-1">94%</div>
              <div className="text-sm text-slate-200">On-Time Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400 mb-1">$2.4B</div>
              <div className="text-sm text-slate-200">Projects Managed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400 mb-1">99.9%</div>
              <div className="text-sm text-slate-200">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}