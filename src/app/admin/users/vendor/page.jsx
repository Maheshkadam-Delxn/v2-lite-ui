'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Grid3X3, List, Filter, ChevronRight,
  User, Users, Settings, Plus, Pencil, X, Loader2, Upload
} from 'lucide-react';

const VendorPage = () => {
  const [activeTab, setActiveTab] = useState('All Vendors');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [expandedDetails, setExpandedDetails] = useState({});
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingVendor, setEditingVendor] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newVendor, setNewVendor] = useState({
    name: '',
    email: '',
    vendorType: 'General Contractor',
    vendorCode: '',
    taxNo: '',
    gstinNo: '',
    address: '',
    password: '',
    status: 'pending'
  });

  const tabs = [
    { name: 'All Vendors', count: vendors.length },
    { name: 'General Contractor', count: vendors.filter(v => v.vendorType === 'General Contractor').length },
    { name: 'Subcontractor', count: vendors.filter(v => v.vendorType === 'Subcontractor').length },
    { name: 'Other Vendors', count: vendors.filter(v => !['General Contractor', 'Subcontractor'].includes(v.vendorType)).length }
  ];

  const vendorStats = [
    { label: 'Total Vendors', value: vendors.length.toString(), change: '+0', icon: Users },
    { label: 'General Contractors', value: vendors.filter(v => v.vendorType === 'General Contractor').length.toString(), change: '+0', icon: User },
    { label: 'Subcontractors', value: vendors.filter(v => v.vendorType === 'Subcontractor').length.toString(), change: '+0', icon: Settings },
    { label: 'Other Vendors', value: vendors.filter(v => !['General Contractor', 'Subcontractor'].includes(v.vendorType)).length.toString(), change: '+0', icon: Users }
  ];
  // Fetch vendors from API
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

  useEffect(() => {
    fetchVendors();
  }, []);

  // Create new vendor
  const createVendor = async (vendorData) => {
    try {
      setIsSubmitting(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_PATH}/api/vendor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vendorData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create vendor: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        await fetchVendors(); // Refresh the list
        return result.data;
      } else {
        throw new Error(result.error || 'Failed to create vendor');
      }
    } catch (err) {
      console.error('Error creating vendor:', err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update vendor
  const updateVendor = async (vendorId, updateData) => {
    try {
      setIsSubmitting(true);
      console.log('Updating vendor with data:', updateData); // Debug
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_PATH}/api/vendor/${vendorId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to update vendor: ${response.status} - ${errorData.error || 'Unknown error'}`);
      }

      const result = await response.json();
      console.log('Update response:', result); // Debug

      if (result.message === 'Vendor updated successfully') {
        await fetchVendors(); // Refresh the list
        return result.vendor;
      } else {
        throw new Error(result.error || 'Failed to update vendor');
      }
    } catch (err) {
      console.error('Error updating vendor:', err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Upload document
  const uploadDocument = async (vendorId, file) => {
    try {
      // Validate file size (4.5 MB = 4.5 * 1024 * 1024 bytes)
      const maxSize = 4.5 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new Error('File size exceeds 4.5 MB limit');
      }

      const formData = new FormData();
      formData.append('file', file);

      // Upload to Cloudinary via /api/upload
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(`Failed to upload document to Cloudinary: ${uploadResponse.status} - ${errorData.error || 'Unknown error'}`);
      }

      const uploadResult = await uploadResponse.json();

      console.log("Upload Doc page Vender : ",uploadResult);
      
      if (!uploadResult.url) {
        throw new Error('No URL returned from Cloudinary');
      }

      // Update vendor's documents array with the Cloudinary URL
      const updateResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_PATH}/api/auth/user/${vendorId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documents: uploadResult.url // Append the new URL
        }),
      });

      if (!updateResponse.ok) {
        const errorData = await updateResponse.json();
        throw new Error(`Failed to update vendor documents: ${updateResponse.status} - ${errorData.error || 'Unknown error'}`);
      }

      const updateResult = await updateResponse.json();

      console.log("from Page Vender :- ",updateResult);
      
      if (updateResult.message === 'User updated successfully') {
        await fetchVendors(); // Refresh the list
        return updateResult.user;
      } else {
        throw new Error(updateResult.error || 'Failed to update vendor documents');
      }
    } catch (err) {
      console.error('Error uploading document:', err);
      throw err;
    }
  };

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.vendorType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.vendorCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.taxNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.gstinNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.address?.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === 'All Vendors') return matchesSearch;
    if (activeTab === 'Other Vendors') {
      return matchesSearch && !['General Contractor', 'Subcontractor'].includes(vendor.vendorType);
    }
    return matchesSearch && vendor.vendorType === activeTab;
  });

  const getTypeColor = (type) => {
    switch (type) {
      case 'General Contractor':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Subcontractor':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Electrical Contractor':
      case 'Plumbing Contractor':
      case 'Vendor':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
      case 'Active':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleStatClick = (label) => {
    if (label === 'Total Vendors') setActiveTab('All Vendors');
    if (label === 'General Contractors') setActiveTab('General Contractor');
    if (label === 'Subcontractors') setActiveTab('Subcontractor');
    if (label === 'Other Vendors') setActiveTab('Other Vendors');
  };

  const truncateAddress = (address) => {
    if (!address) return '';
    return address.length > 30 ? `${address.slice(0, 30)}...` : address;
  };

  const toggleDetails = (vendorId) => {
    setExpandedDetails((prev) => ({
      ...prev,
      [vendorId]: !prev[vendorId]
    }));
  };

  const openEditModal = (vendor) => {
    setEditingVendor({ ...vendor });
  };

  const closeEditModal = () => {
    setEditingVendor(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingVendor((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async () => {
    if (
      !editingVendor.name ||
      !editingVendor.email ||
      !editingVendor.vendorCode ||
      !editingVendor.taxNo ||
      !editingVendor.gstinNo ||
      !editingVendor.address
    ) {
      alert('All required fields must be filled.');
      return;
    }

    try {
      await updateVendor(editingVendor._id, {
        name: editingVendor.name,
        email: editingVendor.email,
        vendorType: editingVendor.vendorType,
        vendorCode: editingVendor.vendorCode,
        taxNo: editingVendor.taxNo,
        gstinNo: editingVendor.gstinNo,
        address: editingVendor.address,
        status: editingVendor.status
      });
      closeEditModal();
      alert('Vendor updated successfully!');
    } catch (err) {
      alert(`Error updating vendor: ${err.message}`);
    }
  };

  // Add Vendor Modal Functions
  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
    setNewVendor({
      name: '',
      email: '',
      vendorType: 'General Contractor',
      vendorCode: '',
      taxNo: '',
      gstinNo: '',
      address: '',
      password: '',
      status: 'pending'
    });
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewVendor((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddVendor = async () => {
    if (
      !newVendor.name ||
      !newVendor.email ||
      !newVendor.vendorCode ||
      !newVendor.taxNo ||
      !newVendor.gstinNo ||
      !newVendor.address ||
      !newVendor.password
    ) {
      alert('All fields are required.');
      return;
    }

    try {
      await createVendor(newVendor);
      closeAddModal();
      alert('Vendor created successfully!');
    } catch (err) {
      alert(`Error creating vendor: ${err.message}`);
    }
  };

  const handleStatusChange = async (vendorId, newStatus) => {
    try {
      await updateVendor(vendorId, { status: newStatus });
    } catch (err) {
      alert(`Error updating status: ${err.message}`);
    }
  };

  console.log(editingVendor);
  
  const handleFileUpload = async (vendorId, event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      await uploadDocument(vendorId, file);
      alert('Document uploaded successfully!');
    } catch (err) {
      alert(`Error uploading document: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <span className="text-xl font-semibold text-gray-700">Loading vendors...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl font-semibold mb-4">Error loading vendors</div>
          <div className="text-gray-700 mb-4">{error}</div>
          <button
            onClick={fetchVendors}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Vendors Overview</h1>
              <p className="text-gray-600">Manage and track all your vendors</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-64">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-6 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 font-medium placeholder:text-gray-400 text-gray-700"
                />
              </div>
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
                >
                  <Filter className="w-4 h-4" />
                  <span>Type</span>
                </motion.button>
                {filterOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-20">
                    {tabs.map((tab) => (
                      <button
                        key={tab.name}
                        onClick={() => { setActiveTab(tab.name); setFilterOpen(false); }}
                        className={`flex items-center justify-between w-full px-4 py-2 text-sm ${activeTab === tab.name ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                      >
                        {tab.name}
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{tab.count}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openAddModal}
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                <span>Add Vendor</span>
              </motion.button>
              <div className="flex rounded-xl border-2 border-gray-300 p-1 bg-gray-100">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <List className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {vendorStats.map((stat, i) => {
            const Icon = stat.icon;

            const getIconColor = (label) => {
              switch (label) {
                case 'Total Vendors':
                  return 'text-blue-600';
                case 'General Contractors':
                  return 'text-green-600';
                case 'Subcontractors':
                  return 'text-purple-600';
                case 'Other Vendors':
                  return 'text-orange-600';
                default:
                  return 'text-gray-700';
              }
            };

            return (
              <motion.div
                whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                transition={{ type: 'spring', stiffness: 300 }}
                key={i}
                onClick={() => handleStatClick(stat.label)}
                className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center">
                    <Icon className={`w-7 h-7 ${getIconColor(stat.label)}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{stat.value}</h3>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                      {stat.label}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-medium text-green-600">{stat.change}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Vendor Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8' : 'space-y-6'}
        >
          {filteredVendors.map((vendor) => (
            <motion.div
              key={vendor._id}
              whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
              transition={{ type: 'spring', stiffness: 300 }}
              className={`bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden ${viewMode === 'list' ? 'flex flex-col md:flex-row md:items-stretch gap-6' : 'flex flex-col'}`}
            >
              {/* Card Top - Blue Mask */}
              <div className="bg-blue-600 px-6 py-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/20 rounded-full translate-y-12 -translate-x-12"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl">
                      {vendor.icon || '🏢'}
                    </div>
                    <div className="max-w-[250px]">
                      <h3 className="font-bold text-xl text-white truncate">{vendor.name}</h3>
                      <p className="text-blue-100 text-sm truncate">{vendor.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-2 px-1 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(vendor.status)}`}>
                      {vendor.status}
                    </span>
                    <span className={`inline-flex items-center gap-2 px-1 py-0.5 rounded-full text-xs font-medium border ${getTypeColor(vendor.vendorType)}`}>
                      {vendor.vendorType}
                    </span>
                  </div>
                </div>
              </div>
              {/* Card Middle - Content */}
              <div className={`p-6 flex-1 flex flex-col ${viewMode === 'list' ? 'md:w-2/3' : ''}`}>
                <div className="flex items-center gap-6 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center p-2">
                      <Users className="w-5 h-5 text-gray-700 font-bold" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Type</p>
                      <p className="text-gray-900 text-sm font-semibold">{vendor.vendorType}</p>
                    </div>
                  </div>
                </div>
                <div className="mb-2">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">Details</p>
                  <div className="space-y-1.5">
                    <p className="text-sm text-gray-900 font-semibold">
                      <span className="font-bold">Vendor Code:</span> {vendor.vendorCode}
                    </p>
                    <p className="text-sm text-gray-900 font-semibold">
                      <span className="font-bold">Tax No.:</span> {vendor.taxNo}
                    </p>
                    <p className="text-sm text-gray-900 font-semibold">
                      <span className="font-bold">GSTIN No.:</span> {vendor.gstinNo}
                    </p>
                    <p className="text-sm text-gray-900 font-semibold">
                      <span className="font-bold">Address:</span>{' '}
                      {expandedDetails[vendor._id] ? vendor.address : truncateAddress(vendor.address)}
                      {vendor.address && vendor.address.length > 30 && (
                        <button
                          onClick={() => toggleDetails(vendor._id)}
                          className="ml-2 text-xs px-2 py-1 rounded-md bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 transition"
                        >
                          {expandedDetails[vendor._id] ? '...less' : '...more'}
                        </button>
                      )}
                    </p>
                  </div>
                </div>
                
               
              </div>
              {/* Card Bottom - Grey Mask */}
              <div className="bg-gray-100 px-6 py-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tl from-white/10 to-transparent"></div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full -translate-y-12 translate-x-12"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/20 rounded-full translate-y-16 -translate-x-16"></div>
                <div className="relative z-10 flex items-center justify-between">
                 
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openEditModal(vendor)}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
                  >
                    Edit <Pencil className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Add Vendor Modal */}
        <AnimatePresence>
          {addModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Add New Vendor</h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closeAddModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Vendor Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={newVendor.name}
                      onChange={handleAddChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-semibold"
                      placeholder="Enter vendor name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={newVendor.email}
                      onChange={handleAddChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-semibold"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Password *</label>
                    <input
                      type="password"
                      name="password"
                      value={newVendor.password}
                      onChange={handleAddChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-semibold"
                      placeholder="Enter password (minimum 6 characters)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Vendor Type *</label>
                    <select
                      name="vendorType"
                      value={newVendor.vendorType}
                      onChange={handleAddChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-semibold"
                    >
                      <option value="General Contractor">General Contractor</option>
                      <option value="Subcontractor">Subcontractor</option>
                      <option value="Electrical Contractor">Electrical Contractor</option>
                      <option value="Plumbing Contractor">Plumbing Contractor</option>
                      <option value="Vendor">Vendor</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Vendor Code *</label>
                    <input
                      type="text"
                      name="vendorCode"
                      value={newVendor.vendorCode}
                      onChange={handleAddChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-semibold"
                      placeholder="Enter vendor code"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Tax Number *</label>
                    <input
                      type="text"
                      name="taxNo"
                      value={newVendor.taxNo}
                      onChange={handleAddChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-semibold"
                      placeholder="Enter tax number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">GSTIN Number *</label>
                    <input
                      type="text"
                      name="gstinNo"
                      value={newVendor.gstinNo}
                      onChange={handleAddChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-semibold"
                      placeholder="Enter GSTIN number"
                    />
                  </div>

                   {/* Document Upload */}
                <div className="mt-4">
                  <label className="block text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">
                    Upload Document
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(vendor._id, e)}
                    className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>


                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Address *</label>
                    <textarea
                      name="address"
                      value={newVendor.address}
                      onChange={handleAddChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-semibold resize-none h-24"
                      placeholder="Enter complete address"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Status</label>
                    <select
                      name="status"
                      value={newVendor.status}
                      onChange={handleAddChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-semibold"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closeAddModal}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddVendor}
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center gap-2"
                  >
                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    Add Vendor
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit Modal */}
        <AnimatePresence>
          {editingVendor && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Edit Vendor</h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closeEditModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editingVendor.name || ''}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editingVendor.email || ''}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Vendor Type</label>
                    <select
                      name="vendorType"
                      value={editingVendor.vendorType || ''}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-semibold"
                    >
                      <option value="General Contractor">General Contractor</option>
                      <option value="Subcontractor">Subcontractor</option>
                      <option value="Electrical Contractor">Electrical Contractor</option>
                      <option value="Plumbing Contractor">Plumbing Contractor</option>
                      <option value="Vendor">Vendor</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Vendor Code</label>
                    <input
                      type="text"
                      name="vendorCode"
                      value={editingVendor.vendorCode || ''}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Tax No.</label>
                    <input
                      type="text"
                      name="taxNo"
                      value={editingVendor.taxNo || ''}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">GSTIN No.</label>
                    <input
                      type="text"
                      name="gstinNo"
                      value={editingVendor.gstinNo || ''}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Address</label>
                    <textarea
                      name="address"
                      value={editingVendor.address || ''}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-semibold resize-none h-24"
                    />
                  </div>

                   {/* Document Upload */}
                <div className="mt-4">
                  <label className="block text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">
                    Upload Document
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(editingVendor._id, e)}
                    className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Status</label>
                    <select
                      name="status"
                      value={editingVendor.status || 'pending'}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-semibold"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closeEditModal}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={saveEdit}
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center gap-2"
                  >
                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    Save
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VendorPage;