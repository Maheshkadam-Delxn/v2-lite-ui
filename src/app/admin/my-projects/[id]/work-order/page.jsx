'use client';

import { useState } from "react";
import MyProjectHeader from "@/components/my-project/header";
import { Search, Plus, ChevronLeft, ChevronRight, HelpCircle, Eye, User, Download, Mail, RefreshCw, FileText } from "lucide-react";
import { motion } from "framer-motion";

const workOrderData = [
  { 
    woNo: "GH101-WO-00010", 
    vendor: "XYZ Suppliers", 
    totalAmount: "1.56 K", 
    billGenerated: "404.0", 
    billPaid: "0.0", 
    status: "Approved" 
  },
  { 
    woNo: "GH101-WO-00011", 
    vendor: "XYZ Suppliers", 
    totalAmount: "5.10 K", 
    billGenerated: "9.18 K", 
    billPaid: "0.0", 
    status: "Approved" 
  },
  { 
    woNo: "GH101-WO-00012", 
    vendor: "XYZ Suppliers", 
    totalAmount: "5.10 K", 
    billGenerated: "4.59 K", 
    billPaid: "4.00 K", 
    status: "Approved" 
  },
  { 
    woNo: "GH101-WO-00013", 
    vendor: "ABC Constructions", 
    totalAmount: "10.20 K", 
    billGenerated: "9.69 K", 
    billPaid: "0.0", 
    status: "Approved" 
  },
];

export default function WorkOrderPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredWorkOrders = workOrderData.filter((wo) =>
    wo.woNo.toLowerCase().includes(search.toLowerCase()) ||
    wo.vendor.toLowerCase().includes(search.toLowerCase()) ||
    wo.totalAmount.toLowerCase().includes(search.toLowerCase()) ||
    wo.status.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredWorkOrders.length / itemsPerPage);
  const paginatedWorkOrders = filteredWorkOrders.slice(
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
              <h1 className="text-2xl font-bold text-gray-900">Work Orders</h1>
              <p className="text-gray-600 mt-1">Manage and track all work orders in one place</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search work orders..."
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
                Create Work Order
              </button>
            </div>
          </div>

          {/* Work Order Cards */}
          <div className="grid grid-cols-1 gap-4">
            {paginatedWorkOrders.map((wo) => (
              <motion.div
                key={wo.woNo}
                className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all duration-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col md:flex-row justify-between">
                  {/* Core Details - Improved alignment with grid */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 w-full md:w-auto">
                    <div className="flex flex-col">
                      <p className="text-xs font-medium text-gray-500 mb-1">Work Order No</p>
                      <p className="font-semibold text-gray-900">{wo.woNo}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-xs font-medium text-gray-500 mb-1">Vendor Name</p>
                      <p className="font-semibold text-gray-900">{wo.vendor}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-xs font-medium text-gray-500 mb-1">Total Amount</p>
                      <p className="font-semibold text-gray-900">₹{wo.totalAmount}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-xs font-medium text-gray-500 mb-1">Bill Generate/Paid</p>
                      <p className="font-semibold text-gray-900">₹{wo.billGenerated} / ₹{wo.billPaid}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-xs font-medium text-gray-500 mb-1">Status</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium max-w-fit ${wo.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {wo.status}
                      </span>
                    </div>
                  </div>

                  {/* Actions - Better aligned to the right */}
                  <div className="flex items-center justify-end md:justify-start gap-2 mt-4 md:mt-0">
                    <button className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition" title="View">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 transition" title="Users">
                      <User size={16} />
                    </button>
                    <button className="p-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 transition" title="Download">
                      <Download size={16} />
                    </button>
                    <button className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition" title="Mail">
                      <Mail size={16} />
                    </button>
                    <button className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 transition" title="Refresh">
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
              Showing {paginatedWorkOrders.length} of {filteredWorkOrders.length} work orders
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