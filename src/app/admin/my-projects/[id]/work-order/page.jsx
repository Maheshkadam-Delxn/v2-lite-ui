'use client';

import { useState, useEffect } from "react";
import MyProjectHeader from "@/components/my-project/header";
import { Search, Plus, ChevronLeft, ChevronRight, HelpCircle, Eye, Download, Mail, X, Trash2, Calendar, Building, User, FileText, DollarSign, Percent, Package } from "lucide-react";
import { motion } from "framer-motion";

const initialCreateForm = {
  projectId: '',
  vendor: '',
  workOrderNo: '',
  date: new Date().toISOString().split('T')[0],
  retentionPercentage: 0,
  taxPercentage: 0,
  advancePayment: 0,
  termsCondition: '',
  items: []
};

export default function WorkOrderPage() {
  const [workorders, setWorkorders] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState(initialCreateForm);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedWorkorder, setSelectedWorkorder] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [viewForm, setViewForm] = useState({});

  const API_BASE = process.env.NEXT_PUBLIC_BACKEND_API_PATH || '';

  useEffect(() => {
    fetchWorkOrders();
    fetchVendors();
    fetchProjects();
  }, []);

  async function fetchWorkOrders() {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE}/api/workorder`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      if (result.success) {
        setWorkorders(result.data || []);
      } else {
        setError(result.message || 'Failed to fetch work orders');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const fetchVendors = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/vendor?_=${Date.now()}`, {
        headers: {
          'Content-Type': 'application/json',
        },
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
      const res = await fetch(`${API_BASE}/api/projects`, {
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
      console.log("projects: ",projects)
      if (success) {
        const mappedProjects = projects.map(p => ({
          id: p._id,
          name: p.name
        }));
        setProjects(mappedProjects);
        console.log('Fetched projects:', mappedProjects);
        return mappedProjects;
      } else {
        console.error('API error:', projects.message);
        setProjects([]);
        return [];
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      setProjects([]);
      return [];
    }
  };


  async function fetchWorkorder(id) {
    try {
      const response = await fetch(`${API_BASE}/api/workorder/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      if (result.success) {
        setSelectedWorkorder(result.data);
        setViewForm(result.data);
      } else {
        setError(result.message || 'Failed to fetch work order');
      }
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleCreate(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE}/api/workorder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createForm),
      });
      const result = await response.json();
      if (result.success) {
        setIsCreateOpen(false);
        setCreateForm(initialCreateForm);
        fetchWorkOrders();
      } else {
        alert(result.message || 'Failed to create work order');
      }
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleUpdate() {
    try {
      const response = await fetch(`${API_BASE}/api/workorder/${selectedWorkorder._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(viewForm),
      });
      const result = await response.json();
      if (result.success) {
        setIsEditMode(false);
        fetchWorkorder(selectedWorkorder._id);
        fetchWorkOrders();
      } else {
        alert(result.message || 'Failed to update work order');
      }
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleDelete(id) {
    if (confirm('Are you sure you want to delete this work order?')) {
      try {
        const response = await fetch(`${API_BASE}/api/workorder/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();
        if (result.success) {
          fetchWorkOrders();
        } else {
          alert(result.message || 'Failed to delete work order');
        }
      } catch (err) {
        alert(err.message);
      }
    }
  }

  const filteredWorkorders = workorders.filter((workorder) =>
    workorder.workOrderNo?.toLowerCase().includes(search.toLowerCase()) ||
    getVendorName(workorder.vendor)?.toLowerCase().includes(search.toLowerCase()) ||
    getProjectName(workorder.projectId)?.toLowerCase().includes(search.toLowerCase()) ||
    workorder.date?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredWorkorders.length / itemsPerPage);
  const paginatedWorkorders = filteredWorkorders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatAmount = (amount) => {
    if (!amount) return '0 K';
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return `${(num / 1000).toFixed(2)} K`;
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  };

  const calculateTotal = (items) => {
    if (!Array.isArray(items)) return 0;
    return items.reduce((sum, item) => sum + ((item.quantity || 0) * (item.rate || 0)), 0);
  };

  const getVendorName = (vendorId) => {
    if (!vendorId) return 'N/A';
    const vendor = vendors.find(v => v._id?.toString() === vendorId?.toString());
    return vendor ? vendor.name : vendorId.toString();
  };

  const getProjectName = (projectId) => {
    if (!projectId) return 'N/A';
    const proj = projects.find(p => p.id?.toString() === projectId?.toString());
    return proj ? proj.name : projectId.toString();
  };

  const addItem = (formSetter, currentForm) => {
    formSetter(prev => ({ ...prev, items: [...prev.items, { description: '', quantity: 0, rate: 0 }] }));
  };

  const removeItem = (index, formSetter, currentForm) => {
    const newItems = [...currentForm.items];
    newItems.splice(index, 1);
    formSetter({ ...currentForm, items: newItems });
  };

  const updateItemField = (index, field, value, formSetter, currentForm) => {
    const newItems = [...currentForm.items];
    if (field === 'quantity' || field === 'rate') {
      newItems[index][field] = parseFloat(value) || 0;
    } else {
      newItems[index][field] = value;
    }
    formSetter({ ...currentForm, items: newItems });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation Bar */}
      <MyProjectHeader />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto scroll-smooth" style={{ scrollBehavior: 'smooth' }}>
        <div className="p-6 max-w-7xl mx-auto w-full">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Work Orders</h1>
              <p className="text-gray-600 mt-1">Manage and track all work orders</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search work orders..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg 
                             placeholder-gray-500 text-gray-900
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                             transition shadow-sm"
                />
              </div>
              
              <button 
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                onClick={() => {
                  setIsCreateOpen(true);
                  setCreateForm(initialCreateForm);
                }}
              >
                <Plus size={18} />
                Create Work Order
              </button>
            </div>
          </div>

          {/* Work Order Cards */}
          <div className="grid grid-cols-1 gap-5">
            {loading ? (
              <motion.div
                className="bg-white rounded-xl border border-gray-200 p-6 text-center text-gray-500"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                Loading work orders...
              </motion.div>
            ) : error && workorders.length === 0 ? (
              <motion.div
                className="bg-white rounded-xl border border-gray-200 p-6 text-center text-red-500"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {error}
              </motion.div>
            ) : filteredWorkorders.length === 0 ? (
              <motion.div
                className="bg-white rounded-xl border border-gray-200 p-6 text-center text-gray-500"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                No work orders found.
              </motion.div>
            ) : (
              paginatedWorkorders.map((workorder) => (
                <motion.div
                  key={workorder._id}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all duration-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Core Details */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 w-full">
                      {/* Work Order No */}
                      <div className="flex flex-col items-center text-center p-3 bg-blue-50 rounded-lg">
                        <p className="text-xs font-medium text-gray-500 mb-2">Work Order No</p>
                        <p className="font-semibold text-gray-900 text-sm">{workorder.workOrderNo}</p>
                      </div>
                      
                      {/* Vendor */}
                      <div className="flex flex-col items-center text-center p-3 bg-purple-50 rounded-lg">
                        <p className="text-xs font-medium text-gray-500 mb-2">Vendor</p>
                        <p className="font-semibold text-gray-900 text-sm">{getVendorName(workorder.vendor)}</p>
                      </div>
                      
                      {/* Project */}
                      <div className="flex flex-col items-center text-center p-3 bg-indigo-50 rounded-lg">
                        <p className="text-xs font-medium text-gray-500 mb-2">Project</p>
                        <p className="font-semibold text-gray-900 text-sm">{getProjectName(workorder.projectId)}</p>
                      </div>
                      
                      {/* Date */}
                      <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs font-medium text-gray-500 mb-2">Date</p>
                        <p className="font-semibold text-gray-900 text-sm">{formatDate(workorder.date)}</p>
                      </div>
                      
                      {/* Total Amount */}
                      <div className="flex flex-col items-center text-center p-3 bg-amber-50 rounded-lg">
                        <p className="text-xs font-medium text-gray-500 mb-2">Total Amount</p>
                        <p className="font-semibold text-gray-900 text-sm">₹{formatAmount(calculateTotal(workorder.items))}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-4 md:mt-0">
                      <button 
                        className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                        onClick={() => {
                          setIsViewOpen(true);
                          fetchWorkorder(workorder._id);
                          setIsEditMode(false);
                        }}
                      >
                        <Eye size={16} />
                        View
                      </button>
                      <button 
                        className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium"
                        onClick={() => handleDelete(workorder._id)}
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4 text-gray-600">
            <div className="text-sm">
              Showing {paginatedWorkorders.length} of {filteredWorkorders.length} work orders
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 text-sm font-medium"
              >
                <ChevronLeft size={16} />
                Previous
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium ${currentPage === page ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 text-sm font-medium"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
            
            <button className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
              <HelpCircle size={16} />
              Need Help?
            </button>
          </div>
        </div>
      </div>

      {/* Create Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white rounded-xl p-6 w-full max-w-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Create Work Order</h2>
              <button onClick={() => setIsCreateOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project *</label>
                  <select
                    name="projectId"
                    value={createForm.projectId}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  >
                    <option value="">Select Project</option>
                    {projects.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vendor</label>
                  <select
                    name="vendor"
                    value={createForm.vendor}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  >
                    <option value="">Select Vendor</option>
                    {vendors.map(v => (
                      <option key={v._id} value={v._id}>{v.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Work Order No *</label>
                <input
                  type="text"
                  name="workOrderNo"
                  value={createForm.workOrderNo}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={createForm.date}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Retention Percentage</label>
                  <input
                    type="number"
                    name="retentionPercentage"
                    value={createForm.retentionPercentage}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, [e.target.name]: parseFloat(e.target.value) || 0 }))}
                    step="0.01"
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tax Percentage</label>
                  <input
                    type="number"
                    name="taxPercentage"
                    value={createForm.taxPercentage}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, [e.target.name]: parseFloat(e.target.value) || 0 }))}
                    step="0.01"
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Advance Payment</label>
                <input
                  type="number"
                  name="advancePayment"
                  value={createForm.advancePayment}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, [e.target.name]: parseFloat(e.target.value) || 0 }))}
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Items</label>
                {createForm.items.map((item, index) => (
                  <div key={index} className="border border-gray-300 rounded-lg p-3 mb-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) => updateItemField(index, 'description', e.target.value, setCreateForm, createForm)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 md:col-span-3 text-gray-900"
                      />
                      <input
                        type="number"
                        placeholder="Quantity"
                        value={item.quantity}
                        onChange={(e) => updateItemField(index, 'quantity', e.target.value, setCreateForm, createForm)}
                        step="0.01"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      />
                      <input
                        type="number"
                        placeholder="Rate"
                        value={item.rate}
                        onChange={(e) => updateItemField(index, 'rate', e.target.value, setCreateForm, createForm)}
                        step="0.01"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(index, setCreateForm, createForm)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove Item
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addItem(setCreateForm, createForm)}
                  className="w-full px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Add Item
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Terms & Conditions</label>
                <textarea
                  name="termsCondition"
                  value={createForm.termsCondition}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* View/Edit Modal */}
      {isViewOpen && selectedWorkorder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {isEditMode ? 'Edit' : 'View'} Work Order
                </h2>
                <p className="text-gray-600 mt-1">Work Order No: {selectedWorkorder.workOrderNo}</p>
              </div>
              <button onClick={() => setIsViewOpen(false)} className="text-gray-400 hover:text-gray-600 p-2">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Header Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <FileText size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-700">Work Order No</p>
                      <p className="text-lg font-bold text-gray-900">{selectedWorkorder.workOrderNo}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <Calendar size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-700">Date</p>
                      <p className="text-lg font-bold text-gray-900">{formatDate(selectedWorkorder.date)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                      <DollarSign size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-amber-700">Total Amount</p>
                      <p className="text-lg font-bold text-gray-900">₹{formatAmount(calculateTotal(selectedWorkorder.items))}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project & Vendor Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Building size={20} className="text-blue-500" />
                    Project Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                      {isEditMode ? (
                        <select
                          value={viewForm.projectId || ''}
                          onChange={(e) => setViewForm(prev => ({ ...prev, projectId: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        >
                          <option value="">Select Project</option>
                          {projects.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                          ))}
                        </select>
                      ) : (
                        <p className="text-gray-900 bg-white px-3 py-2 rounded-lg border border-gray-200">{getProjectName(selectedWorkorder.projectId)}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <User size={20} className="text-purple-500" />
                    Vendor Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Vendor Name</label>
                      {isEditMode ? (
                        <select
                          value={viewForm.vendor || ''}
                          onChange={(e) => setViewForm(prev => ({ ...prev, vendor: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        >
                          <option value="">Select Vendor</option>
                          {vendors.map(v => (
                            <option key={v._id} value={v._id}>{v.name}</option>
                          ))}
                        </select>
                      ) : (
                        <p className="text-gray-900 bg-white px-3 py-2 rounded-lg border border-gray-200">{getVendorName(selectedWorkorder.vendor)}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial Details */}
              <div className="bg-gray-50 rounded-lg p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <DollarSign size={20} className="text-green-500" />
                  Financial Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Percent size={16} className="text-blue-500" />
                      Retention Percentage
                    </label>
                    {isEditMode ? (
                      <input
                        type="number"
                        value={viewForm.retentionPercentage || ''}
                        onChange={(e) => setViewForm(prev => ({ ...prev, retentionPercentage: parseFloat(e.target.value) || 0 }))}
                        step="0.01"
                        min="0"
                        max="100"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      />
                    ) : (
                      <p className="text-gray-900 bg-white px-3 py-2 rounded-lg border border-gray-200">{selectedWorkorder.retentionPercentage}%</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Percent size={16} className="text-purple-500" />
                      Tax Percentage
                    </label>
                    {isEditMode ? (
                      <input
                        type="number"
                        value={viewForm.taxPercentage || ''}
                        onChange={(e) => setViewForm(prev => ({ ...prev, taxPercentage: parseFloat(e.target.value) || 0 }))}
                        step="0.01"
                        min="0"
                        max="100"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      />
                    ) : (
                      <p className="text-gray-900 bg-white px-3 py-2 rounded-lg border border-gray-200">{selectedWorkorder.taxPercentage}%</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <DollarSign size={16} className="text-amber-500" />
                      Advance Payment
                    </label>
                    {isEditMode ? (
                      <input
                        type="number"
                        value={viewForm.advancePayment || ''}
                        onChange={(e) => setViewForm(prev => ({ ...prev, advancePayment: parseFloat(e.target.value) || 0 }))}
                        step="0.01"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      />
                    ) : (
                      <p className="text-gray-900 bg-white px-3 py-2 rounded-lg border border-gray-200">₹{formatAmount(selectedWorkorder.advancePayment)}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Items Section */}
              <div className="bg-gray-50 rounded-lg p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Package size={20} className="text-indigo-500" />
                  Items ({viewForm.items?.length || 0})
                </h3>
                {viewForm.items?.map((item, index) => (
                  <div key={index} className="border border-gray-300 rounded-lg p-4 mb-3 bg-white">
                    {isEditMode ? (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          <input
                            type="text"
                            placeholder="Description"
                            value={item.description || ''}
                            onChange={(e) => updateItemField(index, 'description', e.target.value, setViewForm, viewForm)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                            <input
                              type="number"
                              placeholder="Quantity"
                              value={item.quantity || ''}
                              onChange={(e) => updateItemField(index, 'quantity', e.target.value, setViewForm, viewForm)}
                              step="0.01"
                              min="0"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Rate</label>
                            <input
                              type="number"
                              placeholder="Rate"
                              value={item.rate || ''}
                              onChange={(e) => updateItemField(index, 'rate', e.target.value, setViewForm, viewForm)}
                              step="0.01"
                              min="0"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(index, setViewForm, viewForm)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Remove Item
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-gray-700">Description</p>
                          <p className="text-gray-900 mt-1">{item.description || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">Quantity</p>
                          <p className="text-gray-900 mt-1">{item.quantity || 0}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">Rate</p>
                          <p className="text-gray-900 mt-1">₹{item.rate || 0}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">Item Total</p>
                          <p className="text-gray-900 mt-1 font-semibold">₹{((item.quantity || 0) * (item.rate || 0)).toFixed(2)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )) || null}
                {isEditMode && (
                  <button
                    type="button"
                    onClick={() => addItem(setViewForm, viewForm)}
                    className="w-full px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                  >
                    Add Item
                  </button>
                )}
              </div>

              {/* Terms & Conditions Section */}
              <div className="bg-gray-50 rounded-lg p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText size={20} className="text-gray-500" />
                  Terms & Conditions
                </h3>
                {isEditMode ? (
                  <textarea
                    value={viewForm.termsCondition || ''}
                    onChange={(e) => setViewForm(prev => ({ ...prev, termsCondition: e.target.value }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                ) : (
                  <p className="text-gray-900 bg-white px-3 py-2 rounded-lg border border-gray-200 min-h-[100px]">
                    {selectedWorkorder.termsCondition || 'No terms and conditions specified.'}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6">
              {!isEditMode ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsViewOpen(false)}
                    className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 font-medium"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditMode(true)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                  >
                    Edit
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditMode(false)}
                    className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleUpdate}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                  >
                    Update
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}