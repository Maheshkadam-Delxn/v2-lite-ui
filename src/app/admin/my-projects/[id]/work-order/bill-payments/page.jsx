'use client';

import { useState } from "react";
import MyProjectHeader from "@/components/my-project/header";
import { Search, Plus, ChevronLeft, ChevronRight, HelpCircle, Eye, User, Download, Mail, RefreshCw, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

const billPaymentData = [
  { 
    billNo: "GH101-BILL-00012", 
    woNo: "GH101-WO-00014", 
    vendor: "Reliable Steel Traders", 
    paidAmount: "10.00 K", 
    status: "Approved"
  },
  { 
    billNo: "GH101-BILL-00009", 
    woNo: "GH101-WO-00012", 
    vendor: "XYZ Suppliers", 
    paidAmount: "4.00 K", 
    status: "Pending"
  },
];

export default function BillPaymentPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredBillPayments = billPaymentData.filter((payment) =>
    payment.billNo.toLowerCase().includes(search.toLowerCase()) ||
    payment.woNo.toLowerCase().includes(search.toLowerCase()) ||
    payment.vendor.toLowerCase().includes(search.toLowerCase()) ||
    payment.paidAmount.toLowerCase().includes(search.toLowerCase()) ||
    payment.status.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBillPayments.length / itemsPerPage);
  const paginatedBillPayments = filteredBillPayments.slice(
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
              <h1 className="text-2xl font-bold text-gray-900">Bill Payments</h1>
              <p className="text-gray-600 mt-1">Manage and track all bill payments</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search bill payments..."
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
                Create Payment
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Payments</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">2</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <CreditCard className="text-blue-600" size={20} />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">1</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <CreditCard className="text-green-600" size={20} />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">1</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <CreditCard className="text-yellow-600" size={20} />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Amount</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">₹14.00K</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <CreditCard className="text-purple-600" size={20} />
                </div>
              </div>
            </div>
          </div>

          {/* Bill Payment Cards */}
          <div className="grid grid-cols-1 gap-5">
            {paginatedBillPayments.map((payment) => (
              <motion.div
                key={payment.billNo}
                className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all duration-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col md:flex-row justify-between items-center">
                  {/* Core Details - Evenly distributed with equal spacing */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full">
                    {/* Bill No */}
                    <div className="flex flex-col items-center justify-center p-2 bg-blue-50 rounded-lg min-w-0">
                      <p className="text-xs font-medium text-gray-500 mb-1">Bill No</p>
                      <p className="font-semibold text-gray-900 text-sm truncate w-full text-center" title={payment.billNo}>{payment.billNo}</p>
                    </div>
                    
                    {/* Work Order No */}
                    <div className="flex flex-col items-center justify-center p-2 bg-green-50 rounded-lg min-w-0">
                      <p className="text-xs font-medium text-gray-500 mb-1">Work Order No</p>
                      <p className="font-semibold text-gray-900 text-sm truncate w-full text-center" title={payment.woNo}>{payment.woNo}</p>
                    </div>
                    
                    {/* Vendor */}
                    <div className="flex flex-col items-center justify-center p-2 bg-purple-50 rounded-lg min-w-0">
                      <p className="text-xs font-medium text-gray-500 mb-1">Vendor</p>
                      <p className="font-semibold text-gray-900 text-sm truncate w-full text-center" title={payment.vendor}>{payment.vendor}</p>
                    </div>
                    
                    {/* Paid Amount */}
                    <div className="flex flex-col items-center justify-center p-2 bg-amber-50 rounded-lg min-w-0">
                      <p className="text-xs font-medium text-gray-500 mb-1">Paid Amount</p>
                      <p className="font-semibold text-gray-900 text-sm truncate w-full text-center" title={`₹${payment.paidAmount}`}>₹{payment.paidAmount}</p>
                    </div>
                    
                    {/* Status */}
                    <div className="flex flex-col items-center justify-center p-2 rounded-lg min-w-0 ${
                      payment.status === 'Approved' ? 'bg-green-50' : 'bg-yellow-50'
                    }">
                      <p className="text-xs font-medium text-gray-500 mb-1">Status</p>
                      <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full text-sm font-medium truncate w-full text-center ${
                        payment.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`} title={payment.status}>
                        {payment.status}
                      </span>
                    </div>
                  </div>

                  {/* Actions - Centered vertically */}
                  <div className="flex items-center justify-center gap-2 mt-4 md:mt-0 flex-shrink-0">
                    <button className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition" title="View">
                      <Eye size={14} />
                      <span className="text-sm font-medium">View</span>
                    </button>
                    <button className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 transition" title="Users">
                      <User size={14} />
                    </button>
                    <button className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 transition" title="Download">
                      <Download size={14} />
                    </button>
                    <button className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition" title="Mail">
                      <Mail size={14} />
                    </button>
                    <button className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 transition" title="Refresh">
                      <RefreshCw size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4 text-gray-600">
            <div className="text-sm">
              Showing {paginatedBillPayments.length} of {filteredBillPayments.length} bill payments
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