'use client';

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Eye, 
  Pencil, 
  Plus, 
  Trash2, 
  Filter, 
  Settings,
  Users,
  Shield,
  ChevronDown,
  X,
  User,
  Key,
  Calendar,
  Phone,
  Mail,
  MoreVertical,
  ChevronLeft,
  ChevronRight,Activity,Folder,FileText,AlertCircle,DollarSign,BarChart3,Clipboard,Tag,Type
} from "lucide-react";

const roles = [
  { 
    id: 1,
    name: "Project Admin", 
    key: "PROJECT_ADMIN", 
    status: "Active",
    users: 12,
    permissions: 45,
    description: "Full administrative access to all project features",
    lastModified: "2024-01-15"
  },
  { 
    id: 2,
    name: "Consultant", 
    key: "CONSULTANT", 
    status: "Active",
    users: 8,
    permissions: 25,
    description: "Limited access for consulting activities",
    lastModified: "2024-01-10"
  },
  { 
    id: 3,
    name: "Approver", 
    key: "APPROVER", 
    status: "Active",
    users: 5,
    permissions: 18,
    description: "Can approve and review submissions",
    lastModified: "2024-01-08"
  },
  { 
    id: 4,
    name: "Contractor", 
    key: "CONTRACTOR", 
    status: "Inactive",
    users: 3,
    permissions: 12,
    description: "Basic access for contract workers",
    lastModified: "2024-01-05"
  },
  { 
    id: 5,
    name: "Viewer", 
    key: "VIEWER", 
    status: "Active",
    users: 25,
    permissions: 8,
    description: "Read-only access to project data",
    lastModified: "2024-01-12"
  },
];

const members = [
  {
    id: 1,
    name: "Alan David",
    role: "Project Admin",
    mobile: "+919764585655",
    email: "vbjpa4378@acedby.com"
  },
  {
    id: 2,
    name: "Mukesh Sinha",
    role: "Consultant",
    mobile: "98563212225",
    email: "vfkashoffice38@gmail.com"
  },
  {
    id: 3,
    name: "moteen",
    role: "Consultant",
    mobile: "+98765456787",
    email: "mo3@gmail.com"
  },
  {
    id: 4,
    name: "Sonalika",
    role: "Approver",
    mobile: "69553635353",
    email: "bldsov382@pricegh.com"
  }
];

const tabs = [
  { id: "roles", name: "Role Permission", icon: Shield },
  { id: "users", name: "User Permission", icon: Users },
  { id: "workflow", name: "Approval Workflow", icon: Settings },
  { id: "dashboard", name: "Dashboard Permission", icon: Eye },
];

const statusOptions = ["All", "Active", "Inactive"];

export default function EnhancedPermissionsPage() {
  const [activeTab, setActiveTab] = useState("roles");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [memberSearch, setMemberSearch] = useState("");

  const filteredAndSortedRoles = useMemo(() => {
    let filtered = roles.filter((role) => {
      const matchesSearch = 
        role.name.toLowerCase().includes(search.toLowerCase()) ||
        role.key.toLowerCase().includes(search.toLowerCase()) ||
        role.description.toLowerCase().includes(search.toLowerCase());
      
      const matchesStatus = statusFilter === "All" || role.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    return filtered.sort((a, b) => {
      const multiplier = sortOrder === "asc" ? 1 : -1;
      
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name) * multiplier;
        case "users":
          return (a.users - b.users) * multiplier;
        case "permissions":
          return (a.permissions - b.permissions) * multiplier;
        case "lastModified":
          return new Date(a.lastModified).getTime() - new Date(b.lastModified).getTime() * multiplier;
        default:
          return 0;
      }
    });
  }, [search, statusFilter, sortBy, sortOrder]);

  const filteredMembers = useMemo(() => {
    return members.filter(member => 
      member.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
      member.role.toLowerCase().includes(memberSearch.toLowerCase()) ||
      member.email.toLowerCase().includes(memberSearch.toLowerCase()) ||
      member.mobile.includes(memberSearch)
    );
  }, [memberSearch]);

  const CreateRoleModal = () => (
    <AnimatePresence>
      {showCreateModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowCreateModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Create New Role</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X size={16} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter role name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role Key</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ROLE_KEY"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="Role description"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Create Role
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header with Search and Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
  {/* Title */}
  <div>
    <h1 className="text-2xl font-bold text-gray-900">Permissions Management</h1>
    <p className="text-gray-600 mt-1">Manage roles, users, and access controls</p>
  </div>

  {/* Search + Actions */}
  <div className="flex flex-col sm:flex-row gap-3 relative">
    {/* Search Box with Suggestions */}
    <div className="relative w-full sm:w-64">
      <Search className="absolute left-3 top-3 text-gray-400" size={18} />
      <input
  type="text"
  placeholder="Search..."
  value={activeTab === "users" ? memberSearch : search}
  onChange={(e) =>
    activeTab === "users"
      ? setMemberSearch(e.target.value)
      : setSearch(e.target.value)
  }
  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg 
             placeholder-gray-500 text-gray-900
             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
             transition"
/>
     
    </div>

    {/* Buttons */}
    <div className="flex gap-2">
      <button className="flex items-center gap-2 px-4 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
        <Filter size={16} />
        Filters
      </button>

      <button
        onClick={() => setShowCreateModal(true)}
        className="flex items-center gap-2 px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        <Plus size={16} />
        Add {activeTab === "users" ? "User" : "Role"}
      </button>
    </div>
  </div>
</div>


  {/* Tabs */}
<div className="flex w-full bg-gray-100 p-1 rounded-xl mb-6">
  {tabs.map((tab) => {
    const Icon = tab.icon;
    return (
      <button
        key={tab.id}
        onClick={() => setActiveTab(tab.id)}
        className={`flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-all flex-1 justify-center
          ${
            activeTab === tab.id
              ? "bg-blue-50 text-blue-600 shadow-sm" // 🔹 light blue background highlight
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          }`}
      >
        <Icon size={18} />
        {tab.name}
      </button>
    );
  })}
</div>



      {/* Content based on active tab */}
      {activeTab === "roles" && (
        <>
          {/* Role Cards */}
          <div className="space-y-4">
            {filteredAndSortedRoles.map((role, idx) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -2 }}
                className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <Shield className="text-blue-600" size={20} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                        </div>
                        <span className={`ml-auto px-2.5 py-1 text-xs font-medium rounded-full ${
                          role.status === "Active" 
                            ? "bg-green-100 text-green-700" 
                            : "bg-gray-100 text-gray-700"
                        }`}>
                          {role.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mt-4 pl-12">
                        <div className="flex items-center gap-2">
                          <Key size={16} className="text-gray-400" />
                          <div>
                            <p className="text-gray-500 text-xs">Role Key</p>
                            <p className="font-mono text-gray-800 text-sm">{role.key}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <User size={16} className="text-gray-400" />
                          <div>
                            <p className="text-gray-500 text-xs">Users</p>
                            <p className="font-semibold text-blue-600 text-sm">{role.users}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield size={16} className="text-gray-400" />
                          <div>
                            <p className="text-gray-500 text-xs">Permissions</p>
                            <p className="font-semibold text-purple-600 text-sm">{role.permissions}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-gray-400" />
                          <div>
                            <p className="text-gray-500 text-xs">Last Modified</p>
                            <p className="text-gray-800 text-sm">{role.lastModified}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 ml-4">
                      <button className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition" title="View">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 rounded-lg bg-yellow-50 hover:bg-yellow-100 text-yellow-600 transition" title="Edit">
                        <Pencil size={16} />
                      </button>
                      <button className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredAndSortedRoles.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="text-gray-400" size={24} />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No roles found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria.</p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Create New Role
                </button>
              </div>
            )}
          </div>

        </>
      )}
{/*user permision section*/}
    {activeTab === "users" && (
  <div className="space-y-4">
    {filteredMembers.map((member, idx) => (
      <motion.div
        key={member.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.05 }}
        whileHover={{ y: -2 }}
        className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
      >
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <User className="text-blue-600" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                </div>
                <span className={`ml-auto px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700`}>
                  Active
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mt-4 pl-12">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-gray-400" />
                  <div>
                    <p className="text-gray-500 text-xs">Role Name</p>
                    <p className="font-semibold text-gray-700 text-sm">{member.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-gray-400" />
                  <div>
                    <p className="text-gray-500 text-xs">Mobile Number</p>
                    <p className="font-semibold text-gray-700 text-sm">{member.mobile}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-gray-400" />
                  <div>
                    <p className="text-gray-500 text-xs">Email ID</p>
                    <p className="font-semibold text-gray-700 text-sm truncate">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-gray-400" />
                  <div>
                    <p className="text-gray-500 text-xs">Member Since</p>
                    <p className="text-gray-700 text-sm">2024-01-15</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 ml-4">
              <button className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition" title="View">
                <Eye size={16} />
              </button>
              <button className="p-2 rounded-lg bg-yellow-50 hover:bg-yellow-100 text-yellow-600 transition" title="Edit">
                <Pencil size={16} />
              </button>
              <button className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition" title="Delete">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    ))}

    {filteredMembers.length === 0 && (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="text-gray-400" size={24} />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No members found</h3>
        <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria.</p>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Add New Member
        </button>
      </div>
    )}

    
  </div>
)}

{/* approval workflow section*/}

{activeTab === "workflow" && (
  <div className="space-y-6">

    {/* Approval Cards */}
    <div className="space-y-4">
      {/* Approval Card 1 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Project : Granite Horizon</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-gray-500 text-sm mb-1">Approval For</p>
                <p className="font-medium text-gray-900">Alan David</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Module</p>
                <p className="font-medium text-gray-900">Indent</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Status</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Yes
                </span>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-2 ml-4">
            <button className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition" title="View">
              <Eye size={16} />
            </button>
            <button className="p-2 rounded-lg bg-yellow-50 hover:bg-yellow-100 text-yellow-600 transition" title="Edit">
              <Pencil size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Approval Card 2 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Project : Granite Horizon</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-gray-500 text-sm mb-1">Approval For</p>
                <p className="font-medium text-gray-900">Alan David</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Module</p>
                <p className="font-medium text-gray-900">Bill Payment</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Status</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Yes
                </span>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-2 ml-4">
            <button className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition" title="View">
              <Eye size={16} />
            </button>
            <button className="p-2 rounded-lg bg-yellow-50 hover:bg-yellow-100 text-yellow-600 transition" title="Edit">
              <Pencil size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Approval Card 3 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Project : Granite Horizon</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-gray-500 text-sm mb-1">Approval For</p>
                <p className="font-medium text-gray-900">Alan David</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Module</p>
                <p className="font-medium text-gray-900">Document</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Status</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Yes
                </span>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-2 ml-4">
            <button className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition" title="View">
              <Eye size={16} />
            </button>
            <button className="p-2 rounded-lg bg-yellow-50 hover:bg-yellow-100 text-yellow-600 transition" title="Edit">
              <Pencil size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Approval Card 4 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Project : Granite Horizon</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-gray-500 text-sm mb-1">Approval For</p>
                <p className="font-medium text-gray-900">Alan David</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Module</p>
                <p className="font-medium text-gray-900">Drawing</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Status</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Yes
                </span>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-2 ml-4">
            <button className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition" title="View">
              <Eye size={16} />
            </button>
            <button className="p-2 rounded-lg bg-yellow-50 hover:bg-yellow-100 text-yellow-600 transition" title="Edit">
              <Pencil size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}


{/*dashboard permission section*/}
{activeTab === "dashboard" && (
  <div className="space-y-6">
    

    {/* Dashboard Permission Cards - Single Column Layout */}
    <div className="grid grid-cols-1 gap-4">
      {/* Card 1: Not Started Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0 * 0.05 }}
        whileHover={{ y: -2 }}
        className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
      >
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Activity className="text-blue-600" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Not Started Activity</h3>
                </div>
                <span className="ml-auto px-2.5 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
                  Counter
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mt-4 pl-12">
                <div className="flex items-center gap-2">
                  <Folder size={16} className="text-gray-400" />
                  <div>
                    <p className="text-gray-500 text-xs">Project</p>
                    <p className="font-semibold text-blue-600 text-sm">Granite Horizon</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <User size={16} className="text-gray-400" />
                  <div>
                    <p className="text-gray-500 text-xs">Role</p>
                    <p className="text-gray-800 text-sm">Project Admin</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Tag size={16} className="text-gray-400" />
                  <div>
                    <p className="text-gray-500 text-xs">Title</p>
                    <p className="text-gray-800 text-sm">Not Started Activity</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Type size={16} className="text-gray-400" />
                  <div>
                    <p className="text-gray-500 text-xs">Type</p>
                    <p className="text-gray-800 text-sm">Counter</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 ml-4">
              <button className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition" title="View">
                <Eye size={16} />
              </button>
              <button className="p-2 rounded-lg bg-yellow-50 hover:bg-yellow-100 text-yellow-600 transition" title="Edit">
                <Pencil size={16} />
              </button>
              <button className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition" title="Delete">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Card 2: Drawings Under Review */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 * 0.05 }}
        whileHover={{ y: -2 }}
        className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
      >
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FileText className="text-blue-600" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Drawings Under Review</h3>
                  <p className="text-sm text-gray-600">Dashboard widget permission for Granite Horizon</p>
                </div>
                <span className="ml-auto px-2.5 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
                  Counter
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mt-4 pl-12">
                <div className="flex items-center gap-2">
                  <Folder size={16} className="text-gray-400" />
                  <div>
                    <p className="text-gray-500 text-xs">Project</p>
                    <p className="font-semibold text-blue-600 text-sm">Granite Horizon</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <User size={16} className="text-gray-400" />
                  <div>
                    <p className="text-gray-500 text-xs">Role</p>
                    <p className="text-gray-800 text-sm">Project Admin</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Tag size={16} className="text-gray-400" />
                  <div>
                    <p className="text-gray-500 text-xs">Title</p>
                    <p className="text-gray-800 text-sm">Drawings Under Review</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Type size={16} className="text-gray-400" />
                  <div>
                    <p className="text-gray-500 text-xs">Type</p>
                    <p className="text-gray-800 text-sm">Counter</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 ml-4">
              <button className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition" title="View">
                <Eye size={16} />
              </button>
              <button className="p-2 rounded-lg bg-yellow-50 hover:bg-yellow-100 text-yellow-600 transition" title="Edit">
                <Pencil size={16} />
              </button>
              <button className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition" title="Delete">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Card 3: Open GBN */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 * 0.05 }}
        whileHover={{ y: -2 }}
        className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
      >
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <AlertCircle className="text-blue-600" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Open GBN</h3>
                  <p className="text-sm text-gray-600">Dashboard widget permission for Granite Horizon</p>
                </div>
                <span className="ml-auto px-2.5 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
                  Counter
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mt-4 pl-12">
                <div className="flex items-center gap-2">
                  <Folder size={16} className="text-gray-400" />
                  <div>
                    <p className="text-gray-500 text-xs">Project</p>
                    <p className="font-semibold text-blue-600 text-sm">Granite Horizon</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <User size={16} className="text-gray-400" />
                  <div>
                    <p className="text-gray-500 text-xs">Role</p>
                    <p className="text-gray-800 text-sm">Project Admin</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Tag size={16} className="text-gray-400" />
                  <div>
                    <p className="text-gray-500 text-xs">Title</p>
                    <p className="text-gray-800 text-sm">Open GBN</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Type size={16} className="text-gray-400" />
                  <div>
                    <p className="text-gray-500 text-xs">Type</p>
                    <p className="text-gray-800 text-sm">Counter</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 ml-4">
              <button className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition" title="View">
                <Eye size={16} />
              </button>
              <button className="p-2 rounded-lg bg-yellow-50 hover:bg-yellow-100 text-yellow-600 transition" title="Edit">
                <Pencil size={16} />
              </button>
              <button className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition" title="Delete">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Card 4: Paid Bill */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3 * 0.05 }}
        whileHover={{ y: -2 }}
        className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
      >
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <DollarSign className="text-blue-600" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Paid Bill</h3>
                  <p className="text-sm text-gray-600">Dashboard widget permission for Granite Horizon</p>
                </div>
                <span className="ml-auto px-2.5 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
                  Counter
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mt-4 pl-12">
                <div className="flex items-center gap-2">
                  <Folder size={16} className="text-gray-400" />
                  <div>
                    <p className="text-gray-500 text-xs">Project</p>
                    <p className="font-semibold text-blue-600 text-sm">Granite Horizon</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <User size={16} className="text-gray-400" />
                  <div>
                    <p className="text-gray-500 text-xs">Role</p>
                    <p className="text-gray-800 text-sm">Project Admin</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Tag size={16} className="text-gray-400" />
                  <div>
                    <p className="text-gray-500 text-xs">Title</p>
                    <p className="text-gray-800 text-sm">Paid Bill</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Type size={16} className="text-gray-400" />
                  <div>
                    <p className="text-gray-500 text-xs">Type</p>
                    <p className="text-gray-800 text-sm">Counter</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 ml-4">
              <button className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition" title="View">
                <Eye size={16} />
              </button>
              <button className="p-2 rounded-lg bg-yellow-50 hover:bg-yellow-100 text-yellow-600 transition" title="Edit">
                <Pencil size={16} />
              </button>
              <button className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition" title="Delete">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>

    
  </div>
)}


{/* Pagination */}
    {filteredMembers.length > 0 && (
      <div className="flex justify-center items-center gap-4 mt-8">
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition">
          Previous
        </button>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-lg bg-blue-500 text-white text-sm font-medium">1</button>
          <button className="w-8 h-8 rounded-lg border border-gray-300 text-gray-600 text-sm hover:bg-gray-50 transition">2</button>
          <button className="w-8 h-8 rounded-lg border border-gray-300 text-gray-600 text-sm hover:bg-gray-50 transition">3</button>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition">
          Next
        </button>
      </div>
    )}

  

      <CreateRoleModal />
    </div>
  );
}