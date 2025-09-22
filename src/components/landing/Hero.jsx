// import React, { useState, useEffect } from 'react';
// import { Play, CheckCircle, Users, Calendar, FileText, BarChart3 } from 'lucide-react';

// const SkyStructHero = () => {
//   const [activeFeature, setActiveFeature] = useState(0);

//   const features = [
//     { icon: Calendar, text: "Project Scheduling", color: "text-orange-600" },
//     { icon: Users, text: "Team Management", color: "text-slate-600" },
//     { icon: FileText, text: "Document Control", color: "text-yellow-600" },
//     { icon: BarChart3, text: "Progress Tracking", color: "text-slate-700" }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveFeature((prev) => (prev + 1) % features.length);
//     }, 2000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="bg-white min-h-screen">
//            {/* Hero Section */}
//       <div className="max-w-7xl mx-auto px-6 py-16">
//         <div className="grid lg:grid-cols-2 gap-16 items-center">
//           {/* Left Content */}
//           <div className="space-y-8">
//             {/* Trust Badge */}
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-1">
//                 {[...Array(5)].map((_, i) => (
//                   <span key={i} className="text-yellow-500">★</span>
//                 ))}
//               </div>
//               <span className="text-slate-600 text-sm">Trusted by 500+ construction teams</span>
//             </div>

//             {/* Main Headline */}
//             <div className="space-y-4">
//               <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 leading-tight">
//                 Construction Project
//                 <span className="text-orange-600"> Management</span>
//                 <br />Made Simple
//               </h1>
//               <p className="text-lg text-slate-600 leading-relaxed">
//                 Streamline your construction projects with powerful scheduling, team collaboration, 
//                 and real-time progress tracking. Built specifically for construction professionals.
//               </p>
//             </div>

//             {/* Key Benefits */}
//             <div className="grid grid-cols-2 gap-4">
//               {[
//                 "Reduce project delays by 40%",
//                 "Improve team collaboration",
//                 "Real-time progress updates",
//                 "Mobile-first design"
//               ].map((benefit, index) => (
//                 <div key={index} className="flex items-center space-x-2">
//                   <CheckCircle className="w-5 h-5 text-green-600" />
//                   <span className="text-slate-700 text-sm">{benefit}</span>
//                 </div>
//               ))}
//             </div>

//             {/* CTA Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <button className="bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors shadow-sm">
//                 Start Free Trial
//               </button>
//               <button className="flex items-center justify-center space-x-2 border border-slate-300 text-slate-700 px-8 py-4 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
//                 <Play className="w-5 h-5" />
//                 <span>Watch Demo</span>
//               </button>
//             </div>

//             {/* Social Proof */}
//             <div className="pt-8 border-t border-gray-100">
//               <p className="text-sm text-slate-500 mb-4">Trusted by leading construction companies:</p>
//               <div className="flex items-center space-x-8 opacity-60">
//                 {['BuildCorp', 'SteelWorks', 'UrbanDev', 'ProBuild'].map((company, index) => (
//                   <div key={index} className="bg-slate-100 px-4 py-2 rounded-md">
//                     <span className="text-slate-600 font-medium text-sm">{company}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Enhanced 3D Construction Workflow */}
//           <div className="relative h-full">
//             <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl shadow-lg border border-gray-100 p-8 h-full">
//               <div className="text-center ">
//                 <h3 className="text-xl font-bold text-slate-800 ">SkyStruct Construction Ecosystem</h3>
//                 <div className="flex items-center justify-center space-x-2">
//                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                   <span className="text-sm text-slate-600">Real-time Project Management</span>
//                 </div>
//               </div>
              
//               <svg viewBox="0 0 500 600" className="w-full h-full">
//                 <defs>
//                   {/* Enhanced gradients */}
//                   <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
//                     <stop offset="0%" stopColor="#475569"/>
//                     <stop offset="100%" stopColor="#64748b"/>
//                   </linearGradient>
//                   <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
//                     <stop offset="0%" stopColor="#ea580c"/>
//                     <stop offset="100%" stopColor="#fb923c"/>
//                   </linearGradient>
//                   <linearGradient id="yellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
//                     <stop offset="0%" stopColor="#fbbf24"/>
//                     <stop offset="100%" stopColor="#fcd34d"/>
//                   </linearGradient>
//                   <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
//                     <stop offset="0%" stopColor="#10b981"/>
//                     <stop offset="100%" stopColor="#34d399"/>
//                   </linearGradient>
                  
//                   {/* Animated flow lines with multiple colors */}
//                   <linearGradient id="dataFlow1" x1="0%" y1="0%" x2="100%" y2="0%">
//                     <stop offset="0%" stopColor="#ea580c" stopOpacity="0">
//                       <animate attributeName="stop-opacity" values="0;1;0" dur="3s" repeatCount="indefinite"/>
//                     </stop>
//                     <stop offset="50%" stopColor="#ea580c" stopOpacity="1">
//                       <animate attributeName="stop-opacity" values="1;0;1" dur="3s" repeatCount="indefinite"/>
//                     </stop>
//                     <stop offset="100%" stopColor="#ea580c" stopOpacity="0">
//                       <animate attributeName="stop-opacity" values="0;1;0" dur="3s" repeatCount="indefinite"/>
//                     </stop>
//                   </linearGradient>
                  
//                   <linearGradient id="dataFlow2" x1="0%" y1="0%" x2="100%" y2="0%">
//                     <stop offset="0%" stopColor="#10b981" stopOpacity="0">
//                       <animate attributeName="stop-opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" begin="0.5s"/>
//                     </stop>
//                     <stop offset="50%" stopColor="#10b981" stopOpacity="1">
//                       <animate attributeName="stop-opacity" values="1;0;1" dur="2.5s" repeatCount="indefinite" begin="0.5s"/>
//                     </stop>
//                     <stop offset="100%" stopColor="#10b981" stopOpacity="0">
//                       <animate attributeName="stop-opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" begin="0.5s"/>
//                     </stop>
//                   </linearGradient>

//                   {/* Shadow filters */}
//                   <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
//                     <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#00000015"/>
//                   </filter>
                  
//                   {/* Glowing effect */}
//                   <filter id="glow">
//                     <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
//                     <feMerge> 
//                       <feMergeNode in="coloredBlur"/>
//                       <feMergeNode in="SourceGraphic"/>
//                     </feMerge>
//                   </filter>
//                 </defs>

//                 {/* Background construction site wireframe */}
//                 <g opacity="0.1" stroke="#475569" strokeWidth="1" fill="none">
//                   <rect x="50" y="450" width="400" height="100" rx="5"/>
//                   <polygon points="100,450 150,400 200,450"/>
//                   <polygon points="250,450 300,380 350,450"/>
//                   <rect x="120" y="420" width="60" height="30"/>
//                   <rect x="270" y="410" width="60" height="40"/>
//                 </g>

//                 {/* Central Hub - 3D Effect */}
//                 <g className="central-command">
//                   <circle cx="250" cy="200" r="45" fill="url(#blueGrad)" filter="url(#softShadow)">
//                     <animate attributeName="r" values="45;48;45" dur="4s" repeatCount="indefinite"/>
//                   </circle>
//                   <circle cx="248" cy="198" r="35" fill="#64748b" opacity="0.3"/>
//                   <text x="250" y="190" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">SKY</text>
//                   <text x="250" y="210" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">STRUCT</text>
//                   <text x="250" y="265" textAnchor="middle" fontSize="12" fill="#475569" fontWeight="bold">Command Center</text>
                  
//                   {/* Orbital rings */}
//                   <circle cx="250" cy="200" r="60" fill="none" stroke="#ea580c" strokeWidth="2" opacity="0.3">
//                     <animate attributeName="stroke-dasharray" values="0,377;188,188;0,377" dur="6s" repeatCount="indefinite"/>
//                   </circle>
//                   <circle cx="250" cy="200" r="80" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.2">
//                     <animate attributeName="stroke-dasharray" values="0,503;251,251;0,503" dur="8s" repeatCount="indefinite"/>
//                   </circle>
//                 </g>

//                 {/* Stage 1: Project Initiation */}
//                 <g className="stage-planning">
//                   <circle cx="120" cy="100" r="35" fill="url(#blueGrad)" filter="url(#softShadow)">
//                     <animate attributeName="r" values="35;38;35" dur="3s" repeatCount="indefinite"/>
//                   </circle>
//                   <circle cx="118" cy="98" r="25" fill="#64748b" opacity="0.3"/>
                  
//                   {/* 3D Blueprint icon */}
//                   <g transform="translate(105, 85)">
//                     <rect width="30" height="22" rx="2" fill="white" stroke="#475569" strokeWidth="1"/>
//                     <rect x="2" y="2" width="26" height="18" fill="#f8fafc"/>
//                     <line x1="5" y1="6" x2="20" y2="6" stroke="#475569" strokeWidth="1"/>
//                     <line x1="5" y1="10" x2="25" y2="10" stroke="#475569" strokeWidth="1"/>
//                     <line x1="5" y1="14" x2="15" y2="14" stroke="#475569" strokeWidth="1"/>
//                     <circle cx="22" cy="14" r="2" fill="none" stroke="#475569" strokeWidth="1"/>
//                   </g>
                  
//                   <text x="120" y="155" textAnchor="middle" fontSize="11" fill="#475569" fontWeight="bold">PROJECT</text>
//                   <text x="120" y="168" textAnchor="middle" fontSize="11" fill="#475569" fontWeight="bold">INITIATION</text>
                  
//                   {/* Status indicator */}
//                   <circle cx="145" cy="85" r="4" fill="#10b981">
//                     <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
//                   </circle>
//                 </g>

//                 {/* Stage 2: Resource Planning */}
//                 <g className="stage-resources">
//                   <circle cx="380" cy="100" r="35" fill="url(#orangeGrad)" filter="url(#softShadow)">
//                     <animate attributeName="r" values="35;38;35" dur="3s" repeatCount="indefinite" begin="0.5s"/>
//                   </circle>
//                   <circle cx="378" cy="98" r="25" fill="#fb923c" opacity="0.3"/>
                  
//                   {/* 3D Resource charts */}
//                   <g transform="translate(365, 85)">
//                     <rect x="5" y="15" width="6" height="15" fill="white"/>
//                     <rect x="12" y="10" width="6" height="20" fill="white"/>
//                     <rect x="19" y="8" width="6" height="22" fill="white"/>
//                     <rect x="5" y="0" width="20" height="5" rx="2" fill="white"/>
//                   </g>
                  
//                   <text x="380" y="155" textAnchor="middle" fontSize="11" fill="#ea580c" fontWeight="bold">RESOURCE</text>
//                   <text x="380" y="168" textAnchor="middle" fontSize="11" fill="#ea580c" fontWeight="bold">PLANNING</text>
                  
//                   <circle cx="405" cy="85" r="4" fill="#fbbf24">
//                     <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" begin="0.5s"/>
//                   </circle>
//                 </g>

//                 {/* Stage 3: Construction Execution */}
//                 <g className="stage-execution">
//                   <circle cx="380" cy="300" r="35" fill="url(#yellowGrad)" filter="url(#softShadow)">
//                     <animate attributeName="r" values="35;38;35" dur="3s" repeatCount="indefinite" begin="1s"/>
//                   </circle>
//                   <circle cx="378" cy="298" r="25" fill="#fcd34d" opacity="0.3"/>
                  
//                   {/* 3D Construction crane */}
//                   <g transform="translate(365, 285)">
//                     <line x1="15" y1="30" x2="15" y2="5" stroke="white" strokeWidth="2"/>
//                     <line x1="15" y1="5" x2="25" y2="5" stroke="white" strokeWidth="2"/>
//                     <line x1="8" y1="5" x2="15" y2="5" stroke="white" strokeWidth="2"/>
//                     <rect x="22" y="3" width="4" height="4" fill="white"/>
//                     <line x1="5" y1="12" x2="25" y2="12" stroke="white" strokeWidth="1"/>
//                     <polygon points="12,30 18,30 20,35 10,35" fill="white"/>
//                   </g>
                  
//                   <text x="380" y="355" textAnchor="middle" fontSize="11" fill="#fbbf24" fontWeight="bold">CONSTRUCTION</text>
//                   <text x="380" y="368" textAnchor="middle" fontSize="11" fill="#fbbf24" fontWeight="bold">EXECUTION</text>
                  
//                   <circle cx="405" cy="285" r="4" fill="#ea580c">
//                     <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" begin="1s"/>
//                   </circle>
//                 </g>

//                 {/* Stage 4: Quality & Safety */}
//                 <g className="stage-quality">
//                   <circle cx="120" cy="300" r="35" fill="url(#greenGrad)" filter="url(#softShadow)">
//                     <animate attributeName="r" values="35;38;35" dur="3s" repeatCount="indefinite" begin="1.5s"/>
//                   </circle>
//                   <circle cx="118" cy="298" r="25" fill="#34d399" opacity="0.3"/>
                  
//                   {/* 3D Safety helmet and checklist */}
//                   <g transform="translate(105, 285)">
//                     <ellipse cx="15" cy="12" rx="12" ry="8" fill="white"/>
//                     <ellipse cx="15" cy="10" rx="10" ry="6" fill="#f8fafc"/>
//                     <rect x="10" y="20" width="10" height="12" rx="1" fill="white"/>
//                     <line x1="12" y1="24" x2="18" y2="24" stroke="#10b981" strokeWidth="1"/>
//                     <line x1="12" y1="27" x2="18" y2="27" stroke="#10b981" strokeWidth="1"/>
//                     <circle cx="11" cy="24" r="1" fill="#10b981"/>
//                     <circle cx="11" cy="27" r="1" fill="#10b981"/>
//                   </g>
                  
//                   <text x="120" y="355" textAnchor="middle" fontSize="11" fill="#10b981" fontWeight="bold">QUALITY &</text>
//                   <text x="120" y="368" textAnchor="middle" fontSize="11" fill="#10b981" fontWeight="bold">SAFETY</text>
                  
//                   <circle cx="145" cy="285" r="4" fill="#fbbf24">
//                     <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" begin="1.5s"/>
//                   </circle>
//                 </g>

//                 {/* Dynamic Connection Lines with Data Flow */}
//                 <g className="connection-lines">
//                   <path d="M 155 100 Q 200 80 215 200" fill="none" stroke="url(#dataFlow1)" strokeWidth="3"/>
//                   <path d="M 345 100 Q 320 80 285 200" fill="none" stroke="url(#dataFlow2)" strokeWidth="3"/>
//                   <path d="M 285 235 Q 320 320 345 300" fill="none" stroke="url(#dataFlow1)" strokeWidth="3"/>
//                   <path d="M 215 235 Q 180 320 155 300" fill="none" stroke="url(#dataFlow2)" strokeWidth="3"/>
                  
//                   {/* Circular data flow around center */}
//                   <circle cx="250" cy="200" r="100" fill="none" stroke="url(#dataFlow1)" strokeWidth="2" opacity="0.6" strokeDasharray="10,5">
//                     <animateTransform attributeName="transform" type="rotate" values="0 250 200;360 250 200" dur="10s" repeatCount="indefinite"/>
//                   </circle>
//                 </g>

//                 {/* Real-time Metrics Dashboard */}
//                 <g className="metrics-dashboard">
//                   {/* Live Project Counter */}
//                   <rect x="30" y="450" width="100" height="60" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1" filter="url(#softShadow)"/>
//                   <text x="80" y="470" textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="semibold">Active Projects</text>
//                   <text x="80" y="490" textAnchor="middle" fontSize="24" fill="#ea580c" fontWeight="bold">
//                     <animate attributeName="fill" values="#ea580c;#fb923c;#ea580c" dur="3s" repeatCount="indefinite"/>
//                     247
//                   </text>
                  
//                   {/* Team Efficiency */}
//                   <rect x="150" y="450" width="100" height="60" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1" filter="url(#softShadow)"/>
//                   <text x="200" y="470" textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="semibold">Team Efficiency</text>
//                   <text x="200" y="490" textAnchor="middle" fontSize="24" fill="#10b981" fontWeight="bold">98.2%</text>
                  
//                   {/* Cost Savings */}
//                   <rect x="270" y="450" width="100" height="60" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1" filter="url(#softShadow)"/>
//                   <text x="320" y="470" textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="semibold">Cost Savings</text>
//                   <text x="320" y="490" textAnchor="middle" fontSize="20" fill="#fbbf24" fontWeight="bold">$2.4M</text>
                  
//                   {/* Real-time Alerts */}
//                   <rect x="390" y="450" width="80" height="60" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1" filter="url(#softShadow)"/>
//                   <text x="430" y="470" textAnchor="middle" fontSize="9" fill="#64748b" fontWeight="semibold">Live Alerts</text>
//                   <circle cx="430" cy="485" r="8" fill="#ef4444">
//                     <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite"/>
//                     <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/>
//                   </circle>
//                   <text x="430" y="489" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">3</text>
//                 </g>

//                 {/* Interactive Building Animation */}
//                 <g className="building-construction">
//                   {/* Foundation */}
//                   <rect x="50" y="380" width="400" height="20" fill="#64748b" opacity="0.8"/>
                  
//                   {/* Building Structure - Animated Construction */}
//                   <g className="building-floors">
//                     {[1, 2, 3, 4, 5].map((floor, index) => (
//                       <g key={floor}>
//                         <rect x="100" y={360 - (floor * 25)} width="100" height="20" fill="#e2e8f0" stroke="#64748b" strokeWidth="1" opacity="0">
//                           <animate attributeName="opacity" values="0;1" dur="1s" begin={`${index * 0.8}s`} fill="freeze"/>
//                         </rect>
//                         <rect x="105" y={365 - (floor * 25)} width="15" height="10" fill="#fbbf24" opacity="0">
//                           <animate attributeName="opacity" values="0;1" dur="0.5s" begin={`${index * 0.8 + 0.5}s`} fill="freeze"/>
//                         </rect>
//                         <rect x="125" y={365 - (floor * 25)} width="15" height="10" fill="#fbbf24" opacity="0">
//                           <animate attributeName="opacity" values="0;1" dur="0.5s" begin={`${index * 0.8 + 0.6}s`} fill="freeze"/>
//                         </rect>
//                         <rect x="145" y={365 - (floor * 25)} width="15" height="10" fill="#fbbf24" opacity="0">
//                           <animate attributeName="opacity" values="0;1" dur="0.5s" begin={`${index * 0.8 + 0.7}s`} fill="freeze"/>
//                         </rect>
//                         <rect x="165" y={365 - (floor * 25)} width="15" height="10" fill="#fbbf24" opacity="0">
//                           <animate attributeName="opacity" values="0;1" dur="0.5s" begin={`${index * 0.8 + 0.8}s`} fill="freeze"/>
//                         </rect>
//                         <rect x="185" y={365 - (floor * 25)} width="10" height="10" fill="#ef4444" opacity="0">
//                           <animate attributeName="opacity" values="0;1" dur="0.3s" begin={`${index * 0.8 + 1}s`} fill="freeze"/>
//                         </rect>
//                       </g>
//                     ))}
//                   </g>
                  
//                   {/* Construction Crane */}
//                   <g className="crane">
//                     <line x1="250" y1="400" x2="250" y2="200" stroke="#64748b" strokeWidth="4"/>
//                     <line x1="250" y1="220" x2="350" y2="220" stroke="#64748b" strokeWidth="3"/>
//                     <line x1="200" y1="220" x2="250" y2="220" stroke="#64748b" strokeWidth="2"/>
//                     <rect x="340" y="215" width="15" height="10" fill="#ea580c">
//                       <animateTransform attributeName="transform" type="translate" values="0,0;-200,0;0,0" dur="8s" repeatCount="indefinite"/>
//                     </rect>
//                     <line x1="347" y1="225" x2="347" y2="245" stroke="#ea580c" strokeWidth="2">
//                       <animateTransform attributeName="transform" type="translate" values="0,0;-200,0;0,0" dur="8s" repeatCount="indefinite"/>
//                     </line>
//                   </g>
                  
//                   {/* Workers (Moving Dots) */}
//                   <g className="workers">
//                     {[1, 2, 3, 4].map((worker, index) => (
//                       <circle key={worker} r="3" fill="#ea580c">
//                         <animateMotion dur="6s" repeatCount="indefinite" begin={`${index * 1.5}s`}>
//                           <path d="M 80 400 L 120 400 L 150 380 L 180 380 L 200 360 L 180 380 L 150 380 L 120 400 L 80 400"/>
//                         </animateMotion>
//                       </circle>
//                     ))}
//                   </g>
//                 </g>

//                 {/* Data Flow Visualization */}
//                 <g className="data-streams">
//                   {/* Stream from planning to center */}
//                   <path d="M 155 100 Q 200 80 215 180" fill="none" stroke="url(#dataFlow1)" strokeWidth="2" opacity="0.8"/>
                  
//                   {/* Stream from resources to center */}
//                   <path d="M 345 100 Q 320 80 285 180" fill="none" stroke="url(#dataFlow2)" strokeWidth="2" opacity="0.8"/>
                  
//                   {/* Stream from center to execution */}
//                   <path d="M 285 220 Q 320 280 345 300" fill="none" stroke="url(#dataFlow1)" strokeWidth="2" opacity="0.8"/>
                  
//                   {/* Stream from center to quality */}
//                   <path d="M 215 220 Q 180 280 155 300" fill="none" stroke="url(#dataFlow2)" strokeWidth="2" opacity="0.8"/>
                  
//                   {/* Circular data orbit */}
//                   <circle cx="250" cy="200" r="120" fill="none" stroke="url(#dataFlow1)" strokeWidth="1" opacity="0.4" strokeDasharray="5,10">
//                     <animateTransform attributeName="transform" type="rotate" values="0 250 200;360 250 200" dur="15s" repeatCount="indefinite"/>
//                   </circle>
//                 </g>

//                 {/* Floating Data Particles */}
//                 <g className="data-particles">
//                   {[...Array(8)].map((_, index) => (
//                     <circle key={index} r="2" fill="#ea580c" opacity="0.6">
//                       <animateMotion dur="12s" repeatCount="indefinite" begin={`${index * 1.5}s`}>
//                         <path d="M 120 100 Q 250 50 380 100 Q 450 200 380 300 Q 250 350 120 300 Q 50 200 120 100"/>
//                       </animateMotion>
//                       <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite"/>
//                     </circle>
//                   ))}
//                 </g>

//                 {/* Progress Rings */}
//                 <g className="progress-rings">
//                   <circle cx="120" cy="100" r="50" fill="none" stroke="#475569" strokeWidth="2" opacity="0.2"/>
//                   <circle cx="120" cy="100" r="50" fill="none" stroke="#475569" strokeWidth="2" strokeDasharray="314" strokeDashoffset="78.5" transform="rotate(-90 120 100)">
//                     <animate attributeName="stroke-dashoffset" values="314;0;314" dur="8s" repeatCount="indefinite"/>
//                   </circle>
                  
//                   <circle cx="380" cy="100" r="50" fill="none" stroke="#ea580c" strokeWidth="2" opacity="0.2"/>
//                   <circle cx="380" cy="100" r="50" fill="none" stroke="#ea580c" strokeWidth="2" strokeDasharray="314" strokeDashoffset="94.2" transform="rotate(-90 380 100)">
//                     <animate attributeName="stroke-dashoffset" values="314;0;314" dur="10s" repeatCount="indefinite" begin="1s"/>
//                   </circle>
                  
//                   <circle cx="380" cy="300" r="50" fill="none" stroke="#fbbf24" strokeWidth="2" opacity="0.2"/>
//                   <circle cx="380" cy="300" r="50" fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="314" strokeDashoffset="157" transform="rotate(-90 380 300)">
//                     <animate attributeName="stroke-dashoffset" values="314;0;314" dur="12s" repeatCount="indefinite" begin="2s"/>
//                   </circle>
                  
//                   <circle cx="120" cy="300" r="50" fill="none" stroke="#10b981" strokeWidth="2" opacity="0.2"/>
//                   <circle cx="120" cy="300" r="50" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="314" strokeDashoffset="31.4" transform="rotate(-90 120 300)">
//                     <animate attributeName="stroke-dashoffset" values="314;0;314" dur="6s" repeatCount="indefinite" begin="3s"/>
//                   </circle>
//                 </g>
//               </svg>
//             </div>

            
            


//             <div className="absolute top-1/3 -left-8 bg-gradient-to-br from-slate-600 to-slate-700 text-white rounded-xl shadow-lg p-4 min-w-[120px]">
//               <div className="text-xs opacity-90 mb-1">Active Teams</div>
//               <div className="text-2xl font-bold">89</div>
//               <div className="text-xs opacity-75 flex items-center mt-1">
//                 <div className="w-2 h-2 bg-blue-400 rounded-full mr-1 animate-pulse"></div>
//                 Online Now
//               </div>
//             </div>

//             <div className="absolute bottom-1/3 -right-8 bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl shadow-lg p-4 min-w-[120px]">
//               <div className="text-xs opacity-90 mb-1">Safety Score</div>
//               <div className="text-2xl font-bold">99.2</div>
//               <div className="text-xs opacity-75 flex items-center mt-1">
//                 <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
//                 Excellent
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SkyStructHero;

import React, { useState, useEffect } from 'react';
import { Play, CheckCircle, Users, Calendar, FileText, BarChart3, TrendingUp, Shield, MapPin, Award } from 'lucide-react';

const SkyStructHero = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const features = [
    { icon: Calendar, text: "Project Scheduling", color: "text-blue-600" },
    { icon: Users, text: "Team Management", color: "text-slate-600" },
    { icon: FileText, text: "Document Control", color: "text-yellow-600" },
    { icon: BarChart3, text: "Progress Tracking", color: "text-slate-700" }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fadeInUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .glass-dashboard {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
        }
      `}</style>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 pt-24">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Left Content - 7 columns */}
       <div className={`lg:col-span-7 space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
      
            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-sans font-semibold text-slate-800 leading-tight">
                Construction Project
                <span className="text-blue-500"> Management</span>
                <br />Made Simple
              </h1>
              <p className="text-lg lg:text-xl font-sans text-slate-600 leading-relaxed max-w-2xl">
                Streamline your construction projects with powerful scheduling, team collaboration, 
                and real-time progress tracking. Built specifically for construction professionals.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Reduce project delays by 40%",
                "Improve team collaboration",
                "Real-time progress updates",
                "Mobile-first design"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="font-sans text-slate-700 text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-sans font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Start Free Trial
              </button>
              <button className="flex items-center justify-center space-x-3 border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-xl font-sans font-semibold hover:bg-slate-50 hover:border-slate-400 transition-all duration-300">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>
</div>

          {/* Right Side - Dashboard - 5 columns */}
          <div className={`lg:col-span-5 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
            <div className="relative">
              
              {/* Main Dashboard */}
              <div className="glass-dashboard rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-gray-900 text-xl lg:text-2xl font-bold">SkyStruct Dashboard</h3>
                    <p className="text-gray-600 text-sm">Live Project Overview</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                  </div>
                </div>

                {/* Construction Visualization */}
                <div className="relative h-64 lg:h-80 mb-6">
                  <svg viewBox="0 0 400 300" className="w-full h-full">
                    <defs>
                      <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6"/>
                        <stop offset="50%" stopColor="#6366f1"/>
                        <stop offset="100%" stopColor="#8b5cf6"/>
                      </linearGradient>
                      <linearGradient id="successGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10b981"/>
                        <stop offset="100%" stopColor="#059669"/>
                      </linearGradient>
                      <linearGradient id="warningGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f59e0b"/>
                        <stop offset="100%" stopColor="#f97316"/>
                      </linearGradient>
                      <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.15"/>
                      </filter>
                    </defs>

                    {/* Central Hub */}
                    <circle cx="200" cy="150" r="40" fill="url(#primaryGrad)" filter="url(#shadow)">
                      <animate attributeName="r" values="40;44;40" dur="3s" repeatCount="indefinite"/>
                    </circle>
                    <text x="200" y="155" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">CORE</text>

                    {/* Surrounding Nodes */}
                    <circle cx="120" cy="80" r="28" fill="url(#primaryGrad)" opacity="0.9">
                      <animate attributeName="r" values="28;32;28" dur="2.5s" repeatCount="indefinite"/>
                    </circle>
                    <text x="120" y="130" textAnchor="middle" fontSize="9" fill="#3b82f6" fontWeight="bold">PLANNING</text>

                    <circle cx="280" cy="80" r="28" fill="url(#successGrad)" opacity="0.9">
                      <animate attributeName="r" values="28;32;28" dur="2.5s" repeatCount="indefinite" begin="0.8s"/>
                    </circle>
                    <text x="280" y="130" textAnchor="middle" fontSize="9" fill="#10b981" fontWeight="bold">BUILD</text>

                    <circle cx="280" cy="220" r="28" fill="url(#warningGrad)" opacity="0.9">
                      <animate attributeName="r" values="28;32;28" dur="2.5s" repeatCount="indefinite" begin="1.6s"/>
                    </circle>
                    <text x="280" y="270" textAnchor="middle" fontSize="9" fill="#f59e0b" fontWeight="bold">MONITOR</text>

                    <circle cx="120" cy="220" r="28" fill="url(#successGrad)" opacity="0.9">
                      <animate attributeName="r" values="28;32;28" dur="2.5s" repeatCount="indefinite" begin="2.4s"/>
                    </circle>
                    <text x="120" y="270" textAnchor="middle" fontSize="9" fill="#10b981" fontWeight="bold">QUALITY</text>

                    {/* Connection Lines */}
                    <path d="M 148 80 Q 170 60 172 150" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.5"/>
                    <path d="M 252 80 Q 240 60 228 150" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.5"/>
                    <path d="M 228 185 Q 240 240 252 220" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.5"/>
                    <path d="M 172 185 Q 160 240 148 220" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.5"/>

                    {/* Building Structure */}
                    <g transform="translate(160, 40)">
                      {[...Array(5)].map((_, floor) => (
                        <g key={floor}>
                          <rect 
                            x="0" 
                            y={floor * 12} 
                            width="80" 
                            height="10" 
                            fill="#f1f5f9" 
                            stroke="#cbd5e1" 
                            strokeWidth="0.5"
                            opacity="0"
                          >
                            <animate attributeName="opacity" values="0;1" dur="0.4s" begin={`${floor * 0.15}s`} fill="freeze"/>
                          </rect>
                          {[...Array(3)].map((_, window) => (
                            <rect 
                              key={window}
                              x={8 + window * 22} 
                              y={floor * 12 + 2} 
                              width="6" 
                              height="6" 
                              fill="#3b82f6" 
                              opacity="0.8"
                            />
                          ))}
                        </g>
                      ))}
                    </g>

                    {/* Animated Elements */}
                    <circle r="2" fill="#10b981">
                      <animateMotion dur="6s" repeatCount="indefinite">
                        <path d="M 50 250 Q 120 200 200 250 Q 280 200 350 250"/>
                      </animateMotion>
                    </circle>
                  </svg>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 glass-card p-3 lg:p-4 rounded-2xl shadow-lg hover-lift">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-3 h-3 lg:w-4 lg:h-4 text-emerald-600" />
                  <span className="text-gray-800 text-xs lg:text-sm font-medium">Live Sites</span>
                </div>
                <div className="text-lg lg:text-2xl font-black text-gray-900">47</div>
              </div>

              <div className="absolute -bottom-4 -left-4 glass-card p-3 lg:p-4 rounded-2xl shadow-lg hover-lift" style={{ animation: 'float 3s ease-in-out infinite' }}>
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-3 h-3 lg:w-4 lg:h-4 text-blue-600" />
                  <span className="text-gray-800 text-xs lg:text-sm font-medium">Safety</span>
                </div>
                <div className="text-lg lg:text-2xl font-black text-gray-900">A+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkyStructHero;