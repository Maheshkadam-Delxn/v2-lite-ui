"use client";
import { useState } from 'react';
import { Search, Plus, ChevronLeft, ChevronRight, HelpCircle } from "lucide-react";
import MyProjectHeader from '@/components/my-project/header'  


const DrawingGallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const categories = ["All", "General", "Structural"];

  // Sample data (replace with your actual drawing data)
  const drawings = [
    { id: 1, title: "Drawing 1", category: "General", image: "https://via.placeholder.com/300x200" },
    { id: 2, title: "Drawing 2", category: "Structural", image: "https://via.placeholder.com/300x200" },
    { id: 3, title: "Drawing 3", category: "General", image: "https://via.placeholder.com/300x200" },
    { id: 4, title: "Drawing 4", category: "Structural", image: "https://via.placeholder.com/300x200" },
  ];

  // Filter drawings based on category
  const filteredDrawings = drawings.filter(
    (drawing) => activeCategory === "All" || drawing.category === activeCategory
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredDrawings.length / itemsPerPage);
  const paginatedDrawings = filteredDrawings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans">
       <MyProjectHeader />
      <div className="max-w-7xl mx-auto">
       
        <div className="bg-white rounded-lg shadow-sm p-4">
          {/* Header */}
          
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <div className="flex items-center gap-4 mb-4 sm:mb-0">
              <select
                className="border border-gray-200 rounded-md p-2 text-sm text-gray-600 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={activeCategory}
                onChange={(e) => {
                  setActiveCategory(e.target.value);
                  setCurrentPage(1);
                }}
                aria-label="Select category"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search drawings..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  aria-label="Search drawings"
                />
              </div>
              <button
                className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition"
                aria-label="Add new drawing"
              >
                <Plus className="h-4 w-4" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Drawing Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {paginatedDrawings.map((drawing) => (
              <div key={drawing.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <img
                  src={drawing.image}
                  alt={drawing.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3 bg-gray-50">
                  <h3 className="text-sm font-medium text-gray-800">{drawing.title}</h3>
                  <div className="flex justify-between mt-2">
                    <div className="flex space-x-2">
                      <button className="p-1 bg-yellow-100 text-yellow-600 rounded-full hover:bg-yellow-200 transition">
                        <span className="sr-only">Edit</span>
                      </button>
                      <button className="p-1 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition">
                        <span className="sr-only">Share</span>
                      </button>
                      <button className="p-1 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition">
                        <span className="sr-only">Copy</span>
                      </button>
                      <button className="p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition">
                        <span className="sr-only">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center text-sm text-gray-600">
            <button
              className="px-3 py-1 rounded-md hover:bg-gray-100 transition disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              className="px-3 py-1 rounded-md hover:bg-gray-100 transition disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Help Button */}
          <div className="mt-4 text-right">
            <button
              className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition"
              aria-label="Need help"
            >
              <HelpCircle className="h-4 w-4" />
              <span>Need Help?</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawingGallery;