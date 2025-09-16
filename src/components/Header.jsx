// components/Header.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Header = ({ isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Features', href: '#features' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <div className="container mx-auto px-4 h-full flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-slate-900 h-10 w-10 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white font-bold text-xl">SS</span>
          </div>
          <span className={`font-bold ${isScrolled ? 'text-xl' : 'text-2xl'} transition-all duration-300`}>
            SkyStruct <span className="text-blue-500">V2</span> Lite
          </span>
        </motion.div>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-8">
        {menuItems.map((item, index) => (
          <motion.a
            key={item.name}
            href={item.href}
            className="text-slate-700 hover:text-blue-500 transition-colors"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {item.name}
          </motion.a>
        ))}
      </nav>

      {/* Auth Buttons */}
      <div className="hidden md:flex items-center space-x-4">
        <motion.a
          href="/login"
          className="px-4 py-2 text-slate-700 hover:text-blue-500 transition-colors"
          whileHover={{ scale: 1.05 }}
        >
          Sign In
        </motion.a>
        <motion.a
          href="/register"
          className="px-6 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.a>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden flex flex-col space-y-1.5"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span className={`w-6 h-0.5 bg-slate-900 transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`w-6 h-0.5 bg-slate-900 transition-opacity ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
        <span className={`w-6 h-0.5 bg-slate-900 transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col p-4 space-y-4">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-slate-700 hover:text-blue-500 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <a
                href="/auth/sign-in"
                className="block text-center py-2 text-slate-700 hover:text-blue-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </a>
              <a
                href="/auth/sign-up"
                className="block text-center py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Header;