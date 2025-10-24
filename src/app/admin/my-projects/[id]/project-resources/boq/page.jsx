'use client';

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MyProjectHeader from "@/components/my-project/header";
import { 
  Search, 
  Eye, 
  Pencil, 
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
  AlertCircle
} from "lucide-react";

const apiBase = process.env.NEXT_PUBLIC_API_BASE || ''; // Adjust based on your env setup

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
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedBoq, setSelectedBoq] = useState(null);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [boqs, setBoqs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 10;

  // Fetch BOQs
  const fetchBOQs = async () => {
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
      const res = await fetch(`${apiBase}/api/project-resource/boq`, {
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
      if (success) {
        // Map data to match component expectations (removed unwanted fields)
        const mappedBoqs = data.map(b => ({
          id: b._id,
          title: b.name,
          category: b.category || 'Other',
          type: b.type === 'fixed' ? 'Fixed' : 'Variable',
          contractor: b.sharedTo?.name || 'Unknown',
          lastModified: b.updatedAt ? new Date(b.updatedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          projectId: b.projectId?._id,
          projectName: b.projectId?.name || 'Unknown Project',
          description: b.description || '',
          sharedTo: b.sharedTo?._id,
        }));
        setBoqs(mappedBoqs);
        console.log('Fetched BOQs:', mappedBoqs);
      } else {
        console.error('API error:', data?.message || 'Unknown error');
        setError(data?.message || 'Failed to fetch BOQs');
      }
    } catch (error) {
      console.error('Failed to fetch BOQs:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Projects (adapted from provided logic)
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

  // Fetch Members (adapted from provided logic)
  const fetchMembers = async (rolesData = [], projectsData = []) => {
    try {
      const token = localStorage.getItem('token') || '';
      const headers = {
        'Accept': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const res = await fetch(`${apiBase}/api/member`, {
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
      console.log('Fetched members:', data);
      if (success) {
        setMembers(data.map(m => {
          const role = rolesData.find(r => r.id === (m.role?._id || m.role));
          const roleName = role ? role.name : (typeof m.role === 'string' ? m.role : m.role?._id || 'Unknown');
          const projectNames = (m.projects || []).map(projectId => {
            const project = projectsData.find(p => p.id === projectId);
            return project ? project.name : 'Unknown Project';
          }).filter(name => name !== 'Unknown Project');

          return {
            id: m._id,
            staffNumber: m.staffNumber,
            name: m.name,
            email: m.email,
            phone: m.phone || '',
            department: m.department || '',
            role: m.role?._id || m.role || '',
            roleName: roleName,
            status: m.status || 'Active',
            prefferedLanguage: m.prefferedLanguage || 'English',
            service: m.service || '',
            code: m.code || '',
            grade: m.grade || '',
            discipline: m.discipline || '',
            profileImage: m.profileImage || '',
            manager: m.manager?._id || m.manager || '',
            managerName: m.managerName || 'None',
            projects: m.projects || [],
            projectNames: projectNames,
            lastLogin: m.lastLogin || 'Not logged in yet',
            avatar: m.profileImage || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=40&h=40&fit=crop',
          };
        }));
      } else {
        console.error('API error:', data?.message);
      }
    } catch (error) {
      console.error('Failed to fetch members:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const projectsData = await fetchProjects();
      // Note: rolesData is not fetched here; assuming it's available or empty for now
      // If roles are needed, add fetchRoles logic similarly
      await fetchMembers([], projectsData); // Pass empty roles for now
      await fetchBOQs();
    };
    loadData();
  }, []);

  const createBOQ = async (formData) => {
    try {
      const token = localStorage.getItem('token') || '';
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const res = await fetch(`${apiBase}/api/project-resource/boq`, {
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
      const { success, data } = await res.json();
      if (success) {
        // Refresh BOQs
        await fetchBOQs();
        setShowCreateModal(false);
        // Reset form if needed
      } else {
        console.error('API error:', data?.message);
        setError(data?.message || 'Failed to create BOQ');
      }
    } catch (error) {
      console.error('Failed to create BOQ:', error);
      setError(error.message);
    }
  };

  const filteredAndSortedBOQ = useMemo(() => {
    let filtered = boqs.filter((boq) => {
      const matchesSearch = 
        boq.title.toLowerCase().includes(search.toLowerCase()) ||
        boq.category.toLowerCase().includes(search.toLowerCase()) ||
        boq.contractor.toLowerCase().includes(search.toLowerCase()) ||
        boq.description.toLowerCase().includes(search.toLowerCase()) ||
        boq.projectName.toLowerCase().includes(search.toLowerCase());
      
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
        case "lastModified":
          return (new Date(a.lastModified).getTime() - new Date(b.lastModified).getTime()) * multiplier;
        default:
          return 0;
      }
    });
  }, [search, activeTab, sortBy, sortOrder, boqs]);

  const paginatedBOQ = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAndSortedBOQ.slice(startIndex, endIndex);
  }, [filteredAndSortedBOQ, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedBOQ.length / itemsPerPage);

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

  const CreateBOQModal = () => {
    const [formData, setFormData] = useState({
      name: '',
      type: 'fixed',
      category: 'General',
      sharedTo: '',
      description: '',
      projectId: '',
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      createBOQ(formData);
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
              className="bg-white rounded-2xl p-6 w-full max-w-lg"
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
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">BOQ Title</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="Enter BOQ title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  >
                    <option>General</option>
                    <option>Structural</option>
                    <option>Other</option>
                    <option>External</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select 
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  >
                    <option value="fixed">Fixed</option>
                    <option value="variable">Variable</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project</label>
                  <select 
                    name="projectId"
                    value={formData.projectId}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  >
                    <option value="">Select Project</option>
                    {projects.map(p => (
                      <option key={p.id} value={p.id}>{p.name} ({p.code})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Shared To (Member)</label>
                  <select 
                    name="sharedTo"
                    value={formData.sharedTo}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  >
                    <option value="">Select Member</option>
                    {members.map(m => (
                      <option key={m.id} value={m.id}>{m.name} ({m.email})</option>
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
                    Create BOQ
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  const ViewBOQModal = () => {
    if (!selectedBoq) return null;

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
              className="bg-white rounded-2xl p-6 w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">View BOQ Details</h3>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <X size={16} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">BOQ Title</label>
                  <p className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">{selectedBoq.title}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <p className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">{selectedBoq.category}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <p className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">{selectedBoq.type}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project</label>
                  <p className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">{selectedBoq.projectName}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contractor</label>
                  <p className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">{selectedBoq.contractor}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <p className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">{selectedBoq.description || 'No description'}</p>
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
          <p className="text-gray-600">Loading BOQs...</p>
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
            onClick={fetchBOQs}
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
      <div className="grid grid-cols-1 gap-5">
        {paginatedBOQ.map((boq) => (
          <motion.div
            key={boq.id}
            className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all duration-200"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
              {/* Core Details */}
              <div className="w-full lg:w-auto flex flex-col gap-3 mb-4 lg:mb-0">
                <div className="flex items-center gap-2">
                  <Calculator className="text-blue-600" size={20} />
                  <h3 className="text-lg font-semibold text-gray-900">{boq.title}</h3>
                </div>
                
                {boq.description && (
                  <p className="text-sm text-gray-600">{boq.description}</p>
                )}
                
                <div className="flex flex-row gap-3 text-sm overflow-x-auto pb-2">
                  {/* Category */}
                  <div className="flex items-center gap-2 min-w-max p-2 bg-blue-50 rounded-lg flex-shrink-0">
                    <Tag className="text-blue-500" size={14} />
                    <div>
                      <p className="text-xs font-medium text-gray-500">Category</p>
                      <p className="font-medium text-gray-900 text-sm">{boq.category}</p>
                    </div>
                  </div>
                  
                  {/* Type */}
                  <div className="flex items-center gap-2 min-w-max p-2 bg-green-50 rounded-lg flex-shrink-0">
                    <Type className="text-green-500" size={14} />
                    <div>
                      <p className="text-xs font-medium text-gray-500">Type</p>
                      <p className="font-medium text-gray-900 text-sm">{boq.type}</p>
                    </div>
                  </div>
                  
                  {/* Contractor */}
                  <div className="flex items-center gap-2 min-w-max p-2 bg-purple-50 rounded-lg flex-shrink-0">
                    <User className="text-purple-500" size={14} />
                    <div>
                      <p className="text-xs font-medium text-gray-500">Contractor</p>
                      <p className="font-medium text-gray-900 text-sm">{boq.contractor}</p>
                    </div>
                  </div>
                  
                  {/* Project */}
                  <div className="flex items-center gap-2 min-w-max p-2 bg-indigo-50 rounded-lg flex-shrink-0">
                    <Building className="text-indigo-500" size={14} />
                    <div>
                      <p className="text-xs font-medium text-gray-500">Project</p>
                      <p className="font-medium text-gray-900 text-sm">{boq.projectName}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button 
                  onClick={() => {
                    setSelectedBoq(boq);
                    setShowViewModal(true);
                  }}
                  className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition" 
                  title="View"
                >
                  <Eye size={14} />
                  <span className="text-sm font-medium hidden md:inline">View</span>
                </button>
                <button className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-yellow-50 hover:bg-yellow-100 text-yellow-700 transition" title="Edit">
                  <Pencil size={14} />
                  <span className="text-sm font-medium hidden md:inline">Edit</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {paginatedBOQ.length === 0 && (
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

      <CreateBOQModal />
      <ViewBOQModal />
    </div>
  );
}