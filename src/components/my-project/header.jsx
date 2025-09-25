

// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   Home,
//   Users,
//   Calendar,
//   CreditCard,
//   FileText,
//   Package,
//   CheckCircle,
//   BarChart3,
//   ChevronDown,
//   Menu,
//   X,
// } from "lucide-react";

// const MyProjectHeader = ({ projectId }) => {
//   const pathname = usePathname();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [expandedItems, setExpandedItems] = useState({});
//   const [hoveredTab, setHoveredTab] = useState(null);
//   const mobileMenuRef = useRef(null);

//   // Close mobile menu and reset expansions when pathname changes (on navigation)
//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//     setExpandedItems({});
//   }, [pathname]);

//   // Close mobile menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
//         setIsMobileMenuOpen(false);
//       }
//     };

//     if (isMobileMenuOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       document.body.style.overflow = "unset";
//     };
//   }, [isMobileMenuOpen]);

//   const toggleExpandedItem = (name) => {
//     setExpandedItems((prev) => ({
//       ...prev,
//       [name]: !prev[name],
//     }));
//   };

//   // Early return if projectId is not provided to prevent invalid routes
//   if (!projectId) {
//     return (
//       <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 font-sans shadow-sm rounded-b-2xl sticky top-0 z-40 backdrop-blur-sm bg-white/95">
//         <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
//           <h1 className="text-lg font-semibold text-gray-900 tracking-tight flex-shrink-0">
//             Project (Loading...)
//           </h1>
//         </div>
//       </header>
//     );
//   }

//   const basePath = `/admin/my-projects/${projectId}`;

//   const tabs = [
//     {
//       name: "Dashboard",
//       icon: Home,
//       href: `${basePath}/dashboard`,
//     },
//     {
//       name: "Resources",
//       icon: Users,
//       href: `${basePath}/project-resources/boq`,
//       children: [
//         { name: "BOQ", href: `${basePath}/project-resources/boq` },
//         { name: "Drawings", href: `${basePath}/project-resources/drawings` },
//         { name: "Files", href: `${basePath}/project-resources/files` },
//       ],
//     },
//     {
//       name: "Planning",
//       icon: Calendar,
//       href: `${basePath}/project-planning/activity`,
//       children: [
//         { name: "Activity", href: `${basePath}/project-planning/activity` },
//         { name: "Resources", href: `${basePath}/project-planning/resources` },
//         { name: "Timeline", href: `${basePath}/project-planning/timeline` },
//       ],
//     },
//     {
//       name: "Payment",
//       icon: CreditCard,
//       href: `${basePath}/payment/bill-payment`,
//       children: [
//         { name: "Bill Payment", href: `${basePath}/payment/bill-payment` },
//         { name: "Expense", href: `${basePath}/payment/expense` },
//         { name: "Indent", href: `${basePath}/payment/indent` },
//         { name: "Purchase Order", href: `${basePath}/payment/purchase-order` },
//         { name: "Receive Note", href: `${basePath}/payment/receive-note` },
//       ],
//     },
//     {
//       name: "Approvals",
//       icon: CheckCircle,
//       href: `${basePath}/approvals/rfi`,
//       children: [
//         { name: "Inspection", href: `${basePath}/approvals/inspection-report` },
//         { name: "RFI", href: `${basePath}/approvals/rfi` },
//         { name: "Snagging", href: `${basePath}/approvals/snagging` },
//         { name: "Submittal", href: `${basePath}/approvals/submittal` },
//       ],
//     },
//     {
//       name: "Reports",
//       icon: BarChart3,
//       href: `${basePath}/reports/daily-progress-report`,
//       children: [
//         { name: "Daily Progress", href: `${basePath}/reports/daily-progress-report` },
//         { name: "Material", href: `${basePath}/reports/material-consumption-report` },
//         { name: "Timeline", href: `${basePath}/reports/timeline-report` },
//       ],
//     },
//     {
//       name: "Work Order",
//       icon: FileText,
//       href: `${basePath}/work-order`,
//       children: [
//         { name: "Adv Payments", href: `${basePath}/work-order/adv-payments` },
//         { name: "Bill", href: `${basePath}/work-order/bill` },
//         { name: "Bill Payments", href: `${basePath}/work-order/bill-payments` },
//       ],
//     },
//     {
//       name: "Inventory",
//       icon: Package,
//       href: `${basePath}/inventory`,
//     },
//   ];

//   return (
//     <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 font-sans shadow-sm rounded-b-2xl sticky top-0 z-40 backdrop-blur-sm bg-white/95">
//       <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
//         <h1 className="text-lg font-semibold text-gray-900 tracking-tight flex-shrink-0">
//           Project
//         </h1>
//         <button
//           className="sm:hidden p-2 rounded-full hover:bg-gray-100 transition-all duration-300 flex-shrink-0 active:scale-95"
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           aria-label="Toggle menu"
//         >
//           {isMobileMenuOpen ? (
//             <X size={20} className="text-gray-600 transition-transform duration-300 rotate-90" />
//           ) : (
//             <Menu size={20} className="text-gray-600 transition-transform duration-300" />
//           )}
//         </button>
//         <nav className="hidden sm:flex items-center space-x-1 flex-wrap justify-end flex-1">
//           {tabs.map(({ name, icon: Icon, href, children }) => {
//             const isActive = pathname.startsWith(href);
//             const isHovered = hoveredTab === name;

//             return (
//               <div 
//                 key={name} 
//                 className="relative group flex-shrink-0"
//                 onMouseEnter={() => setHoveredTab(name)}
//                 onMouseLeave={() => setHoveredTab(null)}
//               >
//                 <Link
//                   href={href}
//                   className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-xl transition-all duration-300 min-w-[100px] justify-center relative overflow-hidden group ${
//                     isActive
//                       ? "text-blue-700 bg-blue-50 shadow-sm"
//                       : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
//                   }`}
//                 >
//                   {/* Animated background effect */}
//                   <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-400/10 rounded-xl transition-all duration-500 transform ${
//                     isHovered && !isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
//                   }`} />
                  
//                   <Icon 
//                     size={14} 
//                     className={`relative z-10 transition-all duration-300 ${
//                       isActive 
//                         ? "text-blue-600 scale-110" 
//                         : "text-gray-500 group-hover:text-blue-500 group-hover:scale-110"
//                     }`} 
//                   />
//                   <span className="relative z-10 whitespace-nowrap transition-all duration-300">
//                     {name}
//                   </span>
//                   {children && (
//                     <ChevronDown 
//                       size={12} 
//                       className={`relative z-10 transition-all duration-300 ${
//                         isActive 
//                           ? "text-blue-500" 
//                           : "text-gray-400 group-hover:text-blue-400"
//                       } ${isHovered ? "rotate-180" : ""}`} 
//                     />
//                   )}
//                 </Link>
                
//                 {/* Enhanced dropdown with smooth animation */}
//                 {children && (
//                   <div className={`absolute left-0 top-full mt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left ${
//                     isHovered ? "scale-100 translate-y-0" : "scale-95 -translate-y-2"
//                   }`}>
//                     <div className="bg-white/95 backdrop-blur-md border border-gray-200/80 rounded-xl shadow-lg min-w-[180px] z-50 py-2 overflow-hidden">
//                       {children.map((child, index) => (
//                         <Link
//                           key={child.href}
//                           href={child.href}
//                           className={`block px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-blue-50 relative overflow-hidden group ${
//                             pathname === child.href
//                               ? "text-blue-700 bg-blue-50/80"
//                               : "text-gray-600 hover:text-blue-600"
//                           }`}
//                           style={{ transitionDelay: `${index * 30}ms` }}
//                         >
//                           {/* Hover effect line */}
//                           <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 transform scale-y-0 transition-transform duration-300 group-hover:scale-y-100" />
//                           <span className="relative z-10">{child.name}</span>
//                         </Link>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </nav>
//       </div>

//       {/* Enhanced Mobile Menu with smooth animation */}
//       <div 
//         ref={mobileMenuRef}
//         className={`sm:hidden fixed inset-x-0 top-[76px] bottom-0 bg-white/95 backdrop-blur-md z-50 transition-all duration-500 ease-in-out overflow-y-auto ${
//           isMobileMenuOpen 
//             ? "opacity-100 translate-y-0 visible" 
//             : "opacity-0 -translate-y-4 invisible"
//         }`}
//       >
//         <nav className="flex flex-col p-4 gap-1">
//           {tabs.map(({ name, icon: Icon, href, children }) => {
//             const isActive = pathname.startsWith(href);
//             const isExpanded = expandedItems[name];

//             return (
//               <div key={name} className="relative">
//                 <div className="flex items-center rounded-xl transition-all duration-300 hover:bg-gray-50/80">
//                   <Link
//                     href={href}
//                     className={`flex items-center gap-3 flex-1 px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 ${
//                       isActive
//                         ? "text-blue-700 bg-blue-50/80"
//                         : "text-gray-700"
//                     }`}
//                   >
//                     <Icon 
//                       size={18} 
//                       className={isActive ? "text-blue-600" : "text-gray-500"} 
//                     />
//                     <span className="whitespace-nowrap">{name}</span>
//                   </Link>
//                   {children && (
//                     <button
//                       className="p-3 rounded-xl hover:bg-gray-100/50 transition-all duration-300 active:scale-95"
//                       onClick={() => toggleExpandedItem(name)}
//                       aria-label={`Toggle ${name} menu`}
//                     >
//                       <ChevronDown
//                         size={18}
//                         className={`text-gray-500 transition-transform duration-300 ${
//                           isExpanded ? "rotate-180" : ""
//                         }`}
//                       />
//                     </button>
//                   )}
//                 </div>
//                 {children && (
//                   <div 
//                     className={`ml-6 flex flex-col gap-1 border-l-2 border-gray-200/50 pl-4 transition-all duration-500 overflow-hidden ${
//                       isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
//                     }`}
//                   >
//                     {children.map((child, index) => (
//                       <Link
//                         key={child.href}
//                         href={child.href}
//                         className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 transform hover:translate-x-1 ${
//                           pathname === child.href
//                             ? "text-blue-700 bg-blue-50/80"
//                             : "text-gray-600 hover:text-blue-600 hover:bg-gray-50/50"
//                         }`}
//                         style={{ transitionDelay: `${index * 50}ms` }}
//                         onClick={() => {
//                           setIsMobileMenuOpen(false);
//                           setExpandedItems({});
//                         }}
//                       >
//                         {child.name}
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </nav>
        
//         {/* Close button for mobile */}
//         <div className="p-4 border-t border-gray-200/50 mt-4">
//           <button
//             onClick={() => setIsMobileMenuOpen(false)}
//             className="w-full py-3 px-4 bg-gray-100/80 text-gray-700 rounded-xl font-medium transition-all duration-300 active:scale-95 hover:bg-gray-200/80"
//           >
//             Close Menu
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default MyProjectHeader;

// src/components/my-project/header.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Calendar,
  CreditCard,
  FileText,
  Package,
  CheckCircle,
  BarChart3,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { useProject } from "@/context/ProjectContext";

const MyProjectHeader = () => {
  const { projectId } = useProject(); // Access projectId from context
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const [hoveredTab, setHoveredTab] = useState(null);
  const mobileMenuRef = useRef(null);
  const [myProjects, setMyProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_PATH}/api/projects`);
        if (response.ok) {
          const data = await response.json();

          const projectName = data.projects?.filter((p) => p._id === projectId)
          
          setMyProjects(projectName[0] || []);
        } else {
          console.error("Failed to fetch projects");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchProjects();
    }, []);
  
    console.log(myProjects);
    

  // Close mobile menu and reset expansions when pathname changes (on navigation)
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setExpandedItems({});
  }, [pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const toggleExpandedItem = (name) => {
    setExpandedItems((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // Early return if projectId is not provided to prevent invalid routes
  if (!projectId) {
    return (
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 font-sans shadow-sm rounded-b-2xl sticky top-0 z-40 backdrop-blur-sm bg-white/95">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          <h1 className="text-lg font-semibold text-gray-900 tracking-tight flex-shrink-0">
            Project (Loading...)
          </h1>
        </div>
      </header>
    );
  }

  const basePath = `/admin/my-projects/${projectId}`;

  const tabs = [
    {
      name: "Dashboard",
      icon: Home,
      href: `${basePath}/dashboard`,
    },
    {
      name: "Resources",
      icon: Users,
      href: `${basePath}/project-resources/boq`,
      children: [
        { name: "BOQ", href: `${basePath}/project-resources/boq` },
        { name: "Drawings", href: `${basePath}/project-resources/drawings` },
        { name: "Files", href: `${basePath}/project-resources/files` },
      ],
    },
    {
      name: "Planning",
      icon: Calendar,
      href: `${basePath}/project-planning/activity`,
      children: [
        { name: "Activity", href: `${basePath}/project-planning/activity` },
        { name: "Resources", href: `${basePath}/project-planning/resources` },
        { name: "Timeline", href: `${basePath}/project-planning/timeline` },
      ],
    },
    {
      name: "Payment",
      icon: CreditCard,
      href: `${basePath}/payment/bill-payment`,
      children: [
        { name: "Bill Payment", href: `${basePath}/payment/bill-payment` },
        { name: "Expense", href: `${basePath}/payment/expense` },
        { name: "Indent", href: `${basePath}/payment/indent` },
        { name: "Purchase Order", href: `${basePath}/payment/purchase-order` },
        { name: "Receive Note", href: `${basePath}/payment/receive-note` },
      ],
    },
    {
      name: "Approvals",
      icon: CheckCircle,
      href: `${basePath}/approvals/rfi`,
      children: [
        { name: "Inspection", href: `${basePath}/approvals/inspection-report` },
        { name: "RFI", href: `${basePath}/approvals/rfi` },
        { name: "Snagging", href: `${basePath}/approvals/snagging` },
        { name: "Submittal", href: `${basePath}/approvals/submittal` },
      ],
    },
    {
      name: "Reports",
      icon: BarChart3,
      href: `${basePath}/reports/daily-progress-report`,
      children: [
        { name: "Daily Progress", href: `${basePath}/reports/daily-progress-report` },
        { name: "Material", href: `${basePath}/reports/material-consumption-report` },
        { name: "Timeline", href: `${basePath}/reports/timeline-report` },
      ],
    },
    {
      name: "Work Order",
      icon: FileText,
      href: `${basePath}/work-order`,
      children: [
        { name: "Adv Payments", href: `${basePath}/work-order/adv-payments` },
        { name: "Bill", href: `${basePath}/work-order/bill` },
        { name: "Bill Payments", href: `${basePath}/work-order/bill-payments` },
      ],
    },
    {
      name: "Inventory",
      icon: Package,
      href: `${basePath}/product`,
    },
  ];

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 font-sans shadow-sm rounded-b-2xl sticky top-0 z-40 backdrop-blur-sm bg-white/95">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <h1 className="text-lg font-semibold text-gray-900 tracking-tight flex-shrink-0">
         {myProjects.name}
        </h1>
        <button
          className="sm:hidden p-2 rounded-full hover:bg-gray-100 transition-all duration-300 flex-shrink-0 active:scale-95"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X size={20} className="text-gray-600 transition-transform duration-300 rotate-90" />
          ) : (
            <Menu size={20} className="text-gray-600 transition-transform duration-300" />
          )}
        </button>
        <nav className="hidden sm:flex items-center space-x-1 flex-wrap justify-end flex-1">
          {tabs.map(({ name, icon: Icon, href, children }) => {
            const isActive = pathname.startsWith(href);
            const isHovered = hoveredTab === name;

            return (
              <div 
                key={name} 
                className="relative group flex-shrink-0"
                onMouseEnter={() => setHoveredTab(name)}
                onMouseLeave={() => setHoveredTab(null)}
              >
                <Link
                  href={href}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-xl transition-all duration-300 min-w-[100px] justify-center relative overflow-hidden group ${
                    isActive
                      ? "text-blue-700 bg-blue-50 shadow-sm"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-400/10 rounded-xl transition-all duration-500 transform ${
                    isHovered && !isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
                  }`} />
                  <Icon 
                    size={14} 
                    className={`relative z-10 transition-all duration-300 ${
                      isActive 
                        ? "text-blue-600 scale-110" 
                        : "text-gray-500 group-hover:text-blue-500 group-hover:scale-110"
                    }`} 
                  />
                  <span className="relative z-10 whitespace-nowrap transition-all duration-300">
                    {name}
                  </span>
                  {children && (
                    <ChevronDown 
                      size={12} 
                      className={`relative z-10 transition-all duration-300 ${
                        isActive 
                          ? "text-blue-500" 
                          : "text-gray-400 group-hover:text-blue-400"
                      } ${isHovered ? "rotate-180" : ""}`} 
                    />
                  )}
                </Link>
                {children && (
                  <div className={`absolute left-0 top-full mt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left ${
                    isHovered ? "scale-100 translate-y-0" : "scale-95 -translate-y-2"
                  }`}>
                    <div className="bg-white/95 backdrop-blur-md border border-gray-200/80 rounded-xl shadow-lg min-w-[180px] z-50 py-2 overflow-hidden">
                      {children.map((child, index) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-blue-50 relative overflow-hidden group ${
                            pathname === child.href
                              ? "text-blue-700 bg-blue-50/80"
                              : "text-gray-600 hover:text-blue-600"
                          }`}
                          style={{ transitionDelay: `${index * 30}ms` }}
                        >
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 transform scale-y-0 transition-transform duration-300 group-hover:scale-y-100" />
                          <span className="relative z-10">{child.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
      <div 
        ref={mobileMenuRef}
        className={`sm:hidden fixed inset-x-0 top-[76px] bottom-0 bg-white/95 backdrop-blur-md z-50 transition-all duration-500 ease-in-out overflow-y-auto ${
          isMobileMenuOpen 
            ? "opacity-100 translate-y-0 visible" 
            : "opacity-0 -translate-y-4 invisible"
        }`}
      >
        <nav className="flex flex-col p-4 gap-1">
          {tabs.map(({ name, icon: Icon, href, children }) => {
            const isActive = pathname.startsWith(href);
            const isExpanded = expandedItems[name];

            return (
              <div key={name} className="relative">
                <div className="flex items-center rounded-xl transition-all duration-300 hover:bg-gray-50/80">
                  <Link
                    href={href}
                    className={`flex items-center gap-3 flex-1 px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 ${
                      isActive
                        ? "text-blue-700 bg-blue-50/80"
                        : "text-gray-700"
                    }`}
                  >
                    <Icon 
                      size={18} 
                      className={isActive ? "text-blue-600" : "text-gray-500"} 
                    />
                    <span className="whitespace-nowrap">{name}</span>
                  </Link>
                  {children && (
                    <button
                      className="p-3 rounded-xl hover:bg-gray-100/50 transition-all duration-300 active:scale-95"
                      onClick={() => toggleExpandedItem(name)}
                      aria-label={`Toggle ${name} menu`}
                    >
                      <ChevronDown
                        size={18}
                        className={`text-gray-500 transition-transform duration-300 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>
                {children && (
                  <div 
                    className={`ml-6 flex flex-col gap-1 border-l-2 border-gray-200/50 pl-4 transition-all duration-500 overflow-hidden ${
                      isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    {children.map((child, index) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 transform hover:translate-x-1 ${
                          pathname === child.href
                            ? "text-blue-700 bg-blue-50/80"
                            : "text-gray-600 hover:text-blue-600 hover:bg-gray-50/50"
                        }`}
                        style={{ transitionDelay: `${index * 50}ms` }}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setExpandedItems({});
                        }}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-200/50 mt-4">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full py-3 px-4 bg-gray-100/80 text-gray-700 rounded-xl font-medium transition-all duration-300 active:scale-95 hover:bg-gray-200/80"
          >
            Close Menu
          </button>
        </div>
      </div>
    </header>
  );
};

export default MyProjectHeader;