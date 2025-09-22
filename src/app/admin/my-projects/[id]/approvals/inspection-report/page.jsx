'use client';

import { useState } from "react";
import MyProjectHeader from "@/components/my-project/header";
import { Search, Plus, ChevronLeft, ChevronRight, HelpCircle, Eye, Edit, FileCheck, List, HardHat, Package } from "lucide-react";
import { motion } from "framer-motion";

const inspectionData = [
  { 
    type: "Work Inspection", 
    referenceNo: "GH101-IR-00005", 
    title: "Related to Piler", 
    revision: "1", 
    pass: true, 
    pending: false 
  },
  { 
    type: "Material Inspection", 
    referenceNo: "GH101-IR-00004", 
    title: "Steel Quality Check", 
    revision: "2", 
    pass: false, 
    pending: true 
  },
  { 
    type: "Work Inspection", 
    referenceNo: "GH101-IR-00003", 
    title: "Foundation Review", 
    revision: "1", 
    pass: true, 
    pending: false 
  },
  { 
    type: "Material Inspection", 
    referenceNo: "GH101-IR-00002", 
    title: "Cement Quality", 
    revision: "3", 
    pass: true, 
    pending: false 
  },
  { 
    type: "Work Inspection", 
    referenceNo: "GH101-IR-00001", 
    title: "Piling Progress", 
    revision: "1", 
    pass: false, 
    pending: true 
  },
];

const tabs = [
  { id: "All", name: "All", icon: List },
  { id: "Work Inspection", name: "Work Inspection", icon: HardHat },
  { id: "Material Inspection", name: "Material Inspection", icon: Package },
];

export default function InspectionReportPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("All");
  const itemsPerPage = 5;

  const filteredInspections = inspectionData.filter((inspection) => {
    const matchesSearch = (
      inspection.type.toLowerCase().includes(search.toLowerCase()) ||
      inspection.referenceNo.toLowerCase().includes(search.toLowerCase()) ||
      inspection.title.toLowerCase().includes(search.toLowerCase()) ||
      inspection.revision.toLowerCase().includes(search.toLowerCase())
    );
    const matchesTab = activeTab === "All" || inspection.type === activeTab;
    return matchesSearch && matchesTab;
  });

  const totalPages = Math.ceil(filteredInspections.length / itemsPerPage);
  const paginatedInspections = filteredInspections.slice(
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
              <h1 className="text-2xl font-bold text-gray-900">Inspection</h1>
              <p className="text-gray-600 mt-1">Manage and track all inspection reports</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search inspections..."
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
                Add Inspection
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
                  <p className="text-sm font-medium text-gray-600">Total Inspections</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">5</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <FileCheck className="text-blue-600" size={20} />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Work Inspections</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">3</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <FileCheck className="text-green-600" size={20} />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Material Inspections</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">2</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <FileCheck className="text-purple-600" size={20} />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">2</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg">
                  <FileCheck className="text-amber-600" size={20} />
                </div>
              </div>
            </div>
          </div>

          {/* Inspection Report Cards */}
          <div className="grid grid-cols-1 gap-5">
            {paginatedInspections.map((inspection, index) => (
              <motion.div
                key={inspection.referenceNo}
                className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all duration-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
              >
                <div className="flex flex-col md:flex-row justify-between items-center">
                  {/* Core Details - Evenly distributed with equal spacing */}
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4 w-full">
                    {/* Type */}
                    <div className="flex flex-col items-center justify-center p-2 bg-blue-50 rounded-lg min-w-0">
                      <p className="text-xs font-medium text-gray-500 mb-1">Type</p>
                      <p className="font-semibold text-gray-900 text-sm truncate w-full text-center" title={inspection.type}>{inspection.type}</p>
                    </div>
                    
                    {/* Reference No */}
                    <div className="flex flex-col items-center justify-center p-2 bg-green-50 rounded-lg min-w-0">
                      <p className="text-xs font-medium text-gray-500 mb-1">Reference No</p>
                      <p className="font-semibold text-gray-900 text-sm truncate w-full text-center" title={inspection.referenceNo}>{inspection.referenceNo}</p>
                    </div>
                    
                    {/* Title */}
                    <div className="flex flex-col items-center justify-center p-2 bg-purple-50 rounded-lg min-w-0">
                      <p className="text-xs font-medium text-gray-500 mb-1">Title</p>
                      <p className="font-semibold text-gray-900 text-sm truncate w-full text-center" title={inspection.title}>{inspection.title}</p>
                    </div>
                    
                    {/* Revision */}
                    <div className="flex flex-col items-center justify-center p-2 bg-amber-50 rounded-lg min-w-0">
                      <p className="text-xs font-medium text-gray-500 mb-1">Revision</p>
                      <p className="font-semibold text-gray-900 text-sm truncate w-full text-center" title={inspection.revision}>{inspection.revision}</p>
                    </div>
                    
                    {/* Pass */}
                    <div className="flex flex-col items-center justify-center rounded-lg min-w-0 ">
                      <p className="text-xs font-medium text-gray-500 mb-1">Pass</p>
                      <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full text-sm font-medium w-full text-center truncate ${
                        inspection.pass ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'
                      }`} title={inspection.pass ? 'Passed' : 'Not Passed'}>
                        {inspection.pass ? 'Passed' : 'Not Passed'}
                      </span>
                    </div>
                    
                    {/* Pending */}
                    <div className="flex flex-col items-center justify-center rounded-lg min-w-0 ">
                      <p className="text-xs font-medium text-gray-500 mb-1">Pending</p>
                      <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full text-sm font-medium w-full text-center truncate ${
                        inspection.pending ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-500'
                      }`} title={inspection.pending ? 'Pending' : 'Not Pending'}>
                        {inspection.pending ? 'Pending' : 'Not Pending'}
                      </span>
                    </div>
                  </div>

                  {/* Actions - Centered vertically */}
                  <div className="flex items-center justify-center gap-2 mt-4 md:mt-0 flex-shrink-0">
                    <button className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg  hover:bg-blue-100 text-blue-700 transition" title="View">
                      <Eye size={14} />
                      <span className="text-sm font-medium">View</span>
                    </button>
                    <button className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg  hover:bg-green-100 text-green-700 transition" title="Edit">
                      <Edit size={14} />
                      <span className="text-sm font-medium">Edit</span>
                    </button>
                    <button className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg  hover:bg-purple-100 text-purple-700 transition" title="Audit">
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
              Showing {paginatedInspections.length} of {filteredInspections.length} inspections
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