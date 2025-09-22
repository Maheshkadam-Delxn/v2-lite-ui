'use client';

import { useState } from "react";
import MyProjectHeader from "@/components/my-project/header";
import { Search, Plus, ChevronLeft, ChevronRight, HelpCircle, Eye, Pencil } from "lucide-react";
import { motion } from "framer-motion";

const indentData = [
  { id: "GH101-INDENT-00024", reqBy: "Alan David", reqTo: "Alan David", status: "Rejected" },
  { id: "GH101-INDENT-00027", reqBy: "Alan David", reqTo: "Alan David, Mukesh Sinha", status: "Approved" },
  { id: "GH101-INDENT-00028", reqBy: "Alan David", reqTo: "Alan David, Mukesh Sinha", status: "Approved" },
  { id: "GH101-INDENT-00029", reqBy: "Alan David", reqTo: "Alan David, Mukesh Sinha", status: "Approved" },
  { id: "GH101-INDENT-00030", reqBy: "Alan David", reqTo: "Alan David, Mukesh Sinha", status: "Approved" },
];

export default function IndentPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredIndents = indentData.filter((indent) => {
    const matchesSearch = indent.id.toLowerCase().includes(search.toLowerCase()) ||
                         indent.reqBy.toLowerCase().includes(search.toLowerCase()) ||
                         indent.reqTo.toLowerCase().includes(search.toLowerCase()) ||
                         indent.status.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredIndents.length / itemsPerPage);
  const paginatedIndents = filteredIndents.slice(
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Indent List</h1>
              <p className="text-sm text-gray-600 mt-1">Manage and track your indents</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search indents..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg 
                             placeholder-gray-500 text-sm text-gray-900
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                             transition shadow-sm"
                />
              </div>
              
              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                  <Plus size={16} />
                  Create Indent
                </button>
              </div>
            </div>
          </div>

          {/* Indent Cards */}
          <div className="grid grid-cols-1 gap-4">
            {paginatedIndents.map((indent) => (
              <motion.div
                key={indent.id}
                className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg hover:scale-102 transition-all duration-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="flex flex-col">
                        <p className="text-gray-600 text-sm font-medium mb-1">Indent Id</p>
                        <p className="font-medium text-gray-900 text-sm">{indent.id}</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-gray-600 text-sm font-medium mb-1">Req. By</p>
                        <p className="font-medium text-gray-900 text-sm">{indent.reqBy}</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-gray-600 text-sm font-medium mb-1">Req. To</p>
                        <p className="font-medium text-gray-900 text-sm">{indent.reqTo}</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="text-gray-600 text-sm font-medium mb-1">Status</p>
                        <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium 
                          ${indent.status === "Approved" ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-red-100 text-red-800 hover:bg-red-200"} 
                          transition-colors duration-200`}>
                          {indent.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-1 ml-2">
                    <button className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition" title="View">
                      <Eye size={14} />
                    </button>
                    <button className="p-1.5 rounded-lg bg-yellow-50 hover:bg-yellow-100 text-yellow-600 transition" title="Edit">
                      <Pencil size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
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