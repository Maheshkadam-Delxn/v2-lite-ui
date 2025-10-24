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
import { useAuth } from '../context/AuthContext';

const DashboardSlidebar = () => {
  const [activeItem, setActiveItem] = useState("Project Overview");
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [myProjects, setMyProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalMembers, setTotalMembers] = useState(0);
  const [totalVendors, setTotalVendors] = useState(0);
  const router = useRouter();
  const { logout: clearAuth } = useAuth();

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token') || '';
      const headers = {
        'Accept': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      console.log(headers);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_PATH}/api/projects`, {
    
      });
      // const dd = await response.json();
      // console.log(response.ok);
      // console.log("deadsf",dd);
      if (response.ok) {
    
       
        const result = await response.json();
        if (result.success) {
          console.log("d",result.projects);
          setMyProjects(result.projects || []);
        } else {
          console.error('API error:', projects?.message);
        }
      } else {
        console.error('Failed to fetch projects');
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMembersCount = async () => {
    try {
      const token = localStorage.getItem('token') || '';
      const headers = {
        'Accept': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_PATH}/api/member`, {
        headers,
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not JSON');
      }
      const { success, data } = await res.json();
      if (success) {
        setTotalMembers(data.length);
      } else {
        console.error('API error:', data?.message);
      }
    } catch (error) {
      console.error('Failed to fetch members:', error);
    }
  };

  const fetchVendorsCount = async () => {
    try {
      const token = localStorage.getItem('token') || '';
      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_PATH}/api/vendor?_=${Date.now()}`, {
        headers,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch vendors: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        setTotalVendors(result.data.length);
      } else {
        throw new Error(result.error || 'Failed to fetch vendors');
      }
    } catch (err) {
      console.error('Error fetching vendors:', err);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchMembersCount();
    fetchVendorsCount();
  }, []);

  console.log(myProjects);
  
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

  const handleLogout = () => {
    clearAuth();
    router.push("/login");
  };

  const menuItems = [
    {
      name: "Project Overview",
      path: "/admin/projects",
      icon: LayoutDashboard,
      badge: loading ? "..." : myProjects.length.toString(),
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
          badge: totalMembers.toString(),
        },
        {
          name: "Vendor",
          path: "/admin/users/vendor",
          icon: Store,
          badge: totalVendors.toString(),
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
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #bfdbfe;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #93c5fd;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #bfdbfe #f1f5f9;
        }
      `}</style>
      <motion.aside
        animate={{ width: collapsed ? 80 : 280 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
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
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
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
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
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
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
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
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
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
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={handleProfileClick}
              style={{ display: "flex", justifyContent: "center" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              
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
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={handleProfileClick}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              
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
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
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
        <nav className="custom-scrollbar" style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
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
                        whileHover={{ 
                          x: collapsed ? 0 : 4, 
                          scale: 1.02, 
                          y: -1 
                        }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 400, 
                          damping: 17 
                        }}
                        onClick={() => toggleSubmenu(item.name)}
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "12px 16px",
                          borderRadius: "12px",
                          transition: "all 0.5s",
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
                                  duration: 0.5,
                                  ease: [0.4, 0, 0.2, 1],
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
                            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
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
                                  <motion.button
                                    whileHover={{ 
                                      scale: 1.02, 
                                      y: -1,
                                      x: 2 
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ 
                                      type: "spring", 
                                      stiffness: 400, 
                                      damping: 17 
                                    }}
                                    onClick={() => handleSubmenuItemClick(sub)}
                                    style={{
                                      width: "100%",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                      padding: "10px 16px",
                                      borderRadius: "12px",
                                      transition: "all 0.5s",
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
                                  </motion.button>
                                </li>
                              );
                            })}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    // === Simple Item (No Submenu) ===
                    <motion.button
                      whileHover={{ 
                        x: collapsed ? 0 : 4, 
                        scale: 1.02, 
                        y: -1 
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 17 
                      }}
                      onClick={() => handleMenuItemClick(item)}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "12px 16px",
                        borderRadius: "12px",
                        transition: "all 0.5s",
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
                    </motion.button>
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
              whileHover={{ 
                scale: 1.05, 
                y: -1 
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
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
              whileHover={{ 
                scale: 1.02, 
                y: -1 
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
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
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
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