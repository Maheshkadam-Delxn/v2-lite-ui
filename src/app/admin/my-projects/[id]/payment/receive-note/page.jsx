'use client';

import { useState } from "react";
import MyProjectHeader from "@/components/my-project/header";
import { Search, Plus, ChevronLeft, ChevronRight, HelpCircle, Eye, User, Download, Mail, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

const grnData = [
  { poNo: "GH101-PO-00022", poDate: "2025-22-09", supplier: "ABC Constructions", items: 1, amount: "3.55 K" },
  { poNo: "GH101-PO-00021", poDate: "2025-20-09", supplier: "XYZ Suppliers", items: 1, amount: "31.00 K" },
  { poNo: "GH101-PO-00020", poDate: "2025-20-09", supplier: "Reliable Steel Traders", items: 1, amount: "503.50 K" },
  { poNo: "GH101-PO-00019", poDate: "2025-20-08", supplier: "XYZ Suppliers", items: 1, amount: "200.00 K" },
  { poNo: "GH101-PO-00016", poDate: "2025-13-08", supplier: "XYZ Suppliers", items: 1, amount: "22.50 K" },
  { poNo: "GH101-PO-00014", poDate: "2025-23-07", supplier: "ABC Constructions", items: 1, amount: "162.00 K" },
  { poNo: "GH101-PO-00013", poDate: "2025-16-07", supplier: "XYZ Suppliers", items: 1, amount: "4.56 K" },
  { poNo: "GH101-PO-00012", poDate: "2025-16-07", supplier: "ABC Constructions", items: 1, amount: "355.00 K" },
  { poNo: "GH101-PO-00011", poDate: "2025-29-05", supplier: "XYZ Suppliers", items: 2, amount: "80.43 K" },
  { poNo: "GH101-PO-00010", poDate: "2025-29-05", supplier: "ABC Constructions", items: 1, amount: "177.50 K" },
];

export default function GRNPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredGRNs = grnData.filter((grn) =>
    grn.poNo.toLowerCase().includes(search.toLowerCase()) ||
    grn.poDate.toLowerCase().includes(search.toLowerCase()) ||
    grn.supplier.toLowerCase().includes(search.toLowerCase()) ||
    grn.amount.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredGRNs.length / itemsPerPage);
  const paginatedGRNs = filteredGRNs.slice(
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
              <h1 className="text-2xl font-bold text-gray-900">GRN List</h1>
              <p className="text-sm text-gray-600 mt-1">Manage and track your goods received notes</p>
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
                Create GRN
              </button>
            </div>
          </div>

          {/* GRN Cards */}
          <div className="grid grid-cols-1 gap-3">
            {paginatedGRNs.map((grn) => (
              <motion.div
                key={grn.poNo}
                className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all duration-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between gap-4">
                  {/* Core Details */}
                  <div className="flex-1 grid grid-cols-5 gap-2 text-sm">
                    <div className="flex flex-col">
                      <p className="text-gray-500 text-xs font-medium">PO No.</p>
                      <p className="font-semibold text-gray-900">{grn.poNo}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-gray-500 text-xs font-medium">PO Date</p>
                      <p className="font-semibold text-gray-900">{grn.poDate}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-gray-500 text-xs font-medium">Supplier</p>
                      <p className="font-semibold text-gray-900 truncate">{grn.supplier}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-gray-500 text-xs font-medium">Items</p>
                      <p className="font-semibold text-gray-900">{grn.items}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-gray-500 text-xs font-medium">Amount</p>
                      <p className="font-semibold text-gray-900">{grn.amount}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
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