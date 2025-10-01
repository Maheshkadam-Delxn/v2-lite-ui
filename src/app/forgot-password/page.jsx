'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, AlertCircle, ShieldCheck, Key, ArrowLeft, Lock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const [currentStep, setCurrentStep] = useState('email'); // 'email', 'otp', 'reset'
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const router = useRouter();

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_PATH;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'otp') setOtp(value);
    if (name === 'newPassword') setNewPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
    if (error) setError(''); // clear old errors on typing
  };

  const validatePasswords = () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`${baseUrl}/api/password/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      // Log full response for debugging
      console.log('Response status:', res.status);
      console.log('Response headers:', res.headers.get('content-type'));

      if (!res.ok) {
        // Handle non-JSON errors (e.g., HTML from Vercel)
        let errorMsg = `HTTP ${res.status}: `;
        if (res.status === 404) errorMsg += 'API route not found. Check deployment.';
        if (res.status === 405) errorMsg += 'Method not allowed. Ensure POST handler is exported.';
        const text = await res.text(); // Read as text instead of JSON
        console.error('Response body (text):', text);
        setError(errorMsg);
        return;
      }

      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await res.text();
        console.error('Non-JSON response:', text);
        setError('Server returned invalid response format.');
        return;
      }

      const data = await res.json();
      console.log('Forgot password response:', data);

      if (!data.success) {
        setError(data.message || 'Failed to send OTP. Please try again.');
        return;
      }

      setSubmittedEmail(email);
      setSuccess('OTP sent to your email. Enter the code below to continue.');
      setCurrentStep('otp');
    } catch (err) {
      console.error('Forgot password error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!submittedEmail) return;
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`${baseUrl}/api/password/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: submittedEmail }),
      });

      const data = await res.json();
      console.log('Resend OTP response:', data);

      if (!res.ok || !data.success) {
        setError(data.message || 'Failed to resend OTP. Please try again.');
        return;
      }

      setSuccess('OTP resent to your email. Enter the code below to continue.');
      setOtp(''); // Clear OTP on resend
    } catch (err) {
      console.error('Resend OTP error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`${baseUrl}/api/password/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: submittedEmail, otp }),
      });

      const data = await res.json();
      console.log('Verify OTP response:', data);

      if (!res.ok || !data.success) {
        setError(data.message || 'Invalid or expired OTP. Please try again.');
        return;
      }

      setSuccess('OTP verified successfully. Please enter your new password.');
      setCurrentStep('reset');
    } catch (err) {
      console.error('Verify OTP error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!validatePasswords()) return;
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`${baseUrl}/api/password/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: submittedEmail, newPassword }),
      });

      const data = await res.json();
      console.log('Reset password response:', data);

      if (!res.ok || !data.success) {
        setError(data.message || 'Failed to reset password. Please try again.');
        return;
      }

      setSuccess('Password reset successfully. Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (err) {
      console.error('Reset password error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderEmailStep = () => (
    <form className="space-y-4" onSubmit={handleSubmitEmail}>
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
            value={email}
            onChange={handleInputChange}
            className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"
            placeholder="you@company.com"
            aria-label="Email address"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Send OTP Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isLoading || !email}
        className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-gray-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Sending OTP...
          </div>
        ) : (
          "Send OTP"
        )}
      </motion.button>
    </form>
  );

  const renderOtpStep = () => (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">Enter the 6-digit code sent to {submittedEmail}.</p>
      <form className="space-y-4" onSubmit={handleVerifyOtp}>
        {/* OTP */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Verification Code
          </label>
          <div className="flex items-center gap-3 px-4 py-3 border rounded-xl bg-white focus-within:ring-2 focus-within:ring-blue-500 shadow-sm">
            <Key className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={handleInputChange}
              maxLength={6}
              className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 text-center text-lg tracking-widest"
              placeholder="000000"
              aria-label="Verification code"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Verify OTP Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading || otp.length !== 6}
          className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-gray-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Verifying...
            </div>
          ) : (
            "Verify OTP"
          )}
        </motion.button>
      </form>

      {/* Resend Button */}
      <div className="pt-2">
        <motion.button
          type="button"
          onClick={handleResendOtp}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
          className="w-full text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
        >
          Didn't receive the code? Resend OTP
        </motion.button>
      </div>
    </div>
  );

  const renderResetStep = () => (
    <form className="space-y-4" onSubmit={handleResetPassword}>
      {/* Email (readonly) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email address
        </label>
        <div className="flex items-center gap-3 px-4 py-3 border rounded-xl bg-gray-50">
          <Mail className="w-5 h-5 text-gray-400" />
          <input
            type="email"
            value={submittedEmail}
            readOnly
            className="flex-1 bg-transparent outline-none text-gray-800 cursor-not-allowed"
            aria-label="Email address"
          />
        </div>
      </div>

      {/* New Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          New Password
        </label>
        <div className="flex items-center justify-between px-4 py-3 border rounded-xl bg-white focus-within:ring-2 focus-within:ring-blue-500 shadow-sm">
          <div className="flex items-center gap-3 flex-1">
            <Lock className="w-5 h-5 text-gray-400" />
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              value={newPassword}
              onChange={handleInputChange}
              className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"
              placeholder="Enter new password"
              aria-label="New password"
              required
              disabled={isLoading}
            />
          </div>
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
            disabled={isLoading}
          >
            {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Confirm New Password
        </label>
        <div className="flex items-center justify-between px-4 py-3 border rounded-xl bg-white focus-within:ring-2 focus-within:ring-blue-500 shadow-sm">
          <div className="flex items-center gap-3 flex-1">
            <Lock className="w-5 h-5 text-gray-400" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
              className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"
              placeholder="Confirm new password"
              aria-label="Confirm new password"
              required
              disabled={isLoading}
            />
          </div>
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
            disabled={isLoading}
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Reset Password Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isLoading || newPassword !== confirmPassword || newPassword.length < 6}
        className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-gray-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Resetting Password...
          </div>
        ) : (
          "Reset Password"
        )}
      </motion.button>
    </form>
  );

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
          <div className="flex items-center mb-6">
            <button
              onClick={() => router.back()}
              className="flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Sign In
            </button>
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            Reset Your Password
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            {currentStep === 'email' && "Enter your email address and we'll send you an OTP to reset your password."}
            {currentStep === 'otp' && "Enter the 6-digit verification code sent to your email."}
            {currentStep === 'reset' && "Create a new password for your account."}
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

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700 text-sm"
            >
              <ShieldCheck className="w-4 h-4" />
              {success}
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {currentStep === 'email' && renderEmailStep()}
            {currentStep === 'otp' && renderOtpStep()}
            {currentStep === 'reset' && renderResetStep()}
          </AnimatePresence>

          <div className="mt-5 text-sm text-gray-600 text-center">
            Remember your password?{" "}
            <Link
              href="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign In
            </Link>
          </div>

          <div className="mt-4 text-xs text-gray-400 text-center">
            By requesting a reset, you agree to our{" "}
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