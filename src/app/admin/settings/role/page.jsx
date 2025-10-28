
'use client';

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Eye, 
  Pencil, 
  Plus, 
  Trash2, 
  Settings,
  Users,
  Shield,
  X,
  User,
  ChevronDown,
  ChevronUp
} from "lucide-react";

// Sample data
const members = [
  { id: 1, name: "Alan David", role: "Project Admin", mobile: "+919764585655", email: "vbjpa4378@acedby.com", memberSince: "2024-01-15" },
  { id: 2, name: "Mukesh Sinha", role: "Consultant", mobile: "98563212225", email: "vfkashoffice38@gmail.com", memberSince: "2024-01-10" },
  { id: 3, name: "moteen", role: "Consultant", mobile: "+98765456787", email: "mo3@gmail.com", memberSince: "2024-01-08" },
  { id: 4, name: "Sonalika", role: "Approver", mobile: "69553635353", email: "bldsov382@pricegh.com", memberSince: "2024-01-05" }
];

const approvalWorkflows = [
  { id: 1, project: "Granite Horizon", approvalFor: "Alan David", module: "Indent", status: "Yes" },
  { id: 2, project: "Granite Horizon", approvalFor: "Alan David", module: "Bill Payment", status: "Yes" },
  { id: 3, project: "Granite Horizon", approvalFor: "Alan David", module: "Document", status: "Yes" },
  { id: 4, project: "Granite Horizon", approvalFor: "Alan David", module: "Drawing", status: "Yes" }
];

const dashboardPermissions = [
  { id: 1, title: "Not Started Activity", project: "Granite Horizon", role: "Project Admin", type: "Counter" },
  { id: 2, title: "Drawings Under Review", project: "Granite Horizon", role: "Project Admin", type: "Counter", description: "Dashboard widget permission for Granite Horizon" },
  { id: 3, title: "Open GBN", project: "Granite Horizon", role: "Project Admin", type: "Counter", description: "Dashboard widget permission for Granite Horizon" },
  { id: 4, title: "Paid Bill", project: "Granite Horizon", role: "Project Admin", type: "Counter", description: "Dashboard widget permission for Granite Horizon" }
];

const modules = [
  { id: 1, name: "Change BOQ", permissions: { add: false, update: false, delete: false, view: false, menuVisible: false } },
  { id: 2, name: "Snagging Report(Parent-RFI)", permissions: { add: false, update: false, delete: false, view: false, menuVisible: false }, hasRecordAccess: true },
  { id: 3, name: "Material", permissions: { add: false, update: false, delete: false, view: false, menuVisible: false }, hasRecordAccess: true },
  { id: 4, name: "RFI", permissions: { add: false, update: false, delete: false, view: false, menuVisible: false } },
  { id: 5, name: "Work Order", permissions: { add: false, update: false, delete: false, view: false, menuVisible: false }, hasRecordAccess: true },
  { id: 6, name: "Advance Payment(Parent-Work Order)", permissions: { recordAccess: false, close: false, saveChanges: false } }
];

const tabs = [
  { id: "roles", name: "Role Permission", icon: Shield },
  { id: "users", name: "User Permission", icon: Users },
  { id: "workflow", name: "Approval Workflow", icon: Settings },
  { id: "dashboard", name: "Dashboard Permission", icon: Eye },
];

let rolePermissionsStorage = {
  "PROJECT_ADMIN": {},
  "CONSULTANT": {
    "Change BOQ": { add: false, update: false, delete: false, view: true, menuVisible: true },
    "Snagging Report(Parent-RFI)": { add: false, update: true, delete: false, view: true, menuVisible: true, recordAccess: "specific" },
    "Material": { add: false, update: false, delete: false, view: true, menuVisible: false, recordAccess: "all" },
    "RFI": { add: false, update: false, delete: false, view: false, menuVisible: false },
    "Work Order": { add: false, update: false, delete: false, view: true, menuVisible: true, recordAccess: "specific" },
    "Advance Payment(Parent-Work Order)": { recordAccess: false, close: false, saveChanges: false }
  },
  "APPROVER": {
    "Change BOQ": { add: false, update: false, delete: false, view: true, menuVisible: true },
    "Snagging Report(Parent-RFI)": { add: false, update: false, delete: false, view: true, menuVisible: true, recordAccess: "all" },
    "Material": { add: false, update: false, delete: false, view: false, menuVisible: false },
    "RFI": { add: false, update: true, delete: false, view: true, menuVisible: true },
    "Work Order": { add: false, update: true, delete: false, view: true, menuVisible: true, recordAccess: "all" },
    "Advance Payment(Parent-Work Order)": { recordAccess: true, close: true, saveChanges: false }
  },
  "CONTRACTOR": {
    "Change BOQ": { add: false, update: false, delete: false, view: false, menuVisible: false },
    "Snagging Report(Parent-RFI)": { add: false, update: false, delete: false, view: true, menuVisible: true, recordAccess: "specific" },
    "Material": { add: true, update: false, delete: false, view: true, menuVisible: true, recordAccess: "specific" },
    "RFI": { add: false, update: false, delete: false, view: false, menuVisible: false },
    "Work Order": { add: false, update: false, delete: false, view: true, menuVisible: false, recordAccess: "specific" },
    "Advance Payment(Parent-Work Order)": { recordAccess: false, close: false, saveChanges: false }
  },
  "VIEWER": {
    "Change BOQ": { add: false, update: false, delete: false, view: true, menuVisible: true },
    "Snagging Report(Parent-RFI)": { add: false, update: false, delete: false, view: true, menuVisible: true, recordAccess: "all" },
    "Material": { add: false, update: false, delete: false, view: true, menuVisible: true, recordAccess: "all" },
    "RFI": { add: false, update: false, delete: false, view: true, menuVisible: true },
    "Work Order": { add: false, update: false, delete: false, view: true, menuVisible: true, recordAccess: "all" },
    "Advance Payment(Parent-Work Order)": { recordAccess: false, close: false, saveChanges: false }
  }
};

// Create/Edit Role Modal Component
const CreateEditRoleModal = ({ isOpen, onClose, onCreate, onUpdate, editRole }) => {
  const [roleName, setRoleName] = useState("");
  const [roleKey, setRoleKey] = useState("");
  const [copyFrom, setCopyFrom] = useState(false);
  const [selectedCopyRole, setSelectedCopyRole] = useState("");

  useEffect(() => {
    if (editRole) {
      setRoleName(editRole.name);
      setRoleKey(editRole.key);
      setCopyFrom(false);
      setSelectedCopyRole("");
    } else {
      setRoleName("");
      setRoleKey("");
      setCopyFrom(false);
      setSelectedCopyRole("");
    }
  }, [editRole, isOpen]);

  const handleSave = () => {
    if (roleName && roleKey) {
      const roleData = {
        roleName,
        roleNameKey: roleKey.toUpperCase(),
        isCopy: copyFrom ? { status: true, ParentRole: selectedCopyRole } : { status: false }
      };
      if (editRole) {
        onUpdate(editRole.id, roleData);
      } else {
        onCreate(roleData);
      }
      setRoleName("");
      setRoleKey("");
      setCopyFrom(false);
      setSelectedCopyRole("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 backdrop-blur-xl bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={() => onClose()}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">{editRole ? 'Edit Role' : 'Create New Role'}</h3>
            <button onClick={() => onClose()} className="p-2 hover:bg-gray-100 rounded-lg transition">
              <X size={16} />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role Name</label>
              <input
                type="text"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                className="w-full px-3 text-black py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter role name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role Key</label>
              <input
                type="text"
                value={roleKey}
                onChange={(e) => setRoleKey(e.target.value)}
                className="w-full px-3 text-black py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ROLE_KEY"
                disabled={!!editRole}
              />
              {editRole && <p className="text-xs text-gray-500 mt-1">Role key cannot be changed for existing roles</p>}
            </div>
            {!editRole && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Copy permissions from existing role?</label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="copyOption" checked={copyFrom} onChange={() => setCopyFrom(true)} />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="copyOption" checked={!copyFrom} onChange={() => setCopyFrom(false)} />
                    <span>No</span>
                  </label>
                </div>
                {copyFrom && (
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select role to copy</label>
                    <select
                      value={selectedCopyRole}
                      onChange={(e) => setSelectedCopyRole(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a role</option>
                      {roles.map((role) => (
                        <option key={role._id} value={role.roleNameKey}>{role.roleName}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}
            <div className="flex gap-3 pt-4">
              <button onClick={() => onClose()} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!roleName || !roleKey}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
              >
                {editRole ? 'Update Role' : 'Create Role'}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// View Permissions Modal Component
const ViewPermissionsModal = ({ isOpen, onClose, role }) => {
  const [modulePermissions, setModulePermissions] = useState([]);

  useEffect(() => {
    if (isOpen && role) {
      const roleKey = roles.find(r => r.roleName === role.roleName)?.key;
      if (roleKey && rolePermissionsStorage[roleKey]) {
        const permissionsData = modules.map(module => ({
          ...module,
          permissions: rolePermissionsStorage[roleKey][module.name] || { ...module.permissions }
        }));
        setModulePermissions(permissionsData);
      } else {
        const defaultPermissions = modules.map(module => ({
          ...module,
          permissions: { ...module.permissions }
        }));
        setModulePermissions(defaultPermissions);
      }
    }
  }, [isOpen, role]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={() => onClose()}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-green-600 text-white">
            <div>
              <h3 className="text-lg font-semibold">Permissions for {role?.roleName || 'Role'}</h3>
              <p className="text-green-100 text-sm mt-1">View all assigned permissions</p>
            </div>
            <button onClick={() => onClose()} className="p-2 hover:bg-green-700 rounded-lg transition">
              <X size={16} />
            </button>
          </div>
          <div className="p-6 overflow-y-auto max-h-[70vh]">
            <div className="space-y-4">
              {modulePermissions.map((module) => (
                <div key={module.id} className="border border-gray-200 rounded-lg p-4 bg-white">
                  <h4 className="font-semibold text-gray-900 mb-3 text-lg">{module.name}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {Object.entries(module.permissions).map(([permissionKey, isEnabled]) => (
                      <div 
                        key={permissionKey} 
                        className={`flex items-center justify-between p-3 rounded-lg border ${isEnabled ? 'text-green-600 bg-green-50 border-green-200' : 'text-gray-600 bg-gray-50 border-gray-200'}`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${isEnabled ? 'bg-green-500' : 'bg-gray-400'}`} />
                          <span className="text-sm font-medium capitalize">
                            {permissionKey === 'menuVisible' ? 'Menu Visible' : permissionKey === 'recordAccess' ? 'Record Access' : permissionKey === 'saveChanges' ? 'Save Changes' : permissionKey}
                          </span>
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${isEnabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {isEnabled ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end p-6 border-t border-gray-200 bg-gray-50">
            <button onClick={() => onClose()} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium">
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Main Component
export default function EnhancedPermissionsPage() {
  const [activeTab, setActiveTab] = useState("roles");
  const [search, setSearch] = useState("");
  const [memberSearch, setMemberSearch] = useState("");
  const [workflowSearch, setWorkflowSearch] = useState("");
  const [dashboardSearch, setDashboardSearch] = useState("");
  const [showCreateEditModal, setShowCreateEditModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [editRole, setEditRole] = useState(null);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // Manage Role Modal States
  const [manageSelectedRole, setManageSelectedRole] = useState("");
  const [selectedService, setSelectedService] = useState("CONSTRUCTION");
  const [modulePermissions, setModulePermissions] = useState([]);
  const [recordAccessSettings, setRecordAccessSettings] = useState({});

  const [allRoles, setAllRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/role");
        const data = await res.json();
        setAllRoles(data.roles);
        console.log("Roles",data.roles)
      } catch (err) {
        console.log("Internal Server Error", err);
      }
    };
    fetchRoles();
  }, []);

  useEffect(() => {
    if (showManageModal) {
      const defaultPermissions = modules.map(module => ({
        ...module,
        permissions: { ...module.permissions }
      }));
      setModulePermissions(defaultPermissions);
      const settings = {};
      modules.forEach(module => {
        if (module.hasRecordAccess) settings[module.id] = 'all';
      });
      setRecordAccessSettings(settings);
    }
  }, [showManageModal]);

  useEffect(() => {
    if (manageSelectedRole && rolePermissionsStorage[manageSelectedRole]) {
      const savedPermissions = rolePermissionsStorage[manageSelectedRole];
      const updatedModules = modules.map(module => {
        const savedModule = savedPermissions[module.name];
        if (savedModule) {
          if (savedModule.recordAccess && module.hasRecordAccess) {
            setRecordAccessSettings(prev => ({ ...prev, [module.id]: savedModule.recordAccess }));
          }
          return { ...module, permissions: { ...savedModule } };
        }
        return module;
      });
      setModulePermissions(updatedModules);
    } else if (manageSelectedRole) {
      const defaultPermissions = modules.map(module => ({
        ...module,
        permissions: { ...module.permissions }
      }));
      setModulePermissions(defaultPermissions);
    }
  }, [manageSelectedRole]);

  const filteredMembers = useMemo(() => {
    return members.filter(member => 
      member.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
      member.role.toLowerCase().includes(memberSearch.toLowerCase()) ||
      member.email.toLowerCase().includes(memberSearch.toLowerCase()) ||
      member.mobile.includes(memberSearch)
    );
  }, [memberSearch]);

  const filteredWorkflows = useMemo(() => {
    return approvalWorkflows.filter(workflow => 
      workflow.project.toLowerCase().includes(workflowSearch.toLowerCase()) ||
      workflow.approvalFor.toLowerCase().includes(workflowSearch.toLowerCase()) ||
      workflow.module.toLowerCase().includes(workflowSearch.toLowerCase())
    );
  }, [workflowSearch]);

  const filteredDashboardPermissions = useMemo(() => {
    return dashboardPermissions.filter(permission => 
      permission.title.toLowerCase().includes(dashboardSearch.toLowerCase()) ||
      permission.project.toLowerCase().includes(dashboardSearch.toLowerCase()) ||
      permission.role.toLowerCase().includes(dashboardSearch.toLowerCase())
    );
  }, [dashboardSearch]);

  const handleCreateRole = async (data) => {
    try {
      const res = await fetch("http://localhost:3001/api/role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      console.log(result);
    } catch (err) {
      console.log("Internal server error", err);
    }

    const newRole = {
      id: allRoles.length + 1,
      roleName: data.roleName,
      roleNameKey: data.roleNameKey,
      status: "Active",
      users: 0,
      permissions: 0,
      description: `Role - ${data.roleName}`,
      lastModified: new Date().toISOString().split('T')[0]
    };

    if (data.isCopy.status && rolePermissionsStorage[data.isCopy.ParentRole]) {
      rolePermissionsStorage[data.roleNameKey] = { ...rolePermissionsStorage[data.isCopy.ParentRole] };
      newRole.permissions = Object.keys(rolePermissionsStorage[data.isCopy.ParentRole]).length * 5;
    } else {
      rolePermissionsStorage[data.roleNameKey] = {};
    }

    setAllRoles([...allRoles, newRole]);
    setTimeout(() => {
      alert(`Role "${data.roleName}" created successfully! ${data.isCopy.status ? 'Permissions copied.' : 'Use Manage Role to assign permissions.'}`);
    }, 100);
  };

  const handleUpdateRole = (roleId, data) => {
    setAllRoles(allRoles.map(role => {
      if (role.id === roleId) {
        return {
          ...role,
          name: data.roleName,
          description: `Updated role - ${data.roleName}`,
          lastModified: new Date().toISOString().split('T')[0]
        };
      }
      return role;
    }));
    setTimeout(() => {
      alert(`Role "${data.roleName}" updated successfully!`);
    }, 100);
  };

  const handleSavePermissions = () => {
    if (manageSelectedRole) {
      const permissionsData = {};
      modulePermissions.forEach(module => {
        permissionsData[module.name] = { 
          ...module.permissions,
          ...(module.hasRecordAccess && { recordAccess: recordAccessSettings[module.id] })
        };
      });
      
      rolePermissionsStorage[manageSelectedRole] = permissionsData;
      console.log(manageSelectedRole);
      
      setAllRoles(allRoles.map(role => {
        if (role.key === manageSelectedRole) {
          const permissionCount = Object.values(permissionsData).reduce((count, modulePerms) => {
            return count + Object.values(modulePerms).filter(Boolean).length;
          }, 0);
          return {
            ...role,
            permissions: permissionCount,
            lastModified: new Date().toISOString().split('T')[0]
          };
        }
        return role;
      }));

      setTimeout(() => {
        alert(`Permissions saved successfully for ${manageSelectedRole}!`);
      }, 100);

      setManageSelectedRole("");
      setSelectedService("CONSTRUCTION");
      setModulePermissions([]);
      setRecordAccessSettings({});
      setShowManageModal(false);
    }
  };

  const togglePermission = (moduleId, permissionKey) => {
    setModulePermissions(modulePermissions.map(module => {
      if (module.id === moduleId) {
        return {
          ...module,
          permissions: {
            ...module.permissions,
            [permissionKey]: !module.permissions[permissionKey]
          }
        };
      }
      return module;
    }));
  };

  const toggleModuleCheckbox = (moduleId) => {
    setModulePermissions(modulePermissions.map(module => {
      if (module.id === moduleId) {
        const allPermissions = Object.values(module.permissions);
        const allChecked = allPermissions.every(Boolean);
        const newPermissions = {};
        Object.keys(module.permissions).forEach(key => {
          newPermissions[key] = !allChecked;
        });
        return { ...module, permissions: newPermissions };
      }
      return module;
    }));
  };

  const isModuleFullySelected = (module) => {
    return Object.values(module.permissions).every(Boolean);
  };

  const isModulePartiallySelected = (module) => {
    const values = Object.values(module.permissions);
    return values.some(Boolean) && !values.every(Boolean);
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const SortIcon = ({ column }) => {
    if (sortBy !== column) return <ChevronDown size={16} className="opacity-30" />;
    return sortOrder === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };
  const getPermissionsCount = (permissions) => {
    if (!permissions) return 0;
    return Object.keys(permissions).length;
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case "roles":
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 cursor-pointer" onClick={() => handleSort("name")}>
                        <div className="flex items-center gap-2">Role Name <SortIcon column="name" /></div>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 cursor-pointer" onClick={() => handleSort("users")}>
                        <div className="flex items-center gap-2">Users <SortIcon column="users" /></div>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 cursor-pointer" onClick={() => handleSort("permissions")}>
                        <div className="flex items-center gap-2">Permissions <SortIcon column="permissions" /></div>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {allRoles.map((role) => (
                      <tr key={role._id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-gray-900">{role.roleName}</div>
                            <div className="text-sm text-gray-500">{role.roleNameKey}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${role.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                            {role.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{role.memberCount || "0"} users</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{ getPermissionsCount(role.Permissions)  || "0"} permissions</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button onClick={() => { setSelectedRole(role); setShowViewModal(true); }} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition" title="View Permissions">
                              <Eye size={16} />
                            </button>
                            <button onClick={() => { setEditRole(role); setShowCreateEditModal(true); }} className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition" title="Edit Role">
                              <Pencil size={16} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition" title="Delete Role">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case "users":
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">User</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Role</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Contact</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Member Since</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredMembers.map((member) => (
                      <tr key={member.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <User size={16} className="text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{member.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{member.role}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="text-gray-900">{member.mobile}</div>
                            <div className="text-gray-500">{member.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{new Date(member.memberSince).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition" title="View User">
                              <Eye size={16} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition" title="Edit User">
                              <Pencil size={16} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition" title="Remove User">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case "workflow":
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Project</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Approval For</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Module</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredWorkflows.map((workflow) => (
                      <tr key={workflow.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 font-medium text-gray-900">{workflow.project}</td>
                        <td className="px-6 py-4 text-gray-900">{workflow.approvalFor}</td>
                        <td className="px-6 py-4 text-gray-900">{workflow.module}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">{workflow.status}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition" title="View Workflow">
                              <Eye size={16} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition" title="Edit Workflow">
                              <Pencil size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case "dashboard":
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Title</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Project</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Role</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredDashboardPermissions.map((permission) => (
                      <tr key={permission.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-gray-900">{permission.title}</div>
                            {permission.description && <div className="text-sm text-gray-500 mt-1">{permission.description}</div>}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-900">{permission.project}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">{permission.role}</span>
                        </td>
                        <td className="px-6 py-4 text-gray-900">{permission.type}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition" title="View Permission">
                              <Eye size={16} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition" title="Edit Permission">
                              <Pencil size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getSearchPlaceholder = () => {
    switch (activeTab) {
      case "roles": return "Search roles...";
      case "users": return "Search users...";
      case "workflow": return "Search workflows...";
      case "dashboard": return "Search permissions...";
      default: return "Search...";
    }
  };

  const getSearchValue = () => {
    switch (activeTab) {
      case "roles": return search;
      case "users": return memberSearch;
      case "workflow": return workflowSearch;
      case "dashboard": return dashboardSearch;
      default: return "";
    }
  };

  const handleSearchChange = (value) => {
    switch (activeTab) {
      case "roles": setSearch(value); break;
      case "users": setMemberSearch(value); break;
      case "workflow": setWorkflowSearch(value); break;
      case "dashboard": setDashboardSearch(value); break;
      default: break;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Permissions Management</h1>
          <p className="text-gray-600 mt-1">Manage roles, users, and access permissions</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={getSearchPlaceholder()}
              value={getSearchValue()}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
            />
          </div>
          {activeTab === "roles" && (
            <div className="flex gap-3">
              <button onClick={() => setShowCreateEditModal(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                <Plus size={20} /> Create Role
              </button>
              <button onClick={() => setShowManageModal(true)} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium">
                <Pencil size={20} /> Manage Role
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-6">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 transition ${activeTab === tab.id ? "border-blue-600 text-blue-600 bg-blue-50" : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`}
              >
                <Icon size={20} />
                <span className="font-medium whitespace-nowrap">{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {renderTabContent()}

      <CreateEditRoleModal
        isOpen={showCreateEditModal}
        onClose={() => { setShowCreateEditModal(false); setEditRole(null); }}
        onCreate={handleCreateRole}
        onUpdate={handleUpdateRole}
        editRole={editRole}
      />

      <ViewPermissionsModal
        isOpen={showViewModal}
        onClose={() => { setShowViewModal(false); setSelectedRole(null); }}
        role={selectedRole}
      />

      {showManageModal && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50  backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => { setShowManageModal(false); setManageSelectedRole(""); setSelectedService("CONSTRUCTION"); setModulePermissions([]); setRecordAccessSettings({}); }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white">
                <h3 className="text-lg font-semibold">Manage Role Permissions</h3>
                <button onClick={() => { setShowManageModal(false); setManageSelectedRole(""); setSelectedService("CONSTRUCTION"); setModulePermissions([]); setRecordAccessSettings({}); }} className="p-1 hover:bg-blue-700 rounded transition">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[70vh]">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Role to Manage</label>
                    <select
                      value={manageSelectedRole}
                      onChange={(e) => setManageSelectedRole(e.target.value)}
                      className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="text-black">Select Role</option>
                      {allRoles.map((roleItem) => (
                        <option key={roleItem._id} value={roleItem.roleNameKey}>{roleItem.roleName}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="CONSTRUCTION">CONSTRUCTION</option>
                   
                    </select>
                  </div>
                </div>
                {manageSelectedRole && (
                  <>
                    <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800">Granting permissions for: {allRoles.find(r => r.roleNameKey === manageSelectedRole)?.name}</h4>
                      <p className="text-blue-600 text-sm mt-1">Check the permissions you want to grant for each module</p>
                    </div>
                    <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                      {modulePermissions.map((module) => {
                        const isFullySelected = isModuleFullySelected(module);
                        const isPartiallySelected = isModulePartiallySelected(module);
                        return (
                          <div key={module.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <div className="flex items-center p-4">
                              <div className="flex items-center gap-3 flex-1">
                                <div className="relative">
                                  <input
                                    type="checkbox"
                                    checked={isFullySelected}
                                    ref={(el) => { if (el) el.indeterminate = isPartiallySelected; }}
                                    onChange={() => toggleModuleCheckbox(module.id)}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                                  />
                                </div>
                                <span className="text-sm font-medium text-gray-900">{module.name}</span>
                              </div>
                              {module.hasRecordAccess && <div className="text-sm text-gray-600">Record Access</div>}
                            </div>
                            <div className="px-4 pb-4">
                              <div className="flex flex-wrap gap-x-6 gap-y-2">
                                {Object.entries(module.permissions).map(([permissionKey, isChecked]) => (
                                  <label key={permissionKey} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={() => togglePermission(module.id, permissionKey)}
                                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                    />
                                    <span className="text-sm text-gray-700 capitalize">
                                      {permissionKey === 'menuVisible' ? 'Menu Visible' : permissionKey === 'recordAccess' ? 'Record Access' : permissionKey === 'saveChanges' ? 'Save Changes' : permissionKey}
                                    </span>
                                  </label>
                                ))}
                              </div>
                              {module.hasRecordAccess && (
                                <div className="flex items-center gap-6 mt-3 pl-6">
                                  <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                      type="radio"
                                      name={`recordAccess-${module.id}`}
                                      checked={recordAccessSettings[module.id] === 'all'}
                                      onChange={() => setRecordAccessSettings({ ...recordAccessSettings, [module.id]: 'all' })}
                                      className="w-4 h-4 text-blue-600"
                                    />
                                    <span className="text-sm text-gray-700">All Records</span>
                                  </label>
                                  <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                      type="radio"
                                      name={`recordAccess-${module.id}`}
                                      checked={recordAccessSettings[module.id] === 'specific'}
                                      onChange={() => setRecordAccessSettings({ ...recordAccessSettings, [module.id]: 'specific' })}
                                      className="w-4 h-4 text-blue-600"
                                    />
                                    <span className="text-sm text-gray-700">Specific Records</span>
                                  </label>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
              <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
                <button onClick={() => { setShowManageModal(false); setManageSelectedRole(""); setSelectedService("CONSTRUCTION"); setModulePermissions([]); setRecordAccessSettings({}); }} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-white transition">
                  Close
                </button>
                <button onClick={handleSavePermissions} disabled={!manageSelectedRole} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition">
                  Save Permissions
                </button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}