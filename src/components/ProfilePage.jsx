'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, Lock, Signature, Info, LogOut } from 'lucide-react';



const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const userData = {
    name: 'Alan David',
    email: 'vijyipa4378@acedby.com',
    mobile: '+919764585655',
    organization: 'Alan David',
    department: 'Architectural',
    grade: 'A',
    staffNo: '1',
    language: 'English',
    receiverEmail: 'notifications+bi.da@email.skystuct.com',
    signature: 'https://via.placeholder.com/150',
  };

  const handleUpdate = () => {
    setIsEditing(false);
    // Add update logic here
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.div 
        className="bg-white w-64 h-full border-r border-slate-200 flex flex-col shadow-sm"
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="p-6 border-b border-slate-200">
          <Link href="/" className="flex items-center group">
            <div className="bg-slate-900 h-7 w-7 rounded-md flex items-center justify-center group-hover:bg-slate-800 transition-colors duration-300">
              <span className="text-white font-extrabold text-sm">SS</span>
            </div>
            <motion.div 
              className="ml-2 min-w-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <span className="font-extrabold text-lg text-slate-900 group-hover:text-slate-700 transition-colors duration-300 truncate">
                SkyStruct
              </span>
            </motion.div>
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-6 space-y-2">
            <Link href="/profile" className="flex items-center px-4 py-3 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-slate-900 hover:shadow-sm transition-all duration-300">
              <User className="w-6 h-6 text-slate-500 mr-2" />
              <span className="font-extrabold text-base">Profile</span>
            </Link>
            <Link href="/dashboard" className="flex items-center px-4 py-3 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-slate-900 hover:shadow-sm transition-all duration-300">
              <Mail className="w-6 h-6 text-slate-500 mr-2" />
              <span className="font-extrabold text-base">Dashboard</span>
            </Link>
            <Link href="/logout" className="flex items-center px-4 py-3 rounded-lg text-slate-700 hover:bg-red-50 hover:text-red-700 hover:shadow-sm transition-all duration-300">
              <LogOut className="w-6 h-6 text-slate-500 mr-2" />
              <span className="font-extrabold text-base">Logout</span>
            </Link>
          </div>
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-extrabold text-2xl text-slate-900">Profile</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              className="bg-gray-50 p-4 rounded-lg border border-slate-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden">
                  <img src="https://via.placeholder.com/80" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="font-extrabold text-xl text-slate-900">{userData.name}</h2>
                  <p className="text-sm text-slate-500">{userData.email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-slate-500 mr-2" />
                  <span className="font-semibold text-sm">{userData.mobile}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-slate-500 mr-2" />
                  <span className="font-semibold text-sm">{userData.email}</span>
                </div>
                <div className="flex items-center">
                  <Info className="w-5 h-5 text-slate-500 mr-2" />
                  <span className="font-semibold text-sm">About</span>
                </div>
                <div className="ml-7 space-y-2 text-sm text-slate-600">
                  <p>Phone: {userData.mobile}</p>
                  <p>Email: {userData.email}</p>
                  <p>Discipline: {userData.department}</p>
                  <p>Organization Name: {userData.organization}</p>
                  <p>Receiver Email: {userData.receiverEmail}</p>
                </div>
              </div>
            </motion.div>

            <div className="space-y-4">
              {[
                { label: 'Name', value: userData.name, icon: User },
                { label: 'Email', value: userData.email, icon: Mail },
                { label: 'Mobile No', value: userData.mobile, icon: Phone },
                { label: 'Organization Name', value: userData.organization, icon: Info },
                { label: 'Department', value: userData.department, icon: Info },
                { label: 'Staff No', value: userData.staffNo, icon: Info },
                { label: 'Grade', value: userData.grade, icon: Info },
                { label: 'Preferred Language', value: userData.language, icon: Info },
                { label: 'Receiver Email', value: userData.receiverEmail, icon: Mail },
                { label: 'Password', value: '********', icon: Lock },
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center p-3 bg-gray-50 rounded-lg border border-slate-200 hover:bg-gray-100 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <item.icon className="w-5 h-5 text-slate-500 mr-3" />
                  <div className="flex-1">
                    <label className="text-sm text-slate-600 font-semibold">{item.label}</label>
                    <input
                      type={item.label === 'Password' ? 'password' : 'text'}
                      value={item.value}
                      readOnly={!isEditing}
                      className="w-full bg-transparent text-sm text-slate-900 font-medium focus:outline-none"
                    />
                  </div>
                </motion.div>
              ))}

              <motion.div 
                className="flex items-center p-3 bg-gray-50 rounded-lg border border-slate-200 hover:bg-gray-100 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <Signature className="w-5 h-5 text-slate-500 mr-3" />
                <div className="flex-1">
                  <label className="text-sm text-slate-600 font-semibold">Signature</label>
                  <div className="w-full">
                    <img src={userData.signature} alt="Signature" className="w-32 h-auto" />
                  </div>
                </div>
              </motion.div>

              <motion.button
                onClick={handleUpdate}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Update
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;