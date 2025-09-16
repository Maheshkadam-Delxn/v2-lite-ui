// components/Hero.jsx
'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });
  
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background with layered gradients */}
      <motion.div 
        className="absolute inset-0 z-0 bg-gradient-to-br from-blue-50 via-white to-blue-100"
        style={{ y: yBg }}
      />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 z-5 bg-grid-pattern opacity-5" />
      
      {/* Animated gradient overlay */}
      <motion.div 
        className="absolute inset-0 z-6 bg-gradient-to-r from-blue-500/5 to-blue-700/5"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
      />
      
      <div className="container mx-auto px-4 z-20 relative">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="inline-flex items-center bg-white/80 backdrop-blur-md rounded-full px-4 py-2 mb-6 shadow-sm border border-blue-100"
          >
            <span className="h-2 w-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
            <span className="text-sm font-medium text-slate-700">Now with AI-powered insights</span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Transform Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 relative">
              Construction
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-1.5 bg-blue-100 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
            </span>{' '}
            Workflow
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            SkyStruct V2 Lite streamlines your construction projects from planning to completion with powerful tools and intuitive workflows designed for the modern construction industry.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <motion.a
              href="/auth/sign-up"
              className="px-8 py-4 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors shadow-lg flex items-center justify-center group"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Start Free Trial</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </motion.a>
            <motion.a
              href="#features"
              className="px-8 py-4 bg-white/80 backdrop-blur-md text-slate-700 border border-slate-200 rounded-xl font-medium hover:border-blue-400 hover:text-blue-600 transition-colors shadow-sm flex items-center justify-center group"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>See Features</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </motion.a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div 
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="flex items-center">
              <div className="flex -space-x-2 mr-2">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white"></div>
                ))}
              </div>
              <span>Used by 500+ companies</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-slate-300"></div>
            <div className="flex items-center">
              <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>4.9/5 from 1.2k reviews</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Enhanced scroller indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center text-slate-600"
        >
          <span className="text-xs mb-2 font-medium">Scroll to explore</span>
          <div className="w-5 h-8 border border-slate-400 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-2 bg-slate-500 rounded-full mt-2"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;