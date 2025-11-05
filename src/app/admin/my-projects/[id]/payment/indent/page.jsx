'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import MyProjectHeader from "@/components/my-project/header";
import { Search, Plus, ChevronLeft, ChevronRight, HelpCircle, Eye, Pencil, X } from "lucide-react";
import { motion } from "framer-motion";

const getIcon = (roleName) => {
  return "👤";
};

export default function IndentPage() {
  const params = useParams();
  const projectId = params.id;
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [indents, setIndents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showView, setShowView] = useState(false);
  const [viewIndent, setViewIndent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    indentId: "",
    assignTo: "",
    shareTo: [],
    status: "Pending",
    _id: "",
  });
  const itemsPerPage = 5;

  const apiBase = '';

  const fetchRoles = async () => {
    try {
      const token = localStorage.getItem('token') || '';
      const headers = {
        'Accept': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const res = await fetch(`${apiBase}/api/role`, {
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
        const processed = data.map(r => ({ id: r._id, name: r.name }));
        setRoles(processed);
        return processed;
      }
      return [];
    } catch (error) {
      console.error('Failed to fetch roles:', error);
      return [];
    }
  };

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token') || '';
      const headers = {
        'Accept': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const res = await fetch(`${apiBase}/api/project`, {
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
        const processed = data.map(p => ({ id: p._id, name: p.name }));
        setProjects(processed);
        return processed;
      }
      return [];
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      return [];
    }
  };

  const fetchMembers = async (rolesData, projectsData) => {
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
        const processed = data.map(m => {
          const role = rolesData.find(r => r.id === (m.role?._id || m.role));
          const roleName = role ? role.name : (typeof m.role === 'string' ? m.role : m.role?._id || 'Unknown');
          const projectNames = (m.projects || []).map(projectId => {
            const project = projectsData.find(p => p.id === projectId);
            return project ? project.project_name : 'Unknown Project';
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
            icon: getIcon(roleName),
          };
        });
        setMembers(processed);
        return processed;
      } else {
        console.error('API error:', data.message);
        return [];
      }
    } catch (error) {
      console.error('Failed to fetch members:', error);
      return [];
    }
  };

  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      const rolesData = await fetchRoles();
      const projectsData = await fetchProjects();
      await fetchMembers(rolesData, projectsData);
      await fetchIndents();
      setLoading(false);
    };
    initData();
  }, [projectId]);

  async function fetchIndents() {
    try {
      let url = `/api/payment/indent`;
      if (projectId) {
        url += `?projectId=${projectId}`;
      }
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch indents");
      }
      const { data: rawIndents } = await res.json();
      setIndents(Array.isArray(rawIndents) ? rawIndents : []);
    } catch (err) {
      console.error(err);
      setIndents([]);
    }
  }

  const filteredIndents = indents.filter((indent) => {
    const searchLower = search.toLowerCase();
    const idMatch = indent.indentId?.toLowerCase().includes(searchLower) || false;
    const reqByMatch =
      (typeof indent.assignTo === 'string' ? indent.assignTo : indent.assignTo?.name || "").toLowerCase().includes(searchLower);
    const reqToNames = Array.isArray(indent.shareTo)
      ? indent.shareTo.map((s) => typeof s === 'string' ? s : s?.name || "").join(" ")
      : "";
    const reqToMatch = reqToNames.toLowerCase().includes(searchLower);
    const statusMatch = (indent.status || "").toLowerCase().includes(searchLower);
    return idMatch || reqByMatch || reqToMatch || statusMatch;
  });

  const totalPages = Math.ceil(filteredIndents.length / itemsPerPage);
  const paginatedIndents = filteredIndents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCreateClick = () => {
    setFormData({
      indentId: "",
      assignTo: "",
      shareTo: [],
      status: "Pending",
      _id: "",
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEditClick = (indent) => {
    setFormData({
      indentId: indent.indentId,
      assignTo: typeof indent.assignTo === 'string' ? indent.assignTo : indent.assignTo?._id || "",
      shareTo: Array.isArray(indent.shareTo) ? indent.shareTo.map(s => typeof s === 'string' ? s : s?._id || "") : [],
      status: indent.status || "Pending",
      _id: indent._id,
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleViewClick = async (indent) => {
    try {
      const res = await fetch(`/api/payment/indent/${indent._id}`);
      if (res.ok) {
        const { data } = await res.json();
        setViewIndent(data);
      } else {
        setViewIndent(indent);
      }
    } catch (err) {
      console.error(err);
      setViewIndent(indent);
    }
    setShowView(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.indentId || !formData.assignTo) {
      alert("Please fill in Indent ID and Assign To.");
      return;
    }

    const bodyData = {
      indentId: formData.indentId,
      assignTo: formData.assignTo,
      shareTo: formData.shareTo.filter(Boolean),
      projectId: projectId,
    };

    if (isEditing) {
      bodyData.status = formData.status;
    }

    try {
      const url = isEditing 
        ? `/api/payment/indent/${formData._id}` 
        : `/api/payment/indent`;
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to save");
      }
      await fetchIndents();
      setShowModal(false);
      setFormData({
        indentId: "",
        assignTo: "",
        shareTo: [],
        status: "Pending",
        _id: "",
      });
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Error saving indent: " + err.message);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      indentId: "",
      assignTo: "",
      shareTo: [],
      status: "Pending",
      _id: "",
    });
    setIsEditing(false);
  };

  const handleCloseView = () => {
    setShowView(false);
    setViewIndent(null);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Rejected":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "Completed":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  // Enhanced multi-select handler
  const handleShareToChange = (memberId) => {
    setFormData(prev => {
      const currentShareTo = prev.shareTo;
      if (currentShareTo.includes(memberId)) {
        return {
          ...prev,
          shareTo: currentShareTo.filter(id => id !== memberId)
        };
      } else {
        return {
          ...prev,
          shareTo: [...currentShareTo, memberId]
        };
      }
    });
  };

  const getDisplayName = (member) => {
    if (typeof member === 'string') {
      // Find member by ID to get name
      const foundMember = members.find(m => m.id === member);
      return foundMember ? foundMember.name : member;
    }
    return member?.name || 'N/A';
  };

  if (loading && indents.length === 0 && members.length === 0) {
    return (
      <div className="h-screen bg-gray-50 flex flex-col">
        <MyProjectHeader />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <MyProjectHeader />

      <div className="flex-1 overflow-y-auto scroll-smooth">
        <div className="p-6">
          {/* Header Section - Fixed spacing */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-gray-900">Indent List</h1>
              <p className="text-sm text-gray-600">Manage and track your indents</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search indents..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg 
                             placeholder-gray-500 text-sm text-gray-900
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                             transition-all duration-200 shadow-sm"
                />
              </div>
              
              <button
                onClick={handleCreateClick}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm font-medium shadow-sm"
              >
                <Plus size={16} />
                Create Indent
              </button>
            </div>
          </div>

          {/* Indent Cards - Fixed layout and spacing */}
          {filteredIndents.length === 0 && !loading ? (
            <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-200">
              <p className="text-lg">No indents found</p>
              <p className="mt-1">Try adjusting your search or create a new indent.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedIndents.map((indent) => (
                <motion.div
                  key={indent._id || indent.indentId}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-6">
                      {/* Indent ID */}
                      <div className="space-y-1">
                        <p className="text-gray-600 text-sm font-medium">Indent ID</p>
                        <p className="font-semibold text-gray-900 truncate">{indent.indentId}</p>
                      </div>
                      
                      {/* Requested By */}
                      <div className="space-y-1">
                        <p className="text-gray-600 text-sm font-medium">Requested By</p>
                        <p className="font-semibold text-gray-900 truncate">{getDisplayName(indent.assignTo)}</p>
                      </div>
                      
                      {/* Assigned To - Fixed spacing */}
                      <div className="space-y-1">
                        <p className="text-gray-600 text-sm font-medium">Assigned To</p>
                        <p className="font-semibold text-gray-900 truncate">
                          {Array.isArray(indent.shareTo) && indent.shareTo.length > 0
                            ? indent.shareTo.map(getDisplayName).filter(Boolean).join(", ")
                            : "N/A"}
                        </p>
                      </div>
                      
                      {/* Status */}
                      <div className="space-y-1">
                        <p className="text-gray-600 text-sm font-medium">Status</p>
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold transition-colors duration-200 ${getStatusClass(
                            indent.status
                          )}`}
                        >
                          {indent.status || "N/A"}
                        </span>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                      <button
                        onClick={() => handleViewClick(indent)}
                        className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-all duration-200"
                        title="View"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleEditClick(indent)}
                        className="p-2 rounded-lg bg-yellow-50 hover:bg-yellow-100 text-yellow-600 transition-all duration-200"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-4 border-t border-gray-200 gap-4">
              <div className="text-sm text-gray-600">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredIndents.length)} of {filteredIndents.length} results
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>
                <span className="text-sm text-gray-700 px-3 py-2">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Modal - Fixed layout and multi-select */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-4xl max-h-[95vh] flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-black">
                {isEditing ? "Edit Indent" : "Create Indent"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 text-gray-400 hover:text-black rounded-lg hover:bg-gray-100 transition-all duration-200"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 p-6 overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-black">Indent ID *</label>
                    <input
                      type="text"
                      value={formData.indentId}
                      onChange={(e) =>
                        setFormData({ ...formData, indentId: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm text-black bg-white"
                      placeholder="Enter unique indent ID"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-black">Assign To *</label>
                    <select
                      value={formData.assignTo}
                      onChange={(e) =>
                        setFormData({ ...formData, assignTo: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm text-black bg-white"
                    >
                      <option value="">Select a member</option>
                      {members.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Enhanced Multi-select for Share To */}
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-black">Share With (optional)</label>
                  <div className="border border-gray-300 rounded-lg p-4 max-h-48 overflow-y-auto">
                    <div className="space-y-2">
                      {members.map((member) => (
                        <label key={member.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.shareTo.includes(member.id)}
                            onChange={() => handleShareToChange(member.id)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-black flex-1">
                            {member.name} - {member.roleName}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 italic">
                    {formData.shareTo.length} member(s) selected
                  </p>
                </div>

                {isEditing && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-black">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) =>
                          setFormData({ ...formData, status: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm text-black bg-white"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 justify-end pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 text-sm font-bold text-black w-full sm:w-auto"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm font-bold w-full sm:w-auto"
                  >
                    {isEditing ? "Update Indent" : "Create Indent"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}

      {/* View Modal */}
      {showView && viewIndent && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-200"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-black">Indent Details</h2>
              <button
                onClick={handleCloseView}
                className="p-1 text-gray-400 hover:text-black rounded-lg hover:bg-gray-100 transition-all duration-200"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-black mb-2">Indent ID</label>
                <p className="text-black bg-gray-50 p-3 rounded-lg">{viewIndent.indentId}</p>
              </div>
              <div>
                <label className="block text-sm font-bold text-black mb-2">Requested By</label>
                <p className="text-black">{getDisplayName(viewIndent.assignTo)}</p>
              </div>
              <div>
                <label className="block text-sm font-bold text-black mb-2">Shared With</label>
                <p className="text-black">
                  {Array.isArray(viewIndent.shareTo) && viewIndent.shareTo.length > 0
                    ? viewIndent.shareTo.map(getDisplayName).filter(Boolean).join(", ")
                    : "N/A"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-bold text-black mb-2">Status</label>
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-sm font-bold ${getStatusClass(
                    viewIndent.status
                  )}`}
                >
                  {viewIndent.status || "N/A"}
                </span>
              </div>
            </div>
            <div className="flex justify-end pt-6">
              <button
                onClick={handleCloseView}
                className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm font-bold"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}