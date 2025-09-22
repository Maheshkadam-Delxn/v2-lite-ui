'use client';

import { useState } from "react";
import MyProjectHeader from "@/components/my-project/header";
import { Search, Plus, ChevronLeft, ChevronRight, HelpCircle, Eye, User, Download, Mail, RefreshCw, FileText } from "lucide-react";
import { motion } from "framer-motion";

const billData = [
  { 
    woNo: "GH101-WO-00013", 
    woDate: "2025-26-08", 
    vendor: "ABC Constructions", 
    billCount: 1
  },
  { 
    woNo: "GH101-WO-00011", 
    woDate: "2025-25-08", 
    vendor: "XYZ Suppliers", 
    billCount: 2
  },
  { 
    woNo: "GH101-WO-00010", 
    woDate: "2025-23-08", 
    vendor: "XYZ Suppliers", 
    billCount: 1
  },
  { 
    woNo: "GH101-WO-00012", 
    woDate: "2025-25-08", 
    vendor: "XYZ Suppliers", 
    billCount: 1
  },
  { 
    woNo: "GH101-WO-00014", 
    woDate: "2025-01-09", 
    vendor: "Reliable Steel Traders", 
    billCount: 2
  },
  { 
    woNo: "GH101-WO-00017", 
    woDate: "2025-09-09", 
    vendor: "ABC Constructions", 
    billCount: 1
  },
];

export default function BillPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredBills = billData.filter((bill) =>
    bill.woNo.toLowerCase().includes(search.toLowerCase()) ||
    bill.woDate.toLowerCase().includes(search.toLowerCase()) ||
    bill.vendor.toLowerCase().includes(search.toLowerCase()) ||
    bill.billCount.toString().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBills.length / itemsPerPage);
  const paginatedBills = filteredBills.slice(
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
              <h1 className="text-2xl font-bold text-gray-900">Bills</h1>
              <p className="text-gray-600 mt-1">Manage and track all bills</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search bills..."
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
                Create Bill
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bills</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">8</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <FileText className="text-blue-600" size={20} />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Vendors</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">3</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <User className="text-green-600" size={20} />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Work Orders</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">6</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <FileText className="text-yellow-600" size={20} />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">3</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <FileText className="text-purple-600" size={20} />
                </div>
              </div>
            </div>
          </div>

          {/* Bill Cards */}
          <div className="grid grid-cols-1 gap-5">
            {paginatedBills.map((bill) => (
              <motion.div
                key={bill.woNo}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all duration-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col md:flex-row justify-between items-center">
                  {/* Core Details - Evenly distributed with equal spacing */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
                    {/* Work Order No */}
                    <div className="flex flex-col items-center text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs font-medium text-gray-500 mb-2">Work Order No</p>
                      <p className="font-semibold text-gray-900 text-sm">{bill.woNo}</p>
                    </div>
                    
                    {/* Work Order Date */}
                    <div className="flex flex-col items-center text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-xs font-medium text-gray-500 mb-2">Work Order Date</p>
                      <p className="font-semibold text-gray-900 text-sm">{bill.woDate}</p>
                    </div>
                    
                    {/* Vendor */}
                    <div className="flex flex-col items-center text-center p-3 bg-purple-50 rounded-lg">
                      <p className="text-xs font-medium text-gray-500 mb-2">Vendor</p>
                      <p className="font-semibold text-gray-900 text-sm">{bill.vendor}</p>
                    </div>
                    
                    {/* Bill Count */}
                    <div className="flex flex-col items-center text-center p-3 bg-amber-50 rounded-lg">
                      <p className="text-xs font-medium text-gray-500 mb-2">Bill Count</p>
                      <p className="font-semibold text-gray-900 text-sm">{bill.billCount}</p>
                    </div>
                  </div>

                  {/* Actions - Centered vertically */}
                  <div className="flex items-center gap-2 mt-4 md:mt-0">
                    <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition" title="View">
                      <Eye size={16} />
                      <span className="text-sm font-medium">View</span>
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 transition" title="Users">
                      <User size={16} />
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 transition" title="Download">
                      <Download size={16} />
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition" title="Mail">
                      <Mail size={16} />
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 transition" title="Refresh">
                      <RefreshCw size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4 text-gray-600">
            <div className="text-sm">
              Showing {paginatedBills.length} of {filteredBills.length} bills
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