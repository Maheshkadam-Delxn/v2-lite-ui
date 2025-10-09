'use client';

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MyProjectHeader from "@/components/my-project/header";
import { 
  Search, 
  Eye, 
  Pencil, 
  Plus, 
  Trash2, 
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
  Share2
} from "lucide-react";

const apiBase = process.env.NEXT_PUBLIC_API_BASE || ''; // Adjust based on your env setup

const tabs = [
  { id: "all", name: "All", icon: FileText },
  { id: "general", name: "General", icon: Building },
  { id: "structural", name: "Structural", icon: Settings },
];

export default function DrawingManagementPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDrawing, setSelectedDrawing] = useState(null);
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [drawings, setDrawings] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 10;

  // Fetch Drawings
  const fetchDrawings = async () => {
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
      const res = await fetch(`${apiBase}/api/project-resource/drawing`, {
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
        // Map data to match component expectations
        const mappedDrawings = data.map(d => ({
          id: d._id,
          title: d.title,
          drawingNumber: d.drawingNumber,
          revision: d.revision || 'v1.0',
          category: d.category === 'general' ? 'General' : 'Structural',
          status: d.status || 'Draft',
          type: d.type || 'Technical',
          remark: d.remark || '',
          description: d.description || '',
          file: d.file ? `${d.file.name} (${d.file.path})` : 'No file',
          projectId: d.projectId?._id,
          projectName: d.projectId?.name || 'Unknown Project',
          imageUrl: d.file?.path || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop&crop=building', // Fallback image
          lastModified: d.updatedAt ? new Date(d.updatedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        }));
        setDrawings(mappedDrawings);
        console.log('Fetched Drawings:', mappedDrawings);
      } else {
        console.error('API error:', data?.message || 'Unknown error');
        setError(data?.message || 'Failed to fetch Drawings');
      }
    } catch (error) {
      console.error('Failed to fetch Drawings:', error);
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
      await fetchDrawings();
    };
    loadData();
  }, []);

  const createDrawing = async (formData) => {
    try {
      const token = localStorage.getItem('token') || '';
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const res = await fetch(`${apiBase}/api/project-resource/drawing`, {
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
        await fetchDrawings();
        setShowCreateModal(false);
      } else {
        console.error('API error:', data?.message);
        setError(data?.message || 'Failed to create Drawing');
      }
    } catch (error) {
      console.error('Failed to create Drawing:', error);
      setError(error.message);
    }
  };

  const updateDrawing = async (id, formData) => {
    try {
      const stringId = typeof id === 'string' ? id : (id && id.id ? id.id : String(id));
      const token = localStorage.getItem('token') || '';
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const res = await fetch(`${apiBase}/api/project-resource/drawing/${stringId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const { success, data } = await res.json();
      if (success) {
        await fetchDrawings();
        setShowEditModal(false);
      } else {
        setError(data?.message || 'Failed to update Drawing');
      }
    } catch (error) {
      console.error('Failed to update Drawing:', error);
      setError(error.message);
    }
  };
const deleteDrawing = async (id) => {
  // 🧩 Ask for confirmation before deleting
  if (!confirm('Are you sure you want to delete this drawing?')) return;

  try {
    // ✅ Ensure the ID is always a clean string
    // (Backend expects just the ID, not an object)
    let deleteId = id;
    if (typeof id === 'object' && id?.id) {
      deleteId = id.id; // case: passed object like { id: "123" }
    } else if (typeof id !== 'string') {
      deleteId = String(id); // ensure it's string type
    }

    console.log('Deleting drawing with ID:', deleteId);

    // ✅ Get JWT token from localStorage (if available)
    const token = localStorage.getItem('token') || '';

    // ✅ Headers for fetch request
    const headers = { Accept: 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;

    // 🧠 Perform DELETE request — no need for Content-Type since no body
    const res = await fetch(`${apiBase}/api/project-resource/drawing/${deleteId}`, {
      method: 'DELETE',
      headers,
    });

    // ❌ Handle non-successful response codes
    if (!res.ok) {
      let errorMessage = `HTTP error! status: ${res.status}`;
      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        console.warn('Could not parse error response as JSON');
      }
      throw new Error(errorMessage);
    }

    // ✅ Handle success response (with or without JSON)
    const contentType = res.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      const data = await res.json();
      if (data.success) {
        await fetchDrawings(); // refresh drawings after delete
      } else {
        setError('Failed to delete drawing');
      }
    } else {
      // fallback: if response isn’t JSON, still refresh
      await fetchDrawings();
    }

  } catch (error) {
    console.error('❌ Failed to delete drawing:', error);
    setError(error.message);
  }
};


  const filteredAndSortedDrawings = useMemo(() => {
    let filtered = drawings.filter((drawing) => {
      const matchesSearch = 
        drawing.title.toLowerCase().includes(search.toLowerCase()) ||
        drawing.category.toLowerCase().includes(search.toLowerCase()) ||
        drawing.type.toLowerCase().includes(search.toLowerCase()) ||
        drawing.drawingNumber.toLowerCase().includes(search.toLowerCase());
      
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
  }, [search, activeTab, sortBy, sortOrder, drawings]);

  const paginatedDrawings = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAndSortedDrawings.slice(startIndex, endIndex);
  }, [filteredAndSortedDrawings, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedDrawings.length / itemsPerPage);

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

  const CreateDrawingModal = () => {
    const [formData, setFormData] = useState({
      title: '',
      drawingNumber: '',
      revision: '',
      category: 'general',
      status: 'Draft',
      type: '',
      remark: '',
      description: '',
      projectId: '',
      file: { name: '', path: '' }, // Temporary string for testing
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      createDrawing(formData);
      // Reset form
      setFormData({
        title: '',
        drawingNumber: '',
        revision: '',
        category: 'general',
        status: 'Draft',
        type: '',
        remark: '',
        description: '',
        projectId: '',
        file: { name: '', path: '' },
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
                <h3 className="text-lg font-semibold text-gray-800">Upload New Drawing</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <X size={16} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Drawing Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="Enter drawing title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Drawing Number</label>
                  <input
                    type="text"
                    name="drawingNumber"
                    value={formData.drawingNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="Enter drawing number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Revision</label>
                  <input
                    type="text"
                    name="revision"
                    value={formData.revision}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="e.g., v1.0"
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
                    <option value="general">General</option>
                    <option value="structural">Structural</option>
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
                    placeholder="e.g., Draft"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <input
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="e.g., Technical"
                  />
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Remark</label>
                  <textarea
                    name="remark"
                    value={formData.remark}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="Enter remark"
                  />
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">File (Temporary String for Testing)</label>
                  <input
                    type="text"
                    name="fileName"
                    onChange={(e) => setFormData(prev => ({ ...prev, file: { ...prev.file, name: e.target.value } }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="Enter file name for testing"
                  />
                  <input
                    type="text"
                    name="filePath"
                    onChange={(e) => setFormData(prev => ({ ...prev, file: { ...prev.file, path: e.target.value } }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 mt-2"
                    placeholder="Enter file path for testing"
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
                    Upload Drawing
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  const EditDrawingModal = () => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
      if (selectedDrawing) {
        setFormData({
          title: selectedDrawing.title,
          drawingNumber: selectedDrawing.drawingNumber,
          revision: selectedDrawing.revision,
          category: selectedDrawing.category.toLowerCase(),
          status: selectedDrawing.status,
          type: selectedDrawing.type,
          remark: selectedDrawing.remark,
          description: selectedDrawing.description,
          projectId: selectedDrawing.projectId,
          file: selectedDrawing.file,
        });
      }
    }, [selectedDrawing]);

    const handleSubmit = (e) => {
      e.preventDefault();
      updateDrawing(selectedDrawing.id, formData);
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (!selectedDrawing) return null;

    return (
      <AnimatePresence>
        {showEditModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4"
            onClick={() => setShowEditModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Edit Drawing</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <X size={16} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Drawing Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title || ''}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Drawing Number</label>
                  <input
                    type="text"
                    name="drawingNumber"
                    value={formData.drawingNumber || ''}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Revision</label>
                  <input
                    type="text"
                    name="revision"
                    value={formData.revision || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select 
                    name="category"
                    value={formData.category || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  >
                    <option value="general">General</option>
                    <option value="structural">Structural</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <input
                    type="text"
                    name="status"
                    value={formData.status || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <input
                    type="text"
                    name="type"
                    value={formData.type || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project</label>
                  <select 
                    name="projectId"
                    value={formData.projectId || ''}
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Remark</label>
                  <textarea
                    name="remark"
                    value={formData.remark || ''}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description || ''}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">File</label>
                  <input
                    type="text"
                    value={formData.file || ''}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    Update Drawing
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  const ViewDrawingModal = () => {
    if (!selectedDrawing) return null;

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
                <h3 className="text-lg font-semibold text-gray-800">View Drawing Details</h3>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <X size={16} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Drawing Title</label>
                  <p className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">{selectedDrawing.title}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Drawing Number</label>
                  <p className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">{selectedDrawing.drawingNumber}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Revision</label>
                  <p className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">{selectedDrawing.revision}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <p className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">{selectedDrawing.category}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <p className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">{selectedDrawing.status}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <p className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">{selectedDrawing.type}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project</label>
                  <p className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">{selectedDrawing.projectName}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Remark</label>
                  <p className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">{selectedDrawing.remark || 'No remark'}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <p className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">{selectedDrawing.description || 'No description'}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">File</label>
                  <p className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">{selectedDrawing.file}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Modified</label>
                  <p className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">{selectedDrawing.lastModified}</p>
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
          <p className="text-gray-600">Loading Drawings...</p>
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
            onClick={fetchDrawings}
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
          <h1 className="text-2xl font-bold text-gray-900">Drawing Management</h1>
          <p className="text-gray-600 mt-1">Manage project drawings and blueprints</p>
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

      {/* Drawing Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6 pb-6">
        {paginatedDrawings.map((drawing, idx) => (
          <motion.div
            key={drawing.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
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
              <div className="mb-3">
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{drawing.title}</h3>
                <p className="text-xs text-gray-500 mt-1">#{drawing.drawingNumber} - {drawing.revision}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-2">
                <button 
                  onClick={() => {
                    setSelectedDrawing(drawing);
                    setShowViewModal(true);
                  }}
                  className="flex-1 p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition text-xs"
                  title="View"
                >
                  <Eye size={14} className="mx-auto" />
                </button>
                <button 
                  onClick={() => {
                    setSelectedDrawing(drawing);
                    setShowEditModal(true);
                  }}
                  className="flex-1 p-2 rounded-lg bg-yellow-50 hover:bg-yellow-100 text-yellow-600 transition text-xs"
                  title="Edit"
                >
                  <Pencil size={14} className="mx-auto" />
                </button>
                <button 
                  onClick={() => deleteDrawing(drawing.id)}
                  className="flex-1 p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition text-xs"
                  title="Delete"
                >
                  <Trash2 size={14} className="mx-auto" />
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
      {filteredAndSortedDrawings.length > 0 && (
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

      <CreateDrawingModal />
      <EditDrawingModal />
      <ViewDrawingModal />
    </div>
  );
}