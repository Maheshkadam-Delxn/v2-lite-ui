// 'use client';

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { 
//   Search, 
//   Bell, 
//   ChevronDown,
//   Home,
//   Users,
//   Calendar,
//   CreditCard,
//   FileText,
//   Package,
//   CheckCircle,
//   BarChart3,
//   Settings,
//   Mail,
//   User,
//   Folder,
//   AlertCircle,
//   Clock,
//   CheckSquare,
//   FileCheck,
//   MessageSquare,
//   RotateCcw,
//   Eye,
//   PieChart
// } from "lucide-react";
// import MyProjectHeader from "@/components/my-project/header";
// import { use } from "react"; // Import React.use
// import { useProject } from "@/context/ProjectContext";

// export default function DashboardPage() {
//   const { projectId } = useProject();
//   const [activeTab, setActiveTab] = useState("overview");

//   // Mock data for dashboard metrics
//   const metrics = [
//     { title: "Not Started Activity", value: 23, icon: Clock, color: "bg-blue-500" },
//     { title: "Drawings Under Review", value: 4, icon: FileCheck, color: "bg-yellow-500" },
//     { title: "Open GRN", value: 47, icon: Package, color: "bg-purple-500" },
//     { title: "Paid Bill", value: "INR 4,913,643", icon: CreditCard, color: "bg-green-500" },
//     { title: "Open Indent", value: 27, icon: FileText, color: "bg-orange-500" },
//     { title: "Open RFI", value: 2, icon: MessageSquare, color: "bg-red-500" },
//     { title: "Re-inspect", value: 1, icon: RotateCcw, color: "bg-indigo-500" },
//     { title: "Under Review Submittal", value: 10, icon: Eye, color: "bg-pink-500" },
//   ];

//   return (
//     <div className="h-screen bg-gray-50">
//       {/* Top Navigation Bar */}
//       <MyProjectHeader />
    
//       {/* Main Content - Full Screen */}
//       <div className="flex-1 overflow-y-auto p-6">
//         <h1 className="text-2xl font-bold text-gray-800 mb-8">Project Overview</h1>
        
//         {/* Metrics */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {metrics.map((metric, index) => {
//             const Icon = metric.icon;
//             return (
//               <motion.div
//                 whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
//                 transition={{ type: "spring", stiffness: 300 }}
//                 key={index}
//                 className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 flex items-center justify-between cursor-pointer"
//               >
//                 <div className="flex items-center gap-4">
//                   <div className={`p-3 rounded-lg ${metric.color}`}>
//                     <Icon size={20} className="text-white" />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-bold text-gray-900">{metric.value}</h3>
//                     <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
//                       {metric.title}
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* Charts Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//           {/* Drawing Status Chart */}
//           <motion.div
//             whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
//             transition={{ type: "spring", stiffness: 300 }}
//             className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6"
//           >
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-lg font-semibold text-gray-800">Drawing Status Chart</h2>
//               <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
//                 View All
//               </button>
//             </div>
//             <div className="h-64 bg-gray-100 rounded-xl flex items-center justify-center">
//               <div className="text-center text-gray-500">
//                 <PieChart size={40} className="mx-auto mb-2" />
//                 <p>Drawing status visualization</p>
//               </div>
//             </div>
//           </motion.div>

//           {/* Purchase Order Status Chart */}
//           <motion.div
//             whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
//             transition={{ type: "spring", stiffness: 300 }}
//             className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6"
//           >
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-lg font-semibold text-gray-800">Purchase Order Status Chart</h2>
//               <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
//                 View All
//               </button>
//             </div>
//             <div className="h-64 bg-gray-100 rounded-xl flex items-center justify-center">
//               <div className="text-center text-gray-500">
//                 <BarChart3 size={40} className="mx-auto mb-2" />
//                 <p>Purchase order status visualization</p>
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         {/* Recent Activity */}
//         <motion.div
//           whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
//           transition={{ type: "spring", stiffness: 300 }}
//           className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6"
//         >
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
//             <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
//               View All
//             </button>
//           </div>
//           <div className="space-y-4">
//             {[1, 2, 3].map((item) => (
//               <div key={item} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl">
//                 <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//                   <Clock size={18} className="text-blue-600" />
//                 </div>
//                 <div className="flex-1">
//                   <p className="text-sm font-medium text-gray-800">New RFI created</p>
//                   <p className="text-xs text-gray-500">2 hours ago</p>
//                 </div>
//                 <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
//                   Completed
//                 </span>
//               </div>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// src/app/admin/my-projects/[id]/dashboard/page.jsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Bell,
  ChevronDown,
  Home,
  Users,
  Calendar,
  CreditCard,
  FileText,
  Package,
  CheckCircle,
  BarChart3,
  Settings,
  Mail,
  User,
  Folder,
  AlertCircle,
  Clock,
  CheckSquare,
  FileCheck,
  MessageSquare,
  RotateCcw,
  Eye,
  PieChart,
} from "lucide-react";
import MyProjectHeader from "@/components/my-project/header";
import { useProject } from "@/context/ProjectContext";

export default function DashboardPage() {
  const { projectId } = useProject(); // Access projectId from context
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for dashboard metrics
  const metrics = [
    { title: "Not Started Activity", value: 23, icon: Clock, color: "bg-blue-500" },
    { title: "Drawings Under Review", value: 4, icon: FileCheck, color: "bg-yellow-500" },
    { title: "Open GRN", value: 47, icon: Package, color: "bg-purple-500" },
    { title: "Paid Bill", value: "INR 4,913,643", icon: CreditCard, color: "bg-green-500" },
    { title: "Open Indent", value: 27, icon: FileText, color: "bg-orange-500" },
    { title: "Open RFI", value: 2, icon: MessageSquare, color: "bg-red-500" },
    { title: "Re-inspect", value: 1, icon: RotateCcw, color: "bg-indigo-500" },
    { title: "Under Review Submittal", value: 10, icon: Eye, color: "bg-pink-500" },
  ];

  // Fallback UI if projectId is not available
  if (!projectId) {
    return <div>Loading project...</div>;
  }

  return (
    <div className="h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <MyProjectHeader />
    
      {/* Main Content - Full Screen */}
      <div className="flex-1 overflow-y-auto p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Project Overview</h1>
        
        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                transition={{ type: "spring", stiffness: 300 }}
                key={index}
                className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${metric.color}`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{metric.value}</h3>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                      {metric.title}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Drawing Status Chart */}
          <motion.div
            whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Drawing Status Chart</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All
              </button>
            </div>
            <div className="h-64 bg-gray-100 rounded-xl flex items-center justify-center">
              <div className="text-center text-gray-500">
                <PieChart size={40} className="mx-auto mb-2" />
                <p>Drawing status visualization</p>
              </div>
            </div>
          </motion.div>

          {/* Purchase Order Status Chart */}
          <motion.div
            whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Purchase Order Status Chart</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All
              </button>
            </div>
            <div className="h-64 bg-gray-100 rounded-xl flex items-center justify-center">
              <div className="text-center text-gray-500">
                <BarChart3 size={40} className="mx-auto mb-2" />
                <p>Purchase order status visualization</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock size={18} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">New RFI created</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Completed
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}