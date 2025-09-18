// // 'use client';

// // import { motion, useInView } from 'framer-motion';
// // import { useRef, useState } from 'react';

// // const Features = () => {
// //   const [activeTab, setActiveTab] = useState(0);
// //   const sectionRef = useRef(null);
// //   const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

// //   const features = [
// //     {
// //       id: 'dashboard',
// //       title: "Project Command Center",
// //       subtitle: "Centralized Control",
// //       description: "Unified dashboard providing real-time visibility across all construction projects with advanced analytics and predictive insights for informed decision-making.",
// //       icon: (
// //         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z"/>
// //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 21l4-7 4 7"/>
// //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 13V9"/>
// //         </svg>
// //       ),
// //       features: [
// //         "Real-time project status with milestone tracking",
// //         "Customizable executive dashboards and KPIs",
// //         "Predictive analytics for timeline optimization",
// //         "Mobile-responsive interface for field operations"
// //       ],
// //       stats: { metric: "35%", description: "Faster decision making" }
// //     },
// //     {
// //       id: 'resources',
// //       title: "Resource Optimization",
// //       subtitle: "Smart Allocation",
// //       description: "Intelligent resource management system that optimizes labor, materials, and equipment allocation across multiple construction projects.",
// //       icon: (
// //         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
// //         </svg>
// //       ),
// //       features: [
// //         "Automated equipment scheduling and utilization tracking",
// //         "Workforce allocation with skills-based assignment",
// //         "Material procurement with cost optimization",
// //         "Resource performance analytics and reporting"
// //       ],
// //       stats: { metric: "28%", description: "Resource cost reduction" }
// //     },
// //     {
// //       id: 'compliance',
// //       title: "Document Management",
// //       subtitle: "Digital Control",
// //       description: "Comprehensive document control system with automated compliance tracking, version management, and streamlined approval workflows.",
// //       icon: (
// //         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
// //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 2v4h4"/>
// //         </svg>
// //       ),
// //       features: [
// //         "Automated compliance verification and alerts",
// //         "Digital approval workflows with e-signatures",
// //         "Version control with comprehensive audit trails",
// //         "Secure cloud storage with instant field access"
// //       ],
// //       stats: { metric: "85%", description: "Faster approvals" }
// //     },
// //     {
// //       id: 'safety',
// //       title: "Safety Management",
// //       subtitle: "Zero Incidents",
// //       description: "Advanced safety monitoring system with incident tracking, training management, and comprehensive regulatory compliance automation.",
// //       icon: (
// //         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
// //         </svg>
// //       ),
// //       features: [
// //         "Digital safety inspections with mobile checklists",
// //         "Incident reporting with photo documentation",
// //         "Training certification tracking and renewals",
// //         "OSHA compliance monitoring with automated reports"
// //       ],
// //       stats: { metric: "75%", description: "Incident reduction" }
// //     }
// //   ];

// //   const containerVariants = {
// //     hidden: { opacity: 0 },
// //     visible: {
// //       opacity: 1,
// //       transition: {
// //         staggerChildren: 0.15,
// //         delayChildren: 0.1
// //       }
// //     }
// //   };

// //   const itemVariants = {
// //     hidden: { opacity: 0, y: 30 },
// //     visible: {
// //       opacity: 1,
// //       y: 0,
// //       transition: {
// //         duration: 0.6,
// //         ease: "easeOut"
// //       }
// //     }
// //   };

// //   return (
// //     <section id="features" ref={sectionRef} className="py-20 lg:py-32 bg-slate-50 relative overflow-hidden">
// //       {/* Background Elements */}
// //       <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
// //       <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
// //       <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-800/5 rounded-full blur-3xl"></div>

// //       <div className="container mx-auto px-6 lg:px-8 relative">
// //         {/* Section Header */}
// //         <motion.div
// //           className="text-center mb-16 lg:mb-20"
// //           initial={{ opacity: 0, y: 30 }}
// //           animate={isInView ? { opacity: 1, y: 0 } : {}}
// //           transition={{ duration: 0.8 }}
// //         >
// //           <motion.div
// //             className="inline-flex items-center bg-white/90 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-blue-100 shadow-sm"
// //             initial={{ scale: 0.9, opacity: 0 }}
// //             animate={isInView ? { scale: 1, opacity: 1 } : {}}
// //             transition={{ delay: 0.2, duration: 0.6 }}
// //           >
// //             <span className="h-2 w-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
// //             <span className="text-sm font-medium text-slate-700">Enterprise Construction Tools</span>
// //           </motion.div>
          
// //           <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-900 max-w-4xl mx-auto leading-tight">
// //             Engineered for{' '}
// //             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-slate-800">
// //               Construction Excellence
// //             </span>
// //           </h2>
          
// //           <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
// //             Comprehensive construction management platform designed to streamline operations, enhance safety, and drive project success from groundbreaking to completion.
// //           </p>
// //         </motion.div>

// //         {/* Tab Navigation */}
// //         <motion.div
// //           className="flex flex-wrap justify-center gap-3 mb-16"
// //           variants={containerVariants}
// //           initial="hidden"
// //           animate={isInView ? "visible" : "hidden"}
// //         >
// //           {features.map((feature, index) => (
// //             <motion.button
// //               key={feature.id}
// //               variants={itemVariants}
// //               onClick={() => setActiveTab(index)}
// //               className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
// //                 activeTab === index
// //                   ? 'bg-gradient-to-r from-blue-600 to-slate-800 text-white shadow-lg shadow-blue-500/25 scale-105'
// //                   : 'bg-white/80 backdrop-blur-sm text-slate-600 border border-slate-200 hover:bg-white hover:border-blue-200 hover:scale-102'
// //               }`}
// //               whileHover={{ y: -2 }}
// //               whileTap={{ scale: 0.98 }}
// //             >
// //               <span className={`w-5 h-5 mr-3 ${activeTab === index ? 'text-white' : 'text-blue-600'}`}>
// //                 {feature.icon}
// //               </span>
// //               <span className="text-sm lg:text-base font-semibold">{feature.title.split(' ')[0]}</span>
// //             </motion.button>
// //           ))}
// //         </motion.div>

// //         {/* Active Feature Display */}
// //         <motion.div
// //           key={activeTab}
// //           className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
// //           initial={{ opacity: 0, x: 20 }}
// //           animate={{ opacity: 1, x: 0 }}
// //           transition={{ duration: 0.6, ease: "easeOut" }}
// //         >
// //           {/* Feature Content */}
// //           <div className="space-y-8">
// //             <div>
// //               <motion.div
// //                 className="flex items-center mb-6"
// //                 initial={{ opacity: 0, y: 20 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ delay: 0.1 }}
// //               >
// //                 <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 mr-4">
// //                   <span className="text-blue-600">
// //                     {features[activeTab].icon}
// //                   </span>
// //                 </div>
// //                 <div>
// //                   <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
// //                     {features[activeTab].subtitle}
// //                   </span>
// //                   <h3 className="text-3xl font-bold text-slate-900 mt-1">
// //                     {features[activeTab].title}
// //                   </h3>
// //                 </div>
// //               </motion.div>
              
// //               <motion.p
// //                 className="text-lg text-slate-600 leading-relaxed"
// //                 initial={{ opacity: 0, y: 20 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ delay: 0.2 }}
// //               >
// //                 {features[activeTab].description}
// //               </motion.p>
// //             </div>

// //             {/* Feature List */}
// //             <motion.div
// //               className="space-y-4"
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               transition={{ delay: 0.3 }}
// //             >
// //               {features[activeTab].features.map((feature, index) => (
// //                 <motion.div
// //                   key={index}
// //                   className="flex items-start group"
// //                   initial={{ opacity: 0, x: -20 }}
// //                   animate={{ opacity: 1, x: 0 }}
// //                   transition={{ delay: 0.4 + index * 0.1 }}
// //                 >
// //                   <div className="p-1 rounded-full bg-blue-100 mr-4 mt-1.5 flex-shrink-0 group-hover:scale-110 transition-transform">
// //                     <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
// //                     </svg>
// //                   </div>
// //                   <span className="text-slate-700 font-medium leading-relaxed group-hover:text-slate-900 transition-colors">
// //                     {feature}
// //                   </span>
// //                 </motion.div>
// //               ))}
// //             </motion.div>

// //             {/* Stats and CTA */}
// //             <motion.div
// //               className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-8 border-t border-slate-200"
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ delay: 0.8 }}
// //             >
// //               <div className="px-6 py-4 rounded-xl bg-blue-50 border border-blue-100">
// //                 <div className="text-2xl font-bold text-blue-600 mb-1">
// //                   {features[activeTab].stats.metric}
// //                 </div>
// //                 <div className="text-sm font-medium text-slate-600">
// //                   {features[activeTab].stats.description}
// //                 </div>
// //               </div>
              
// //               <motion.button
// //                 className="px-8 py-3 bg-gradient-to-r from-slate-800 to-slate-900 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
// //                 whileHover={{ scale: 1.05, y: -2 }}
// //                 whileTap={{ scale: 0.98 }}
// //               >
// //                 <span className="flex items-center">
// //                   Learn More
// //                   <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
// //                   </svg>
// //                 </span>
// //               </motion.button>
// //             </motion.div>
// //           </div>

// //           {/* Feature Visualization */}
// //           <motion.div
// //             className="relative"
// //             initial={{ opacity: 0, scale: 0.95 }}
// //             animate={{ opacity: 1, scale: 1 }}
// //             transition={{ delay: 0.2, duration: 0.8 }}
// //           >
// //             <div className="relative h-96 lg:h-[28rem] bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl">
// //               {/* Mock Interface */}
// //               <div className="absolute inset-4 bg-slate-50 rounded-xl p-6">
// //                 {/* Header */}
// //                 <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
// //                   <div className="flex items-center">
// //                     <div className="h-3 w-3 rounded-full bg-blue-500 mr-3 animate-pulse"></div>
// //                     <span className="text-sm font-semibold text-slate-700">
// //                       {features[activeTab].title}
// //                     </span>
// //                   </div>
// //                   <div className="flex space-x-1">
// //                     <div className="w-2 h-2 rounded-full bg-red-400"></div>
// //                     <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
// //                     <div className="w-2 h-2 rounded-full bg-green-400"></div>
// //                   </div>
// //                 </div>
                
// //                 {/* Content Area */}
// //                 <div className="space-y-3 mb-6">
// //                   {[...Array(4)].map((_, i) => (
// //                     <motion.div
// //                       key={i}
// //                       className={`h-6 rounded-lg ${
// //                         i === 0 ? 'bg-blue-100' : i === 1 ? 'bg-slate-200' : 'bg-slate-100'
// //                       }`}
// //                       animate={{ opacity: [0.6, 1, 0.6] }}
// //                       transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
// //                     />
// //                   ))}
// //                 </div>
                
// //                 {/* Chart Area */}
// //                 <div className="h-32 bg-white rounded-lg border border-slate-200 flex items-end justify-center p-4">
// //                   {[...Array(8)].map((_, i) => (
// //                     <motion.div
// //                       key={i}
// //                       className="w-3 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t mx-0.5"
// //                       animate={{ height: [8, Math.random() * 60 + 20, 8] }}
// //                       transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
// //                     />
// //                   ))}
// //                 </div>
                
// //                 {/* Status Indicators */}
// //                 <div className="flex justify-between mt-4 text-xs">
// //                   <div className="flex items-center">
// //                     <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
// //                     <span className="text-slate-600">Online</span>
// //                   </div>
// //                   <div className="flex items-center">
// //                     <div className="w-2 h-2 rounded-full bg-blue-400 mr-2"></div>
// //                     <span className="text-slate-600">Active</span>
// //                   </div>
// //                   <div className="flex items-center">
// //                     <div className="w-2 h-2 rounded-full bg-slate-300 mr-2"></div>
// //                     <span className="text-slate-600">Pending</span>
// //                   </div>
// //                 </div>
// //               </div>
              
// //               {/* Floating Notification */}
// //               <motion.div
// //                 className="absolute top-6 right-6 bg-blue-500 text-white px-3 py-2 rounded-lg text-xs font-medium shadow-lg"
// //                 animate={{ scale: [1, 1.05, 1], opacity: [1, 0.8, 1] }}
// //                 transition={{ duration: 2, repeat: Infinity }}
// //               >
// //                 Live Update
// //               </motion.div>
              
// //               {/* Corner Elements */}
// //               <div className="absolute -top-2 -left-2 w-6 h-6 bg-slate-800 rounded-full shadow-lg"></div>
// //               <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full shadow-lg flex items-center justify-center">
// //                 <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
// //                 </svg>
// //               </div>
// //             </div>
// //           </motion.div>
// //         </motion.div>

// //         {/* Bottom CTA */}
// //         <motion.div
// //           className="text-center mt-20"
// //           initial={{ opacity: 0, y: 30 }}
// //           animate={isInView ? { opacity: 1, y: 0 } : {}}
// //           transition={{ delay: 1, duration: 0.8 }}
// //         >
// //           <h3 className="text-2xl font-bold text-slate-900 mb-4">
// //             Ready to Optimize Your Construction Operations?
// //           </h3>
// //           <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
// //             Join industry leaders who trust SkyStruct to deliver projects on time, on budget, and safely.
// //           </p>
// //           <motion.button
// //             className="px-10 py-4 bg-gradient-to-r from-blue-600 to-slate-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
// //             whileHover={{ scale: 1.05, y: -2 }}
// //             whileTap={{ scale: 0.98 }}
// //           >
// //             <span className="flex items-center">
// //               Start Free Trial
// //               <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
// //               </svg>
// //             </span>
// //           </motion.button>
// //         </motion.div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default Features;
// import React, { useState, useEffect } from 'react';
// import { 
//   Calendar, Users, FileText, BarChart3, Shield, Smartphone, 
//   Zap, Globe, Clock, CheckCircle, ArrowRight, Play,
//   Building, Hammer, HardHat, Truck, AlertTriangle, Target
// } from 'lucide-react';

// const SkyStructFeatures = () => {
//   const [activeFeature, setActiveFeature] = useState(0);
//   const [hoveredCard, setHoveredCard] = useState(null);

//   const coreFeatures = [
//     {
//       icon: Calendar,
//       title: "Smart Project Scheduling",
//       description: "AI-powered scheduling that adapts to delays, weather, and resource availability in real-time.",
//       metrics: "40% faster planning",
//       color: "from-slate-600 to-slate-700",
//       demo: "Interactive Gantt charts with drag-and-drop functionality"
//     },
//     {
//       icon: Users,
//       title: "Team Collaboration Hub",
//       description: "Connect field teams, office staff, and stakeholders with instant communication and file sharing.",
//       metrics: "78% better coordination",
//       color: "from-orange-600 to-orange-700",
//       demo: "Real-time chat, video calls, and progress updates"
//     },
//     {
//       icon: FileText,
//       title: "Document Management",
//       description: "Centralized storage for blueprints, permits, contracts, and compliance documents with version control.",
//       metrics: "65% less paperwork",
//       color: "from-yellow-600 to-yellow-700",
//       demo: "Cloud-based file system with mobile access"
//     },
//     {
//       icon: BarChart3,
//       title: "Advanced Analytics",
//       description: "Real-time dashboards, predictive insights, and automated reporting for data-driven decisions.",
//       metrics: "90% accurate forecasts",
//       color: "from-green-600 to-green-700",
//       demo: "Custom reports and performance metrics"
//     },
//     {
//       icon: Shield,
//       title: "Safety & Compliance",
//       description: "Digital safety checklists, incident reporting, and compliance tracking to maintain zero accidents.",
//       metrics: "99.2% safety score",
//       color: "from-blue-600 to-blue-700",
//       demo: "Automated safety protocols and alerts"
//     },
//     {
//       icon: Smartphone,
//       title: "Mobile-First Design",
//       description: "Full functionality on any device with offline capabilities for jobsites without internet.",
//       metrics: "100% field accessibility",
//       color: "from-purple-600 to-purple-700",
//       demo: "Native iOS and Android apps"
//     }
//   ];

//   const additionalFeatures = [
//     { icon: Building, title: "3D BIM Integration", description: "Seamless Building Information Modeling integration" },
//     { icon: Hammer, title: "Equipment Tracking", description: "Real-time equipment location and maintenance" },
//     { icon: HardHat, title: "Worker Management", description: "Certification tracking and skill management" },
//     { icon: Truck, title: "Supply Chain", description: "Material delivery and inventory management" },
//     { icon: AlertTriangle, title: "Risk Assessment", description: "Predictive risk analysis and mitigation" },
//     { icon: Target, title: "Quality Control", description: "Automated quality checks and inspections" }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveFeature((prev) => (prev + 1) % coreFeatures.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="bg-gradient-to-b from-white to-slate-50 py-20">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* Section Header */}
//         <div className="text-center mb-16">
//           <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-lg text-sm font-semibold mb-4">
//             Powerful Features
//           </div>
//           <h2 className="text-4xl font-bold text-slate-800 mb-6">
//             Everything You Need to Build
//             <span className="text-orange-600"> Successfully</span>
//           </h2>
//           <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
//             SkyStruct v2lite combines cutting-edge technology with construction expertise to deliver 
//             a complete project management solution that grows with your business.
//           </p>
//         </div>

//         {/* Core Features Grid */}
//         <div className="grid lg:grid-cols-2 gap-12 mb-20">
//           {/* Feature Cards */}
//           <div className="space-y-6">
//             {coreFeatures.map((feature, index) => (
//               <div
//                 key={index}
//                 className={`relative group cursor-pointer transition-all duration-500 ${
//                   activeFeature === index || hoveredCard === index
//                     ? 'transform scale-105'
//                     : 'hover:transform hover:scale-102'
//                 }`}
//                 onMouseEnter={() => setHoveredCard(index)}
//                 onMouseLeave={() => setHoveredCard(null)}
//                 onClick={() => setActiveFeature(index)}
//               >
//                 <div className={`p-6 rounded-xl border transition-all duration-300 ${
//                   activeFeature === index
//                     ? 'bg-white shadow-lg border-orange-200'
//                     : 'bg-white/50 shadow-sm border-gray-200 hover:shadow-md hover:border-gray-300'
//                 }`}>
//                   <div className="flex items-start space-x-4">
//                     <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color} text-white shadow-sm`}>
//                       <feature.icon className="w-6 h-6" />
//                     </div>
//                     <div className="flex-1">
//                       <div className="flex items-center justify-between mb-2">
//                         <h3 className="text-lg font-semibold text-slate-800">{feature.title}</h3>
//                         <div className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-md">
//                           {feature.metrics}
//                         </div>
//                       </div>
//                       <p className="text-slate-600 mb-3">{feature.description}</p>
//                       <div className="flex items-center text-sm text-slate-500">
//                         <Play className="w-4 h-4 mr-2" />
//                         {feature.demo}
//                       </div>
//                     </div>
//                     <ArrowRight className={`w-5 h-5 transition-all duration-300 ${
//                       activeFeature === index ? 'text-orange-600 transform translate-x-1' : 'text-slate-400'
//                     }`} />
//                   </div>
//                 </div>

//                 {/* Active indicator */}
//                 <div className={`absolute left-0 top-0 bottom-0 w-1 bg-orange-600 rounded-r transition-all duration-300 ${
//                   activeFeature === index ? 'opacity-100' : 'opacity-0'
//                 }`} />
//               </div>
//             ))}
//           </div>

//           {/* Feature Demo Visualization */}
//           <div className="relative">
//             <div className="sticky top-8">
//               <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 h-96">
//                 <div className="text-center mb-6">
//                   <h3 className="text-xl font-semibold text-slate-800 mb-2">
//                     {coreFeatures[activeFeature].title}
//                   </h3>
//                   <div className="w-12 h-1 bg-orange-600 mx-auto rounded-full" />
//                 </div>

//                 {/* Dynamic Feature Visualization */}
//                 <div className="relative h-64 bg-gradient-to-br from-slate-50 to-white rounded-lg border border-gray-100 overflow-hidden">
//                   {/* Feature-specific demo content */}
//                   {activeFeature === 0 && (
//                     <div className="p-6 h-full">
//                       <div className="space-y-4">
//                         <div className="flex items-center justify-between text-sm">
//                           <span className="text-slate-600">Foundation Work</span>
//                           <span className="text-green-600 font-semibold">Completed</span>
//                         </div>
//                         <div className="w-full bg-gray-200 rounded-full h-2">
//                           <div className="bg-green-600 h-2 rounded-full w-full"></div>
//                         </div>
                        
//                         <div className="flex items-center justify-between text-sm">
//                           <span className="text-slate-600">Structural Framework</span>
//                           <span className="text-orange-600 font-semibold">In Progress</span>
//                         </div>
//                         <div className="w-full bg-gray-200 rounded-full h-2">
//                           <div className="bg-orange-600 h-2 rounded-full w-3/4 transition-all duration-2000">
//                             <div className="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full animate-pulse"></div>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-center justify-between text-sm">
//                           <span className="text-slate-600">Electrical Installation</span>
//                           <span className="text-slate-400 font-semibold">Scheduled</span>
//                         </div>
//                         <div className="w-full bg-gray-200 rounded-full h-2">
//                           <div className="bg-slate-300 h-2 rounded-full w-1/4"></div>
//                         </div>
//                       </div>
                      
//                       <div className="absolute bottom-4 right-4">
//                         <Calendar className="w-8 h-8 text-orange-600 animate-bounce" />
//                       </div>
//                     </div>
//                   )}

//                   {activeFeature === 1 && (
//                     <div className="p-6 h-full">
//                       <div className="space-y-3">
//                         <div className="flex items-center space-x-3 bg-green-50 p-3 rounded-lg">
//                           <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
//                             <span className="text-white text-xs font-bold">JM</span>
//                           </div>
//                           <div className="flex-1">
//                             <div className="text-sm font-semibold text-slate-800">John Martinez</div>
//                             <div className="text-xs text-green-600">Site Supervisor - Online</div>
//                           </div>
//                           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                         </div>
                        
//                         <div className="flex items-center space-x-3 bg-orange-50 p-3 rounded-lg">
//                           <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
//                             <span className="text-white text-xs font-bold">SK</span>
//                           </div>
//                           <div className="flex-1">
//                             <div className="text-sm font-semibold text-slate-800">Sarah Kim</div>
//                             <div className="text-xs text-orange-600">Project Manager - Active</div>
//                           </div>
//                           <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
//                         </div>
                        
//                         <div className="bg-slate-50 p-3 rounded-lg">
//                           <div className="text-xs text-slate-500 mb-1">Latest Update - 2 min ago</div>
//                           <div className="text-sm text-slate-700">"Foundation inspection completed. Moving to next phase."</div>
//                         </div>
//                       </div>
                      
//                       <div className="absolute bottom-4 right-4">
//                         <Users className="w-8 h-8 text-orange-600 animate-pulse" />
//                       </div>
//                     </div>
//                   )}

//                   {activeFeature === 2 && (
//                     <div className="p-6 h-full">
//                       <div className="space-y-3">
//                         <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
//                           <div className="flex items-center space-x-3">
//                             <FileText className="w-5 h-5 text-blue-600" />
//                             <div>
//                               <div className="text-sm font-semibold text-slate-800">Site_Plans_v3.2.pdf</div>
//                               <div className="text-xs text-slate-500">Updated 1 hour ago</div>
//                             </div>
//                           </div>
//                           <CheckCircle className="w-5 h-5 text-green-600" />
//                         </div>
                        
//                         <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
//                           <div className="flex items-center space-x-3">
//                             <FileText className="w-5 h-5 text-yellow-600" />
//                             <div>
//                               <div className="text-sm font-semibold text-slate-800">Safety_Protocol.docx</div>
//                               <div className="text-xs text-slate-500">Pending approval</div>
//                             </div>
//                           </div>
//                           <Clock className="w-5 h-5 text-yellow-600" />
//                         </div>
                        
//                         <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
//                           <div className="flex items-center space-x-3">
//                             <FileText className="w-5 h-5 text-green-600" />
//                             <div>
//                               <div className="text-sm font-semibold text-slate-800">Materials_List.xlsx</div>
//                               <div className="text-xs text-slate-500">Approved & Synced</div>
//                             </div>
//                           </div>
//                           <CheckCircle className="w-5 h-5 text-green-600" />
//                         </div>
//                       </div>
                      
//                       <div className="absolute bottom-4 right-4">
//                         <FileText className="w-8 h-8 text-orange-600 animate-bounce" />
//                       </div>
//                     </div>
//                   )}

//                   {activeFeature === 3 && (
//                     <div className="p-6 h-full">
//                       <div className="grid grid-cols-2 gap-4 h-full">
//                         <div className="bg-green-50 p-4 rounded-lg">
//                           <div className="text-2xl font-bold text-green-600">94.2%</div>
//                           <div className="text-sm text-slate-600">On-Time Delivery</div>
//                           <div className="w-full bg-green-200 rounded-full h-1 mt-2">
//                             <div className="bg-green-600 h-1 rounded-full" style={{width: '94.2%'}}></div>
//                           </div>
//                         </div>
                        
//                         <div className="bg-orange-50 p-4 rounded-lg">
//                           <div className="text-2xl font-bold text-orange-600">$2.4M</div>
//                           <div className="text-sm text-slate-600">Cost Savings</div>
//                           <div className="text-xs text-green-600 mt-1">↗ 18% vs last quarter</div>
//                         </div>
                        
//                         <div className="bg-blue-50 p-4 rounded-lg">
//                           <div className="text-2xl font-bold text-blue-600">247</div>
//                           <div className="text-sm text-slate-600">Active Projects</div>
//                           <div className="text-xs text-blue-600 mt-1">↗ 12% growth</div>
//                         </div>
                        
//                         <div className="bg-purple-50 p-4 rounded-lg">
//                           <div className="text-2xl font-bold text-purple-600">98.7%</div>
//                           <div className="text-sm text-slate-600">Quality Score</div>
//                           <div className="text-xs text-green-600 mt-1">Industry leading</div>
//                         </div>
//                       </div>
                      
//                       <div className="absolute bottom-4 right-4">
//                         <BarChart3 className="w-8 h-8 text-orange-600 animate-pulse" />
//                       </div>
//                     </div>
//                   )}

//                   {activeFeature === 4 && (
//                     <div className="p-6 h-full">
//                       <div className="space-y-4">
//                         <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
//                           <div className="flex items-center space-x-3">
//                             <Shield className="w-5 h-5 text-green-600" />
//                             <span className="text-sm font-semibold text-slate-800">Daily Safety Check</span>
//                           </div>
//                           <CheckCircle className="w-5 h-5 text-green-600" />
//                         </div>
                        
//                         <div className="flex items-center justify-between bg-yellow-50 p-3 rounded-lg">
//                           <div className="flex items-center space-x-3">
//                             <AlertTriangle className="w-5 h-5 text-yellow-600" />
//                             <span className="text-sm font-semibold text-slate-800">Equipment Inspection</span>
//                           </div>
//                           <Clock className="w-5 h-5 text-yellow-600" />
//                         </div>
                        
//                         <div className="bg-slate-50 p-3 rounded-lg">
//                           <div className="text-sm font-semibold text-slate-800 mb-2">Safety Metrics</div>
//                           <div className="flex justify-between text-xs">
//                             <span className="text-slate-600">Incidents This Month:</span>
//                             <span className="text-green-600 font-semibold">0</span>
//                           </div>
//                           <div className="flex justify-between text-xs">
//                             <span className="text-slate-600">Safety Score:</span>
//                             <span className="text-green-600 font-semibold">99.2%</span>
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div className="absolute bottom-4 right-4">
//                         <Shield className="w-8 h-8 text-orange-600 animate-pulse" />
//                       </div>
//                     </div>
//                   )}

//                   {activeFeature === 5 && (
//                     <div className="p-6 h-full">
//                       <div className="text-center space-y-4">
//                         <div className="flex justify-center space-x-4">
//                           <div className="w-16 h-24 bg-slate-800 rounded-lg flex items-center justify-center">
//                             <Smartphone className="w-8 h-8 text-white" />
//                           </div>
//                           <div className="w-20 h-16 bg-slate-200 rounded-lg flex items-center justify-center">
//                             <Globe className="w-8 h-8 text-slate-600" />
//                           </div>
//                         </div>
                        
//                         <div className="space-y-2">
//                           <div className="flex items-center justify-center space-x-2">
//                             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                             <span className="text-sm text-slate-600">iOS App - Live</span>
//                           </div>
//                           <div className="flex items-center justify-center space-x-2">
//                             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                             <span className="text-sm text-slate-600">Android App - Live</span>
//                           </div>
//                           <div className="flex items-center justify-center space-x-2">
//                             <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
//                             <span className="text-sm text-slate-600">Offline Mode - Ready</span>
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div className="absolute bottom-4 right-4">
//                         <Smartphone className="w-8 h-8 text-orange-600 animate-bounce" />
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Progress Indicators */}
//                 <div className="flex justify-center space-x-2 mt-6">
//                   {coreFeatures.map((_, index) => (
//                     <button
//                       key={index}
//                       className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                         activeFeature === index ? 'bg-orange-600 w-6' : 'bg-gray-300'
//                       }`}
//                       onClick={() => setActiveFeature(index)}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Additional Features Grid */}
//         <div className="border-t border-gray-200 pt-16">
//           <div className="text-center mb-12">
//             <h3 className="text-2xl font-bold text-slate-800 mb-4">
//               Advanced Construction Tools
//             </h3>
//             <p className="text-slate-600 max-w-2xl mx-auto">
//               Specialized features designed for modern construction workflows and industry requirements.
//             </p>
//           </div>
          
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {additionalFeatures.map((feature, index) => (
//               <div key={index} className="group">
//                 <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md hover:border-orange-200 transition-all duration-300 h-full">
//                   <div className="flex items-start space-x-4">
//                     <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-orange-50 transition-colors duration-300">
//                       <feature.icon className="w-5 h-5 text-slate-600 group-hover:text-orange-600 transition-colors duration-300" />
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-slate-800 mb-2">{feature.title}</h4>
//                       <p className="text-sm text-slate-600">{feature.description}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Integration Section */}
//         <div className="mt-20 text-center">
//           <div className="bg-gradient-to-r from-slate-50 to-orange-50 rounded-2xl p-12">
//             <h3 className="text-2xl font-bold text-slate-800 mb-4">
//               Seamless Integrations
//             </h3>
//             <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
//               Connect SkyStruct with your existing tools and workflows. No disruption, just enhancement.
//             </p>
            
//             <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
//               {['AutoCAD', 'Procore', 'Revit', 'Microsoft 365', 'Slack', 'QuickBooks'].map((integration, index) => (
//                 <div key={index} className="bg-white px-6 py-3 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
//                   <span className="text-slate-700 font-semibold">{integration}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SkyStructFeatures;
import React, { useState, useEffect } from 'react';
import { 
  Calendar, Users, FileText, BarChart3, Shield, Smartphone, 
  Zap, Globe, Clock, CheckCircle, ArrowRight, Play,
  Building, Hammer, HardHat, Truck, AlertTriangle, Target
} from 'lucide-react';

const SkyStructFeatures = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  const coreFeatures = [
    {
      icon: Calendar,
      title: "Smart Project Scheduling",
      description: "AI-powered scheduling that adapts to delays, weather, and resource availability in real-time.",
      metrics: "40% faster planning",
      color: "from-slate-600 to-slate-700",
      demo: "Interactive Gantt charts with drag-and-drop functionality"
    },
    {
      icon: Users,
      title: "Team Collaboration Hub",
      description: "Connect field teams, office staff, and stakeholders with instant communication and file sharing.",
      metrics: "78% better coordination",
      color: "from-orange-600 to-orange-700",
      demo: "Real-time chat, video calls, and progress updates"
    },
    {
      icon: FileText,
      title: "Document Management",
      description: "Centralized storage for blueprints, permits, contracts, and compliance documents with version control.",
      metrics: "65% less paperwork",
      color: "from-yellow-600 to-yellow-700",
      demo: "Cloud-based file system with mobile access"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Real-time dashboards, predictive insights, and automated reporting for data-driven decisions.",
      metrics: "90% accurate forecasts",
      color: "from-green-600 to-green-700",
      demo: "Custom reports and performance metrics"
    },
    {
      icon: Shield,
      title: "Safety & Compliance",
      description: "Digital safety checklists, incident reporting, and compliance tracking to maintain zero accidents.",
      metrics: "99.2% safety score",
      color: "from-blue-600 to-blue-700",
      demo: "Automated safety protocols and alerts"
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Full functionality on any device with offline capabilities for jobsites without internet.",
      metrics: "100% field accessibility",
      color: "from-purple-600 to-purple-700",
      demo: "Native iOS and Android apps"
    }
  ];

  const additionalFeatures = [
    { icon: Building, title: "3D BIM Integration", description: "Seamless Building Information Modeling integration" },
    { icon: Hammer, title: "Equipment Tracking", description: "Real-time equipment location and maintenance" },
    { icon: HardHat, title: "Worker Management", description: "Certification tracking and skill management" },
    { icon: Truck, title: "Supply Chain", description: "Material delivery and inventory management" },
    { icon: AlertTriangle, title: "Risk Assessment", description: "Predictive risk analysis and mitigation" },
    { icon: Target, title: "Quality Control", description: "Automated quality checks and inspections" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % coreFeatures.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-b from-white to-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-lg text-sm font-semibold mb-4">
            Powerful Features
          </div>
          <h2 className="text-4xl font-bold text-slate-800 mb-6">
            Everything You Need to Build
            <span className="text-orange-600"> Successfully</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            SkyStruct v2lite combines cutting-edge technology with construction expertise to deliver 
            a complete project management solution that grows with your business.
          </p>
        </div>

        {/* Core Features Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Scrollable Feature Cards */}
          <div className="relative h-96 overflow-hidden">
            <div className="absolute inset-0 space-y-6">
              {coreFeatures.map((feature, index) => (
                <div
                  key={index}
                  className={`absolute w-full transition-all duration-700 ease-in-out ${
                    index === activeFeature
                      ? 'opacity-100 translate-y-0 z-10'
                      : index < activeFeature
                        ? 'opacity-0 -translate-y-full z-0'
                        : 'opacity-0 translate-y-full z-0'
                  }`}
                  style={{
                    transform: `translateY(${(index - activeFeature) * 100}%)`
                  }}
                >
                  <div className="relative group cursor-pointer">
                    <div className="p-8 rounded-xl bg-white shadow-lg border border-orange-200">
                      <div className="flex items-start space-x-6">
                        <div className={`p-4 rounded-xl bg-gradient-to-r ${feature.color} text-white shadow-lg`}>
                          <feature.icon className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xl font-bold text-slate-800">{feature.title}</h3>
                            <div className="text-sm font-bold text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                              {feature.metrics}
                            </div>
                          </div>
                          <p className="text-slate-600 mb-4 text-lg leading-relaxed">{feature.description}</p>
                          <div className="flex items-center text-slate-500">
                            <Play className="w-5 h-5 mr-3" />
                            <span className="font-medium">{feature.demo}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Active indicator */}
                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-orange-600 rounded-r" />
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent pt-8">
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {coreFeatures.map((_, index) => (
                    <button
                      key={index}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        activeFeature === index 
                          ? 'bg-orange-600 w-8' 
                          : 'bg-gray-300 w-2 hover:bg-gray-400'
                      }`}
                      onClick={() => setActiveFeature(index)}
                    />
                  ))}
                </div>
                
                <div className="flex space-x-3">
                  <button
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors duration-200 disabled:opacity-50"
                    onClick={() => setActiveFeature(Math.max(0, activeFeature - 1))}
                    disabled={activeFeature === 0}
                  >
                    <ArrowRight className="w-4 h-4 text-slate-600 rotate-180" />
                  </button>
                  <button
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors duration-200 disabled:opacity-50"
                    onClick={() => setActiveFeature(Math.min(coreFeatures.length - 1, activeFeature + 1))}
                    disabled={activeFeature === coreFeatures.length - 1}
                  >
                    <ArrowRight className="w-4 h-4 text-slate-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Feature Counter */}
            <div className="absolute top-0 right-0 bg-orange-600 text-white px-4 py-2 rounded-bl-xl rounded-tr-xl">
              <span className="text-sm font-bold">
                {String(activeFeature + 1).padStart(2, '0')} / {String(coreFeatures.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Feature Demo Visualization */}
          <div className="relative">
            <div className="sticky top-8">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 h-96">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    {coreFeatures[activeFeature].title}
                  </h3>
                  <div className="w-12 h-1 bg-orange-600 mx-auto rounded-full" />
                </div>

                {/* Dynamic Feature Visualization */}
                <div className="relative h-64 bg-gradient-to-br from-slate-50 to-white rounded-lg border border-gray-100 overflow-hidden">
                  {/* Feature-specific demo content */}
                  {activeFeature === 0 && (
                    <div className="p-6 h-full">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Foundation Work</span>
                          <span className="text-green-600 font-semibold">Completed</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full w-full"></div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Structural Framework</span>
                          <span className="text-orange-600 font-semibold">In Progress</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-600 h-2 rounded-full w-3/4 transition-all duration-2000">
                            <div className="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full animate-pulse"></div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Electrical Installation</span>
                          <span className="text-slate-400 font-semibold">Scheduled</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-slate-300 h-2 rounded-full w-1/4"></div>
                        </div>
                      </div>
                      
                      <div className="absolute bottom-4 right-4">
                        <Calendar className="w-8 h-8 text-orange-600 animate-bounce" />
                      </div>
                    </div>
                  )}

                  {activeFeature === 1 && (
                    <div className="p-6 h-full">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 bg-green-50 p-3 rounded-lg">
                          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">JM</span>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-slate-800">John Martinez</div>
                            <div className="text-xs text-green-600">Site Supervisor - Online</div>
                          </div>
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                        
                        <div className="flex items-center space-x-3 bg-orange-50 p-3 rounded-lg">
                          <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">SK</span>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-slate-800">Sarah Kim</div>
                            <div className="text-xs text-orange-600">Project Manager - Active</div>
                          </div>
                          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                        </div>
                        
                        <div className="bg-slate-50 p-3 rounded-lg">
                          <div className="text-xs text-slate-500 mb-1">Latest Update - 2 min ago</div>
                          <div className="text-sm text-slate-700">"Foundation inspection completed. Moving to next phase."</div>
                        </div>
                      </div>
                      
                      <div className="absolute bottom-4 right-4">
                        <Users className="w-8 h-8 text-orange-600 animate-pulse" />
                      </div>
                    </div>
                  )}

                  {activeFeature === 2 && (
                    <div className="p-6 h-full">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-5 h-5 text-blue-600" />
                            <div>
                              <div className="text-sm font-semibold text-slate-800">Site_Plans_v3.2.pdf</div>
                              <div className="text-xs text-slate-500">Updated 1 hour ago</div>
                            </div>
                          </div>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-5 h-5 text-yellow-600" />
                            <div>
                              <div className="text-sm font-semibold text-slate-800">Safety_Protocol.docx</div>
                              <div className="text-xs text-slate-500">Pending approval</div>
                            </div>
                          </div>
                          <Clock className="w-5 h-5 text-yellow-600" />
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-5 h-5 text-green-600" />
                            <div>
                              <div className="text-sm font-semibold text-slate-800">Materials_List.xlsx</div>
                              <div className="text-xs text-slate-500">Approved & Synced</div>
                            </div>
                          </div>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                      </div>
                      
                      <div className="absolute bottom-4 right-4">
                        <FileText className="w-8 h-8 text-orange-600 animate-bounce" />
                      </div>
                    </div>
                  )}

                  {activeFeature === 3 && (
                    <div className="p-6 h-full">
                      <div className="grid grid-cols-2 gap-4 h-full">
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">94.2%</div>
                          <div className="text-sm text-slate-600">On-Time Delivery</div>
                          <div className="w-full bg-green-200 rounded-full h-1 mt-2">
                            <div className="bg-green-600 h-1 rounded-full" style={{width: '94.2%'}}></div>
                          </div>
                        </div>
                        
                        <div className="bg-orange-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">$2.4M</div>
                          <div className="text-sm text-slate-600">Cost Savings</div>
                          <div className="text-xs text-green-600 mt-1">↗ 18% vs last quarter</div>
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">247</div>
                          <div className="text-sm text-slate-600">Active Projects</div>
                          <div className="text-xs text-blue-600 mt-1">↗ 12% growth</div>
                        </div>
                        
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">98.7%</div>
                          <div className="text-sm text-slate-600">Quality Score</div>
                          <div className="text-xs text-green-600 mt-1">Industry leading</div>
                        </div>
                      </div>
                      
                      <div className="absolute bottom-4 right-4">
                        <BarChart3 className="w-8 h-8 text-orange-600 animate-pulse" />
                      </div>
                    </div>
                  )}

                  {activeFeature === 4 && (
                    <div className="p-6 h-full">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Shield className="w-5 h-5 text-green-600" />
                            <span className="text-sm font-semibold text-slate-800">Daily Safety Check</span>
                          </div>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        
                        <div className="flex items-center justify-between bg-yellow-50 p-3 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <AlertTriangle className="w-5 h-5 text-yellow-600" />
                            <span className="text-sm font-semibold text-slate-800">Equipment Inspection</span>
                          </div>
                          <Clock className="w-5 h-5 text-yellow-600" />
                        </div>
                        
                        <div className="bg-slate-50 p-3 rounded-lg">
                          <div className="text-sm font-semibold text-slate-800 mb-2">Safety Metrics</div>
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-600">Incidents This Month:</span>
                            <span className="text-green-600 font-semibold">0</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-600">Safety Score:</span>
                            <span className="text-green-600 font-semibold">99.2%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="absolute bottom-4 right-4">
                        <Shield className="w-8 h-8 text-orange-600 animate-pulse" />
                      </div>
                    </div>
                  )}

                  {activeFeature === 5 && (
                    <div className="p-6 h-full">
                      <div className="text-center space-y-4">
                        <div className="flex justify-center space-x-4">
                          <div className="w-16 h-24 bg-slate-800 rounded-lg flex items-center justify-center">
                            <Smartphone className="w-8 h-8 text-white" />
                          </div>
                          <div className="w-20 h-16 bg-slate-200 rounded-lg flex items-center justify-center">
                            <Globe className="w-8 h-8 text-slate-600" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm text-slate-600">iOS App - Live</span>
                          </div>
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm text-slate-600">Android App - Live</span>
                          </div>
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                            <span className="text-sm text-slate-600">Offline Mode - Ready</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="absolute bottom-4 right-4">
                        <Smartphone className="w-8 h-8 text-orange-600 animate-bounce" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Progress Indicators */}
                <div className="flex justify-center space-x-2 mt-6">
                  {coreFeatures.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        activeFeature === index ? 'bg-orange-600 w-6' : 'bg-gray-300'
                      }`}
                      onClick={() => setActiveFeature(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Features Grid */}
        <div className="border-t border-gray-200 pt-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Advanced Construction Tools
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Specialized features designed for modern construction workflows and industry requirements.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md hover:border-orange-200 transition-all duration-300 h-full">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-orange-50 transition-colors duration-300">
                      <feature.icon className="w-5 h-5 text-slate-600 group-hover:text-orange-600 transition-colors duration-300" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">{feature.title}</h4>
                      <p className="text-sm text-slate-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-slate-50 to-orange-50 rounded-2xl p-12">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Seamless Integrations
            </h3>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
              Connect SkyStruct with your existing tools and workflows. No disruption, just enhancement.
            </p>
            
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
              {['AutoCAD', 'Procore', 'Revit', 'Microsoft 365', 'Slack', 'QuickBooks'].map((integration, index) => (
                <div key={index} className="bg-white px-6 py-3 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                  <span className="text-slate-700 font-semibold">{integration}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkyStructFeatures;