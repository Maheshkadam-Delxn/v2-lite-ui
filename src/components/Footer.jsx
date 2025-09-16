// components/Footer.jsx
'use client';

import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-white h-10 w-10 rounded-lg flex items-center justify-center mr-3">
                <span className="text-slate-900 font-bold text-xl">SS</span>
              </div>
              <span className="font-bold text-xl">
                SkyStruct <span className="text-blue-400">V2</span> Lite
              </span>
            </div>
            <p className="text-slate-400 mb-4">
              Revolutionizing construction workflow management with powerful, intuitive tools.
            </p>
            <div className="flex space-x-4">
              {['twitter', 'linkedin', 'facebook'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-6 h-6 bg-slate-700 rounded-full"></div>
                </a>
              ))}
            </div>
          </motion.div>
          
          {['Product', 'Company', 'Support', 'Legal'].map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="font-semibold mb-4 text-lg">{category}</h3>
              <ul className="space-y-2">
                {[1, 2, 3, 4].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors">
                      {category} Link {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-slate-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} SkyStruct V2 Lite. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-slate-500 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-500 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-slate-500 hover:text-white text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;