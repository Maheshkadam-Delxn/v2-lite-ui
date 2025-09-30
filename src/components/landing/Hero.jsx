

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
//into main 