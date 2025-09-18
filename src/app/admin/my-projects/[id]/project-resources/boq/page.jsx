"use client";

import { useState, useCallback } from "react";
import MyProjectHeader from "@/components/my-project/header";
import { Search, ChevronLeft, ChevronRight, Filter, Download, MoreVertical, Plus } from "lucide-react";
import { debounce } from "lodash";

const BOQListing = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const categories = ["All", "General", "Structural", "Other", "External"];

  const boqData = [
    {
      id: 1,
      title: "General BOQ",
      category: "General",
      type: "Fixed",
      total: "183.75 K",
      paid: "151.55 K",
      status: "PBG",
      statusState: "Approved",
      progress: 82,
    },
    {
      id: 2,
      title: "Structural BOQ",
      category: "Structural",
      type: "Fixed",
      total: "22.40 K",
      paid: "11.20 K",
      status: "WOC",
      statusState: "Approved",
      progress: 50,
    },
    {
      id: 3,
      title: "Other BOQ",
      category: "Other",
      type: "Fixed",
      total: "1.00 B",
      paid: "1.00 B",
      status: "PBG",
      statusState: "Approved",
      progress: 100,
    },
    {
      id: 4,
      title: "External BOQ",
      category: "External",
      type: "Fixed",
      total: "200.65 K",
      paid: "105.33 K",
      status: "WOC",
      statusState: "Approved",
      progress: 52,
    },
  ];

  // Debounced search handler
  const handleSearch = useCallback(
    debounce((value) => {
      setSearchQuery(value);
    }, 300),
    []
  );

  // Filter BOQs
  const filteredBOQs = boqData.filter((boq) => {
    const matchesCategory = activeCategory === "All" || boq.category === activeCategory;
    const matchesSearch = boq.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredBOQs.length / itemsPerPage);
  const paginatedBOQs = filteredBOQs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <MyProjectHeader />
      <div className="p-6 max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-5">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Bill of Quantities</h1>
              <p className="text-gray-500 text-sm mt-1">Manage and track all your project BOQs</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-56">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search BOQs..."
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                  onChange={(e) => handleSearch(e.target.value)}
                  aria-label="Search BOQs"
                />
              </div>
              <button className="flex items-center justify-center p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                <Plus className="h-4 w-4" />
              </button>
              <div className="flex gap-2">
                <button
                  className="flex items-center justify-center p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
                  aria-label="Filter BOQs"
                >
                  <Filter className="h-4 w-4" />
                </button>
                <button
                  className="flex items-center justify-center p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
                  aria-label="Export BOQs"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Stats Overview - More Minimal */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="bg-gray-50 p-3 rounded-md border border-gray-100">
              <p className="text-xs text-gray-600 font-medium">Total BOQs</p>
              <p className="text-lg font-semibold text-gray-900">4</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-md border border-gray-100">
              <p className="text-xs text-gray-600 font-medium">Approved</p>
              <p className="text-lg font-semibold text-gray-900">4</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-md border border-gray-100">
              <p className="text-xs text-gray-600 font-medium">In Progress</p>
              <p className="text-lg font-semibold text-gray-900">2</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-md border border-gray-100">
              <p className="text-xs text-gray-600 font-medium">Total Value</p>
              <p className="text-lg font-semibold text-gray-900">1.41B</p>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1 mb-5">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${
                  activeCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => {
                  setActiveCategory(category);
                  setCurrentPage(1);
                }}
                aria-label={`Filter by ${category}`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* BOQ List - Minimal Cards */}
          <div className="space-y-3 mb-5">
            {paginatedBOQs.length > 0 ? (
              paginatedBOQs.map((boq) => (
                <div
                  key={boq.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-all duration-150"
                >
                  <div className="flex flex-col lg:flex-row justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                        <h3 className="text-base font-medium text-gray-900">{boq.title}</h3>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {boq.category}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Type</p>
                          <p className="text-sm font-medium text-gray-900">{boq.type}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Total/Paid</p>
                          <p className="text-sm font-medium text-gray-900">
                            {boq.total}/{boq.paid}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">{boq.status}</p>
                          <p className="text-sm font-medium text-green-600">{boq.statusState}</p>
                        </div>
                      </div>
                      
                      {/* Progress Bar - Minimal */}
                      <div className="mt-1">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Progress</span>
                          <span>{boq.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-blue-600 h-1.5 rounded-full" 
                            style={{ width: `${boq.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-end lg:justify-start">
                      <button
                        className="p-1.5 hover:bg-gray-100 rounded transition"
                        aria-label={`More options for ${boq.title}`}
                      >
                        <MoreVertical className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 text-sm mb-1">No BOQs found</div>
                <p className="text-gray-500 text-xs">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>

          {/* Pagination - Minimal */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-6 pt-4 border-t border-gray-200">
            <div className="text-xs text-gray-500">
              Showing {paginatedBOQs.length} of {filteredBOQs.length} BOQs
            </div>
            <div className="flex items-center gap-1">
              <button
                className="flex items-center gap-1 px-2.5 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md transition disabled:opacity-50 text-sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span>Prev</span>
              </button>
              
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    className={`w-7 h-7 flex items-center justify-center rounded-md text-xs ${
                      currentPage === page
                        ? "bg-blue-600 text-white font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setCurrentPage(page)}
                    aria-label={`Go to page ${page}`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                className="flex items-center gap-1 px-2.5 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md transition disabled:opacity-50 text-sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                <span>Next</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BOQListing;