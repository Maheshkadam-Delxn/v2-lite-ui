'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const Features = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const features = [
    {
      title: "Real-time Project Dashboard",
      description:
        "Monitor all your projects at a glance with customizable dashboards and real-time updates.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      benefits: [
        "Customizable widgets for project metrics",
        "Real-time progress tracking",
        "Interactive Gantt charts and timelines"
      ],
      color: "blue"
    },
    {
      title: "Advanced Resource Management",
      description:
        "Efficiently allocate and track labor, materials, and equipment across multiple projects.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      benefits: [
        "Resource allocation with drag-and-drop interface",
        "Equipment utilization tracking",
        "Labor cost forecasting and optimization"
      ],
      color: "green"
    },
    {
      title: "Seamless Document Control",
      description:
        "Centralized document management with version control and approval workflows.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      benefits: [
        "Automated version control for all documents",
        "Custom approval workflows",
        "Cloud-based access from any device"
      ],
      color: "purple"
    },
  ];

  // Pre-calculate all transforms outside of the map function
  const featureTransforms = features.map((_, index) => {
    const start = index / features.length;
    const end = (index + 1) / features.length;
    
    return {
      opacity: useTransform(
        scrollYProgress,
        [start, start + 0.2, end - 0.2, end],
        [0, 1, 1, 0]
      ),
      y: useTransform(
        scrollYProgress,
        [start, start + 0.2, end - 0.2, end],
        [50, 0, 0, -50]
      ),
      scale: useTransform(
        scrollYProgress,
        [start, start + 0.2, end - 0.2, end],
        [0.95, 1, 1, 0.95]
      )
    };
  });

  // Calculate scroll progress for each feature
  const scrollProgress = useTransform(scrollYProgress, [0, 1], [0, features.length - 1]);
  
  useEffect(() => {
    const unsubscribe = scrollProgress.on("change", (latest) => {
      const index = Math.round(latest);
      if (index >= 0 && index < features.length) {
        setActiveFeature(index);
      }
    });
    
    return () => unsubscribe();
  }, [scrollProgress, features.length]);

  // Handle smooth scrolling with a delay to prevent multiple rapid clicks
  const handleDotClick = (index) => {
    if (isScrolling) return;
    
    setIsScrolling(true);
    const section = document.getElementById(`feature-${index}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveFeature(index);
    
    // Reset scrolling state after a delay
    setTimeout(() => setIsScrolling(false), 1000);
  };

  // Get color classes based on feature color
  const getColorClasses = (color) => {
    switch(color) {
      case 'blue':
        return {
          bg: 'bg-blue-50',
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          accent: 'bg-blue-500',
          text: 'text-blue-700'
        };
      case 'green':
        return {
          bg: 'bg-green-50',
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600',
          accent: 'bg-green-500',
          text: 'text-green-700'
        };
      case 'purple':
        return {
          bg: 'bg-purple-50',
          iconBg: 'bg-purple-100',
          iconColor: 'text-purple-600',
          accent: 'bg-purple-500',
          text: 'text-purple-700'
        };
      default:
        return {
          bg: 'bg-blue-50',
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          accent: 'bg-blue-500',
          text: 'text-blue-700'
        };
    }
  };

  return (
    <section id="features" ref={ref} className="relative bg-white py-20 overflow-hidden">
      <div className="container mx-auto px-4" ref={containerRef}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">
            Powerful Features
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Designed specifically for the unique needs of construction management
          </p>
        </motion.div>

        {/* Features Stack */}
        <div className="relative space-y-12 md:space-y-24">
          {features.map((feature, index) => {
            const transforms = featureTransforms[index];
            const colors = getColorClasses(feature.color);
            
            return (
              <div 
                key={index} 
                id={`feature-${index}`}
                className="min-h-screen flex items-center justify-center py-12"
              >
                <motion.div
                  style={{ 
                    opacity: transforms.opacity, 
                    y: transforms.y, 
                    scale: transforms.scale,
                  }}
                  className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 bg-white shadow-xl rounded-2xl border border-slate-100 p-6 md:p-8 lg:p-10 transition-all duration-300 hover:shadow-2xl"
                >
                  {/* Text Content - Order alternates on desktop */}
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="flex items-center mb-4">
                      <div className={`p-3 rounded-xl ${colors.iconBg} ${colors.iconColor} mr-4`}>
                        {feature.icon}
                      </div>
                      <motion.h3
                        className="text-2xl font-semibold text-slate-800"
                        initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                      >
                        {feature.title}
                      </motion.h3>
                    </div>
                    <motion.p
                      className="text-slate-600 text-lg mb-6"
                      initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      {feature.description}
                    </motion.p>
                    <ul className="space-y-3">
                      {feature.benefits.map((benefit, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start group"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                        >
                          <div className={`p-1 rounded-full ${colors.iconBg} mr-3 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform`}>
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="3"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <span className="text-slate-700 group-hover:text-slate-900 transition-colors">{benefit}</span>
                        </motion.li>
                      ))}
                    </ul>
                    <motion.button
                      className={`mt-6 px-6 py-2 rounded-lg ${colors.accent} text-white font-medium hover:opacity-90 transition-opacity`}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Learn More
                    </motion.button>
                  </div>

                  {/* Image - Order alternates on desktop */}
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                    <motion.div
                      className={`h-60 w-full rounded-xl flex items-center justify-center overflow-hidden relative ${colors.bg}`}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {/* Decorative elements */}
                      <div className="absolute top-0 left-0 w-20 h-20 -translate-x-10 -translate-y-10 rounded-full opacity-20 bg-white"></div>
                      <div className="absolute bottom-0 right-0 w-24 h-24 translate-x-12 translate-y-12 rounded-full opacity-20 bg-white"></div>
                      
                      <div className="text-center p-4 z-10">
                        <div className="w-16 h-16 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center shadow-md">
                          {feature.icon}
                        </div>
                        <p className="text-sm font-medium text-slate-700">Feature Preview</p>
                        <p className="text-xs mt-1 text-slate-500">Interactive visualization</p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Navigation Dots with labels */}
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4 z-10">
          {features.map((feature, index) => {
            const colors = getColorClasses(feature.color);
            return (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className="flex items-center justify-end group"
                aria-label={`Scroll to ${feature.title}`}
              >
                <span className={`mr-2 text-xs font-medium transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                  activeFeature === index ? colors.text : 'text-gray-500'
                }`}>
                  {feature.title.split(' ')[0]}
                </span>
                <div className={`w-3 h-3 rounded-full transition-all duration-300 flex items-center justify-center ${
                  activeFeature === index ? `${colors.accent} scale-125` : 'bg-gray-300 group-hover:bg-gray-400'
                }`}>
                  {activeFeature === index && (
                    <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Scroll progress indicator */}
        <div className="fixed left-6 top-1/2 transform -translate-y-1/2 h-40 w-1 bg-gray-200 rounded-full z-10">
          <motion.div 
            className="w-1 bg-blue-500 rounded-full"
            style={{ 
              scaleY: scrollYProgress,
              transformOrigin: "top center"
            }}
          />
        </div>

        {/* Scroll hint for desktop */}
        <motion.div 
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex items-center justify-center text-slate-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="text-sm mr-2">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;