'use client';

import { useState, useEffect } from "react";
import MyProjectHeader from "@/components/my-project/header";
import { Search, Plus, ChevronLeft, ChevronRight, HelpCircle, Eye, Trash2, AlertCircle, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function BillPaymentPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [bills, setBills] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [formData, setFormData] = useState({
    billId: "",
    vendor: "",
    amount: "",
    paymentDate: new Date().toISOString().split('T')[0],
    mode: "Bank Transfer",
    referenceNo: "",
    remarks: "",
    projectId: "",
  });
  const itemsPerPage = 5;

  // Fetch bills
  const fetchBills = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/payment/bill');
      if (!response.ok) {
        throw new Error('Failed to fetch bills');
      }
      const { data } = await response.json();
      setBills(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete bill
  const handleDelete = async (billId) => {
    if (!confirm('Are you sure you want to delete this bill payment?')) {
      return;
    }
    try {
      const response = await fetch(`/api/payment/bill/${billId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete bill payment');
      }
      setBills(bills.filter((bill) => bill._id !== billId));
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
    fetchBills();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.billId || !formData.vendor || !formData.amount) {
      alert('Please fill required fields');
      return;
    }
    try {
      const response = await fetch('/api/payment/bill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          billId: formData.billId,
          vendor: formData.vendor,
          amount: parseFloat(formData.amount),
          paymentDate: new Date(formData.paymentDate),
          mode: formData.mode,
          referenceNo: formData.referenceNo,
          remarks: formData.remarks,
          projectId: formData.projectId || null,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to create bill payment');
      }
      const { data: newBill } = await response.json();
      setBills([newBill, ...bills]);
      setShowCreateModal(false);
      setFormData({
        billId: "",
        vendor: "",
        amount: "",
        paymentDate: new Date().toISOString().split('T')[0],
        mode: "Bank Transfer",
        referenceNo: "",
        remarks: "",
        projectId: "",
      });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleView = (bill) => {
    setSelectedBill(bill);
    setShowViewModal(true);
  };

  const filteredBills = bills.filter((bill) =>
    bill.billId?.toLowerCase().includes(search.toLowerCase()) ||
    bill.paymentDate?.toLowerCase().includes(search.toLowerCase()) ||
    bill.vendor?.name?.toLowerCase().includes(search.toLowerCase()) ||
    bill.amount?.toString().toLowerCase().includes(search.toLowerCase()) ||
    bill.mode?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBills.length / itemsPerPage);
  const paginatedBills = filteredBills.slice(
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
            <button onClick={() => { fetchVendors(); fetchProjects(); fetchBills(); }} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Bill Payment List</h1>
              <p className="text-sm text-gray-600 mt-1">Manage and track your bill payments</p>
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
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
              >
                <Plus size={16} />
                Create Bill Payment
              </button>
            </div>
          </div>

          {/* Bill Payment Cards */}
          {paginatedBills.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No bill payments found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {paginatedBills.map((bill) => (
                <motion.div
                  key={bill.billId}
                  className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all duration-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center justify-between gap-4">
                    {/* Core Details - Adjusted to schema: billId, paymentDate, vendor.name, mode, amount */}
                    <div className="flex-1 grid grid-cols-5 gap-2 text-sm">
                      <div className="flex flex-col">
                        <p className="text-gray-500 text-xs font-medium">Bill ID</p>
                        <p className="font-semibold text-gray-900">{bill.billId}</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-gray-500 text-xs font-medium">Payment Date</p>
                        <p className="font-semibold text-gray-900">{formatDate(bill.paymentDate)}</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-gray-500 text-xs font-medium">Vendor</p>
                        <p className="font-semibold text-gray-900 truncate">{bill.vendor?.name || 'N/A'}</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-gray-500 text-xs font-medium">Mode</p>
                        <p className="font-semibold text-gray-900">{bill.mode}</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-gray-500 text-xs font-medium">Amount</p>
                        <p className="font-semibold text-gray-900">{formatAmount(bill.amount)}</p>
                      </div>
                    </div>

                    {/* Actions - Only View and Delete */}
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleView(bill)}
                        className="p-1.5 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-600 transition" 
                        title="View"
                      >
                        <Eye size={14} />
                      </button>
                      <button 
                        onClick={() => handleDelete(bill._id)}
                        className="p-1.5 rounded-md bg-red-50 hover:bg-red-100 text-red-600 transition" 
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 text-sm text-gray-600">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronLeft size={16} />
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Next
              <ChevronRight size={16} />
            </button>
            <button className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <HelpCircle size={16} />
              Need Help?
            </button>
          </div>
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <motion.div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh]"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.15 }}
          >
            <h2 className="text-xl font-bold mb-4">Create Bill Payment</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bill ID *</label>
                  <input
                    type="text"
                    required
                    value={formData.billId}
                    onChange={(e) => setFormData({ ...formData, billId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vendor *</label>
                  <select
                    required
                    value={formData.vendor}
                    onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project (Optional)</label>
                  <select
                    value={formData.projectId}
                    onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                  >
                    <option value="">Select Project</option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
                  <input
                    type="date"
                    value={formData.paymentDate}
                    onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mode *</label>
                  <select
                    required
                    value={formData.mode}
                    onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                  >
                    <option value="Cash">Cash</option>
                    <option value="Cheque">Cheque</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="UPI">UPI</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reference No</label>
                <input
                  type="text"
                  value={formData.referenceNo}
                  onChange={(e) => setFormData({ ...formData, referenceNo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                <textarea
                  value={formData.remarks}
                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* View Modal */}
      {showViewModal && selectedBill && (
        <motion.div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.15 }}
          >
            <h2 className="text-xl font-bold mb-4">View Bill Payment</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bill ID</label>
                <p className="text-gray-900">{selectedBill.billId}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vendor</label>
                <p className="text-gray-900">{selectedBill.vendor?.name || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <p className="text-gray-900">{formatAmount(selectedBill.amount)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
                <p className="text-gray-900">{formatDate(selectedBill.paymentDate)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mode</label>
                <p className="text-gray-900">{selectedBill.mode}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
                <p className="text-gray-900">{selectedBill.projectId?.name || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reference No</label>
                <p className="text-gray-900">{selectedBill.referenceNo || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                <p className="text-gray-900">{selectedBill.remarks || 'N/A'}</p>
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowViewModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
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