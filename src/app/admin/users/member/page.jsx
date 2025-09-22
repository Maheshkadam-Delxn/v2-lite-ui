'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Grid3X3, List, Filter, ChevronRight,
  User, Users, Settings, Plus, Pencil, Clock, Briefcase, X
} from 'lucide-react';

const MembersPage = () => {
  const [activeTab, setActiveTab] = useState('All Members');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [members, setMembers] = useState([
    {
      id: 1,
      name: 'Alan David',
      email: 'vipap4378@acedby.com',
      role: 'Project Admin',
      lastLogin: '10 Sep 2025 6:28 PM',
      projects: [
        'ConstructHub',
        'Granite Horizon',
        'Green City Apartments',
        'Skyline Corporate Tower',
        'SkyTower Commercial Hub',
      ],
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop',
      icon: '👤',
      statusColor: 'bg-green-100 text-green-700 border-green-200'
    },
    {
      id: 2,
      name: 'Mukesh Sinha',
      email: 'vikashoffice38@gmail.com',
      role: 'Consultant',
      lastLogin: '29 Jul 2025 12:32 PM',
      projects: ['Granite Horizon', 'Green City Apartments', 'Skyline Corporate Tower', 'SkyTower Commercial Hub'],
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=40&h=40&fit=crop',
      icon: '🧑‍💼',
      statusColor: 'bg-green-100 text-green-700 border-green-200'
    },
    {
      id: 3,
      name: 'Vicky',
      email: 'viyjp3112@acedby.com',
      role: 'Contractor',
      lastLogin: 'Not logged in yet',
      projects: ['Granite Horizon', 'Green City Apartments', 'Skyline Corporate Tower', 'SkyTower Commercial Hub'],
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=40&h=40&fit=crop',
      icon: '👷',
      statusColor: 'bg-green-100 text-gray-700 border-green-200'
    },
  ]);

  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: 'Project Admin',
    projects: [],
    status: 'Active'
  });

  const memberStats = [
    { label: 'Total Members', value: members.length, change: '+2', icon: Users },
    { label: 'Active Members', value: members.filter(m => m.status === 'Active').length, change: '+1', icon: User },
    { label: 'Admins', value: members.filter(m => m.role === 'Project Admin').length, change: '+0', icon: Settings },
    { label: 'Contractors', value: members.filter(m => m.role === 'Contractor').length, change: '+1', icon: Users }
  ];

  const tabs = [
    { name: 'All Members', count: members.length },
    { name: 'Admins', count: members.filter(m => m.role === 'Project Admin').length },
    { name: 'Consultants', count: members.filter(m => m.role === 'Consultant').length },
    { name: 'Contractors', count: members.filter(m => m.role === 'Contractor').length }
  ];

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === 'All Members') return matchesSearch;
    return matchesSearch && member.role === activeTab;
  });

  const getRoleColor = (role) => {
    switch (role) {
      case 'Project Admin':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Consultant':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Contractor':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleStatClick = (label) => {
    if (label === 'Total Members') setActiveTab('All Members');
    if (label === 'Admins') setActiveTab('Admins');
    if (label === 'Contractors') setActiveTab('Contractors');
  };

  const toggleProjects = (memberId) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [memberId]: !prev[memberId]
    }));
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    const newId = members.length + 1;
    setMembers([...members, {
      ...newMember,
      id: newId,
      lastLogin: 'Not logged in yet',
      avatar: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=40&h=40&fit=crop',
      icon: newMember.role === 'Project Admin' ? '👤' : newMember.role === 'Consultant' ? '🧑‍💼' : '👷',
      statusColor: 'bg-green-100 text-green-700 border-green-200'
    }]);
    setNewMember({ name: '', email: '', role: 'Project Admin', projects: [], status: 'Active' });
    setIsAddModalOpen(false);
  };

  const handleEditMember = (e) => {
    e.preventDefault();
    setMembers(members.map(m => m.id === selectedMember.id ? { ...selectedMember } : m));
    setIsEditModalOpen(false);
    setSelectedMember(null);
  };

  const openEditModal = (member) => {
    setSelectedMember({ ...member });
    setIsEditModalOpen(true);
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Members Overview</h1>
              <p className="text-gray-600">Manage and track all your team members</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-64">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search members..."
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
                  <span>Role</span>
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
                onClick={() => {
                  setNewMember({ name: '', email: '', role: 'Project Admin', projects: [], status: 'Active' });
                  setIsAddModalOpen(true);
                }}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Add Member</span>
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
          {memberStats.map((stat, i) => {
            const Icon = stat.icon;

            const getIconColor = (label) => {
              switch (label) {
                case 'Total Members':
                  return 'text-blue-600';
                case 'Active Members':
                  return 'text-green-600';
                case 'Admins':
                  return 'text-purple-600';
                case 'Contractors':
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

        {/* Add Member Modal */}
        <AnimatePresence>
          {isAddModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setIsAddModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Add New Member</h2>
                  <button
                    onClick={() => setIsAddModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-black mb-1">Name</label>
                    <input
                      type="text"
                      value={newMember.name}
                      onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                      placeholder="Enter name"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 text-black"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-black mb-1">Email</label>
                    <input
                      type="email"
                      value={newMember.email}
                      onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                      placeholder="Enter email"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 text-black"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-black mb-1">Role</label>
                    <select
                      value={newMember.role}
                      onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                    >
                      <option value="Project Admin">Project Admin</option>
                      <option value="Consultant">Consultant</option>
                      <option value="Contractor">Contractor</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-black mb-1">Projects (comma-separated)</label>
                    <input
                      type="text"
                      value={newMember.projects.join(', ')}
                      onChange={(e) => setNewMember({ ...newMember, projects: e.target.value.split(',').map(p => p.trim()).filter(p => p) })}
                      placeholder="Enter projects, e.g., Project A, Project B"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 text-black"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-black mb-1">Status</label>
                    <select
                      value={newMember.status}
                      onChange={(e) => setNewMember({ ...newMember, status: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => setIsAddModalOpen(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAddMember}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700"
                    >
                      Add Member
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit Member Modal */}
        <AnimatePresence>
          {isEditModalOpen && selectedMember && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setIsEditModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Edit Member</h2>
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-black mb-1">Name</label>
                    <input
                      type="text"
                      value={selectedMember.name}
                      onChange={(e) => setSelectedMember({ ...selectedMember, name: e.target.value })}
                      placeholder="Enter name"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 text-black"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-black mb-1">Email</label>
                    <input
                      type="email"
                      value={selectedMember.email}
                      onChange={(e) => setSelectedMember({ ...selectedMember, email: e.target.value })}
                      placeholder="Enter email"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 text-black"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-black mb-1">Role</label>
                    <select
                      value={selectedMember.role}
                      onChange={(e) => setSelectedMember({ ...selectedMember, role: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                    >
                      <option value="Project Admin">Project Admin</option>
                      <option value="Consultant">Consultant</option>
                      <option value="Contractor">Contractor</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-black mb-1">Projects (comma-separated)</label>
                    <input
                      type="text"
                      value={selectedMember.projects.join(', ')}
                      onChange={(e) => setSelectedMember({ ...selectedMember, projects: e.target.value.split(',').map(p => p.trim()).filter(p => p) })}
                      placeholder="Enter projects, e.g., Project A, Project B"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 text-black"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-black mb-1">Status</label>
                    <select
                      value={selectedMember.status}
                      onChange={(e) => setSelectedMember({ ...selectedMember, status: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => setIsEditModalOpen(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleEditMember}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700"
                    >
                      Save Changes
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Member Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8' : 'space-y-6'}
        >
          {filteredMembers.map((member) => (
            <motion.div
              key={member.id}
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
                      {member.icon}
                    </div>
                    <div className="max-w-[250px]">
                      <h3 className="font-bold text-xl text-white truncate">{member.name}</h3>
                      <p className="text-blue-100 text-sm truncate">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-2 px-1 py-0.5 rounded-full text-xs font-medium border ${member.statusColor}`}>
                      {member.status}
                    </span>
                    <span className={`inline-flex items-center gap-2 px-1 py-0.5 rounded-full text-xs font-medium border ${getRoleColor(member.role)}`}>
                      {member.role}
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
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Role</p>
                      <p className="text-gray-900 text-sm font-semibold">{member.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center p-2">
                      <Briefcase className="w-5 h-5 text-gray-700 font-bold" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Projects</p>
                      <p className="text-gray-900 text-sm font-semibold">{member.projects.length}</p>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">Assigned Projects</p>
                  <div className="flex flex-wrap gap-2">
                    {(expandedProjects[member.id] ? member.projects : member.projects.slice(0, 3)).map((p, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-700 font-medium"
                      >
                        {p}
                      </span>
                    ))}
                    {member.projects.length > 3 && (
                      <button
                        onClick={() => toggleProjects(member.id)}
                        className="text-xs px-2 py-1 rounded-md bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 transition"
                      >
                        {expandedProjects[member.id] ? '...less' : '...more'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
              {/* Card Bottom - Grey Mask */}
              <div className="bg-gray-100 px-6 py-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tl from-white/10 to-transparent"></div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full -translate-y-12 translate-x-12"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/20 rounded-full translate-y-16 -translate-x-16"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-700" />
                    <div>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Last Login</p>
                      <p className="text-gray-600 text-sm font-semibold">{member.lastLogin}</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openEditModal(member)}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
                  >
                    Edit <Pencil className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MembersPage;