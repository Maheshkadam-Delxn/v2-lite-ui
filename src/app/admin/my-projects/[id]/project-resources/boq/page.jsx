'use client';

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MyProjectHeader from "@/components/my-project/header";
import { 
  Search, 
  Eye, 
  Pencil, 
  Plus, 
  Trash2, 
  Filter, 
  Settings,
  Users,
  Shield,
  ChevronDown,
  X,
  User,
  Key,
  Calendar,
  Phone,
  Mail,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Activity,
  Folder,
  FileText,
  AlertCircle,
  DollarSign,
  BarChart3,
  Clipboard,
  Tag,
  Type,
  Calculator,
  TrendingUp,
  Building
} from "lucide-react";

const boqData = [
  { 
    id: 1,
    title: "General BOQ",
    category: "General", 
    type: "Fixed",
    totalAmount: "183.75 K",
    paidAmount: "151.55 K",
    contractor: "PBG",
    status: "Approved",
    lastModified: "2024-01-15"
  },
  { 
    id: 2,
    title: "Structural BOQ",
    category: "Structural", 
    type: "Fixed",
    totalAmount: "22.40 K",
    paidAmount: "11.20 K",
    contractor: "WOC",
    status: "Approved",
    lastModified: "2024-01-10"
  },
  { 
    id: 3,
    title: "Other BOQ",
    category: "Other", 
    type: "Fixed",
    totalAmount: "1.00 B",
    paidAmount: "1.00 B",
    contractor: "PBG",
    status: "Approved",
    lastModified: "2024-01-08"
  },
  { 
    id: 4,
    title: "External BOQ",
    category: "External", 
    type: "Fixed",
    totalAmount: "200.65 K",
    paidAmount: "105.33 K",
    contractor: "WOC",
    status: "Approved",
    lastModified: "2024-01-05"
  },
  { 
    id: 5,
    title: "Variable BOQ",
    category: "External", 
    type: "Variable",
    totalAmount: "500.00 K",
    paidAmount: "250.00 K",
    contractor: "WOC",
    status: "Approved",
    lastModified: "2024-01-12"
  },
  { 
    id: 6,
    title: "New variable",
    category: "External", 
    type: "Variable",
    totalAmount: "4.00 K",
    paidAmount: "3.00 K",
    contractor: "BG",
    status: "Approved",
    lastModified: "2024-01-03"
  },
];

const tabs = [
  { id: "all", name: "All", icon: FileText },
  { id: "general", name: "General", icon: Building },
  { id: "structural", name: "Structural", icon: Settings },
  { id: "other", name: "Other", icon: Tag },
  { id: "external", name: "External", icon: TrendingUp },
];

export default function BOQManagementPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  const filteredAndSortedBOQ = useMemo(() => {
    let filtered = boqData.filter((boq) => {
      const matchesSearch = 
        boq.title.toLowerCase().includes(search.toLowerCase()) ||
        boq.category.toLowerCase().includes(search.toLowerCase()) ||
        boq.contractor.toLowerCase().includes(search.toLowerCase());
      
      const matchesTab = activeTab === "all" || boq.category.toLowerCase() === activeTab.toLowerCase();
      
      return matchesSearch && matchesTab;
    });

    return filtered.sort((a, b) => {
      const multiplier = sortOrder === "asc" ? 1 : -1;
      
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title) * multiplier;
        case "category":
          return a.category.localeCompare(b.category) * multiplier;
        case "totalAmount":
          return (parseFloat(a.totalAmount.replace(/[^\d.]/g, '')) - parseFloat(b.totalAmount.replace(/[^\d.]/g, ''))) * multiplier;
        case "lastModified":
          return (new Date(a.lastModified).getTime() - new Date(b.lastModified).getTime()) * multiplier;
        default:
          return 0;
      }
    });
  }, [search, activeTab, sortBy, sortOrder]);

  const CreateBOQModal = () => (
    <AnimatePresence>
      {showCreateModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowCreateModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Create New BOQ</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X size={16} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">BOQ Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter BOQ title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>General</option>
                  <option>Structural</option>
                  <option>Other</option>
                  <option>External</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Fixed</option>
                  <option>Variable</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Amount</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00 K"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Create BOQ
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="h-screen bg-gray-50">
      {/* Header Component */}
      <MyProjectHeader />

      {/* Title Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">BOQ Management</h1>
          <p className="text-gray-600 mt-1">Manage Bill of Quantities and track project costs</p>
        </div>

        {/* Search + Actions */}
        <div className="flex flex-col sm:flex-row gap-3 relative">
          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search BOQ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg 
                         placeholder-gray-500 text-gray-900
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         transition"
            />
          </div>

          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <Filter size={16} />
              Filters
            </button>

            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              <Plus size={16} />
              Add BOQ
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex w-full bg-gray-100 p-1 rounded-xl mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-all flex-1 justify-center
                ${
                  activeTab === tab.id
                    ? "bg-blue-50 text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
            >
              <Icon size={18} />
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* BOQ Cards */}
      <div className="space-y-4">
        {filteredAndSortedBOQ.map((boq, idx) => (
          <motion.div
            key={boq.id}
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
                      <Calculator className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{boq.title}</h3>
                    </div>
                    <span className={`ml-auto px-2.5 py-1 text-xs font-medium rounded-full ${
                      boq.status === "Approved" 
                        ? "bg-green-100 text-green-700" 
                        : boq.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {boq.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mt-4 pl-12">
                    <div className="flex items-center gap-2">
                      <Tag size={16} className="text-gray-400" />
                      <div>
                        <p className="text-gray-500 text-xs">Category</p>
                        <p className="font-semibold text-gray-800 text-sm">{boq.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Type size={16} className="text-gray-400" />
                      <div>
                        <p className="text-gray-500 text-xs">Type</p>
                        <p className="font-semibold text-gray-800 text-sm">{boq.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="text-gray-400" />
                      <div>
                        <p className="text-gray-500 text-xs">Total/Paid</p>
                        <p className="font-semibold text-gray-800 text-sm">{boq.totalAmount}/{boq.paidAmount}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-gray-400" />
                      <div>
                        <p className="text-gray-500 text-xs">Contractor</p>
                        <p className="font-semibold text-gray-800 text-sm">{boq.contractor}</p>
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
                  <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition" title="More">
                    <ChevronDown size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredAndSortedBOQ.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calculator className="text-gray-400" size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No BOQ found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria.</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Create New BOQ
            </button>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredAndSortedBOQ.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition">
            <ChevronLeft size={16} />
            Previous
          </button>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-lg bg-blue-500 text-white text-sm font-medium">1</button>
            <button className="w-8 h-8 rounded-lg border border-gray-300 text-gray-600 text-sm hover:bg-gray-50 transition">2</button>
            <button className="w-8 h-8 rounded-lg border border-gray-300 text-gray-600 text-sm hover:bg-gray-50 transition">3</button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition">
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      <CreateBOQModal />
    </div>
  );
}