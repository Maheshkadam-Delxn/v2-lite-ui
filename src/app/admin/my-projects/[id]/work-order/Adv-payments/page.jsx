'use client';

import { useState, useEffect } from "react";
import MyProjectHeader from "@/components/my-project/header";
import { Search, Plus, ChevronLeft, ChevronRight, HelpCircle, Eye, Trash2, X } from "lucide-react";
import { motion } from "framer-motion";

const initialCreateForm = {
  projectId: '',
  workOrder: '',
  vendor: '',
  amount: 0,
  advanceDate: new Date().toISOString().split('T')[0],
  remark: '',
  paymentStatus: 'Pending'
};

export default function AdvancePaymentPage() {
  const [advancePayments, setAdvancePayments] = useState([]);
  const [workOrders, setWorkOrders] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState(initialCreateForm);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedAdvancePayment, setSelectedAdvancePayment] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [viewForm, setViewForm] = useState({});

  useEffect(() => {
    fetchAdvancePayments();
    fetchWorkOrders();
    fetchVendors();
  }, []);

  const handleWorkOrderChange = async (value, setter) => {
    setter(prev => ({ ...prev, workOrder: value }));
    if (value) {
      try {
        const response = await fetch(`/api/workorder/${value}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const result = await response.json();
        if (result.success) {
          setter(prev => ({ ...prev, projectId: result.data.projectId }));
        }
      } catch (err) {
        console.error('Error fetching work order:', err);
      }
    } else {
      setter(prev => ({ ...prev, projectId: '' }));
    }
  };

  async function fetchAdvancePayments() {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/workorder/advancepayment', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText.substring(0, 200)}`);
      }
      const result = await response.json();
      if (result.success) {
        setAdvancePayments(result.data || []);
      } else {
        setError(result.message || 'Failed to fetch advance payments');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchWorkOrders() {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/workorder', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const result = await response.json();
      if (result.success) {
        setWorkOrders(result.data || []);
      } else {
        setError(result.message || 'Failed to fetch work orders');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchVendors() {
    try {
      const response = await fetch('/api/vendor', {
        credentials: 'include',
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText.substring(0, 200)}`);
      }
      const result = await response.json();
      if (result.success) {
        setVendors(result.data || []);
      }
    } catch (err) {
      console.error('Error fetching vendors:', err);
    }
  }

  async function handleCreate(e) {
    e.preventDefault();
    try {
      const response = await fetch('/api/workorder/advancepayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(createForm),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText.substring(0, 200)}`);
      }
      const result = await response.json();
      if (result.success) {
        setIsCreateOpen(false);
        setCreateForm(initialCreateForm);
        fetchAdvancePayments();
      } else {
        alert(result.message || 'Failed to create advance payment');
      }
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleUpdate() {
    try {
      const response = await fetch(`/api/workorder/advancepayment/${selectedAdvancePayment._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(viewForm),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText.substring(0, 200)}`);
      }
      const result = await response.json();
      if (result.success) {
        setAdvancePayments(prev => prev.map(p => p._id.toString() === selectedAdvancePayment._id.toString() ? { ...p, ...viewForm } : p));
        setIsEditMode(false);
      } else {
        alert(result.message || 'Failed to update advance payment');
      }
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this advance payment?')) return;
    try {
      const response = await fetch(`/api/workorder/advancepayment/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText.substring(0, 200)}`);
      }
      const result = await response.json();
      if (result.success) {
        fetchAdvancePayments();
      } else {
        alert(result.message || 'Failed to delete advance payment');
      }
    } catch (err) {
      alert(err.message);
    }
  }

  const formatAmount = (amount) => {
    if (!amount) return '0 K';
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return `${(num / 1000).toFixed(2)} K`;
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  };

  const getWorkOrderNo = (woId) => {
    return workOrders.find(w => w._id?.toString() === woId?.toString())?.workOrderNo || 'Not Linked';
  };

  const getVendorName = (vendorId) => {
    return vendors.find(v => v._id?.toString() === vendorId?.toString())?.name || 'N/A';
  };

  const filteredAdvancePayments = advancePayments.filter((payment) => {
    const woNo = getWorkOrderNo(payment.workOrder);
    const vendorName = getVendorName(payment.vendor);
    return (
      payment.paymentNo?.toLowerCase().includes(search.toLowerCase()) ||
      woNo.toLowerCase().includes(search.toLowerCase()) ||
      vendorName.toLowerCase().includes(search.toLowerCase()) ||
      payment.paymentStatus?.toLowerCase().includes(search.toLowerCase()) ||
      String(payment.amount).includes(search) ||
      formatDate(payment.advanceDate).toLowerCase().includes(search.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredAdvancePayments.length / itemsPerPage);
  const paginatedAdvancePayments = filteredAdvancePayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
              <h1 className="text-2xl font-bold text-gray-900">Advance Payments</h1>
              <p className="text-gray-600 mt-1">Manage and track all advance payments</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search advance payments..."
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
                Create Advance Payment
              </button>
            </div>
          </div>

          {/* Advance Payment Cards */}
          <div className="grid grid-cols-1 gap-6">
            {loading ? (
              <motion.div
                className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                Loading advance payments...
              </motion.div>
            ) : error && advancePayments.length === 0 ? (
              <motion.div
                className="bg-white rounded-xl border border-gray-200 p-8 text-center text-red-500"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {error}
              </motion.div>
            ) : filteredAdvancePayments.length === 0 ? (
              <motion.div
                className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                No advance payments found.
              </motion.div>
            ) : (
              paginatedAdvancePayments.map((payment) => (
                <motion.div
                  key={payment._id}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-6 bg-gray-50">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Advance Payment #{payment.paymentNo}</h3>
                        <p className="text-sm text-gray-600">Work Order: {getWorkOrderNo(payment.workOrder)}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${payment.paymentStatus === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {payment.paymentStatus}
                        </span>
                        <button 
                          className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition-all duration-200" 
                          title="View"
                          onClick={() => {
                            setSelectedAdvancePayment(payment);
                            setViewForm({ ...payment });
                            setIsViewOpen(true);
                            setIsEditMode(false);
                          }}
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 transition-all duration-200" 
                          title="Delete"
                          onClick={() => handleDelete(payment._id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      <div className="flex-1 min-w-[200px] flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Vendor</p>
                          <p className="text-base font-semibold text-gray-900 truncate">{getVendorName(payment.vendor)}</p>
                        </div>
                        <div className="p-2 bg-purple-100 rounded-full">
                          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-[150px] flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Amount</p>
                          <p className="text-base font-semibold text-gray-900">₹{formatAmount(payment.amount)}</p>
                        </div>
                        <div className="p-2 bg-amber-100 rounded-full">
                          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>

                      <div className="flex-1 min-w-[150px] flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Advance Date</p>
                          <p className="text-base font-semibold text-gray-900">{formatDate(payment.advanceDate)}</p>
                        </div>
                        <div className="p-2 bg-indigo-100 rounded-full">
                          <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-[200px] p-4 bg-white rounded-lg border border-gray-200">
                        <p className="text-sm font-medium text-gray-500 mb-2">Remark</p>
                        <p className="text-sm text-gray-900 truncate">{payment.remark || 'No remark added'}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4 text-gray-600">
            <div className="text-sm">
              Showing {paginatedAdvancePayments.length} of {filteredAdvancePayments.length} advance payments
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
            className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[95vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Create Advance Payment</h2>
              <button onClick={() => setIsCreateOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Work Order *</label>
                <select
                  name="workOrder"
                  value={createForm.workOrder}
                  onChange={(e) => handleWorkOrderChange(e.target.value, setCreateForm)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                >
                  <option value="">Select Work Order</option>
                  {workOrders.map(wo => (
                    <option key={wo._id} value={wo._id}>{wo.workOrderNo}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vendor *</label>
                <select
                  name="vendor"
                  value={createForm.vendor}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, vendor: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                >
                  <option value="">Select Vendor</option>
                  {vendors.map(v => (
                    <option key={v._id} value={v._id}>{v.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount *</label>
                <input
                  type="number"
                  name="amount"
                  value={createForm.amount}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                  step="0.01"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Advance Date *</label>
                <input
                  type="date"
                  name="advanceDate"
                  value={createForm.advanceDate}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, advanceDate: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Remark</label>
                <textarea
                  name="remark"
                  value={createForm.remark}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, remark: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status *</label>
                <select
                  name="paymentStatus"
                  value={createForm.paymentStatus}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, paymentStatus: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                </select>
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
      {isViewOpen && selectedAdvancePayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[95vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {isEditMode ? 'Edit' : 'View'} Advance Payment
              </h2>
              <button onClick={() => setIsViewOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment No</label>
                {isEditMode ? (
                  <input
                    type="text"
                    value={viewForm.paymentNo || ''}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-900"
                  />
                ) : (
                  <p className="text-gray-900">{selectedAdvancePayment.paymentNo}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Work Order</label>
                {isEditMode ? (
                  <select
                    value={viewForm.workOrder || ''}
                    onChange={(e) => handleWorkOrderChange(e.target.value, setViewForm)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  >
                    <option value="">Select Work Order</option>
                    {workOrders.map(wo => (
                      <option key={wo._id} value={wo._id}>{wo.workOrderNo}</option>
                    ))}
                  </select>
                ) : (
                  <p className="text-gray-900">{getWorkOrderNo(selectedAdvancePayment.workOrder)}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vendor</label>
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
                  <p className="text-gray-900">{getVendorName(selectedAdvancePayment.vendor)}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                {isEditMode ? (
                  <input
                    type="number"
                    value={viewForm.amount || ''}
                    onChange={(e) => setViewForm(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                ) : (
                  <p className="text-gray-900">₹{formatAmount(selectedAdvancePayment.amount)}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Advance Date</label>
                {isEditMode ? (
                  <input
                    type="date"
                    value={viewForm.advanceDate ? new Date(viewForm.advanceDate).toISOString().split('T')[0] : ''}
                    onChange={(e) => setViewForm(prev => ({ ...prev, advanceDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                ) : (
                  <p className="text-gray-900">{formatDate(selectedAdvancePayment.advanceDate)}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Remark</label>
                {isEditMode ? (
                  <textarea
                    value={viewForm.remark || ''}
                    onChange={(e) => setViewForm(prev => ({ ...prev, remark: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                ) : (
                  <p className="text-gray-900">{selectedAdvancePayment.remark || 'N/A'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                {isEditMode ? (
                  <select
                    value={viewForm.paymentStatus || ''}
                    onChange={(e) => setViewForm(prev => ({ ...prev, paymentStatus: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                  </select>
                ) : (
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    selectedAdvancePayment.paymentStatus === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedAdvancePayment.paymentStatus}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              {!isEditMode ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsViewOpen(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditMode(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Edit
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditMode(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleUpdate}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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