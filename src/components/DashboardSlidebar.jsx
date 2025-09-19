// 'use client';

// import { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   LogOut,
//   ChevronDown,
//   LayoutDashboard,
//   Mail,
//   Users,
//   Settings,
//   FolderOpen,
//   UserCheck,
//   Store,
//   Shield,
//   Calendar,
//   Bell,
//   Clock,
//   ChevronLeft
// } from 'lucide-react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// const DashboardSlidebar = () => {
//   const [activeItem, setActiveItem] = useState('Project Overview');
//   const [openSubmenu, setOpenSubmenu] = useState(null);
//   const [collapsed, setCollapsed] = useState(false);
//   const router = useRouter();

//   const toggleSubmenu = (menu) => {
//     setOpenSubmenu(openSubmenu === menu ? null : menu);
//   };

//   useEffect(() => {
//     const fetchMyProjects = async () => {
//       try {
//         const response = await fetch('/api/projects');
//         if (response.ok) {
//           const data = await response.json();
//           setMyProjects(data.projects || []);
//         } else {
//           console.error('Failed to fetch projects');
//         }
//       } catch (error) {
//         console.error('Error fetching projects:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMyProjects();
//   }, []);

//   const handleProfileClick = () => {
//     setActiveItem(''); // Unhighlight all menu items
//     router.push('/admin/profile');
//   };

//   const handleLogout = async () => {
//     try {
//       const response = await fetch('/api/auth/logout', {
//         method: 'POST',
//       });

//       if (response.ok) {
//         router.push('/login');
//       } else {
//         console.error('Logout failed');
//       }
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   const menuItems = [
//     {
//       name: 'Project Overview',
//       path: '/admin/projects',
//       icon: LayoutDashboard,
//       badge: '24',
//       badgeColor: 'bg-blue-100 text-blue-700'
//     },
//     {
//       name: 'Organization Mail',
//       path: '/admin/email',
//       icon: Mail,
//       badge: '12',
//       badgeColor: 'bg-red-100 text-red-700'
//     },
//     {
//       name: 'Users',
//       icon: Users,
//       submenu: [
//         {
//           name: 'Member',
//           path: '/admin/users/member',
//           icon: UserCheck,
//           badge: '156'
//         },
//         {
//           name: 'Vendor',
//           path: '/admin/users/vendor',
//           icon: Store,
//           badge: '48'
//         }
//       ]
//     },
//     {
//       name: 'Settings',
//       icon: Settings,
//       submenu: [
//         {
//           name: 'Permissions',
//           path: '/admin/settings/role',
//           icon: Shield
//         },
//         {
//           name: 'Event',
//           path: '/admin/settings/event',
//           icon: Calendar,
//           badge: '3'
//         },
//         {
//           name: 'Reminder',
//           path: '/admin/settings/reminder',
//           icon: Bell,
//           badge: '7'
//         },
//         {
//           name: 'Schedule',
//           path: '/admin/settings/scheduleReport',
//           icon: Clock
//         }
//       ]
//     },
//     {
//       name: 'My Projects',
//       icon: FolderOpen,
//        submenu: loading
//         ? [{ name: 'Loading...', path: '#', icon: Clock }]
//         : myProjects.length > 0
//           ? myProjects.map(project => ({
//               name: project.name,
//               path: `/admin/projects/${project.id}`,
//               icon: FolderOpen
//             }))
//           : [{ name: 'No projects found', path: '#', icon: FolderOpen }],
//       badge: loading ? '...' : myProjects.length.toString(),
//       badgeColor: 'bg-green-100 text-green-700'
//     }
//   ];
//   return (
//     <motion.aside
//       animate={{ width: collapsed ? 80 : 280 }}
//       transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
//       className="relative bg-white h-screen border-r border-gray-100 flex flex-col shadow-md"
//     >
//       <style jsx>{`
//         /* Custom Scrollbar Styling for WebKit Browsers */
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: #f1f5f9;
//           border-radius: 3px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #706d6dff;
//           border-radius: 3px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: #b6bec6ff;
//         }
//         /* Firefox Scrollbar Styling */
//         .custom-scrollbar {
//           scrollbar-width: thin;
//           scrollbar-color: #a1a8aeff #f1f5f9;
//         }
//       `}</style>

//       {/* Collapse Button */}
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={() => setCollapsed(!collapsed)}
//         className="absolute top-1/2 -right-5 transform -translate-y-1/2 bg-white hover:bg-gray-50 border-2 border-gray-200 w-10 h-10 flex items-center justify-center rounded-xl shadow-lg transition-all hover:shadow-xl z-50"
//       >
//         <motion.div
//           animate={{ rotate: collapsed ? 180 : 0 }}
//           transition={{ duration: 0.35 }}
//         >
//           <ChevronLeft className="w-5 h-5 text-gray-600" />
//         </motion.div>
//       </motion.button>

// {/* Header */}
// <div className={`border-b border-gray-100 p-4`}>
//   <div className="flex items-center gap-3">
//     {/* Logo */}
//     <motion.div
//       whileHover={{ scale: 1.05 }}
//       className="bg-gradient-to-br from-blue-500 to-blue-600 h-12 w-12 rounded-xl flex items-center justify-center shadow-md flex-shrink-0"
//     >
//       <span className="text-white font-bold text-lg">SS</span>
//     </motion.div>

//     {/* Text (animate width & opacity for sync) */}
//     <motion.div
//       initial={false}
//       animate={{
//         width: collapsed ? 0 : "auto",
//         opacity: collapsed ? 0 : 1,
//       }}
//       transition={{ duration: 0.35, ease: "easeInOut" }}
//       className="overflow-hidden"
//     >
//       <h1 className="font-bold text-xl text-gray-900 whitespace-nowrap">
//         SkyStruct{" "}
//         <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600">
//           V2
//         </span>
//       </h1>
//       <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
//         Lite Version
//       </p>
//     </motion.div>
//   </div>
// </div>

//       {/* User Profile Card - Clickable */}
//   <div className="border-b border-gray-100 px-4 py-3">
//   {collapsed ? (
//     // === Collapsed: Avatar only, perfectly centered ===
//     <motion.div
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//       onClick={handleProfileClick}
//       className="flex justify-center"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.35, ease: "easeInOut" }}
//     >
//       <div className="relative">
//         <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
//           AD
//         </div>
//         <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
//       </div>
//     </motion.div>
//   ) : (
//     // === Expanded: Avatar + Blue Mask + Text ===
//     <motion.div
//       whileHover={{ scale: 1.02 }}
//       onClick={handleProfileClick}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.35, ease: "easeInOut" }}
//       className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-3 border border-blue-200 flex items-center gap-3 cursor-pointer"
//     >
//       {/* Avatar */}
//       <div className="relative flex-shrink-0">
//         <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
//           AD
//         </div>
//         <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
//       </div>

//       {/* Profile text */}
//       <AnimatePresence>
//         <motion.div
//           initial={{ opacity: 0, x: -10 }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: -10 }}
//           transition={{ duration: 0.35, ease: "easeInOut" }}
//         >
//           <h3 className="font-semibold text-sm text-gray-900 leading-tight">Alan David</h3>
//           <p className="text-[11px] text-gray-500 font-medium uppercase tracking-wide">Manager</p>
//         </motion.div>
//       </AnimatePresence>
//     </motion.div>
//   )}
// </div>

//       {/* Main Navigation */}
//     <nav className="flex-1 overflow-y-auto py-4 px-4 custom-scrollbar">
//   <ul className="space-y-2">
//     {menuItems.map((item) => {
//       const Icon = item.icon;
//       const isActive = activeItem === item.name;
//       const hasSubmenu = item.submenu;
//       const isSubmenuOpen = openSubmenu === item.name && !collapsed; // close when collapsed

//       return (
//         <li key={item.name}>
//           {hasSubmenu ? (
//             <>
//               {/* Main Menu Item */}
//               <motion.button
//                 whileHover={{ x: collapsed ? 0 : 4 }}
//                 onClick={() => toggleSubmenu(item.name)}
//                 className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${
//                   isActive
//                     ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
//                     : "text-gray-700 hover:bg-blue-50 hover:shadow-sm"
//                 }`}
//               >
//                 <div className="flex items-center gap-4">
//                   <div
//                     className={`flex-shrink-0 ${
//                       isActive ? "text-white" : "text-gray-500"
//                     }`}
//                   >
//                     <Icon className="w-5 h-5" />
//                   </div>
//                   {!collapsed && (
//                     <span className="font-medium text-sm">{item.name}</span>
//                   )}
//                 </div>
//                 {!collapsed && (
//                   <motion.div
//                     animate={{ rotate: isSubmenuOpen ? 180 : 0 }}
//                     transition={{ duration: 0.35, ease: "easeInOut" }}
//                   >
//                     <ChevronDown className="w-4 h-4" />
//                   </motion.div>
//                 )}
//               </motion.button>

//               {/* Submenu */}
//               <AnimatePresence initial={false}>
//                 {isSubmenuOpen && (
//                   <motion.ul
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: "auto" }}
//                     exit={{ opacity: 0, height: 0 }}
//                     transition={{ duration: 0.35, ease: "easeInOut" }}
//                     className="ml-4 mt-2 space-y-1 overflow-hidden"
//                   >
//                     {item.submenu.map((sub) => {
//                       const SubIcon = sub.icon;
//                       const isSubActive = activeItem === sub.name;

//                       return (
//                         <li key={sub.name}>
//                           <Link href={sub.path}>
//                             <motion.button
//                               whileHover={{ x: 4 }}
//                               onClick={() => setActiveItem(sub.name)}
//                               className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-300 ${
//                                 isSubActive
//                                   ? "bg-blue-50 text-blue-600 border border-blue-200"
//                                   : "text-gray-600 hover:bg-blue-50 hover:text-gray-900"
//                               }`}
//                             >
//                               <div className="flex items-center gap-3">
//                                 <SubIcon className="w-4 h-4" />
//                                 <span className="text-sm font-medium">
//                                   {sub.name}
//                                 </span>
//                               </div>
//                               {sub.badge && (
//                                 <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full font-medium">
//                                   {sub.badge}
//                                 </span>
//                               )}
//                             </motion.button>
//                           </Link>
//                         </li>
//                       );
//                     })}
//                   </motion.ul>
//                 )}
//               </AnimatePresence>
//             </>
//           ) : (
//             // === Simple Item (No Submenu) ===
//             <Link href={item.path}>
//               <motion.button
//                 whileHover={{ x: collapsed ? 0 : 4 }}
//                 onClick={() => setActiveItem(item.name)}
//                 className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${
//                   isActive
//                     ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
//                     : "text-gray-700 hover:bg-blue-50 hover:shadow-sm"
//                 }`}
//               >
//                 <div className="flex items-center gap-4">
//                   <div
//                     className={`flex-shrink-0 ${
//                       isActive ? "text-white" : "text-gray-500"
//                     }`}
//                   >
//                     <Icon className="w-5 h-5" />
//                   </div>
//                   {!collapsed && (
//                     <span className="font-medium text-sm">{item.name}</span>
//                   )}
//                 </div>
//                 {!collapsed && item.badge && (
//                   <span
//                     className={`text-xs px-2.5 py-1 rounded-full font-medium ${
//                       isActive
//                         ? "bg-white/20 text-white"
//                         : item.badgeColor || "bg-blue-100 text-blue-600"
//                     }`}
//                   >
//                     {item.badge}
//                   </span>
//                 )}
//               </motion.button>
//             </Link>
//           )}
//         </li>
//       );
//     })}
//   </ul>
// </nav>

//       {/* Footer - Logout */}
// <div
//   className={`border-t border-gray-100 ${
//     collapsed ? "p-3 flex justify-center" : "p-6"
//   }`}
// >
//   {collapsed ? (
//     // === Collapsed Logout (Square Icon) ===
//     <motion.div
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//       onClick={handleLogout}
//       className="w-12 h-12 flex items-center justify-center rounded-xl
//                  bg-gradient-to-r from-blue-100 to-blue-200
//                  text-blue-700 shadow-md hover:shadow-lg cursor-pointer"
//     >
//       <LogOut className="w-5 h-5" />
//     </motion.div>
//   ) : (
//     // === Expanded Logout (Full Button) ===
//     <motion.button
//       whileHover={{ scale: 1.02 }}
//       whileTap={{ scale: 0.98 }}
//       onClick={handleLogout}
//       className="w-full flex items-center justify-center gap-3 px-4 py-3
//                  rounded-xl bg-gradient-to-r from-blue-100 to-blue-200
//                  text-blue-700 font-medium shadow-md hover:shadow-lg transition-all duration-300"
//     >
//       <LogOut className="w-5 h-5" />
//       <AnimatePresence>
//         <motion.span
//           initial={{ opacity: 0, x: -10 }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: -10 }}
//           transition={{ duration: 0.35 }}
//         >
//           Logout
//         </motion.span>
//       </AnimatePresence>
//     </motion.button>
//   )}
// </div>

//     </motion.aside>
//   );
// };

// export default DashboardSlidebar;

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  ChevronDown,
  LayoutDashboard,
  Mail,
  Users,
  Settings,
  FolderOpen,
  UserCheck,
  Store,
  Shield,
  Calendar,
  Bell,
  Clock,
  ChevronLeft,
} from "lucide-react";
 import { useRouter } from 'next/navigation';
const DashboardSlidebar = () => {
  const [activeItem, setActiveItem] = useState("Project Overview");
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [myProjects, setMyProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/projects");
      if (response.ok) {
        const data = await response.json();
        setMyProjects(data.projects || []);
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

    const handleMenuItemClick = (item) => {
    setActiveItem(item.name);
    if (item.path) {
      router.push(item.path);
    }
  };
   const handleSubmenuItemClick = (subItem) => {
    setActiveItem(subItem.name);
    if (subItem.path && subItem.path !== "#") {
      router.push(subItem.path);
    }
  };
  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  const handleProfileClick = () => {
    setActiveItem("");
    router.push('/admin/profile');
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const menuItems = [
    {
      name: "Project Overview",
      path: "/admin/projects",
      icon: LayoutDashboard,
      badge: "24",
      badgeColor: "bg-blue-100 text-blue-700",
    },
    {
      name: "Organization Mail",
      path: "/admin/email",
      icon: Mail,
      badge: "12",
      badgeColor: "bg-red-100 text-red-700",
    },
    {
      name: "Users",
      icon: Users,
      submenu: [
        {
          name: "Member",
          path: "/admin/users/member",
          icon: UserCheck,
          badge: "156",
        },
        {
          name: "Vendor",
          path: "/admin/users/vendor",
          icon: Store,
          badge: "48",
        },
      ],
    },
    {
      name: "Settings",
      icon: Settings,
      submenu: [
        {
          name: "Permissions",
          path: "/admin/settings/role",
          icon: Shield,
        },
        {
          name: "Event",
          path: "/admin/settings/event",
          icon: Calendar,
          badge: "3",
        },
        {
          name: "Reminder",
          path: "/admin/settings/reminder",
          icon: Bell,
          badge: "7",
        },
        {
          name: "Schedule",
          path: "/admin/settings/scheduleReport",
          icon: Clock,
        },
      ],
    },
    {
      name: "My Projects",
      icon: FolderOpen,
      submenu: loading
        ? [{ name: "Loading projects...", path: "#", icon: Clock }]
        : myProjects.length > 0
        ? myProjects.map((project) => ({
            name: project.name,
            path: `/admin/my-projects/${project._id}/dashboard`,
            icon: FolderOpen,
          }))
        : [{ name: "No projects found", path: "#", icon: FolderOpen }],
      badge: loading ? "..." : myProjects.length.toString(),
      badgeColor: "bg-green-100 text-green-700",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <motion.aside
        animate={{ width: collapsed ? 80 : 280 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        style={{
          background: "white",
          height: "100%",
          borderRight: "1px solid #f1f5f9",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          position: "relative",
        }}
      >
        {/* Collapse Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            position: "absolute",
            top: "50%",
            right: "-20px",
            transform: "translateY(-50%)",
            background: "white",
            border: "2px solid #e5e7eb",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "12px",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            zIndex: 50,
          }}
        >
          <motion.div
            animate={{ rotate: collapsed ? 180 : 0 }}
            transition={{ duration: 0.35 }}
          >
            <ChevronLeft size={20} style={{ color: "#4b5563" }} />
          </motion.div>
        </motion.button>

        {/* Header */}
        <div style={{ borderBottom: "1px solid #f1f5f9", padding: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                background:
                  "linear-gradient(to bottom right, #3b82f6, #2563eb)",
                height: "48px",
                width: "48px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                flexShrink: 0,
              }}
            >
              <span
                style={{ color: "white", fontWeight: "bold", fontSize: "18px" }}
              >
                SS
              </span>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={false}
              animate={{
                width: collapsed ? 0 : "auto",
                opacity: collapsed ? 0 : 1,
              }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <h1
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  color: "#111827",
                  whiteSpace: "nowrap",
                }}
              >
                SkyStruct{" "}
                <span
                  style={{
                    background: "linear-gradient(to right, #3b82f6, #2563eb)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  V2
                </span>
              </h1>
              <p
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  fontWeight: "500",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Lite Version
              </p>
            </motion.div>
          </div>
        </div>

        {/* User Profile Card */}
        <div
          style={{ borderBottom: "1px solid #f1f5f9", padding: "12px 16px" }}
        >
          {collapsed ? (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleProfileClick}
              style={{ display: "flex", justifyContent: "center" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    background:
                      "linear-gradient(to bottom right, #3b82f6, #2563eb)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "bold",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  AD
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "-4px",
                    right: "-4px",
                    width: "14px",
                    height: "14px",
                    backgroundColor: "#10b981",
                    borderRadius: "50%",
                    border: "2px solid white",
                  }}
                ></div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.02 }}
              onClick={handleProfileClick}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              style={{
                background:
                  "linear-gradient(to bottom right, #dbeafe, #eff6ff)",
                borderRadius: "12px",
                padding: "12px",
                border: "1px solid #bfdbfe",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                cursor: "pointer",
              }}
            >
              {/* Avatar */}
              <div style={{ position: "relative", flexShrink: 0 }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    background:
                      "linear-gradient(to bottom right, #3b82f6, #2563eb)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "bold",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  AD
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "-4px",
                    right: "-4px",
                    width: "14px",
                    height: "14px",
                    backgroundColor: "#10b981",
                    borderRadius: "50%",
                    border: "2px solid white",
                  }}
                ></div>
              </div>

              {/* Profile text */}
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.35 }}
                >
                  <h3
                    style={{
                      fontWeight: "600",
                      fontSize: "14px",
                      color: "#111827",
                      lineHeight: "1.2",
                    }}
                  >
                    Alan David
                  </h3>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#6b7280",
                      fontWeight: "500",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Manager
                  </p>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* Main Navigation */}
        <nav style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
          <ul style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.name;
              const hasSubmenu = item.submenu;
              const isSubmenuOpen = openSubmenu === item.name && !collapsed;

              return (
                <li key={item.name}>
                  {hasSubmenu ? (
                    <>
                      {/* Main Menu Item */}
                      <motion.button
                        whileHover={{ x: collapsed ? 0 : 4 }}
                        onClick={() => toggleSubmenu(item.name)}
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "12px 16px",
                          borderRadius: "12px",
                          transition: "all 0.3s",
                          background: isActive
                            ? "linear-gradient(to right, #3b82f6, #2563eb)"
                            : "transparent",
                          color: isActive ? "white" : "#374151",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                          }}
                        >
                          <div
                            style={{
                              color: isActive ? "white" : "#6b7280",
                              flexShrink: 0,
                            }}
                          >
                            <Icon size={20} />
                          </div>
                          {!collapsed && (
                            <span
                              style={{ fontWeight: "500", fontSize: "14px" }}
                            >
                              {item.name}
                            </span>
                          )}
                        </div>
                        {!collapsed && (
                          <>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                              }}
                            >
                              {item.badge && (
                                <span
                                  style={{
                                    fontSize: "12px",
                                    padding: "4px 10px",
                                    borderRadius: "9999px",
                                    fontWeight: "500",
                                    background: isActive
                                      ? "rgba(255, 255, 255, 0.2)"
                                      : item.badgeColor.includes("blue")
                                      ? "#dbeafe"
                                      : item.badgeColor.includes("red")
                                      ? "#fee2e2"
                                      : item.badgeColor.includes("green")
                                      ? "#dcfce7"
                                      : "#e5e7eb",
                                    color: isActive
                                      ? "white"
                                      : item.badgeColor.includes("blue")
                                      ? "#1d4ed8"
                                      : item.badgeColor.includes("red")
                                      ? "#dc2626"
                                      : item.badgeColor.includes("green")
                                      ? "#166534"
                                      : "#374151",
                                  }}
                                >
                                  {item.badge}
                                </span>
                              )}
                              <motion.div
                                animate={{ rotate: isSubmenuOpen ? 180 : 0 }}
                                transition={{
                                  duration: 0.35,
                                  ease: "easeInOut",
                                }}
                              >
                                <ChevronDown size={16} />
                              </motion.div>
                            </div>
                          </>
                        )}
                      </motion.button>

                      {/* Submenu */}
                      <AnimatePresence initial={false}>
                        {isSubmenuOpen && (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                            style={{
                              marginLeft: "16px",
                              marginTop: "8px",
                              display: "flex",
                              flexDirection: "column",
                              gap: "4px",
                              overflow: "hidden",
                            }}
                          >
                            {item.submenu.map((sub) => {
                              const SubIcon = sub.icon;
                              const isSubActive = activeItem === sub.name;

                              return (
                                <li key={sub.name}>
                                  <button
                                    onClick={() => handleSubmenuItemClick(sub)}
                                    style={{
                                      width: "100%",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                      padding: "10px 16px",
                                      borderRadius: "12px",
                                      transition: "all 0.3s",
                                      background: isSubActive
                                        ? "#dbeafe"
                                        : "transparent",
                                      color: isSubActive
                                        ? "#2563eb"
                                        : "#4b5563",
                                      border: isSubActive
                                        ? "1px solid #bfdbfe"
                                        : "none",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "12px",
                                      }}
                                    >
                                      <SubIcon size={16} />
                                      <span
                                        style={{
                                          fontSize: "14px",
                                          fontWeight: "500",
                                        }}
                                      >
                                        {sub.name}
                                      </span>
                                    </div>
                                    {sub.badge && (
                                      <span
                                        style={{
                                          backgroundColor: "#dbeafe",
                                          color: "#2563eb",
                                          fontSize: "12px",
                                          padding: "2px 8px",
                                          borderRadius: "9999px",
                                          fontWeight: "500",
                                        }}
                                      >
                                        {sub.badge}
                                      </span>
                                    )}
                                  </button>
                                </li>
                              );
                            })}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    // === Simple Item (No Submenu) ===
                    <button
                      onClick={() => handleMenuItemClick(item)}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "12px 16px",
                        borderRadius: "12px",
                        transition: "all 0.3s",
                        background: isActive
                          ? "linear-gradient(to right, #3b82f6, #2563eb)"
                          : "transparent",
                        color: isActive ? "white" : "#374151",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                        }}
                      >
                        <div
                          style={{
                            color: isActive ? "white" : "#6b7280",
                            flexShrink: 0,
                          }}
                        >
                          <Icon size={20} />
                        </div>
                        {!collapsed && (
                          <span style={{ fontWeight: "500", fontSize: "14px" }}>
                            {item.name}
                          </span>
                        )}
                      </div>
                      {!collapsed && item.badge && (
                        <span
                          style={{
                            fontSize: "12px",
                            padding: "4px 10px",
                            borderRadius: "9999px",
                            fontWeight: "500",
                            background: isActive
                              ? "rgba(255, 255, 255, 0.2)"
                              : item.badgeColor.includes("blue")
                              ? "#dbeafe"
                              : item.badgeColor.includes("red")
                              ? "#fee2e2"
                              : item.badgeColor.includes("green")
                              ? "#dcfce7"
                              : "#e5e7eb",
                            color: isActive
                              ? "white"
                              : item.badgeColor.includes("blue")
                              ? "#1d4ed8"
                              : item.badgeColor.includes("red")
                              ? "#dc2626"
                              : item.badgeColor.includes("green")
                              ? "#166534"
                              : "#374151",
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer - Logout */}
        <div
          style={{
            borderTop: "1px solid #f1f5f9",
            padding: collapsed ? "12px" : "24px",
            display: "flex",
            justifyContent: collapsed ? "center" : "flex-start",
          }}
        >
          {collapsed ? (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              style={{
                width: "48px",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "12px",
                background: "linear-gradient(to right, #dbeafe, #bfdbfe)",
                color: "#1d4ed8",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
              }}
            >
              <LogOut size={20} />
            </motion.div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                padding: "12px 16px",
                borderRadius: "12px",
                background: "linear-gradient(to right, #dbeafe, #bfdbfe)",
                color: "#1d4ed8",
                fontWeight: "500",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
              }}
            >
              <LogOut size={20} />
              <AnimatePresence>
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.35 }}
                >
                  Logout
                </motion.span>
              </AnimatePresence>
            </motion.button>
          )}
        </div>
      </motion.aside>
    </div>
  );
};

export default DashboardSlidebar;
