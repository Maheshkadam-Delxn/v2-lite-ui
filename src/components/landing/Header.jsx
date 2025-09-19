// import React, { useState, useEffect } from 'react';
// import { Menu, X, Building } from 'lucide-react';

// const SkyStructHeader = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
    
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const menuItems = [
//     { name: 'Features', href: '#features' },
//     { name: 'How It Works', href: '#process' },
//     { name: 'Pricing', href: '#pricing' },
//     { name: 'Testimonials', href: '#testimonials' },
//     { name: 'Resources', href: '#resources' }
//   ];

//   return (
//     <header className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
//       isScrolled ? 'shadow-lg' : 'shadow-sm'
//     }`}>
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
//               <Building className="w-6 h-6 text-white" />
//             </div>
//             <span className="text-xl font-bold text-slate-800">
//               SkyStruct <span className="text-orange-600">v2lite</span>
//             </span>
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex space-x-8">
//             {menuItems.map((item) => (
//               <a
//                 key={item.name}
//                 href={item.href}
//                 className="text-slate-700 hover:text-orange-600 transition-colors font-medium"
//               >
//                 {item.name}
//               </a>
//             ))}
//           </nav>

//           {/* CTA Buttons */}
//           <div className="hidden md:flex items-center space-x-4">
//             <a
//               href="/login"
//               className="text-slate-600 hover:text-slate-800 font-medium"
//             >
//               Sign In
//             </a>
//             <a
//               href="#trial"
//               className="bg-orange-600 text-white px-6 py-2.5 rounded-lg hover:bg-orange-700 transition-colors font-semibold"
//             >
//               Start Free Trial
//             </a>
//           </div>

//           {/* Mobile Menu Button */}
//           <button 
//             className="md:hidden p-2"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             {isMenuOpen ? (
//               <X className="w-6 h-6 text-slate-700" />
//             ) : (
//               <Menu className="w-6 h-6 text-slate-700" />
//             )}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden bg-white border-t border-gray-200 py-4">
//             <div className="space-y-4">
//               {menuItems.map((item) => (
//                 <a
//                   key={item.name}
//                   href={item.href}
//                   className="block py-2 text-slate-700 hover:text-orange-600 font-medium"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   {item.name}
//                 </a>
//               ))}
              
//               <div className="pt-4 border-t border-gray-200 space-y-3">
//                 <a
//                   href="#login"
//                   className="block text-center py-2 text-slate-700 font-medium"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Sign In
//                 </a>
//                 <a
//                   href="#trial"
//                   className="block text-center py-3 bg-orange-600 text-white rounded-lg font-semibold"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Start Free Trial
//                 </a>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default SkyStructHeader;

import React, { useState, useEffect } from 'react';
import { Menu, X, Building } from 'lucide-react';

const SkyStructHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#process' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Resources', href: '#resources' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
      isScrolled ? 'shadow-lg' : 'shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
              <Building className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">
              SkyStruct <span className="text-blue-400">v2lite</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-slate-700 hover:text-blue-400 transition-colors font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="/login"
              className="text-slate-600 hover:text-slate-800 font-medium"
            >
              Sign In
            </a>
            <a
              href="#trial"
              className="bg-blue-400 text-white px-6 py-2.5 rounded-lg hover:bg-blue-500 transition-colors font-semibold"
            >
              Start Free Trial
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-slate-700" />
            ) : (
              <Menu className="w-6 h-6 text-slate-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4">
            <div className="space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-slate-700 hover:text-blue-400 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <a
                  href="#login"
                  className="block text-center py-2 text-slate-700 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </a>
                <a
                  href="#trial"
                  className="block text-center py-3 bg-blue-400 text-white rounded-lg font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Start Free Trial
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default SkyStructHeader;