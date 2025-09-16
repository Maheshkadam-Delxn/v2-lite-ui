// components/ProfilePage.jsx
'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Building, 
  Save, 
  Lock, 
  Briefcase,
  Settings,
  Clock,
  DollarSign,
  TrendingUp,
  Upload,
  FileSignature,
  Edit3
} from 'lucide-react';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [signature, setSignature] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const userData = {
    name: 'Alan David',
    email: 'alan.david@skystruct.com',
    position: 'Project Manager',
    department: 'Construction Management',
    phone: '+91 98765 43210',
    joinDate: '15 Mar 2022',
    employeeId: 'SKY-EMP-2287',
    address: '123 Construction Avenue, Mumbai, Maharashtra - 400001',
    bio: 'Experienced project manager with 8+ years in construction industry. Specialized in high-rise commercial projects and resource management.'
  };

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length && files[0].type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSignature(event.target.result);
      };
      reader.readAsDataURL(files[0]);
    }
  }, []);

  const handleFileSelect = useCallback((e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSignature(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Overview</h1>
              <p className="text-gray-600">Manage your personal information and view project statistics</p>
            </div>

            {/* Profile Navigation Menu */}
            <div className="relative group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-lg font-bold cursor-pointer shadow-lg hover:shadow-xl transition-all"
              >
                AD
              </motion.div>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 top-14 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors">
                  <User size={16} />
                  My Profile
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors">
                  <Briefcase size={16} />
                  My Projects
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors">
                  <Building size={16} />
                  Company
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors">
                  <Settings size={16} />
                  Settings
                </a>
                <hr className="my-2 border-gray-200" />
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Log Out
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Profile & Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1 h-full"
          >
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden h-full flex flex-col">
              {/* Profile Header */}
              <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 px-8 py-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                
                <div className="text-center relative z-10">
                  <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-6 shadow-2xl ring-4 ring-white/20">
                    AD
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">{userData.name}</h2>
                  <p className="text-blue-100 font-semibold text-lg">{userData.position}</p>
                  <p className="text-blue-200 text-sm mt-1">{userData.department}</p>
                  
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mt-4">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-white text-sm font-medium">Active</span>
                  </div>
                </div>
              </div>

              {/* Profile Details */}
              <div className="p-8 space-y-6 flex-1">
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                  <div className="w-12 h-12 bg-blue-400 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 font-bold uppercase tracking-wide">Email</p>
                    <p className="text-gray-900 font-semibold">{userData.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                  <div className="w-12 h-12 bg-blue-400 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 font-bold uppercase tracking-wide">Phone</p>
                    <p className="text-gray-900 font-semibold">{userData.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                  <div className="w-12 h-12 bg-blue-400 rounded-xl flex items-center justify-center">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 font-bold uppercase tracking-wide">Employee ID</p>
                    <p className="text-gray-900 font-semibold">{userData.employeeId}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                  <div className="w-12 h-12 bg-blue-400 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 font-bold uppercase tracking-wide">Join Date</p>
                    <p className="text-gray-900 font-semibold">{userData.joinDate}</p>
                  </div>
                </div>
              </div>
{/*signature box*/}
               <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 text-center">
                  <p className="text-xs text-blue-600 font-bold uppercase mb-3">Signature</p>
                  {signature ? (
                    <img src={signature} alt="Signature" className="mx-auto max-h-20 object-contain" />
                  ) : (
                    <div className="flex flex-col items-center">
                      <FileSignature className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-gray-500 text-sm">No signature uploaded</p>
                    </div>
                  )}
                </div>

              <div className="p-8 pt-0">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white py-4 px-6 rounded-2xl font-bold hover:from-gray-900 hover:to-black transition-all shadow-lg hover:shadow-xl"
                >
                  <Lock size={18} />
                  Change Password
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Personal Info Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2 h-full"
          >
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 h-full flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Personal Information</h3>
                  <p className="text-gray-600">Update your personal details and contact information</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 bg-blue-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-600 transition-all shadow-md hover:shadow-lg"
                >
                  {isEditing ? <Save size={16} /> : <Edit3 size={16} />}
                  {isEditing ? 'Save' : 'Edit'}
                </motion.button>
              </div>
              
              {/* Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="text-sm font-bold text-gray-700 block mb-3">Full Name</label>
                  <input
                    type="text"
                    defaultValue={userData.name}
                    disabled={!isEditing}
                    className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100 disabled:text-gray-500 font-semibold"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-gray-700 block mb-3">Email Address</label>
                  <input
                    type="email"
                    defaultValue={userData.email}
                    disabled={!isEditing}
                    className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100 disabled:text-gray-500 font-semibold"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-gray-700 block mb-3">Phone Number</label>
                  <input
                    type="tel"
                    defaultValue={userData.phone}
                    disabled={!isEditing}
                    className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100 disabled:text-gray-500 font-semibold"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-gray-700 block mb-3">Position</label>
                  <input
                    type="text"
                    defaultValue={userData.position}
                    disabled={!isEditing}
                    className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100 disabled:text-gray-500 font-semibold"
                  />
                </div>
              </div>
              <div className="mb-8">
                <label className="text-sm font-bold text-gray-700 block mb-3">Address</label>
                <input
                  type="text"
                  defaultValue={userData.address}
                  disabled={!isEditing}
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100 disabled:text-gray-500 font-semibold"
                />
              </div>
              <div className="mb-8">
                <label className="text-sm font-bold text-gray-700 block mb-3">Bio</label>
                <textarea
                  defaultValue={userData.bio}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100 disabled:text-gray-500 resize-none font-medium"
                />
              </div>
              
              {/* Signature Upload Section */}
              <div className="mb-8 flex-1">
                <label className="text-sm font-bold text-gray-700 block mb-3">Signature</label>
                <div 
                  className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                    isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-blue-300'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('signature-upload').click()}
                >
                  {signature ? (
                    <div className="flex flex-col items-center">
                      <img src={signature} alt="Signature" className="max-h-32 mb-4 rounded-md" />
                      <p className="text-blue-500 font-medium">Click or drag to replace signature</p>
                    </div>
                  ) : (
                    <>
                      <FileSignature className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2 font-medium">Drag & drop your signature here</p>
                      <p className="text-gray-500 text-sm mb-4">or</p>
                      <div className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg font-medium">
                        <Upload size={16} />
                        Browse Files
                      </div>
                    </>
                  )}
                  <input 
                    id="signature-upload"
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleFileSelect}
                  />
                </div>
                <p className="text-gray-500 text-xs mt-3">Supported formats: JPG, PNG, SVG. Max file size: 2MB</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
