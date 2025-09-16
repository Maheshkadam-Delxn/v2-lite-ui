// components/Testimonials.jsx
'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';

const Testimonials = () => {
  const controls = useAnimation();
  const marqueeRef = useRef(null);

  const testimonials = [
    { quote: 'SkyStruct has transformed how we manage our construction projects. The visibility into project status and resource allocation has improved our efficiency by 40%.', author: 'Michael Chen', role: 'Project Director, ConstructCo' },
    { quote: 'The document management system alone is worth the investment. No more searching through emails and file shares for the latest drawings and specifications.', author: 'Sarah Johnson', role: 'Construction Manager, BuildRight Inc.' },
    { quote: "We've reduced project delays by 30% since implementing SkyStruct. The real-time alerts and approval workflows keep everything moving smoothly.", author: 'David Martinez', role: 'Operations Director, StructureWorks' },
    { quote: 'SkyStruct has brought clarity and order to our most complex projects. The reporting dashboards are game-changing for executive decision-making.', author: 'Anita Deshmukh', role: 'VP of Projects, UrbanBuild' },
    { quote: 'Collaboration between site engineers and head office has never been this seamless. Everyone works on the same updated information, reducing costly mistakes.', author: 'Rajiv Singh', role: 'Senior Engineer, MegaInfra' },
    { quote: 'The resource planning tools are a lifesaver. We can allocate manpower and materials with precision, avoiding waste and saving on costs.', author: 'Emily Carter', role: 'Resource Manager, BuildTech' },
    { quote: 'We love how lightweight yet powerful SkyStruct is. It’s fast, intuitive, and doesn’t overwhelm our teams with unnecessary complexity.', author: 'Lucas Romero', role: 'Site Supervisor, Structura' },
    { quote: 'Inventory tracking across multiple projects was a nightmare before. Now everything is in one place with real-time visibility.', author: 'Aisha Khan', role: 'Procurement Lead, SteelCore' },
    { quote: 'Approval workflows have eliminated bottlenecks. Payments, indents, and purchase orders move smoothly, keeping vendors happy.', author: 'Daniel White', role: 'Finance Manager, BuildRight Inc.' },
  ];

  const marqueeItems = [...testimonials, ...testimonials]; // loop for infinite scroll

  // Auto scroll
  useEffect(() => {
    controls.start({
      x: ['0%', '-50%'],
      transition: {
        repeat: Infinity,
        ease: 'linear',
        duration: 40,
      },
    });
  }, [controls]);

  const limitText = (text, max = 150) =>
    text.length > max ? text.substring(0, max) + '…' : text;

  return (
    <section className="py-20 bg-blue-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Construction Professionals
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            See what industry experts are saying about SkyStruct V2 Lite
          </p>
        </motion.div>

        {/* Desktop: Auto + User scroll */}
        <div
          ref={marqueeRef}
          className="hidden md:block relative w-full overflow-x-scroll overflow-y-hidden scroll-smooth no-scrollbar"
        >
          <motion.div
            className="flex gap-8"
            animate={controls}
            drag="x" // <-- allow user drag
            dragConstraints={{ left: -1000, right: 0 }} // adjust dynamically if needed
            dragElastic={0.1}
          >
            {marqueeItems.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 flex-shrink-0 w-[350px] h-[320px] flex flex-col justify-between"
              >
                <div>
                  <div className="text-blue-400 text-4xl mb-4">"</div>
                  <p className="text-slate-600 mb-6 italic leading-relaxed line-clamp-5">
                    "{limitText(testimonial.quote)}"
                  </p>
                </div>
                <div className="flex items-center mt-auto">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-500 font-semibold">
                      {testimonial.author
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.author}</h4>
                    <p className="text-slate-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mobile fallback: vertical grid */}
        <div className="grid grid-cols-1 md:hidden gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 h-[320px] flex flex-col justify-between"
            >
              <div>
                <div className="text-blue-400 text-4xl mb-4">"</div>
                <p className="text-slate-600 mb-6 italic leading-relaxed line-clamp-5">
                  "{limitText(testimonial.quote)}"
                </p>
              </div>
              <div className="flex items-center mt-auto">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-500 font-semibold">
                    {testimonial.author
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.author}</h4>
                  <p className="text-slate-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href="/auth/sign-up"
            className="px-8 py-3.5 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors inline-block"
          >
            Join Them Today
          </a>
        </motion.div>
      </div>

      {/* Hide scrollbar */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
