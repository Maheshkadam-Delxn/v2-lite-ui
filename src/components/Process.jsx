// components/Process.jsx
'use client';

import { motion } from 'framer-motion';

const Process = () => {
  const processSteps = [
    {
      step: "01",
      title: "Project Setup",
      description: "Create your project, define parameters, and set up your team with appropriate permissions."
    },
    {
      step: "02",
      title: "Planning & Design",
      description: "Upload drawings, create BOQs, plan activities, and allocate resources for your project."
    },
    {
      step: "03",
      title: "Execution",
      description: "Manage daily operations, track progress, handle inventory, and process payments."
    },
    {
      step: "04",
      title: "Monitoring & Control",
      description: "Monitor project metrics, generate reports, and make data-driven decisions to keep projects on track."
    },
    {
      step: "05",
      title: "Completion",
      description: "Close out projects, finalize documentation, and analyze performance for future improvements."
    }
  ];

  return (
    <section id="process" className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How SkyStruct Works</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            A streamlined process designed specifically for construction industry workflows
          </p>
        </motion.div>
        
        <div className="relative">
          {/* Main connecting line - perfectly centered */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 transform -translate-x-1/2 hidden md:block" />
          
          <div className="space-y-20 md:space-y-0">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className="flex flex-col md:flex-row items-center justify-center relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Left side content (for even steps) */}
                {index % 2 === 0 ? (
                  <>
                    <div className="md:w-5/12 md:pr-8 md:text-left order-2 md:order-1">
                      <motion.div 
                        className="bg-white p-6 rounded-xl shadow-md border border-blue-100 hover:shadow-lg transition-shadow duration-300"
                        whileHover={{ y: -5 }}
                      >
                        <div className="flex items-center justify-end mb-3">
                          <span className="text-blue-500 font-bold text-sm bg-blue-50 px-3 py-1 rounded-full">
                            STEP {step.step}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                        <p className="text-slate-600 leading-relaxed">{step.description}</p>
                      </motion.div>
                    </div>
                    
                    {/* Center Circle */}
                    <div className="flex items-center justify-center my-4 md:my-0 order-1 md:order-2 relative z-10">
                      {/* Horizontal connector line */}
                      <div className="hidden md:block absolute -left-8 w-8 h-0.5 bg-blue-200" />
                      
                      {/* Step circle */}
                      <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl shadow-lg relative z-10 border-4 border-white">
                        {step.step}
                      </div>
                      
                      {/* Mobile connecting line */}
                      {index < processSteps.length - 1 && (
                        <div className="md:hidden absolute top-full h-8 w-0.5 bg-blue-200"></div>
                      )}
                    </div>
                    
                    {/* Empty spacer for right side */}
                    <div className="md:w-5/12 order-3 hidden md:block"></div>
                  </>
                ) : (
                  <>
                    {/* Empty spacer for left side */}
                    <div className="md:w-5/12 order-1 hidden md:block"></div>
                    
                    {/* Center Circle */}
                    <div className="flex items-center justify-center my-4 md:my-0 order-1 md:order-2 relative z-10">
                      {/* Horizontal connector line */}
                      <div className="hidden md:block absolute -right-8 w-8 h-0.5 bg-blue-200" />
                      
                      {/* Step circle */}
                      <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl shadow-lg relative z-10 border-4 border-white">
                        {step.step}
                      </div>
                      
                      {/* Mobile connecting line */}
                      {index < processSteps.length - 1 && (
                        <div className="md:hidden absolute top-full h-8 w-0.5 bg-blue-200"></div>
                      )}
                    </div>
                    
                    {/* Right side content (for odd steps) */}
                    <div className="md:w-5/12 md:pl-8 md:text-left order-3">
                      <motion.div 
                        className="bg-white p-6 rounded-xl shadow-md border border-blue-100 hover:shadow-lg transition-shadow duration-300"
                        whileHover={{ y: -5 }}
                      >
                        <div className="flex items-center justify-start mb-3">
                          <span className="text-blue-500 font-bold text-sm bg-blue-50 px-3 py-1 rounded-full">
                            STEP {step.step}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                        <p className="text-slate-600 leading-relaxed">{step.description}</p>
                      </motion.div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;