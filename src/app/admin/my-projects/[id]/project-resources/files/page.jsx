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
  X,
  Folder,
  FileText,
  Building,
  Upload,
  HardDrive,
  Share2
} from "lucide-react";

const filesData = [
  { 
    id: 1,
    name: "Drawing",
    type: "folder",
    folderCount: 0,
    fileCount: 0,
    sharedCount: 8,
    category: "application"
  },
  { 
    id: 2,
    name: "Activity",
    type: "folder", 
    folderCount: 0,
    fileCount: 14,
    sharedCount: 10,
    category: "application"
  },
  { 
    id: 3,
    name: "Email",
    type: "folder",
    folderCount: 0,
    fileCount: 5,
    sharedCount: 1,
    category: "application"
  },
  { 
    id: 4,
    name: "RFI",
    type: "folder",
    folderCount: 0,
    fileCount: 5,
    sharedCount: 0,
    category: "application"
  },
  { 
    id: 5,
    name: "Submittal",
    type: "folder",
    folderCount: 0,
    fileCount: 11,
    sharedCount: 1,
    category: "application"
  },
  { 
    id: 6,
    name: "Inspection",
    type: "folder",
    folderCount: 0,
    fileCount: 2,
    sharedCount: 0,
    category: "application"
  },
  { 
    id: 7,
    name: "Snagging",
    type: "folder",
    folderCount: 0,
    fileCount: 1,
    sharedCount: 0,
    category: "application"
  }
];

const tabs = [
  { id: "application", name: "Application", icon: Building, active: true },
  { id: "general", name: "General Folder", icon: Folder, active: false },
  { id: "structure", name: "Structure folder", icon: Settings, active: false },
  { id: "new", name: "New Folder", icon: Plus, active: false },
];

const sampleFiles = [
  { id: 1, name: "Project Specification.pdf", type: "PDF", size: "2.4 MB", icon: "📄" },
  { id: 2, name: "Site Plan.dwg", type: "DWG", size: "5.1 MB", icon: "📐" },
  { id: 3, name: "Material List.xlsx", type: "Excel", size: "890 KB", icon: "📊" },
  { id: 4, name: "Progress Report.docx", type: "Word", size: "1.2 MB", icon: "📝" },
  { id: 5, name: "Site Photos.zip", type: "ZIP", size: "15.6 MB", icon: "📦" },
  { id: 6, name: "Contract.pdf", type: "PDF", size: "3.8 MB", icon: "📄" },
];

export default function FilesManagementPage() {
  const [activeTab, setActiveTab] = useState("application");
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const filteredAndSortedFiles = useMemo(() => {
    let filtered = filesData.filter((file) => {
      const matchesSearch = file.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeTab === "application" ? file.category === "application" : true;
      return matchesSearch && matchesCategory;
    });

    return filtered.sort((a, b) => {
      const multiplier = sortOrder === "asc" ? 1 : -1;
      return sortBy === "name" ? a.name.localeCompare(b.name) * multiplier : (a.fileCount - b.fileCount) * multiplier;
    });
  }, [search, activeTab, sortBy, sortOrder]);

  const CreateFolderModal = () => (
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
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Create New Folder</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Folder Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Enter folder name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                  rows="3"
                  placeholder="Folder description (optional)"
                />
              </div>
              
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Create Folder
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation Bar */}
      <MyProjectHeader />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Manage Your Files</h1>
              <p className="text-sm text-gray-600 mt-1">Organize files in one place</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search files or folders"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg 
                             placeholder-gray-500 text-sm text-gray-900
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                             transition shadow-sm"
                />
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                >
                  <Plus size={16} />
                  Create
                </button>

                <button className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
                  <Upload size={16} />
                  Upload
                </button>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
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

          {/* Folders Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Folders</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredAndSortedFiles.map((folder, idx) => (
                <motion.div
                  key={folder.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 p-5 cursor-pointer group shadow-sm"
                >
                  {/* Folder Icon */}
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Folder className="text-white" size={28} />
                    </div>
                  </div>

                  {/* Folder Name */}
                  <h4 className="text-center font-semibold text-gray-900 mb-4 text-base truncate">{folder.name}</h4>

                  {/* File Stats */}
                  <div className="flex items-center justify-center gap-4 text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Folder size={12} className="text-yellow-600" />
                      </div>
                      <span className="font-medium text-gray-700">{folder.folderCount}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <FileText size={12} className="text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-700">{folder.fileCount}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center">
                        <Share2 size={12} className="text-cyan-600" />
                      </div>
                      <span className="font-medium text-gray-700">{folder.sharedCount}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Files Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Files</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {sampleFiles.map((file) => (
                <motion.div
                  key={file.id}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 p-5 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{file.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate text-base">{file.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{file.type} • {file.size}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {filteredAndSortedFiles.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Folder className="text-gray-400" size={28} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No files found</h3>
              <p className="text-gray-500 text-sm mb-4">Try adjusting your search or create a new folder.</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
              >
                Create New Folder
              </button>
            </div>
          )}
        </div>
      </div>

      <CreateFolderModal />
    </div>
  );
}