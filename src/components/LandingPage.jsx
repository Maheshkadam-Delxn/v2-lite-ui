// components/LandingPage.jsx
'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Header from './landing/Header';
import Hero from './landing/Hero';
import Services from './landing/Services';
import Process from './landing/Process';
import Features from './landing/Features';
import Testimonials from './landing/Testimonials';
import Footer from './landing/Footer';
import SkyStructPricing from './landing/SkyStructPricing ';
const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.95)']
  );

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
    });
    
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <div className="font-lato text-slate-800 overflow-x-hidden">
      <motion.header 
        className="fixed w-full z-50 transition-all duration-300"
        style={{ backgroundColor }}
        animate={{
          boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.08)' : 'none',
          height: isScrolled ? '70px' : '90px'
        }}
      >
        <Header isScrolled={isScrolled} />
      </motion.header>
      
      <main>
        <Hero />
        <Features />
          <Services />
        <SkyStructPricing/>
        <Process />
        <Testimonials />
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage;