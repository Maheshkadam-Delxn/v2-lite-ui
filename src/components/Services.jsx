// components/Services.jsx
'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';

const Services = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], ['30%', '0%']);

  const services = [
    {
      title: "Project Management",
      description: "End-to-end project tracking from planning to completion with real-time updates and status monitoring.",
      icon: "📊"
    },
    {
      title: "Resource Planning",
      description: "Efficiently manage labor, materials, and equipment with advanced resource allocation tools.",
      icon: "👷"
    },
    {
      title: "Document Control",
      description: "Centralized document management for drawings, BOQs, and project documentation with version control.",
      icon: "📁"
    },
    {
      title: "Inventory Management",
      description: "Track materials, stock levels, and supply chain logistics in real-time across all projects.",
      icon: "📦"
    },
    {
      title: "Payment Processing",
      description: "Streamlined financial workflows for indents, purchase orders, bills, and vendor payments.",
      icon: "💰"
    },
    {
      title: "Reporting & Analytics",
      description: "Comprehensive reports and data visualization for informed decision-making and project insights.",
      icon: "📈"
    }
  ];

  // Variants for stacked reveal animation
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.25, // delay between cards
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      }
    }
  };

  return (
    <section id="services" ref={ref} className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          style={{ opacity, y }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Comprehensive Construction Management
          </motion.h2>
          <motion.p 
            className="text-xl text-slate-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            All the tools you need to manage construction projects efficiently and effectively.
          </motion.p>
        </motion.div>
        
        {/* Stacked reveal animation wrapper */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-blue-50 rounded-xl p-6 border border-blue-100 hover:border-blue-300 transition-colors relative"
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-slate-600">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
