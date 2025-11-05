'use client';

import { useState, useEffect } from "react";
import MyProjectHeader from "@/components/my-project/header";
import { Search, Plus, ChevronLeft, ChevronRight, HelpCircle, Eye, User, Download, Mail, RefreshCw, X, Paperclip } from "lucide-react";
import { motion } from "framer-motion";

const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export default function GRNPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [grns, setGrns] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    grnID: "",
    challanNo: "",
    date: "",
    projectId: "",
    attachmentName: ""
  });
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 5;

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
      const { success, projects: fetchedProjects } = await res.json();
      if (success) {
        const mappedProjects = fetchedProjects.map(p => ({
          id: p._id,
          name: p.name
        }));
        setProjects(mappedProjects);
        console.log('Fetched projects:', mappedProjects);
        return mappedProjects;
      } else {
        console.error('API error:', fetchedProjects.message);
        return [];
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      return [];
    }
  };

  const fetchGrns = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token') || '';
      const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      };
      const res = await fetch(`${apiBase}/api/payment/grn`, {
        headers,
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not JSON');
      }
      const data = await res.json();
      if (data.success) {
        setGrns(data.data);
      }
    } catch (error) {
      console.error("Error fetching GRNs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrns();
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token') || '';
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
      const attachment = formData.attachmentName ? [{
        name: formData.attachmentName,
        path: ""
      }] : [];
      const res = await fetch(`${apiBase}/api/payment/grn`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          grnID: formData.grnID,
          challanNo: formData.challanNo,
          date: formData.date,
          projectId: formData.projectId,
          attachment
        })
      });
      if (res.ok) {
        setShowModal(false);
        setFormData({
          grnID: "",
          challanNo: "",
          date: "",
          projectId: "",
          attachmentName: ""
        });
        fetchGrns();
      } else {
        console.error("Failed to create GRN");
      }
    } catch (error) {
      console.error("Error creating GRN:", error);
    }
  };

  const filteredGRNs = grns.filter((grn) =>
    grn.grnID?.toLowerCase().includes(search.toLowerCase()) ||
    grn.challanNo?.toLowerCase().includes(search.toLowerCase()) ||
    grn.date?.toLowerCase().includes(search.toLowerCase()) ||
    (grn.projectId && grn.projectId.name?.toLowerCase().includes(search.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredGRNs.length / itemsPerPage);
  const paginatedGRNs = filteredGRNs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation Bar */}
      <MyProjectHeader />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">GRN List</h1>
              <p className="text-sm text-gray-600 mt-1">Manage and track your goods received notes</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg 
                             placeholder-gray-500 text-sm text-gray-900
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                             transition shadow-sm"
                />
              </div>
              
              <button 
                onClick={() => setShowModal(true)}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
              >
                <Plus size={16} />
                Create GRN
              </button>
            </div>
          </div>

          {/* GRN Cards */}
          {loading ? (
            <div className="flex justify-center py-8">
              <p className="text-gray-600">Loading GRNs...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {paginatedGRNs.map((grn) => (
                <motion.div
                  key={grn._id || grn.grnID}
                  className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all duration-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center justify-between gap-4">
                    {/* Core Details */}
                    <div className="flex-1 grid grid-cols-5 gap-2 text-sm">
                      <div className="flex flex-col">
                        <p className="text-gray-500 text-xs font-medium">Project</p>
                        <p className="font-semibold text-gray-900 truncate">{(grn.projectId && grn.projectId.name) || 'N/A'}</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-gray-500 text-xs font-medium">GRN ID</p>
                        <p className="font-semibold text-gray-900">{grn.grnID}</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-gray-500 text-xs font-medium">Challan No</p>
                        <p className="font-semibold text-gray-900 truncate">{grn.challanNo}</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-gray-500 text-xs font-medium">Date</p>
                        <p className="font-semibold text-gray-900">{grn.date}</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="text-gray-500 text-xs font-medium">Attachments</p>
                        <div className="flex items-center gap-1">
                          <Paperclip size={12} className="text-gray-400" />
                          <p className="font-semibold text-gray-900">{(grn.attachment && grn.attachment.length) || 0}</p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-600 transition" title="View">
                        <Eye size={14} />
                      </button>
                      <button className="p-1.5 rounded-md bg-gray-50 hover:bg-gray-100 text-gray-600 transition" title="Users">
                        <User size={14} />
                      </button>
                      <button className="p-1.5 rounded-md bg-green-50 hover:bg-green-100 text-green-600 transition" title="Download">
                        <Download size={14} />
                      </button>
                      <button className="p-1.5 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-600 transition" title="Mail">
                        <Mail size={14} />
                      </button>
                      <button 
                        onClick={fetchGrns}
                        className="p-1.5 rounded-md bg-red-50 hover:bg-red-100 text-red-600 transition" 
                        title="Refresh"
                      >
                        <RefreshCw size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && (
            <div className="flex items-center justify-between mt-6 text-sm text-gray-600">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
                Previous
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight size={16} />
              </button>
              <button className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <HelpCircle size={16} />
                Need Help?
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Create GRN Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center z-50 p-4" 
          onClick={() => setShowModal(false)}
        >
          <motion.div
            className="bg-white rounded-xl p-6 w-full max-w-md h-auto max-h-[95vh]"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Create GRN</h2>
              <button 
                onClick={() => setShowModal(false)} 
                className="p-1.5 text-gray-400 hover:text-gray-600 transition rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">GRN ID</label>
                <input
                  type="text"
                  value={formData.grnID}
                  onChange={(e) => setFormData({ ...formData, grnID: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900 bg-white hover:bg-gray-50 transition"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">Challan No</label>
                <input
                  type="text"
                  value={formData.challanNo}
                  onChange={(e) => setFormData({ ...formData, challanNo: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900 bg-white hover:bg-gray-50 transition"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900 bg-white hover:bg-gray-50 transition"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">Project</label>
                <select
                  value={formData.projectId}
                  onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900 bg-white hover:bg-gray-50 transition"
                  required
                >
                  <option value="">Select Project</option>
                  {(projects || []).map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.project_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">Attachment Name (temp)</label>
                <input
                  type="text"
                  value={formData.attachmentName}
                  onChange={(e) => setFormData({ ...formData, attachmentName: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900 bg-white hover:bg-gray-50 transition"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-sm shadow-md"
              >
                Create GRN
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}