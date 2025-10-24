'use client';

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MyProjectHeader from "@/components/my-project/header";
import { 
  Search, 
  Eye, 
  Plus, 
  Filter, 
  ChevronDown,
  X,
  User,
  Tag,
  Type,
  Calculator,
  TrendingUp,
  Building,
  Settings,
  FileText,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Download,
  Share2,
  Calendar,
  Clock,
  Users
} from "lucide-react";

const apiBase = process.env.NEXT_PUBLIC_API_BASE || ''; // Adjust based on your env setup

const tabs = [
  { id: "all", name: "All", icon: FileText },
  { id: "low", name: "Low Priority", icon: Clock },
  { id: "medium", name: "Medium Priority", icon: TrendingUp },
  { id: "high", name: "High Priority", icon: AlertCircle },
];

export default function ActivityManagementPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [activities, setActivities] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 10;

  // Fetch Activities
  const fetchActivities = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token') || '';
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const res = await fetch(`${apiBase}/api/project-planning/activity`, {
        headers,
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not JSON');
      }
      const { success, data } = await res.json();
      // API returns success: false but data on success; adjust check accordingly
      if (data && Array.isArray(data)) {
        // Map data to match component expectations
        const mappedActivities = data.map(a => ({
          id: a._id,
          wbs: a.wbs,
          title: a.title,
          startDate: a.startDate,
          duration: a.duration,
          endDate: a.endDate,
          priority: a.priority || 'medium',
          assignTo: Array.isArray(a.assignTo) ? a.assignTo : (a.assignTo || '').split(',').map(s => s.trim()).filter(Boolean),
          description: a.description || '',
          attachment: a.attachment ? `${a.attachment.name} (${a.attachment.path})` : 'No attachment',
          projectId: a.projectId?._id,
          projectName: a.projectId?.name || 'Unknown Project',
          status: a.status || 'Pending',
          completionStatus: a.completionStatus || 0,
          imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&crop=planning', // Fallback image
          lastModified: a.updatedAt ? new Date(a.updatedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        }));
        setActivities(mappedActivities);
        console.log('Fetched Activities:', mappedActivities);
      } else {
        console.error('API error:', data?.message || 'Unknown error');
        setError(data?.message || 'Failed to fetch Activities');
      }
    } catch (error) {
      console.error('Failed to fetch Activities:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Projects
  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token') || '';
      const headers = {
        'Accept': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const res = await fetch(`${apiBase}/api/projects`, {
        headers,
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not JSON');
      }
      const { success, projects } = await res.json();
      if (success) {
        const mappedProjects = projects.map(p => ({
          id: p._id,
          name: p.name,
          code: p.code || ''
        }));
        setProjects(mappedProjects);
        console.log('Fetched projects:', mappedProjects);
        return mappedProjects;
      } else {
        console.error('API error:', projects?.message);
        return [];
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      return [];
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchProjects();
      await fetchActivities();
    };
    loadData();
  }, []);

  const createActivity = async (formData) => {
    try {
      const token = localStorage.getItem('token') || '';
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const res = await fetch(`${apiBase}/api/project-planning/activity`, {
        method: 'POST',
        headers,
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not JSON');
      }
      const { success } = await res.json();
      if (success) {
        await fetchActivities();
        setShowCreateModal(false);
      } else {
        console.error('API error');
        setError('Failed to create Activity');
      }
    } catch (error) {
      console.error('Failed to create Activity:', error);
      setError(error.message);
    }
  };

  const filteredAndSortedActivities = useMemo(() => {
    let filtered = activities.filter((activity) => {
      const matchesSearch = 
        activity.title.toLowerCase().includes(search.toLowerCase()) ||
        activity.wbs.toLowerCase().includes(search.toLowerCase()) ||
        activity.priority.toLowerCase().includes(search.toLowerCase()) ||
        activity.status.toLowerCase().includes(search.toLowerCase());
      
      const matchesTab = activeTab === "all" || activity.priority.toLowerCase() === activeTab.toLowerCase();
      
      return matchesSearch && matchesTab;
    });

    return filtered.sort((a, b) => {
      const multiplier = sortOrder === "asc" ? 1 : -1;
      
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title) * multiplier;
        case "priority":
          return a.priority.localeCompare(b.priority) * multiplier;
        case "lastModified":
          return (new Date(a.lastModified).getTime() - new Date(b.lastModified).getTime()) * multiplier;
        default:
          return 0;
      }
    });
  }, [search, activeTab, sortBy, sortOrder, activities]);

  const paginatedActivities = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAndSortedActivities.slice(startIndex, endIndex);
  }, [filteredAndSortedActivities, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedActivities.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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

  const CreateActivityModal = () => {
    const [formData, setFormData] = useState({
      wbs: '',
      title: '',
      startDate: '',
      duration: '',
      endDate: '',
      priority: 'medium',
      status: 'Pending',
      assignTo: '',
      description: '',
      projectId: '',
      attachment: { name: '', path: '' }, // Temporary string for testing
      completionStatus: 0,
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      // Convert assignTo string to array if needed, but send as string for API
      const submitData = { ...formData };
      if (formData.assignTo) {
        submitData.assignTo = formData.assignTo.split(',').map(s => s.trim()).filter(Boolean);
      }
      createActivity(submitData);
      // Reset form
      setFormData({
        wbs: '',
        title: '',
        startDate: '',
        duration: '',
        endDate: '',
        priority: 'medium',
        status: 'Pending',
        assignTo: '',
        description: '',
        projectId: '',
        attachment: { name: '', path: '' },
        completionStatus: 0,
      });
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Create New Activity</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <X size={16} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">WBS</label>
                  <input
                    type="text"
                    name="wbs"
                    value={formData.wbs}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="Enter WBS"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="Enter activity title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="Enter duration"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select 
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <input
                    type="text"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="e.g., Pending"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assign To (comma separated)</label>
                  <input
                    type="text"
                    name="assignTo"
                    value={formData.assignTo}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="Enter member names"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project</label>
                  <select 
                    name="projectId"
                    value={formData.projectId}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  >
                    <option value="">Select Project</option>
                    {projects.map(p => (
                      <option key={p.id} value={p.id}>{p.name} ({p.code})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="Enter description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Completion Status (%)</label>
                  <input
                    type="number"
                    name="completionStatus"
                    value={formData.completionStatus}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Attachment (Temporary String for Testing)</label>
                  <input
                    type="text"
                    name="attachmentName"
                    onChange={(e) => setFormData(prev => ({ ...prev, attachment: { ...prev.attachment, name: e.target.value } }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="Enter attachment name for testing"
                  />
                  <input
                    type="text"
                    name="attachmentPath"
                    onChange={(e) => setFormData(prev => ({ ...prev, attachment: { ...prev.attachment, path: e.target.value } }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 mt-2"
                    placeholder="Enter attachment path for testing"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    Create Activity
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  const ViewActivityModal = () => {
    if (!selectedActivity) return null;

    return (
      <AnimatePresence>
        {showViewModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4"
            onClick={() => setShowViewModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">View Activity Details</h3>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <X size={16} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">WBS</label>
                  <p className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">{selectedActivity.wbs}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <p className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">{selectedActivity.title}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <p className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">{selectedActivity.startDate}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <p className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">{selectedActivity.duration}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <p className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">{selectedActivity.endDate}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <p className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">{selectedActivity.priority}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <p className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">{selectedActivity.status}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assign To</label>
                  <p className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">{selectedActivity.assignTo.join(', ')}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project</label>
                  <p className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">{selectedActivity.projectName}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <p className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">{selectedActivity.description || 'No description'}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Completion Status</label>
                  <p className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">{selectedActivity.completionStatus}%</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Attachment</label>
                  <p className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">{selectedActivity.attachment}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Modified</label>
                  <p className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">{selectedActivity.lastModified}</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowViewModal(false)}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  if (loading) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Activities...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={fetchActivities}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50">
      {/* Header Component */}
      <MyProjectHeader />

      {/* Title Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4 px-6 pt-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Activity Management</h1>
          <p className="text-gray-600 mt-1">Manage project planning activities</p>
        </div>

        {/* Search + Actions */}
        <div className="flex flex-col sm:flex-row gap-3 relative">
          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search activities..."
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
              Add Activity
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex w-full bg-gray-100 p-1 rounded-xl mb-6 px-6">
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

      {/* Activity Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6 pb-6">
        {paginatedActivities.map((activity, idx) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 overflow-hidden"
          >
            {/* Image Section */}
            <div className="relative h-48 bg-gray-100">
              <img
                src={activity.imageUrl}
                alt={activity.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                  activity.priority === "high" 
                    ? "bg-red-100 text-red-700" 
                    : activity.priority === "medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}>
                  {activity.priority}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-4">
              <div className="mb-3">
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{activity.title}</h3>
                <p className="text-xs text-gray-500 mt-1">WBS: {activity.wbs}</p>
                <p className="text-xs text-gray-500">Status: {activity.status}</p>
              </div>

              {/* Action Buttons - Removed Edit and Delete since no API support */}
              <div className="flex items-center justify-between gap-2">
                <button 
                  onClick={() => {
                    setSelectedActivity(activity);
                    setShowViewModal(true);
                  }}
                  className="flex-1 p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition text-xs"
                  title="View"
                >
                  <Eye size={14} className="mx-auto" />
                </button>
                <button className="flex-1 p-2 rounded-lg bg-gray-50 text-gray-400 transition text-xs" disabled title="Edit (Not Supported)">
                  <Pencil size={14} className="mx-auto opacity-50" />
                </button>
                <button className="flex-1 p-2 rounded-lg bg-gray-50 text-gray-400 transition text-xs" disabled title="Delete (Not Supported)">
                  <Trash2 size={14} className="mx-auto opacity-50" />
                </button>
                <button className="p-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 transition text-xs" title="Download">
                  <Download size={14} className="mx-auto" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {filteredAndSortedActivities.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-8 px-6 pb-6">
          <button 
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} />
            Previous
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = currentPage > 2 ? currentPage - 2 + i : i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition ${
                    currentPage === pageNum
                      ? "bg-blue-500 text-white shadow-sm"
                      : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          <button 
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      <CreateActivityModal />
      <ViewActivityModal />
    </div>
  );
}