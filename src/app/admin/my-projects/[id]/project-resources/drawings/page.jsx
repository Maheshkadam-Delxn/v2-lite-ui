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
  Building,
  Download,
  Share2,
  Maximize2
} from "lucide-react";

const drawingData = [
  { 
    id: 1,
    title: "Building Exterior Design",
    category: "General",
    type: "3D Render",
    version: "v1.2",
    status: "Approved",
    lastModified: "2024-01-15",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop&crop=building"
  },
  { 
    id: 2,
    title: "Residential Complex",
    category: "General", 
    type: "Architectural",
    version: "v2.1",
    status: "Under Review",
    lastModified: "2024-01-10",
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop&crop=building"
  },
  { 
    id: 3,
    title: "Structural Framework",
    category: "Structural",
    type: "Technical",
    version: "v1.0",
    status: "Approved",
    lastModified: "2024-01-08",
    imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop&crop=building"
  },
  { 
    id: 4,
    title: "Technical Blueprint",
    category: "Structural",
    type: "Blueprint",
    version: "v3.0",
    status: "Draft",
    lastModified: "2024-01-05",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=entropy"
  }
];

const tabs = [
  { id: "all", name: "All", icon: FileText },
  { id: "general", name: "General", icon: Building },
  { id: "structural", name: "Structural", icon: Settings },
  { id: "other", name: "Other", icon: Tag },
  { id: "external", name: "External", icon: TrendingUp },
];

export default function DrawingManagementPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  const filteredAndSortedDrawings = useMemo(() => {
    let filtered = drawingData.filter((drawing) => {
      const matchesSearch = 
        drawing.title.toLowerCase().includes(search.toLowerCase()) ||
        drawing.category.toLowerCase().includes(search.toLowerCase()) ||
        drawing.type.toLowerCase().includes(search.toLowerCase());
      
      const matchesTab = activeTab === "all" || drawing.category.toLowerCase() === activeTab.toLowerCase();
      
      return matchesSearch && matchesTab;
    });

    return filtered.sort((a, b) => {
      const multiplier = sortOrder === "asc" ? 1 : -1;
      
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title) * multiplier;
        case "category":
          return a.category.localeCompare(b.category) * multiplier;
        case "lastModified":
          return (new Date(a.lastModified).getTime() - new Date(b.lastModified).getTime()) * multiplier;
        default:
          return 0;
      }
    });
  }, [search, activeTab, sortBy, sortOrder]);

  const CreateDrawingModal = () => (
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
              <h3 className="text-lg font-semibold text-gray-800">Upload New Drawing</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X size={16} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Drawing Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter drawing title"
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
                  <option>3D Render</option>
                  <option>Architectural</option>
                  <option>Technical</option>
                  <option>Blueprint</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
                <input
                  type="file"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  accept="image/*,.pdf,.dwg"
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
                  Upload Drawing
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
      {/* Top Navigation Bar */}
      <MyProjectHeader />

      {/* Main Content */}
      <div className="pt-8 px-6 pb-6">
        {/* Title Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Drawing Management</h1>
          </div>

          {/* Search + Actions */}
          <div className="flex flex-col sm:flex-row gap-3 relative">
            {/* Search Box */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search drawings..."
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
                Add Drawing
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

        {/* Drawing Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedDrawings.map((drawing, idx) => (
            <motion.div
              key={drawing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 overflow-hidden"
            >
              {/* Image Section */}
              <div className="relative h-48 bg-gray-100">
                <img
                  src={drawing.imageUrl}
                  alt={drawing.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                    drawing.status === "Approved" 
                      ? "bg-green-100 text-green-700" 
                      : drawing.status === "Under Review"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                  }`}>
                    {drawing.status}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">{drawing.title}</h3>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center">
                  <div className="flex items-center justify-between w-full max-w-48 gap-2 bg-gray-50 rounded-lg p-2">
                    <button className="flex-1 p-2 rounded-lg bg-yellow-50 hover:bg-yellow-100 text-yellow-600 transition" title="Edit">
                      <Pencil size={16} className="mx-auto" />
                    </button>
                    <button className="flex-1 p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition" title="Share">
                      <Share2 size={16} className="mx-auto" />
                    </button>
                    <button className="flex-1 p-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 transition" title="View">
                      <Eye size={16} className="mx-auto" />
                    </button>
                    <button className="flex-1 p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition" title="Delete">
                      <Trash2 size={16} className="mx-auto" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredAndSortedDrawings.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="text-gray-400" size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No drawings found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria.</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Upload New Drawing
            </button>
          </div>
        )}

        {/* Pagination */}
        {filteredAndSortedDrawings.length > 0 && (
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

        <CreateDrawingModal />
      </div>
    </div>
  );
}