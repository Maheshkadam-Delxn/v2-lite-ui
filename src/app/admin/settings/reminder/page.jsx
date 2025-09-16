'use client';

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Eye, 
  Pencil, 
  Plus, 
  Trash2, 
  Filter, 
  Bell,
  Clock,
  Folder,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const reminders = [
  { 
    id: 1,
    subject: "adsq", 
    moduleName: "RFI", 
    projectName: "Granite Horizon",
    status: "Active",
    date: "2024-01-15",
    time: "10:30 AM",
    description: "Reminder for RFI submission"
  },
  { 
    id: 2,
    subject: "Activity Expired", 
    moduleName: "Activity", 
    projectName: "Granite Horizon",
    status: "Active",
    date: "2024-01-14",
    time: "02:15 PM",
    description: "Activity deadline has passed"
  },
  { 
    id: 3,
    subject: "Document Review", 
    moduleName: "Documents", 
    projectName: "Granite Horizon",
    status: "Completed",
    date: "2024-01-10",
    time: "11:05 AM",
    description: "Review submitted documents for approval"
  },
  { 
    id: 4,
    subject: "Meeting Scheduled", 
    moduleName: "Calendar", 
    projectName: "Granite Horizon",
    status: "Pending",
    date: "2024-01-12",
    time: "03:30 PM",
    description: "Project review meeting scheduled"
  }
];

const tabs = [
  { id: "all", name: "All Reminders", icon: Bell },
  { id: "active", name: "Active", icon: Clock },
  { id: "completed", name: "Completed", icon: Clock },
  { id: "pending", name: "Pending", icon: Clock },
];

const statusOptions = ["All", "Active", "Completed", "Pending"];

export default function RemindersPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const filteredAndSortedReminders = useMemo(() => {
    let filtered = reminders.filter((reminder) => {
      const matchesSearch = 
        reminder.subject.toLowerCase().includes(search.toLowerCase()) ||
        reminder.moduleName.toLowerCase().includes(search.toLowerCase()) ||
        reminder.projectName.toLowerCase().includes(search.toLowerCase()) ||
        reminder.description.toLowerCase().includes(search.toLowerCase());
      
      const matchesStatus = statusFilter === "All" || reminder.status === statusFilter;
      
      // Tab filtering
      let matchesTab = true;
      if (activeTab === "active") matchesTab = reminder.status === "Active";
      if (activeTab === "completed") matchesTab = reminder.status === "Completed";
      if (activeTab === "pending") matchesTab = reminder.status === "Pending";
      
      return matchesSearch && matchesStatus && matchesTab;
    });

    return filtered.sort((a, b) => {
      const multiplier = sortOrder === "asc" ? 1 : -1;
      
      switch (sortBy) {
        case "subject":
          return a.subject.localeCompare(b.subject) * multiplier;
        case "moduleName":
          return a.moduleName.localeCompare(b.moduleName) * multiplier;
        case "projectName":
          return a.projectName.localeCompare(b.projectName) * multiplier;
        case "date":
          return (new Date(a.date) - new Date(b.date)) * multiplier;
        default:
          return 0;
      }
    });
  }, [search, statusFilter, activeTab, sortBy, sortOrder]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedReminders.length / itemsPerPage);
  const currentReminders = filteredAndSortedReminders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const FilterPanel = () => (
    <AnimatePresence>
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white rounded-xl border border-gray-200 p-4 mb-6 overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statusOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="date">Date</option>
                <option value="subject">Subject</option>
                <option value="moduleName">Module Name</option>
                <option value="projectName">Project Name</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header with Search and Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reminders Management</h1>
          <p className="text-gray-600 mt-1">Track and manage your system reminders</p>
        </div>

        {/* Search + Actions */}
        <div className="flex flex-col sm:flex-row gap-3 relative">
          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search reminders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg 
                         placeholder-gray-500 text-gray-900
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         transition"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <Filter size={16} />
              Filters
            </button>

            <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              <Plus size={16} />
              Add Reminder
            </button>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      <FilterPanel />

      {/* Tabs */}
      <div className="flex w-full bg-gray-100 p-1 rounded-xl mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-all flex-1 justify-center ${
                activeTab === tab.id
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Icon size={18} />
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* Reminders List */}
      <div className="space-y-4">
        {currentReminders.map((reminder, idx) => (
          <motion.div
            key={reminder.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ y: -2 }}
            className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Bell className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Subject : {reminder.subject}</h3>
                      <p className="text-sm text-gray-600">{reminder.description}</p>
                    </div>
                    <span className={`ml-auto px-2.5 py-1 text-xs font-medium rounded-full ${
                      reminder.status === "Active" 
                        ? "bg-green-100 text-green-700" 
                        : reminder.status === "Completed"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                    }`}>
                      {reminder.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm mt-4 pl-12">
                    <div className="flex items-center gap-2">
                      <Folder size={16} className="text-gray-400" />
                      <div>
                        <p className="text-gray-500 text-xs">Module Name</p>
                        <p className="font-medium text-gray-800 text-sm">{reminder.moduleName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Folder size={16} className="text-gray-400" />
                      <div>
                        <p className="text-gray-500 text-xs">Project Name</p>
                        <p className="font-medium text-gray-800 text-sm">{reminder.projectName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-gray-400" />
                      <div>
                        <p className="text-gray-500 text-xs">Date & Time</p>
                        <p className="font-medium text-gray-800 text-sm">{reminder.date} at {reminder.time}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 ml-4">
                  <button className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition" title="View">
                    <Eye size={16} />
                  </button>
                  <button className="p-2 rounded-lg bg-yellow-50 hover:bg-yellow-100 text-yellow-600 transition" title="Edit">
                    <Pencil size={16} />
                  </button>
                  <button className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition" title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredAndSortedReminders.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="text-gray-400" size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reminders found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria.</p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              Create New Reminder
            </button>
          </div>
        )}
      </div>


{/* Pagination */}
{totalPages > 1 && (
  <div className="flex justify-center items-center gap-4 mt-8">
    {/* Previous Button */}
    <button
      onClick={handlePrevious}
      disabled={currentPage === 1}
      className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm transition
        ${
          currentPage === 1
            ? "border-gray-200 text-gray-400 cursor-not-allowed"
            : "border-gray-300 text-gray-600 hover:bg-gray-50"
        }`}
    >
      Previous
    </button>

    {/* Page Numbers */}
    <div className="flex items-center gap-2">
      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-8 h-8 rounded-lg text-sm font-medium transition
              ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "border border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
          >
            {page}
          </button>
        );
      })}
    </div>

    {/* Next Button */}
    <button
      onClick={handleNext}
      disabled={currentPage === totalPages}
      className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm transition
        ${
          currentPage === totalPages
            ? "border-gray-200 text-gray-400 cursor-not-allowed"
            : "border-gray-300 text-gray-600 hover:bg-gray-50"
        }`}
    >
      Next
    </button>
  </div>
)}

    </div>
  );
}