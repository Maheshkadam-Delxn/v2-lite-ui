'use client';

import { useState, useEffect } from "react";
import MyProjectHeader from "@/components/my-project/header";
import { Search, Plus, ChevronLeft, ChevronRight, HelpCircle, Eye, RefreshCw, Trash2, X, DollarSign, Building2, MapPin, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function PurchaseOrderPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pos, setPos] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedPo, setSelectedPo] = useState(null);
  const [projects, setProjects] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [indents, setIndents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [indentLoading, setIndentLoading] = useState(false);
  const itemsPerPage = 5;
  const apiBase = process.env.NEXT_PUBLIC_BACKEND_API_PATH || '';

  useEffect(() => {
    fetchPos();
    fetchProjects();
    fetchVendors();
  }, []);

  const fetchPos = async () => {
    try {
      const token = localStorage.getItem('token') || '';
      const headers = {
        'Accept': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const res = await fetch(`${apiBase}/api/payment/purchase_orders`, {
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
        setPos(data || []);
        console.log('Fetched POs:', data);
        return data;
      } else {
        console.error('API error:', data?.message);
        return [];
      }
    } catch (error) {
      console.error('Failed to fetch POs:', error);
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
          name: p.name
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

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token') || '';
      const headers = {
        'Accept': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const response = await fetch(`${apiBase}/api/vendor?_=${Date.now()}`, {
        headers,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch vendors: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        console.log('Fetched vendors:', result.data); // Debug
        setVendors(result.data);
      } else {
        throw new Error(result.error || 'Failed to fetch vendors');
      }
    } catch (err) {
      console.error('Error fetching vendors:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchIndents = async (projectId) => {
    if (!projectId) {
      setIndents([]);
      return;
    }
    setIndentLoading(true);
    try {
      let url = `${apiBase}/api/payment/indent`;
      url += `?projectId=${projectId}`;
      const token = localStorage.getItem('token') || '';
      const headers = {
        'Accept': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      console.log('Fetching indents for project:', projectId, 'URL:', url); // Debug
      const res = await fetch(url, { headers });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not JSON');
      }
      const responseData = await res.json();
      console.log('Indents response:', responseData); // Debug
      const { success, data: rawIndents } = responseData;
      if (success) {
        const indentsArray = Array.isArray(rawIndents) ? rawIndents : [];
        setIndents(indentsArray);
        console.log('Set indents:', indentsArray); // Debug
      } else {
        console.error('API error in indents:', responseData?.error);
        setIndents([]);
      }
    } catch (err) {
      console.error('Error fetching indents:', err);
      setIndents([]);
    } finally {
      setIndentLoading(false);
    }
  };

  useEffect(() => {
    fetchIndents(selectedProjectId);
  }, [selectedProjectId]);

  const computePoAmount = (po) => {
    if (!po.addItems || po.addItems.length === 0) return '0.00 K';
    const total = po.addItems.reduce((sum, item) => sum + (item.totalAmount || 0), 0);
    return (total / 1000).toFixed(2) + ' K';
  };

  const filteredPOs = pos.filter((po) =>
    po.purchaseId.toLowerCase().includes(search.toLowerCase()) ||
    (po.vendor?.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (po.projectId?.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (po.comments || '').toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPOs.length / itemsPerPage);
  const paginatedPOs = filteredPOs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleView = async (id) => {
    try {
      const token = localStorage.getItem('token') || '';
      const headers = {
        'Accept': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const res = await fetch(`${apiBase}/api/payment/purchase_orders/${id}`, { headers });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const { data } = await res.json();
      setSelectedPo(data);
    } catch (error) {
      console.error('Error fetching PO:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this Purchase Order?')) return;
    try {
      const token = localStorage.getItem('token') || '';
      const headers = {
        'Accept': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      await fetch(`${apiBase}/api/payment/purchase_orders/${id}`, { 
        method: 'DELETE',
        headers 
      });
      fetchPos();
    } catch (error) {
      console.error('Error deleting PO:', error);
      alert('Error deleting Purchase Order');
    }
  };

  const handleRefresh = () => {
    fetchPos();
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = {
      purchaseId: formData.get('purchaseId'),
      vendor: formData.get('vendor'),
      comments: formData.get('comments'),
      projectId: formData.get('projectId'),
      addItems: formData.getAll('addItems') || [], // For multiple select
    };
    try {
      const token = localStorage.getItem('token') || '';
      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const res = await fetch(`${apiBase}/api/payment/purchase_orders`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setShowCreate(false);
        e.target.reset();
        setSelectedProjectId('');
        setIndents([]);
        fetchPos();
      } else {
        const errorData = await res.json();
        alert(`Error creating Purchase Order: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error creating PO:', error);
      alert('Error creating Purchase Order');
    }
  };

  const handleCloseView = () => {
    setSelectedPo(null);
  };

  const handleProjectChange = (e) => {
    const value = e.target.value;
    setSelectedProjectId(value);
  };

  const handleCloseCreate = () => {
    setShowCreate(false);
    setSelectedProjectId('');
    setIndents([]);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">Error: {error}</div>;
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation Bar */}
      <MyProjectHeader />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto scroll-smooth" style={{ scrollBehavior: 'smooth' }}>
        <div className="p-6">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Purchase Orders</h1>
              <p className="text-sm text-gray-600 mt-1">Manage and track your purchase orders</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg 
                             placeholder-gray-500 text-sm text-gray-900
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                             transition shadow-sm"
                />
              </div>
              
              <button 
                onClick={() => setShowCreate(true)}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
              >
                <Plus size={16} />
                Create Order
              </button>
            </div>
          </div>

          {/* Purchase Order Cards - Horizontal List View */}
          <div className="space-y-4 mb-6">
            {paginatedPOs.map((po) => {
              const poAmount = computePoAmount(po);
              const materialReceived = po.addItems?.length > 0 ? 100 : 0;
              const billInitiated = "Not Initiated";
              const status = "Approved";
              const vendorName = po.vendor?.name || 'N/A';
              const projectName = po.projectId?.name || 'N/A';
              return (
                <motion.div
                  key={po._id}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2.5 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText size={16} className="text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm text-gray-900">{po.purchaseId}</h3>
                          <p className="text-xs text-gray-500">Purchase Order</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium 
                        ${status === "Approved" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                        {status}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4">
                    <div className="space-y-3">
                      {/* Main Details Row */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg">
                          <Building2 size={14} className="text-gray-500 flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-gray-500">Vendor</p>
                            <p className="text-sm font-semibold text-gray-900 truncate">{vendorName}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg">
                          <MapPin size={14} className="text-gray-500 flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-gray-500">Project</p>
                            <p className="text-sm font-semibold text-gray-900 truncate">{projectName}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-2.5 bg-blue-50 rounded-lg">
                          <DollarSign size={14} className="text-blue-500 flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-gray-500">Amount</p>
                            <p className="text-sm font-semibold text-gray-900">{poAmount}</p>
                          </div>
                        </div>
                      </div>

                      {/* Progress and Status Row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-medium text-gray-700">Material Received</p>
                            <p className="text-xs font-semibold text-gray-900">{materialReceived}%</p>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${materialReceived}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg">
                          <FileText size={14} className="text-yellow-500 flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-gray-500">Bill Status</p>
                            <p className={`text-sm font-semibold ${billInitiated === "Not Initiated" ? "text-red-600" : "text-yellow-600"}`}>
                              {billInitiated}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-200">
                        <button 
                          onClick={() => handleView(po._id)}
                          className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition flex items-center gap-1" 
                          title="View Details"
                        >
                          <Eye size={14} />
                          <span className="text-xs">View</span>
                        </button>
                        <button 
                          onClick={handleRefresh}
                          className="p-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 transition flex items-center gap-1" 
                          title="Refresh"
                        >
                          <RefreshCw size={14} />
                          <span className="text-xs">Refresh</span>
                        </button>
                        <button 
                          onClick={() => handleDelete(po._id)}
                          className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition flex items-center gap-1" 
                          title="Delete"
                        >
                          <Trash2 size={14} />
                          <span className="text-xs">Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 text-sm text-gray-600">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition"
            >
              <ChevronLeft size={16} />
              Previous
            </button>
            <span className="font-medium">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition"
            >
              Next
              <ChevronRight size={16} />
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <HelpCircle size={16} />
              Need Help?
            </button>
          </div>
        </div>
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Create Purchase Order</h2>
              <button onClick={handleCloseCreate} className="p-1.5 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Purchase ID</label>
                <input 
                  name="purchaseId" 
                  placeholder="e.g., GH101-PO-00023" 
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900" 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Vendor</label>
                <select 
                  name="vendor" 
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white" 
                  required 
                >
                  <option value="">Select Vendor</option>
                  {vendors.map(v => (
                    <option key={v._id} value={v._id} className="text-gray-900">{v.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Project</label>
                <select 
                  name="projectId" 
                  value={selectedProjectId}
                  onChange={handleProjectChange}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white" 
                  required 
                >
                  <option value="">Select Project</option>
                  {projects.map(p => (
                    <option key={p.id} value={p.id} className="text-gray-900">{p.name}</option>
                  ))}
                </select>
              </div>
              <div className="min-h-[5rem]">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Add Items (Indents)</label>
                {!selectedProjectId ? (
                  <p className="text-sm text-gray-500 p-2.5 border border-gray-300 rounded-lg bg-gray-50">Select a project to view available indents</p>
                ) : indentLoading ? (
                  <p className="text-sm text-gray-500 p-2.5 border border-gray-300 rounded-lg bg-gray-50">Loading indents...</p>
                ) : (
                  <>
                    <select 
                      name="addItems" 
                      multiple
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-20 text-gray-900 bg-white" 
                    >
                      {indents.length === 0 ? (
                        <option disabled className="text-gray-900">No indents available for this project</option>
                      ) : (
                        indents.map(i => (
                          <option key={i._id} value={i._id} className="text-gray-900">
                            {i.indentId || i.material || i.description || i._id}
                          </option>
                        ))
                      )}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
                  </>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Comments</label>
                <textarea 
                  name="comments" 
                  placeholder="Optional comments..." 
                  rows={3}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white" 
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 font-medium transition">
                  Create
                </button>
                <button 
                  type="button" 
                  onClick={handleCloseCreate} 
                  className="flex-1 bg-gray-300 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-400 font-medium transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* View Modal */}
      {selectedPo && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Purchase Order Details: {selectedPo.purchaseId}</h2>
              <button onClick={handleCloseView} className="p-1.5 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Vendor:</p>
                  <p className="text-gray-900 font-semibold">{selectedPo.vendor?.name || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Project:</p>
                  <p className="text-gray-900 font-semibold">{selectedPo.projectId?.name || 'N/A'}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Comments:</p>
                <p className="text-gray-900">{selectedPo.comments || 'No comments'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Total Amount:</p>
                <p className="text-gray-900 font-semibold">{computePoAmount(selectedPo)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Items:</p>
                {selectedPo.addItems && selectedPo.addItems.length > 0 ? (
                  <ul className="mt-2 space-y-1">
                    {selectedPo.addItems.map((item, index) => (
                      <li key={item._id || index} className="text-sm text-gray-900 border-l-2 border-blue-500 pl-3 py-1 bg-blue-50 rounded">
                        {item.indentId || item.material || item.description || item._id} - {item.totalAmount || item.amount || 'N/A'}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No items added</p>
                )}
              </div>
            </div>
            <button 
              onClick={handleCloseView} 
              className="mt-6 w-full bg-gray-300 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-400 font-medium transition"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}