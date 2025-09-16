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
  Calendar,
  Clock,
  FileText,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const schedules = [
  {
    id: 1,
    report: "Weekly RFI Summary", 
    module: "RFI", 
    project: "Granite Horizon",
    frequency: "Weekly",
    nextRun: "2025-09-15 09:00 AM",
    lastRun: "2025-09-08 09:00 AM",
    status: "Active",
    description: "Weekly summary of all RFI activities"
  },
  {
    id: 2,
    report: "Monthly BOQ Update", 
    module: "BOQ", 
    project: "Granite Horizon",
    frequency: "Monthly",
    nextRun: "2025-10-01 06:00 PM",
    lastRun: "2025-09-01 06:00 PM",
    status: "Active",
    description: "Monthly update of Bill of Quantities"
  },
  {
    id: 3,
    report: "Daily Activity Log", 
    module: "Activity", 
    project: "Granite Horizon",
    frequency: "Daily",
    nextRun: "2025-09-11 08:00 AM",
    lastRun: "2025-09-10 08:00 AM",
    status: "Paused",
    description: "Daily log of all project activities"
  },
  {
    id: 4,
    report: "Submittal Status Report", 
    module: "Submittal Log", 
    project: "Granite Horizon",
    frequency: "Weekly",
    nextRun: "2025-09-16 10:00 AM",
    lastRun: "2025-09-09 10:00 AM",
    status: "Active",
    description: "Weekly status report of all submittals"
  }
];

const tabs = [
  { id: "all", name: "All Schedules", icon: Calendar },
  { id: "active", name: "Active", icon: FileText },
  { id: "paused", name: "Paused", icon: FileText },
  { id: "weekly", name: "Weekly", icon: FileText },
];

const statusOptions = ["All", "Active", "Paused"];
const frequencyOptions = ["All", "Daily", "Weekly", "Monthly"];

export default function ScheduleReportPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [frequencyFilter, setFrequencyFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("nextRun");
  const [sortOrder, setSortOrder] = useState("asc");

  const filteredAndSortedSchedules = useMemo(() => {
    let filtered = schedules.filter((schedule) => {
      const matchesSearch = 
        schedule.report.toLowerCase().includes(search.toLowerCase()) ||
        schedule.module.toLowerCase().includes(search.toLowerCase()) ||
        schedule.project.toLowerCase().includes(search.toLowerCase()) ||
        schedule.description.toLowerCase().includes(search.toLowerCase());
      
      const matchesStatus = statusFilter === "All" || schedule.status === statusFilter;
      const matchesFrequency = frequencyFilter === "All" || schedule.frequency === frequencyFilter;
      
      // Tab filtering
      let matchesTab = true;
      if (activeTab === "active") matchesTab = schedule.status === "Active";
      if (activeTab === "paused") matchesTab = schedule.status === "Paused";
      if (activeTab === "weekly") matchesTab = schedule.frequency === "Weekly";
      
      return matchesSearch && matchesStatus && matchesFrequency && matchesTab;
    });

    return filtered.sort((a, b) => {
      const multiplier = sortOrder === "asc" ? 1 : -1;
      
      switch (sortBy) {
        case "report":
          return a.report.localeCompare(b.report) * multiplier;
        case "module":
          return a.module.localeCompare(b.module) * multiplier;
        case "project":
          return a.project.localeCompare(b.project) * multiplier;
        case "nextRun":
          return (new Date(a.nextRun) - new Date(b.nextRun)) * multiplier;
        case "frequency":
          const frequencyOrder = {Daily: 1, Weekly: 2, Monthly: 3};
          return (frequencyOrder[a.frequency] - frequencyOrder[b.frequency]) * multiplier;
        default:
          return 0;
      }
    });
  }, [search, statusFilter, frequencyFilter, activeTab, sortBy, sortOrder]);

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
              <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
              <select
                value={frequencyFilter}
                onChange={(e) => setFrequencyFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {frequencyOptions.map(option => (
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
                <option value="nextRun">Next Run</option>
                <option value="report">Report Name</option>
                <option value="module">Module</option>
                <option value="project">Project</option>
                <option value="frequency">Frequency</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
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
          <h1 className="text-2xl font-bold text-gray-900">Schedule Reports</h1>
          <p className="text-gray-600 mt-1">Manage automated report schedules</p>
        </div>

        {/* Search + Actions */}
        <div className="flex flex-col sm:flex-row gap-3 relative">
          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search schedules..."
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
              New Schedule
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

      {/* Schedules List */}
      <div className="space-y-4">
        {filteredAndSortedSchedules.map((schedule, idx) => (
          <motion.div
            key={schedule.id}
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
                      <Calendar className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{schedule.report}</h3>
                    </div>
                    <span className={`ml-auto px-2.5 py-1 text-xs font-medium rounded-full ${
                      schedule.status === "Active" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-gray-100 text-gray-700"
                    }`}>
                      {schedule.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mt-4 pl-12">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-gray-400" />
                      <div>
                        <p className="text-gray-500 text-xs">Module</p>
                        <p className="font-medium text-gray-800 text-sm">{schedule.module}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-gray-400" />
                      <div>
                        <p className="text-gray-500 text-xs">Project</p>
                        <p className="font-medium text-gray-800 text-sm">{schedule.project}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-gray-400" />
                      <div>
                        <p className="text-gray-500 text-xs">Frequency</p>
                        <p className="font-medium text-gray-800 text-sm">{schedule.frequency}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-gray-400" />
                      <div>
                        <p className="text-gray-500 text-xs">Next Run</p>
                        <p className="font-medium text-gray-800 text-sm">{schedule.nextRun}</p>
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

        {filteredAndSortedSchedules.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="text-gray-400" size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No schedules found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria.</p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              Create New Schedule
            </button>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button className="flex items-center px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
          <ChevronLeft size={16} className="mr-1" />
          Previous
        </button>
        
        <span className="text-sm text-gray-600">
          Page 1 of 1
        </span>
        
        <button className="flex items-center px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
          Next
          <ChevronRight size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
}