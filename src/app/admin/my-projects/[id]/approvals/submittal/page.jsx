'use client';

import { useState } from "react";
import MyProjectHeader from "@/components/my-project/header";
import { Search, Plus, ChevronLeft, ChevronRight, HelpCircle, Eye, Edit, FileCheck, List, UserCheck, Package, File } from "lucide-react";
import { motion } from "framer-motion";

const submittalData = [
  { 
    type: "Material Approval Request", 
    title: "New test1212", 
    reqBy: "Mukesh Sinha", 
    reqTo: "Sonalika" 
  },
  { 
    type: "Prequalification", 
    title: "Vendor Certification", 
    reqBy: "Anil Kumar", 
    reqTo: "Priya Sharma" 
  },
  { 
    type: "Material Approval Request", 
    title: "Steel Sample Approval", 
    reqBy: "Rajesh Patel", 
    reqTo: "Neha Gupta" 
  },
  { 
    type: "Other", 
    title: "Safety Compliance Doc", 
    reqBy: "Sunita Verma", 
    reqTo: "Vikram Singh" 
  },
  { 
    type: "Prequalification", 
    title: "Contractor Review", 
    reqBy: "Deepak Yadav", 
    reqTo: "Anjali Mehta" 
  },
];

const tabs = [
  { id: "All", name: "All", icon: List },
  { id: "Prequalification", name: "Prequalification", icon: UserCheck },
  { id: "Material Approval Request", name: "Material Approval Request", icon: Package },
  { id: "Other", name: "Other", icon: File },
];

export default function SubmittalLogPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("All");
  const itemsPerPage = 5;

  const filteredSubmittals = submittalData.filter((submittal) => {
    const matchesSearch = (
      submittal.type.toLowerCase().includes(search.toLowerCase()) ||
      submittal.title.toLowerCase().includes(search.toLowerCase()) ||
      submittal.reqBy.toLowerCase().includes(search.toLowerCase()) ||
      submittal.reqTo.toLowerCase().includes(search.toLowerCase())
    );
    const matchesTab = activeTab === "All" || submittal.type === activeTab;
    return matchesSearch && matchesTab;
  });

  const totalPages = Math.ceil(filteredSubmittals.length / itemsPerPage);
  const paginatedSubmittals = filteredSubmittals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation Bar */}
      <MyProjectHeader />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto scroll-smooth" style={{ scrollBehavior: 'smooth' }}>
        <div className="p-6 max-w-7xl mx-auto w-full">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Submittal Log</h1>
              <p className="text-gray-600 mt-1">Manage and track all submittal requests</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search submittals..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg 
                             placeholder-gray-500 text-gray-900
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                             transition shadow-sm"
                />
              </div>
              
              <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                <Plus size={18} />
                Add Submittal
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex w-full bg-gray-100 p-1 rounded-xl mb-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setCurrentPage(1); }}
                  className={`flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-all flex-1 justify-center
                    ${activeTab === tab.id
                      ? "bg-blue-50 text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                >
                  <Icon size={18} />
                  {tab.name}
                </button>
              );
            })}
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Submittals</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">5</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <File className="text-blue-600" size={20} />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Prequalification</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">2</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <File className="text-green-600" size={20} />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Material Approval Requests</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">2</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <File className="text-purple-600" size={20} />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Other</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">1</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg">
                  <File className="text-amber-600" size={20} />
                </div>
              </div>
            </div>
          </div>

          {/* Submittal Log Cards */}
          <div className="grid grid-cols-1 gap-5">
            {paginatedSubmittals.map((submittal, index) => (
              <motion.div
                key={submittal.title}
                className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all duration-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
              >
                <div className="flex flex-col md:flex-row justify-between items-center">
                  {/* Core Details - Evenly distributed with equal spacing */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                    {/* Type */}
                    <div className="flex flex-col items-center justify-center p-2 bg-blue-50 rounded-lg min-w-0">
                      <p className="text-xs font-medium text-gray-500 mb-1">Type</p>
                      <p className="font-semibold text-gray-900 text-sm truncate w-full text-center" title={submittal.type}>{submittal.type}</p>
                    </div>
                    
                    {/* Title */}
                    <div className="flex flex-col items-center justify-center p-2 bg-green-50 rounded-lg min-w-0">
                      <p className="text-xs font-medium text-gray-500 mb-1">Title</p>
                      <p className="font-semibold text-gray-900 text-sm truncate w-full text-center" title={submittal.title}>{submittal.title}</p>
                    </div>
                    
                    {/* Req. By */}
                    <div className="flex flex-col items-center justify-center p-2 bg-purple-50 rounded-lg min-w-0">
                      <p className="text-xs font-medium text-gray-500 mb-1">Req. By</p>
                      <p className="font-semibold text-gray-900 text-sm truncate w-full text-center" title={submittal.reqBy}>{submittal.reqBy}</p>
                    </div>
                    
                    {/* Req. To */}
                    <div className="flex flex-col items-center justify-center p-2 bg-amber-50 rounded-lg min-w-0">
                      <p className="text-xs font-medium text-gray-500 mb-1">Req. To</p>
                      <p className="font-semibold text-gray-900 text-sm truncate w-full text-center" title={submittal.reqTo}>{submittal.reqTo}</p>
                    </div>
                  </div>

                  {/* Actions - Centered vertically */}
                  <div className="flex items-center justify-center gap-2 mt-4 md:mt-0 flex-shrink-0">
                    <button className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition" title="View">
                      <Eye size={14} />
                      <span className="text-sm font-medium">View</span>
                    </button>
                    <button className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 transition" title="Edit">
                      <Edit size={14} />
                      <span className="text-sm font-medium">Edit</span>
                    </button>
                    <button className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 transition" title="Audit">
                      <FileCheck size={14} />
                      <span className="text-sm font-medium">Audit</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4 text-gray-600">
            <div className="text-sm">
              Showing {paginatedSubmittals.length} of {filteredSubmittals.length} submittals
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 text-sm font-medium"
              >
                <ChevronLeft size={16} />
                Previous
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium ${currentPage === page ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 text-sm font-medium"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
            
            <button className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
              <HelpCircle size={16} />
              Need Help?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}