'use client';

import { useState, useEffect, useRef } from "react";
import MyProjectHeader from "@/components/my-project/header";
import { Search, Plus, ChevronLeft, ChevronRight, Eye, Trash2, AlertCircle, RefreshCw, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function ExpensePage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [expenses, setExpenses] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    date: new Date().toISOString().split('T')[0],
    voucherNo: "",
    amount: "",
    vendor: "",
    category: "",
    description: "",
    projectId: "",
    fileName: "",
    filePath: "",
  });
  const itemsPerPage = 5;

  const createModalRef = useRef(null);
  const viewModalRef = useRef(null);

  // Handle outside click for modals
  const handleOutsideClick = (e, setModal) => {
    if (createModalRef.current && !createModalRef.current.contains(e.target)) {
      setModal(false);
    }
  };

  const handleViewOutsideClick = (e) => {
    handleOutsideClick(e, setShowViewModal);
  };

  const handleCreateOutsideClick = (e) => {
    handleOutsideClick(e, setShowCreateModal);
  };

  // Fetch expenses
  const fetchExpenses = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/payment/expense');
      if (!response.ok) {
        throw new Error('Failed to fetch expenses');
      }
      const { data } = await response.json();
      setExpenses(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete expense
  const handleDelete = async (expenseId) => {
    if (!confirm('Are you sure you want to delete this expense?')) {
      return;
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_PATH}/api/payment/expense/${expenseId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete expense');
      }
      setExpenses(expenses.filter((expense) => expense._id !== expenseId));
    } catch (err) {
      alert(err.message);
    }
  };

  // Fetch vendors
  const fetchVendors = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_PATH}/api/vendor?_=${Date.now()}`, {
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
    } finally {
      setLoading(false);
    }
  };

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token') || '';
      const headers = {
        'Accept': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || ''; // Assuming this is defined in env; adjust if needed
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
        console.error('API error:', projects.message);
        return [];
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      return [];
    }
  };

  // Fetch all data on mount
  useEffect(() => {
    fetchVendors();
    fetchProjects();
    fetchExpenses();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.vendor || !formData.amount || !formData.category) {
      alert('Please fill required fields');
      return;
    }
    try {
      const body = {
        title: formData.title,
        date: formData.date,
        voucherNo: formData.voucherNo,
        amount: parseFloat(formData.amount),
        vendor: formData.vendor,
        category: formData.category,
        description: formData.description,
        projectId: formData.projectId || null,
      };

      // Add file as array if provided
      if (formData.fileName && formData.filePath) {
        body.file = [{ name: formData.fileName, path: formData.filePath }];
      } else {
        body.file = [];
      }

      const response = await fetch('/api/payment/expense', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error('Failed to create expense');
      }
      const { data: newExpense } = await response.json();
      setExpenses([newExpense, ...expenses]);
      setShowCreateModal(false);
      setFormData({
        title: "",
        date: new Date().toISOString().split('T')[0],
        voucherNo: "",
        amount: "",
        vendor: "",
        category: "",
        description: "",
        projectId: "",
        fileName: "",
        filePath: "",
      });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleView = (expense) => {
    setSelectedExpense(expense);
    setShowViewModal(true);
  };

  const filteredExpenses = expenses.filter((expense) =>
    expense.title?.toLowerCase().includes(search.toLowerCase()) ||
    expense.date?.toLowerCase().includes(search.toLowerCase()) ||
    expense.voucherNo?.toLowerCase().includes(search.toLowerCase()) ||
    expense.vendor?.name?.toLowerCase().includes(search.toLowerCase()) ||
    expense.amount?.toString().toLowerCase().includes(search.toLowerCase()) ||
    expense.category?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);
  const paginatedExpenses = filteredExpenses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  const formatAmount = (amount) => {
    if (!amount) return '';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount).replace('$', '') + ' K'; // Adjust currency as needed
  };

  if (loading) {
    return (
      <div className="h-screen bg-gray-50 flex flex-col">
        <MyProjectHeader />
        <div className="flex-1 flex items-center justify-center">
          <RefreshCw className="animate-spin" size={24} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen bg-gray-50 flex flex-col">
        <MyProjectHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
            <p className="text-red-600">{error}</p>
            <button onClick={() => { fetchVendors(); fetchProjects(); fetchExpenses(); }} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation Bar */}
      <MyProjectHeader />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto scroll-smooth" style={{ scrollBehavior: 'smooth' }}>
        <div className="p-6">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Expense List</h1>
              <p className="text-sm text-gray-600 mt-2">Manage and track your expenses</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search expenses..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl 
                             placeholder-gray-400 text-sm text-gray-900
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                             transition-all duration-200 shadow-sm"
                />
              </div>
              
              <button 
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 text-sm font-medium shadow-sm"
              >
                <Plus size={16} />
                Create Expense
              </button>
            </div>
          </div>

          {/* Expense Cards */}
          {paginatedExpenses.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-lg text-gray-500">No expenses found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {paginatedExpenses.map((expense) => (
                <motion.div
                  key={expense._id}
                  className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start justify-between gap-6">
                    {/* Core Details with light padding background */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-gray-50 rounded-xl">
                      <div className="flex flex-col space-y-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Title</p>
                        <p className="text-sm font-semibold text-gray-900 line-clamp-1">{expense.title}</p>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Date</p>
                        <p className="text-sm font-semibold text-gray-900">{formatDate(expense.date)}</p>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Voucher No</p>
                        <p className="text-sm font-semibold text-gray-900">{expense.voucherNo || 'N/A'}</p>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Vendor</p>
                        <p className="text-sm font-semibold text-gray-900 line-clamp-1">{expense.vendor?.name || 'N/A'}</p>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Category</p>
                        <p className="text-sm font-semibold text-gray-900">{expense.category}</p>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Amount</p>
                        <p className="text-sm font-semibold text-gray-900 text-green-600">{formatAmount(expense.amount)}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 self-start pt-1">
                      <button 
                        onClick={() => handleView(expense)}
                        className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-all duration-200 hover:scale-105" 
                        title="View Details"
                        aria-label="View expense details"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(expense._id)}
                        className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-all duration-200 hover:scale-105" 
                        title="Delete Expense"
                        aria-label="Delete this expense"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-8 px-4 py-4 bg-white rounded-xl border border-gray-200">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={18} />
                Previous
              </button>
              <span className="text-sm font-medium text-gray-700">Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <motion.div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCreateOutsideClick}
        >
          <motion.div
            ref={createModalRef}
            className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Expense</h2>
            <form onSubmit={handleCreate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all duration-200"
                    placeholder="Enter expense title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all duration-200"
                    placeholder="Enter amount"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vendor *</label>
                  <select
                    required
                    value={formData.vendor}
                    onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all duration-200"
                  >
                    <option value="">Select Vendor</option>
                    {vendors.map((vendor) => (
                      <option key={vendor._id} value={vendor._id}>
                        {vendor.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project (Optional)</label>
                  <select
                    value={formData.projectId}
                    onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all duration-200"
                  >
                    <option value="">Select Project</option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.project_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all duration-200"
                    placeholder="Enter category"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Voucher No</label>
                  <input
                    type="text"
                    value={formData.voucherNo}
                    onChange={(e) => setFormData({ ...formData, voucherNo: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all duration-200"
                    placeholder="Enter voucher number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">File Name (Optional)</label>
                  <input
                    type="text"
                    value={formData.fileName}
                    onChange={(e) => setFormData({ ...formData, fileName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all duration-200"
                    placeholder="Enter file name for testing"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">File Path (Optional)</label>
                  <input
                    type="text"
                    value={formData.filePath}
                    onChange={(e) => setFormData({ ...formData, filePath: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all duration-200"
                    placeholder="Enter file path for testing"
                  />
                </div>
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all duration-200 resize-none"
                  placeholder="Enter description (optional)"
                />
              </div>
              <div className="flex gap-4 pt-4 col-span-1 md:col-span-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 text-gray-700 font-medium transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition-all duration-200 shadow-sm"
                >
                  Create Expense
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* View Modal */}
      {showViewModal && selectedExpense && (
        <motion.div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleViewOutsideClick}
        >
          <motion.div
            ref={viewModalRef}
            className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Expense Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-0">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <p className="text-gray-900 font-semibold">{selectedExpense.title}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <p className="text-gray-900 font-semibold">{formatDate(selectedExpense.date)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Voucher No</label>
                  <p className="text-gray-900 font-semibold">{selectedExpense.voucherNo || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                  <p className="text-gray-900 font-semibold text-green-600">{formatAmount(selectedExpense.amount)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vendor</label>
                  <p className="text-gray-900 font-semibold">{selectedExpense.vendor?.name || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <p className="text-gray-900 font-semibold">{selectedExpense.category}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
                  <p className="text-gray-900 font-semibold">{selectedExpense.projectId?.name || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <p className="text-gray-900">{selectedExpense.description || 'N/A'}</p>
                </div>
                {selectedExpense.file && selectedExpense.file.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Attached Files</label>
                    <div className="space-y-2">
                      {selectedExpense.file.map((file, index) => (
                        <a
                          key={index}
                          href={file.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                        >
                          <FileText size={16} />
                          {file.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => setShowViewModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 text-gray-700 font-medium transition-all duration-200"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}