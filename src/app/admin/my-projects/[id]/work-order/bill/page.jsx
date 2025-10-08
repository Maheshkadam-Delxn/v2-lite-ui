'use client';

import { useState, useEffect } from "react";
import MyProjectHeader from "@/components/my-project/header";
import { Search, Plus, ChevronLeft, ChevronRight, HelpCircle, Eye, Trash2, X, FileText, User } from "lucide-react";
import { motion } from "framer-motion";

const initialCreateForm = {
  workOrder: '',
  advancePayment: '',
  remark: '',
  taxPercentage: 0,
  retantionAmount: 0,
  netPayment: 0,
  deductionAmount: '',
  items: []
};

export default function BillPage() {
  const [bills, setBills] = useState([]);
  const [workOrders, setWorkOrders] = useState([]);
  const [advancePayments, setAdvancePayments] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState(initialCreateForm);
  const [deductions, setDeductions] = useState([]);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [viewForm, setViewForm] = useState({});
  const [viewDeductions, setViewDeductions] = useState([]);

  useEffect(() => {
    fetchBills();
    fetchWorkOrders();
    fetchAdvancePayments();
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
        if (result.success && result.data && result.data.projectId) {
          setter(prev => ({ ...prev, projectId: result.data.projectId }));
        } else {
          // If no projectId, clear it
          setter(prev => ({ ...prev, projectId: '' }));
        }
      } catch (err) {
        console.error('Error fetching work order:', err);
        setter(prev => ({ ...prev, projectId: '' }));
      }
    } else {
      setter(prev => ({ ...prev, projectId: '' }));
    }
  };

  async function fetchBills() {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/workorder/bill', {
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
        setBills(result.data || []);
      } else {
        setError(result.message || 'Failed to fetch bills');
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
    if (!createForm.workOrder || !createForm.projectId) {
      alert('Please select a valid work order with associated project.');
      return;
    }
    const formData = { ...createForm, items: deductions };
    try {
      const response = await fetch('/api/workorder/bill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText.substring(0, 200)}`);
      }
      const result = await response.json();
      if (result.success) {
        setIsCreateOpen(false);
        setCreateForm(initialCreateForm);
        setDeductions([]);
        fetchBills();
      } else {
        alert(result.message || 'Failed to create bill');
      }
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleUpdate() {
    const formData = { ...viewForm, items: viewDeductions };
    try {
      const response = await fetch(`/api/workorder/bill/${selectedBill._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText.substring(0, 200)}`);
      }
      const result = await response.json();
      if (result.success) {
        setBills(prev => prev.map(b => b._id.toString() === selectedBill._id.toString() ? { ...b, ...formData } : b));
        setIsEditMode(false);
      } else {
        alert(result.message || 'Failed to update bill');
      }
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this bill?')) return;
    try {
      const response = await fetch(`/api/workorder/bill/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText.substring(0, 200)}`);
      }
      const result = await response.json();
      if (result.success) {
        fetchBills();
      } else {
        alert(result.message || 'Failed to delete bill');
      }
    } catch (err) {
      alert(err.message);
    }
  }

  const formatAmount = (amount) => {
    if (!amount && amount !== 0) return '0 K';
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return `${(num / 1000).toFixed(2)} K`;
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  };

  const getWorkOrderNo = (woId) => {
    if (!woId) return 'Not Linked';
    return workOrders.find(w => w._id?.toString() === woId?.toString())?.workOrderNo || 'Not Linked';
  };

  const getWorkOrderVendor = (woNo) => {
    if (!woNo) return 'N/A';
    const wo = workOrders.find(w => w.workOrderNo === woNo);
    const vendorId = wo?.vendorId;
    return vendors.find(v => v._id?.toString() === vendorId?.toString())?.name || 'N/A';
  };

  const getWorkOrderDate = (woNo) => {
    if (!woNo) return 'N/A';
    const wo = workOrders.find(w => w.workOrderNo === woNo);
    return formatDate(wo?.date || wo?.createdAt);
  };

  // Safe search function that handles undefined values
  const filteredBills = bills.filter((bill) => {
    const woNo = getWorkOrderNo(bill.workOrder);
    const vendorName = getWorkOrderVendor(woNo);
    const billDate = formatDate(bill.createdAt);
    const billNo = bill.billNo || '';
    const netPayment = bill.netPayment || 0;

    const searchLower = search.toLowerCase();
    
    return (
      billNo.toLowerCase().includes(searchLower) ||
      woNo.toLowerCase().includes(searchLower) ||
      vendorName.toLowerCase().includes(searchLower) ||
      String(netPayment).includes(search) ||
      billDate.toLowerCase().includes(searchLower)
    );
  });

  const totalPages = Math.ceil(filteredBills.length / itemsPerPage);
  const paginatedBills = filteredBills.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalBills = bills.length;
  const uniqueWorkOrders = new Set(bills.map(b => getWorkOrderNo(b.workOrder)).filter(Boolean)).size;
  const uniqueVendors = new Set(bills.map(b => getWorkOrderVendor(getWorkOrderNo(b.workOrder))).filter(Boolean)).size;
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const thisMonthBills = bills.filter(b => {
    if (!b.createdAt) return false;
    const billDate = new Date(b.createdAt);
    return billDate.getMonth() === currentMonth && billDate.getFullYear() === currentYear;
  }).length;

  const addDeduction = () => {
    setDeductions([...deductions, { type: 'penalty', amount: 0, remark: '' }]);
  };

  const updateDeduction = (index, field, value) => {
    const newDeductions = [...deductions];
    newDeductions[index][field] = value;
    setDeductions(newDeductions);
  };

  const removeDeduction = (index) => {
    setDeductions(deductions.filter((_, i) => i !== index));
  };

  const addViewDeduction = () => {
    setViewDeductions([...viewDeductions, { type: 'penalty', amount: 0, remark: '' }]);
  };

  const updateViewDeduction = (index, field, value) => {
    const newDeductions = [...viewDeductions];
    newDeductions[index][field] = value;
    setViewDeductions(newDeductions);
  };

  const removeViewDeduction = (index) => {
    setViewDeductions(viewDeductions.filter((_, i) => i !== index));
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
              <h1 className="text-2xl font-bold text-gray-900">Bills</h1>
              <p className="text-gray-600 mt-1">Manage and track all bills</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search bills..."
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
                  setDeductions([]);
                }}
              >
                <Plus size={18} />
                Create Bill
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bills</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{totalBills}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <FileText className="text-blue-600" size={20} />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Vendors</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{uniqueVendors}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <User className="text-green-600" size={20} />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Work Orders</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{uniqueWorkOrders}</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <FileText className="text-yellow-600" size={20} />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{thisMonthBills}</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <FileText className="text-purple-600" size={20} />
                </div>
              </div>
            </div>
          </div>

          {/* Bill Cards */}
          <div className="grid grid-cols-1 gap-5">
            {loading ? (
              <motion.div
                className="bg-white rounded-xl border border-gray-200 p-6 text-center text-gray-500"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                Loading bills...
              </motion.div>
            ) : error && bills.length === 0 ? (
              <motion.div
                className="bg-white rounded-xl border border-gray-200 p-6 text-center text-red-500"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {error}
              </motion.div>
            ) : filteredBills.length === 0 ? (
              <motion.div
                className="bg-white rounded-xl border border-gray-200 p-6 text-center text-gray-500"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                No bills found.
              </motion.div>
            ) : (
              paginatedBills.map((bill) => {
                const woNo = getWorkOrderNo(bill.workOrder);
                const vendorName = getWorkOrderVendor(woNo);
                return (
                  <motion.div
                    key={bill._id}
                    className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all duration-200"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex flex-col md:flex-row justify-between items-center">
                      {/* Core Details */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
                        {/* Bill No */}
                        <div className="flex flex-col items-center text-center p-3 bg-blue-50 rounded-lg">
                          <p className="text-xs font-medium text-gray-500 mb-2">Bill No</p>
                          <p className="font-semibold text-gray-900 text-sm">{bill.billNo || 'N/A'}</p>
                        </div>
                        
                        {/* Work Order No */}
                        <div className="flex flex-col items-center text-center p-3 bg-green-50 rounded-lg">
                          <p className="text-xs font-medium text-gray-500 mb-2">Work Order No</p>
                          <p className="font-semibold text-gray-900 text-sm">{woNo}</p>
                        </div>
                        
                        {/* Vendor */}
                        <div className="flex flex-col items-center text-center p-3 bg-purple-50 rounded-lg">
                          <p className="text-xs font-medium text-gray-500 mb-2">Vendor</p>
                          <p className="font-semibold text-gray-900 text-sm">{vendorName}</p>
                        </div>
                        
                        {/* Net Payment */}
                        <div className="flex flex-col items-center text-center p-3 bg-amber-50 rounded-lg">
                          <p className="text-xs font-medium text-gray-500 mb-2">Net Payment</p>
                          <p className="font-semibold text-gray-900 text-sm">₹{formatAmount(bill.netPayment)}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 mt-4 md:mt-0">
                        <button 
                          className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition" 
                          title="View"
                          onClick={() => {
                            setSelectedBill(bill);
                            setViewForm({ ...bill });
                            setViewDeductions(bill.items || []);
                            setIsViewOpen(true);
                            setIsEditMode(false);
                          }}
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 transition" 
                          title="Delete"
                          onClick={() => handleDelete(bill._id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4 text-gray-600">
              <div className="text-sm">
                Showing {paginatedBills.length} of {filteredBills.length} bills
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
          )}
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
              <h2 className="text-xl font-bold text-gray-900">Create Bill</h2>
              <button onClick={() => setIsCreateOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Work Order *</label>
                <select
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Advance Payment</label>
                <select
                  value={createForm.advancePayment}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, advancePayment: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                >
                  <option value="">Select Advance Payment</option>
                  {advancePayments.map(ap => (
                    <option key={ap._id} value={ap._id}>{ap.paymentNo}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Remark</label>
                <textarea
                  value={createForm.remark}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, remark: e.target.value }))}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tax Percentage</label>
                <input
                  type="number"
                  value={createForm.taxPercentage}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, taxPercentage: parseFloat(e.target.value) || 0 }))}
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Retention Amount</label>
                <input
                  type="number"
                  value={createForm.retantionAmount}  // Matches schema: retantionAmount
                  onChange={(e) => setCreateForm(prev => ({ ...prev, retantionAmount: parseFloat(e.target.value) || 0 }))}
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Net Payment</label>
                <input
                  type="number"
                  value={createForm.netPayment}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, netPayment: parseFloat(e.target.value) || 0 }))}
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deduction Amount</label>
                <input
                  type="text"
                  value={createForm.deductionAmount}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, deductionAmount: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deductions</label>
                {deductions.map((ded, index) => (
                  <div key={index} className="border border-gray-300 rounded-lg p-3 mb-2">
                    <select
                      value={ded.type}
                      onChange={(e) => updateDeduction(index, 'type', e.target.value)}
                      className="w-full mb-2 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="penalty">Penalty</option>
                      <option value="delay">Delay</option>
                    </select>
                    <input
                      type="number"
                      placeholder="Amount"
                      value={ded.amount}
                      onChange={(e) => updateDeduction(index, 'amount', parseFloat(e.target.value) || 0)}
                      className="w-full mb-2 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Remark"
                      value={ded.remark}
                      onChange={(e) => updateDeduction(index, 'remark', e.target.value)}
                      className="w-full mb-2 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeDeduction(index)}
                      className="text-red-600 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addDeduction}
                  className="text-blue-600 text-sm underline"
                >
                  Add Deduction
                </button>
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
      {isViewOpen && selectedBill && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[95vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {isEditMode ? 'Edit' : 'View'} Bill
              </h2>
              <button onClick={() => setIsViewOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bill No</label>
                <p className="text-gray-900">{selectedBill.billNo || 'N/A'}</p>
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
                  <p className="text-gray-900">{getWorkOrderNo(selectedBill.workOrder)}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Advance Payment</label>
                {isEditMode ? (
                  <select
                    value={viewForm.advancePayment || ''}
                    onChange={(e) => setViewForm(prev => ({ ...prev, advancePayment: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  >
                    <option value="">Select Advance Payment</option>
                    {advancePayments.map(ap => (
                      <option key={ap._id} value={ap._id}>{ap.paymentNo}</option>
                    ))}
                  </select>
                ) : (
                  <p className="text-gray-900">{selectedBill.advancePayment ? selectedBill.advancePayment.paymentNo : 'N/A'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Remark</label>
                {isEditMode ? (
                  <textarea
                    value={viewForm.remark || ''}
                    onChange={(e) => setViewForm(prev => ({ ...prev, remark: e.target.value }))}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                ) : (
                  <p className="text-gray-900">{selectedBill.remark || 'N/A'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tax Percentage</label>
                {isEditMode ? (
                  <input
                    type="number"
                    value={viewForm.taxPercentage || ''}
                    onChange={(e) => setViewForm(prev => ({ ...prev, taxPercentage: parseFloat(e.target.value) || 0 }))}
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                ) : (
                  <p className="text-gray-900">{selectedBill.taxPercentage || 0}%</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Retention Amount</label>
                {isEditMode ? (
                  <input
                    type="number"
                    value={viewForm.retantionAmount || ''}  // Matches schema: retantionAmount
                    onChange={(e) => setViewForm(prev => ({ ...prev, retantionAmount: parseFloat(e.target.value) || 0 }))}
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                ) : (
                  <p className="text-gray-900">₹{formatAmount(selectedBill.retantionAmount)}</p>  // Matches schema: retantionAmount
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Net Payment</label>
                {isEditMode ? (
                  <input
                    type="number"
                    value={viewForm.netPayment || ''}
                    onChange={(e) => setViewForm(prev => ({ ...prev, netPayment: parseFloat(e.target.value) || 0 }))}
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                ) : (
                  <p className="text-gray-900">₹{formatAmount(selectedBill.netPayment)}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deduction Amount</label>
                {isEditMode ? (
                  <input
                    type="text"
                    value={viewForm.deductionAmount || ''}
                    onChange={(e) => setViewForm(prev => ({ ...prev, deductionAmount: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                ) : (
                  <p className="text-gray-900">{selectedBill.deductionAmount || 'N/A'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deductions</label>
                {viewDeductions.map((ded, index) => (
                  <div key={index} className="border border-gray-300 rounded-lg p-3 mb-2">
                    {isEditMode ? (
                      <>
                        <select
                          value={ded.type}
                          onChange={(e) => updateViewDeduction(index, 'type', e.target.value)}
                          className="w-full mb-2 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="penalty">Penalty</option>
                          <option value="delay">Delay</option>
                        </select>
                        <input
                          type="number"
                          placeholder="Amount"
                          value={ded.amount}
                          onChange={(e) => updateViewDeduction(index, 'amount', parseFloat(e.target.value) || 0)}
                          className="w-full mb-2 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="Remark"
                          value={ded.remark}
                          onChange={(e) => updateViewDeduction(index, 'remark', e.target.value)}
                          className="w-full mb-2 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => removeViewDeduction(index)}
                          className="text-red-600 text-sm"
                        >
                          Remove
                        </button>
                      </>
                    ) : (
                      <div>
                        <p><strong>Type:</strong> {ded.type}</p>
                        <p><strong>Amount:</strong> ₹{ded.amount}</p>
                        <p><strong>Remark:</strong> {ded.remark || 'N/A'}</p>
                      </div>
                    )}
                  </div>
                ))}
                {isEditMode && (
                  <button
                    type="button"
                    onClick={addViewDeduction}
                    className="text-blue-600 text-sm underline"
                  >
                    Add Deduction
                  </button>
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