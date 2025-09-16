'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Grid3X3, List, Filter, ChevronRight,
  User, Users, Settings, Plus, Pencil, X
} from 'lucide-react';

const VendorPage = () => {
  const [activeTab, setActiveTab] = useState('All Vendors');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [expandedDetails, setExpandedDetails] = useState({});
  const [vendors, setVendors] = useState([
    {
      id: 1,
      name: 'ABC Constructions',
      email: 'abc@constructions.com',
      type: 'General Contractor',
      code: 'VEND-0001',
      taxNo: '8855',
      gstin: '526FDF555D',
      address: '123 Builder Lane, Mumbai, MH',
      icon: '🏗️',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-700 border-green-200'
    },
    {
      id: 2,
      name: 'XYZ Suppliers',
      email: 'xyz@suppliers.in',
      type: 'Subcontractor',
      code: 'VEND-0002',
      taxNo: '455',
      gstin: '4554DFG555',
      address: '45 Supply Road, Bengaluru, KA',
      icon: '🚚',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-700 border-green-200'
    },
    {
      id: 3,
      name: 'Reliable Steel Traders',
      email: 'sales@reliablesteel.co.in',
      type: 'General Contractor',
      code: 'VEND-0003',
      taxNo: 'AABC1234E',
      gstin: '27AABC1234E1Z5',
      address: 'Plot No. 102, MIDC Industrial Area, Taloja, Navi Mumbai, Maharashtra - 410208',
      icon: '🏭',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-700 border-green-200'
    },
    {
      id: 4,
      name: 'Modern Electricals & Co.',
      email: 'contact@modernel.com',
      type: 'Subcontractor',
      code: 'VEND-0004',
      taxNo: 'ABCFM5678',
      gstin: '27ABCFM5678G12Z',
      address: 'Shop 45, Vashi Plaza, Sector 17, Vashi, Navi Mumbai, Maharashtra - 400703',
      icon: '⚡️',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-700 border-green-200'
    },
    {
      id: 5,
      name: 'Shakti Constructions Pvt Ltd',
      email: 'info@shakti.com',
      type: 'Electrical Contractor',
      code: 'VEND-0005',
      taxNo: 'TAX1001',
      gstin: 'GSTIN001AAA',
      address: 'Pune, Maharashtra',
      icon: '🏗️',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-700 border-green-200'
    },
    {
      id: 6,
      name: 'Bright Electricals',
      email: 'sales@brightel.com',
      type: 'Plumbing Contractor',
      code: 'VEND-0006',
      taxNo: 'TAX1002',
      gstin: 'GSTIN002BBB',
      address: 'Nashik, Maharashtra',
      icon: '🔧',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-700 border-green-200'
    },
    {
      id: 7,
      name: 'AquaFlow Plumbing Works',
      email: 'contact@aquafl.com',
      type: 'Subcontractor',
      code: 'VEND-0007',
      taxNo: 'TAX1003',
      gstin: 'GSTIN003CCC',
      address: 'Shop 45, Vashi Plaza, Sector 17, Vashi, Navi Mumbai, Maharashtra - 410703',
      icon: '🚿',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-700 border-green-200'
    },
    {
      id: 8,
      name: 'CoolAir HVAC Solutions',
      email: 'hvac@coolair.com',
      type: 'Vendor',
      code: 'VEND-0008',
      taxNo: 'TAX1004',
      gstin: 'GSTIN004DDD',
      address: 'Mumbai, Maharashtra',
      icon: '❄️',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-700 border-green-200'
    },
    {
      id: 9,
      name: 'RoofGuard Services',
      email: 'support@roofguard.com',
      type: 'Vendor',
      code: 'VEND-0009',
      taxNo: 'TAX1005',
      gstin: 'GSTIN005EEE',
      address: 'Pune, Maharashtra',
      icon: '🏠',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-700 border-green-200'
    }
  ]);
  const vendorStats = [
    { label: 'Total Vendors', value: '9', change: '+1', icon: Users },
    { label: 'General Contractors', value: '2', change: '+0', icon: User },
    { label: 'Subcontractors', value: '3', change: '+1', icon: Settings },
    { label: 'Other Vendors', value: '4', change: '+0', icon: Users }
  ];
  const [editingVendor, setEditingVendor] = useState(null);

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.type.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === 'All Vendors') return matchesSearch;
    return matchesSearch && (activeTab === 'Other Vendors' ? ['Vendor', 'Electrical Contractor', 'Plumbing Contractor'].includes(vendor.type) : vendor.type === activeTab);
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

  const handleStatClick = (label) => {
    if (label === 'Total Vendors') setActiveTab('All Vendors');
    if (label === 'General Contractors') setActiveTab('General Contractor');
    if (label === 'Subcontractors') setActiveTab('Subcontractor');
    if (label === 'Other Vendors') setActiveTab('Other Vendors');
  };

  const truncateAddress = (address) => {
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

  const saveEdit = () => {
    if (!editingVendor.name || !editingVendor.email || !editingVendor.code || !editingVendor.taxNo || !editingVendor.gstin || !editingVendor.address) {
      alert('All fields are required.');
      return;
    }
    setVendors((prev) =>
      prev.map((vendor) =>
        vendor.id === editingVendor.id ? { ...editingVendor } : vendor
      )
    );
    closeEditModal();
  };

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
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
              >
                <Plus className="w-4 h-4" />
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
              key={vendor.id}
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
                      {vendor.icon}
                    </div>
                    <div className="max-w-[250px]">
                      <h3 className="font-bold text-xl text-white truncate">{vendor.name}</h3>
                      <p className="text-blue-100 text-sm truncate">{vendor.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-2 px-1 py-0.5 rounded-full text-xs font-medium border ${vendor.statusColor}`}>
                      {vendor.status}
                    </span>
                    <span className={`inline-flex items-center gap-2 px-1 py-0.5 rounded-full text-xs font-medium border ${getTypeColor(vendor.type)}`}>
                      {vendor.type}
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
                      <p className="text-gray-900 text-sm font-semibold">{vendor.type}</p>
                    </div>
                  </div>
                </div>
                <div className="mb-2">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">Details</p>
                  <div className="space-y-1.5">
                    <p className="text-sm text-gray-900 font-semibold">
                      <span className="font-bold">Vendor Code:</span> {vendor.code}
                    </p>
                    <p className="text-sm text-gray-900 font-semibold">
                      <span className="font-bold">Tax No.:</span> {vendor.taxNo}
                    </p>
                    <p className="text-sm text-gray-900 font-semibold">
                      <span className="font-bold">GSTIN No.:</span> {vendor.gstin}
                    </p>
                    <p className="text-sm text-gray-900 font-semibold">
                      <span className="font-bold">Address:</span>{' '}
                      {expandedDetails[vendor.id] ? vendor.address : truncateAddress(vendor.address)}
                      {vendor.address.length > 30 && (
                        <button
                          onClick={() => toggleDetails(vendor.id)}
                          className="ml-2 text-xs px-2 py-1 rounded-md bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 transition"
                        >
                          {expandedDetails[vendor.id] ? '...less' : '...more'}
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
                <div className="relative z-10 flex items-center justify-end">
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
                className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full mx-4"
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
                      value={editingVendor.name}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editingVendor.email}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Vendor Type</label>
                    <select
                      name="type"
                      value={editingVendor.type}
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
                      name="code"
                      value={editingVendor.code}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Tax No.</label>
                    <input
                      type="text"
                      name="taxNo"
                      value={editingVendor.taxNo}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">GSTIN No.</label>
                    <input
                      type="text"
                      name="gstin"
                      value={editingVendor.gstin}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Address</label>
                    <textarea
                      name="address"
                      value={editingVendor.address}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-semibold resize-none h-24"
                    />
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
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
                  >
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