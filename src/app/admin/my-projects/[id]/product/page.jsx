'use client';

import { useState } from "react";
import MyProjectHeader from "@/components/my-project/header";
import { Search, Plus, ChevronLeft, ChevronRight, HelpCircle, Eye, File, Edit, FileCheck } from "lucide-react";
import { motion } from "framer-motion";

const materialStockData = [
  { 
    name: "Metal 2", 
    code: "MAT-00006", 
    quantity: "900.0", 
    unit: "Kg", 
    category: "General", 
    attachment: false, 
    status: "Active"
  },
  { 
    name: "Leveling Material", 
    code: "MAT-00005", 
    quantity: "25600.0", 
    unit: "Ton", 
    category: "General", 
    attachment: false, 
    status: "Active"
  },
  { 
    name: "Steel Frames", 
    code: "MAT-00004", 
    quantity: "1355.0", 
    unit: "Nos", 
    category: "General", 
    attachment: true, 
    status: "Active"
  },
  { 
    name: "Sand", 
    code: "MAT-00003", 
    quantity: "5000", 
    unit: "Ton", 
    category: "General", 
    attachment: false, 
    status: "Active"
  },
  { 
    name: "Bricks", 
    code: "MAT-00002", 
    quantity: "11715.0", 
    unit: "Nos", 
    category: "General", 
    attachment: false, 
    status: "Active"
  },
  { 
    name: "Cement", 
    code: "MAT-00001", 
    quantity: "4360.0", 
    unit: "Kg", 
    category: "General", 
    attachment: false, 
    status: "Active"
  },
];

export default function MaterialStockPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredMaterials = materialStockData.filter((material) =>
    material.name.toLowerCase().includes(search.toLowerCase()) ||
    material.code.toLowerCase().includes(search.toLowerCase()) ||
    material.category.toLowerCase().includes(search.toLowerCase()) ||
    material.status.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMaterials.length / itemsPerPage);
  const paginatedMaterials = filteredMaterials.slice(
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Material Stock</h1>
              <p className="text-gray-600 mt-1">Manage and track all material inventory</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search materials..."
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
                Add Material
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Materials</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">6</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <File className="text-blue-600" size={20} />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">6</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <File className="text-green-600" size={20} />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Categories</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">1</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <File className="text-purple-600" size={20} />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Quantity</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">36,030.0</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg">
                  <File className="text-amber-600" size={20} />
                </div>
              </div>
            </div>
          </div>

          {/* Material Stock Cards */}
          <div className="grid grid-cols-1 gap-5">
            {paginatedMaterials.map((material, index) => (
              <motion.div
                key={material.code}
                className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all duration-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
              >
                <div className="flex flex-col md:flex-row justify-between items-center">
                  {/* Core Details - Evenly distributed with equal spacing */}
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4 w-full">
                    {/* Name */}
                    <div className="flex flex-col items-center justify-center p-2 bg-blue-50 rounded-lg min-w-0">
                      <p className="text-xs font-medium text-gray-500 mb-1">Name</p>
                      <p className="font-semibold text-gray-900 text-sm truncate w-full text-center" title={material.name}>{material.name}</p>
                    </div>
                    
                    {/* Material Code */}
                    <div className="flex flex-col items-center justify-center p-2 bg-green-50 rounded-lg min-w-0">
                      <p className="text-xs font-medium text-gray-500 mb-1">Material Code</p>
                      <p className="font-semibold text-gray-900 text-sm truncate w-full text-center" title={material.code}>{material.code}</p>
                    </div>
                    
                    {/* Quantity */}
                    <div className="flex flex-col items-center justify-center p-2 bg-purple-50 rounded-lg min-w-0">
                      <p className="text-xs font-medium text-gray-500 mb-1">Quantity</p>
                      <p className="font-semibold text-gray-900 text-sm truncate w-full text-center" title={`${material.quantity} (${material.unit})`}>
                        {material.quantity} ({material.unit})
                      </p>
                    </div>
                    
                    {/* Category */}
                    <div className="flex flex-col items-center justify-center p-2 bg-amber-50 rounded-lg min-w-0">
                      <p className="text-xs font-medium text-gray-500 mb-1">Category</p>
                      <p className="font-semibold text-gray-900 text-sm truncate w-full text-center" title={material.category}>{material.category}</p>
                    </div>
                    
                    {/* Attachment */}
                    <div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded-lg min-w-0">
                      <p className="text-xs font-medium text-gray-500 mb-1">Attachment</p>
                      <span className={`text-sm font-medium text-center w-full truncate ${
                        material.attachment ? 'text-green-600' : 'text-gray-500'
                      }`} title={material.attachment ? 'File attached' : 'No file attached'}>
                        {material.attachment ? <File size={14} className="mx-auto" /> : 'No file'}
                      </span>
                    </div>
                    
                    {/* Status */}
                    <div className="flex flex-col items-center justify-center rounded-lg min-w-0 ">
                      <p className="text-xs font-medium text-gray-500 mb-1">Status</p>
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 w-full text-center truncate" title={material.status}>
                        {material.status}
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
              Showing {paginatedMaterials.length} of {filteredMaterials.length} materials
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