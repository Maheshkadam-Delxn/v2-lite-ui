'use client';

import { useState } from "react";
import MyProjectHeader from "@/components/my-project/header";
import { Search, Plus, ChevronLeft, ChevronRight, HelpCircle, Eye, User, Download, Mail, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

const poData = [
  { id: "GH101-PO-00022", vendor: "ABC Constructions", poAmount: "3.55 K", grnPaidAmount: "25.20 K/0.0", materialReceived: 100, billInitiated: "Not Initiated", status: "Approved" },
  { id: "GH101-PO-00021", vendor: "XYZ Suppliers", poAmount: "31.00 K", grnPaidAmount: "17.00 K/8.67 K", materialReceived: 54.84, billInitiated: "Partially Paid", status: "Approved" },
  { id: "GH101-PO-00020", vendor: "Reliable Steel Traders", poAmount: "503.50 K", grnPaidAmount: "56.60 K/59.43 K", materialReceived: 11.24, billInitiated: "Partially Paid", status: "Approved" },
  { id: "GH101-PO-00018", vendor: "ABC Constructions", poAmount: "35.50 K", grnPaidAmount: "25.20 K/25.96 K", materialReceived: 100, billInitiated: "Not Initiated", status: "Approved" },
];

export default function PurchaseOrderPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredPOs = poData.filter((po) =>
    po.id.toLowerCase().includes(search.toLowerCase()) ||
    po.vendor.toLowerCase().includes(search.toLowerCase()) ||
    po.poAmount.toLowerCase().includes(search.toLowerCase()) ||
    po.grnPaidAmount.toLowerCase().includes(search.toLowerCase()) ||
    po.status.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPOs.length / itemsPerPage);
  const paginatedPOs = filteredPOs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation Bar */}
      <MyProjectHeader />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto scroll-smooth" style={{ scrollBehavior: 'smooth' }}>
        <div className="p-6">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Purchase Order</h1>
              <p className="text-sm text-gray-600 mt-1">Manage and track your purchase orders</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg 
                             placeholder-gray-500 text-sm text-gray-900
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                             transition shadow-sm"
                />
              </div>
              
              <button className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                <Plus size={16} />
                Create Purchase Order
              </button>
            </div>
          </div>

          {/* Purchase Order Cards */}
          <div className="grid grid-cols-1 gap-3">
            {paginatedPOs.map((po) => (
              <motion.div
                key={po.id}
                className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all duration-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  {/* Left Section: Core Details */}
                  <div className="flex-1 w-full">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="flex flex-col">
                        <p className="text-gray-500 text-xs font-medium">PO ID</p>
                        <p className="font-semibold text-gray-900 text-sm mt-0.5">{po.id}</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-gray-500 text-xs font-medium">Vendor Name</p>
                        <p className="font-semibold text-gray-900 text-sm mt-0.5 truncate">{po.vendor}</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-gray-500 text-xs font-medium">PO Amount</p>
                        <p className="font-semibold text-gray-900 text-sm mt-0.5">{po.poAmount}</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-gray-500 text-xs font-medium">GRN/Paid Amount</p>
                        <p className="font-semibold text-gray-900 text-sm mt-0.5">{po.grnPaidAmount}</p>
                      </div>
                    </div>
                  </div>

                  {/* Middle Section: Progress and Status */}
                  <div className="flex flex-col items-start md:items-end gap-2 w-full md:w-auto">
                    <div className="w-full md:w-40">
                      <p className="text-gray-500 text-xs font-medium mb-0.5">Material Received</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-blue-600 h-1.5 rounded-full"
                            style={{ width: `${po.materialReceived}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-600 min-w-[30px]">{po.materialReceived}%</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium 
                        ${po.billInitiated === "Not Initiated" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}>
                        {po.billInitiated}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium 
                        ${po.status === "Approved" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                        {po.status}
                      </span>
                    </div>
                  </div>

                  {/* Right Section: Actions */}
                  <div className="flex items-center gap-1 mt-3 md:mt-0">
                    <button className="p-1.5 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-600 transition" title="View">
                      <Eye size={14} />
                    </button>
                    <button className="p-1.5 rounded-md bg-gray-50 hover:bg-gray-100 text-gray-600 transition" title="Users">
                      <User size={14} />
                    </button>
                    <button className="p-1.5 rounded-md bg-green-50 hover:bg-green-100 text-green-600 transition" title="Download">
                      <Download size={14} />
                    </button>
                    <button className="p-1.5 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-600 transition" title="Mail">
                      <Mail size={14} />
                    </button>
                    <button className="p-1.5 rounded-md bg-red-50 hover:bg-red-100 text-red-600 transition" title="Refresh">
                      <RefreshCw size={14} />
                    </button>
                    <button className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs hover:bg-gray-200 transition" title="Open">
                      Open
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 text-sm text-gray-600">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronLeft size={16} />
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Next
              <ChevronRight size={16} />
            </button>
            <button className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <HelpCircle size={16} />
              Need Help?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}