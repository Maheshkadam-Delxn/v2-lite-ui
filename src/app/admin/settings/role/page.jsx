'use client';

import { useState, useMemo, useEffect, useCallback } from "react";
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
  ChevronUp,
  Loader2
} from "lucide-react";

// Helper function to get token from localStorage
const getAuthToken = () => {
  try {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token') || '';
      return token;
    }
    return '';
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return '';
  }
};

// Sample data
const members = [
  { id: 1, name: "Alan David", role: "Project Admin", roleKey: "PROJECT_ADMIN", mobile: "+919764585655", email: "vbjpa4378@acedby.com", memberSince: "2024-01-15" },
  { id: 2, name: "Mukesh Sinha", role: "Consultant", roleKey: "CONSULTANT", mobile: "98563212225", email: "vfkashoffice38@gmail.com", memberSince: "2024-01-10" },
  { id: 3, name: "moteen", role: "Consultant", roleKey: "CONSULTANT", mobile: "+98765456787", email: "mo3@gmail.com", memberSince: "2024-01-08" },
  { id: 4, name: "Sonalika", role: "Approver", roleKey: "APPROVER", mobile: "69553635353", email: "bldsov382@pricegh.com", memberSince: "2024-01-05" }
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

const projects = [
  { id: 1, name: "Granite Horizon", service: "CONSTRUCTION" },
  { id: 2, name: "Marble Heights", service: "CONSTRUCTION" },
  { id: 3, name: "Design Villa", service: "DESIGN" },
  { id: 4, name: "Consulting Tower", service: "CONSULTING" }
];

// Hardcoded modules list
const hardcodedModules = [
  { id: 1, name: "Material" },
  { id: 2, name: "RFI" },
  { id: 3, name: "Work Order" },
  { id: 4, name: "Change BOQ" },
  { id: 5, name: "Snagging Report" },
  { id: 6, name: "Advance Payment" },
  { id: 7, name: "Indent" },
  { id: 8, name: "Bill Payment" },
  { id: 9, name: "Document" },
  { id: 10, name: "Drawing" }
];

const tabs = [
  { id: "roles", name: "Role Permission", icon: Shield },
  { id: "users", name: "User Permission", icon: Users },
  { id: "workflow", name: "Approval Workflow", icon: Settings },
  { id: "dashboard", name: "Dashboard Permission", icon: Eye },
];

// Default empty permissions for a module
const getDefaultModulePermissions = () => ({
  add: false,
  edit: false,
  delete: false,
  view: false
});

// Create/Edit Role Modal Component
const CreateEditRoleModal = ({ isOpen, onClose, onCreate, onUpdate, editRole, allRoles = [] }) => {
  const [roleName, setRoleName] = useState("");
  const [roleKey, setRoleKey] = useState("");
  const [copyFrom, setCopyFrom] = useState(false);
  const [selectedCopyRole, setSelectedCopyRole] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editRole) {
      setRoleName(editRole.roleName);
      setRoleKey(editRole.roleNameKey);
      setCopyFrom(false);
      setSelectedCopyRole("");
    } else {
      setRoleName("");
      setRoleKey("");
      setCopyFrom(false);
      setSelectedCopyRole("");
    }
  }, [editRole, isOpen]);

  const handleSave = async () => {
    if (roleName && roleKey) {
      setLoading(true);
      
      let permissionsToCopy = {};
      const token = getAuthToken();
      const headers = { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };
      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      
      // If copying from existing role, fetch its permissions
      if (copyFrom && selectedCopyRole) {
        try {
          const roleToCopy = allRoles.find(r => r.roleNameKey === selectedCopyRole);
          if (roleToCopy && roleToCopy._id) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_PATH}/api/role/${roleToCopy._id}`, {
              headers: headers,
            });
            if (res.ok) {
              const data = await res.json();
              permissionsToCopy = data.data?.Permissions || {};
            }
          }
        } catch (err) {
          console.error("Error fetching role permissions:", err);
        }
      }

      const roleData = {
        roleName,
        roleNameKey: roleKey.toUpperCase().replace(/\s+/g, '_'),
        Permissions: permissionsToCopy
      };

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_PATH}/api/role`, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(roleData),
        });
        
        if (res.ok) {
          onCreate(roleData);
          setRoleName("");
          setRoleKey("");
          setCopyFrom(false);
          setSelectedCopyRole("");
          onClose();
        } else {
          const result = await res.json();
          console.error("Error creating role:", result);
          alert("Failed to create role. Please try again.");
        }
      } catch (err) {
        console.error("Error creating role:", err);
        alert("Failed to create role. Please check your connection.");
      }
      
      setLoading(false);
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
                    <input 
                      type="radio" 
                      name="copyOption" 
                      checked={copyFrom} 
                      onChange={() => setCopyFrom(true)} 
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      name="copyOption" 
                      checked={!copyFrom} 
                      onChange={() => setCopyFrom(false)} 
                    />
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
                      {allRoles.map((role) => (
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
                disabled={!roleName || !roleKey || loading}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition flex items-center justify-center"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : editRole ? (
                  'Update Role'
                ) : (
                  'Create Role'
                )}
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
  const [permissions, setPermissions] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && role) {
      const fetchPermissions = async () => {
        try {
          setLoading(true);
          const token = getAuthToken();
          const headers = { 
            'Accept': 'application/json'
          };
          
          if (token) {
            headers.Authorization = `Bearer ${token}`;
          }
          
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_PATH}/api/role/${role._id}`, {
            headers: headers,
          });
          if (!res.ok) {
            throw new Error('Failed to fetch');
          }
          const data = await res.json();
          setPermissions(data.data?.Permissions || {});
        } catch (err) {
          console.log("Error fetching permissions:", err);
          setPermissions({});
        } finally {
          setLoading(false);
        }
      };
      fetchPermissions();
    }
  }, [isOpen, role]);

  const renderPermissionMatrix = () => {
    if (Object.keys(permissions).length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          No permissions configured for this role
        </div>
      );
    }

    return Object.entries(permissions).map(([serviceName, servicePermissions]) => (
      <div key={serviceName} className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3 text-lg bg-gray-50 p-3 rounded-lg">
          {serviceName} Service
        </h4>
        <div className="space-y-4">
          {Object.entries(servicePermissions).map(([moduleName, modulePermissions]) => (
            <div key={moduleName} className="border border-gray-200 rounded-lg p-4 bg-white">
              <h5 className="font-medium text-gray-900 mb-3">{moduleName}</h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(modulePermissions).map(([permissionKey, isEnabled]) => (
                  <div 
                    key={`${moduleName}-${permissionKey}`} 
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      isEnabled ? 'text-green-600 bg-green-50 border-green-200' : 'text-gray-600 bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${isEnabled ? 'bg-green-500' : 'bg-gray-400'}`} />
                      <span className="text-sm font-medium capitalize">
                        {permissionKey}
                      </span>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      isEnabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {isEnabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    ));
  };

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
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-green-600" />
                <span className="ml-2 text-gray-600">Loading permissions...</span>
              </div>
            ) : (
              renderPermissionMatrix()
            )}
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

// Manage Role Permissions Modal
const ManageRoleModal = ({ isOpen, onClose, role, onSave, allRoles = [] }) => {
  const [selectedService, setSelectedService] = useState("CONSTRUCTION");
  const [modulePermissions, setModulePermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedRole, setSelectedRole] = useState(""); // For dropdown selection

  // Initialize when modal opens
  useEffect(() => {
    if (isOpen) {
      const initialPermissions = hardcodedModules.map(module => ({
        ...module,
        permissions: getDefaultModulePermissions()
      }));
      setModulePermissions(initialPermissions);
      setSelectedService("CONSTRUCTION");
      setSelectedRole(role ? role._id : ""); // Set selected role if provided
    }
  }, [isOpen, role]);

  // Fetch existing permissions when role is selected or changed
  useEffect(() => {
    if (isOpen && selectedRole && allRoles && allRoles.length > 0) {
      const fetchExistingPermissions = async () => {
        setLoading(true);
        try {
          const token = getAuthToken();
          const headers = { 
            'Accept': 'application/json'
          };
          
          if (token) {
            headers.Authorization = `Bearer ${token}`;
          }
          
          const roleObj = allRoles.find(r => r._id === selectedRole);
          
          if (roleObj) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_PATH}/api/role/${selectedRole}`, {
              headers: headers,
            });
            if (res.ok) {
              const data = await res.json();
              const existingPermissions = data.data?.Permissions || {};
              
              // Update module permissions based on existing data
              const updatedModules = hardcodedModules.map(module => {
                const servicePerms = existingPermissions[selectedService] || {};
                const modulePerms = servicePerms[module.name] || getDefaultModulePermissions();
                
                return {
                  ...module,
                  permissions: modulePerms
                };
              });
              
              setModulePermissions(updatedModules);
            }
          }
        } catch (err) {
          console.error("Error fetching permissions:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchExistingPermissions();
    }
  }, [isOpen, selectedRole, selectedService, allRoles]);

  const togglePermission = (moduleId, permissionKey) => {
    setModulePermissions(prev => 
      prev.map(module => {
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
      })
    );
  };

  const toggleAllPermissions = (moduleId) => {
    setModulePermissions(prev =>
      prev.map(module => {
        if (module.id === moduleId) {
          const allChecked = Object.values(module.permissions).every(Boolean);
          const newPermissions = {};
          Object.keys(module.permissions).forEach(key => {
            newPermissions[key] = !allChecked;
          });
          return { ...module, permissions: newPermissions };
        }
        return module;
      })
    );
  };

  const isModuleFullySelected = (module) => {
    return Object.values(module.permissions).every(Boolean);
  };

  const isModulePartiallySelected = (module) => {
    const values = Object.values(module.permissions);
    return values.some(Boolean) && !values.every(Boolean);
  };

  const handleSave = async () => {
    if (!selectedRole) return;
    
    setSaving(true);
    try {
      const token = getAuthToken();
      const headers = { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };
      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      // Prepare permissions in the required format
      const permissionsData = {
        [selectedService]: {}
      };

      modulePermissions.forEach(module => {
        permissionsData[selectedService][module.name] = module.permissions;
      });

      // Send PATCH request to update permissions
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_PATH}/api/role/${selectedRole}`, {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify({ 
          Permissions: permissionsData
        }),
      });

      if (res.ok) {
        onSave(permissionsData);
        onClose();
      } else {
        throw new Error('Failed to save permissions');
      }
    } catch (err) {
      console.error("Error saving permissions:", err);
      alert("Failed to save permissions. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Add null check for allRoles
  const currentRole = allRoles ? allRoles.find(r => r._id === selectedRole) : null;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white">
            <h3 className="text-lg font-semibold">
              Manage Permissions - {currentRole ? currentRole.roleName : 'Select Role'}
            </h3>
            <button onClick={onClose} className="p-1 hover:bg-blue-700 rounded transition">
              <X size={20} />
            </button>
          </div>
          
          <div className="p-6 overflow-y-auto max-h-[70vh]">
            {/* Role Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Role</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a Role</option>
                {allRoles && allRoles.map((roleItem) => (
                  <option key={roleItem._id} value={roleItem._id}>
                    {roleItem.roleName}
                  </option>
                ))}
              </select>
            </div>

            {/* Service Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={!selectedRole}
              >
                <option value="CONSTRUCTION">CONSTRUCTION</option>
                <option value="DESIGN">DESIGN</option>
                <option value="CONSULTING">CONSULTING</option>
              </select>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                <span className="ml-2 text-gray-600">Loading permissions...</span>
              </div>
            ) : (
              selectedRole && (
                <div className="space-y-3">
                  {modulePermissions.map((module) => {
                    const isFullySelected = isModuleFullySelected(module);
                    const isPartiallySelected = isModulePartiallySelected(module);
                    
                    return (
                      <div key={module.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        {/* Module Header with Select All Checkbox */}
                        <div className="flex items-center p-4 bg-gray-50 border-b">
                          <div className="flex items-center gap-3 flex-1">
                            <div className="relative">
                              <input
                                type="checkbox"
                                checked={isFullySelected}
                                ref={(el) => { 
                                  if (el) el.indeterminate = isPartiallySelected && !isFullySelected; 
                                }}
                                onChange={() => toggleAllPermissions(module.id)}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-900">{module.name}</span>
                          </div>
                        </div>

                        {/* Individual Permissions */}
                        <div className="p-4">
                          <div className="flex flex-wrap gap-6">
                            {Object.entries(module.permissions).map(([permissionKey, isChecked]) => (
                              <label key={permissionKey} className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => togglePermission(module.id, permissionKey)}
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                />
                                <span className="text-sm text-gray-700 capitalize">
                                  {permissionKey}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )
            )}
          </div>

          <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
            <button 
              onClick={onClose} 
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-white transition"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              disabled={loading || saving || !selectedRole}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition flex items-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Permissions'
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Loading Components
const TableLoadingSkeleton = ({ rows = 5, columns = 5 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex space-x-4 animate-pulse">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div
              key={colIndex}
              className={`h-4 bg-gray-200 rounded ${colIndex === 0 ? 'flex-1' : 'w-20'}`}
            ></div>
          ))}
        </div>
      ))}
    </div>
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
  const [showViewModal, setShowViewModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [editRole, setEditRole] = useState(null);
  const [manageSelectedRole, setManageSelectedRole] = useState(null);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [statusFilter, setStatusFilter] = useState("all");

  const [loadingRoles, setLoadingRoles] = useState(true);
  const [error, setError] = useState(null);
  const [allRoles, setAllRoles] = useState([]);

  // Fetch roles on component mount
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setLoadingRoles(true);
        setError(null);
        const token = getAuthToken();
        const headers = { 
          'Accept': 'application/json'
        };
        
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
        
        const roleRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_PATH}/api/role`, {
          headers: headers,
        });
        
        if (!roleRes.ok) {
          throw new Error('Failed to fetch roles');
        }
        const roleData = await roleRes.json();
        
        let rolesArray = [];
        if (roleData.data && Array.isArray(roleData.data)) {
          rolesArray = roleData.data;
        } else if (Array.isArray(roleData)) {
          rolesArray = roleData;
        }
        
        setAllRoles(rolesArray);
      } catch (err) {
        console.error("Error fetching roles:", err);
        setError(err.message);
      } finally {
        setLoadingRoles(false);
      }
    };

    fetchRoles();
  }, []);

  // Filter roles based on search and status
  const filteredRoles = useMemo(() => {
    let filtered = allRoles;
    
    // Apply search filter
    if (search) {
      filtered = filtered.filter(role => 
        role.roleName.toLowerCase().includes(search.toLowerCase()) ||
        role.roleNameKey.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(role => 
        role.status === statusFilter || (!role.status && statusFilter === "Active")
      );
    }
    
    return filtered;
  }, [allRoles, search, statusFilter]);

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

  // Delete/Deactivate Role Function
  const handleDeactivateRole = async (roleId) => {
    if (!confirm('Are you sure you want to deactivate this role? This will make the role inactive.')) {
      return;
    }

    try {
      const token = getAuthToken();
      const headers = { 
        'Accept': 'application/json'
      };
      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      // Send PATCH request to deactivate role
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_PATH}/api/role/${roleId}/deactivate`, {
        method: "PATCH",
        headers: headers,
      });

      if (res.ok) {
        // Update local state
        setAllRoles(allRoles.map(role => {
          if (role._id === roleId) {
            return {
              ...role,
              status: "Inactive"
            };
          }
          return role;
        }));
        alert('Role deactivated successfully!');
      } else {
        const errorText = await res.text();
        throw new Error(`Failed to deactivate role: ${errorText}`);
      }
    } catch (err) {
      console.error("Error deactivating role:", err);
      alert("Failed to deactivate role. Please try again.");
    }
  };

  // Activate Role Function
  const handleActivateRole = async (roleId) => {
    try {
      const token = getAuthToken();
      const headers = { 
        'Accept': 'application/json'
      };
      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      // Send PATCH request to activate role
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_PATH}/api/role/${roleId}/deactivate`, {
        method: "PATCH",
        headers: headers,
      });

      if (res.ok) {
        // Update local state
        setAllRoles(allRoles.map(role => {
          if (role._id === roleId) {
            return {
              ...role,
              status: "Active"
            };
          }
          return role;
        }));
        alert('Role activated successfully!');
      } else {
        const errorText = await res.text();
        throw new Error(`Failed to activate role: ${errorText}`);
      }
    } catch (err) {
      console.error("Error activating role:", err);
      alert("Failed to activate role. Please try again.");
    }
  };

  const handleCreateRole = async (data) => {
    try {
      const token = getAuthToken();
      const headers = { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };
      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_PATH}/api/role`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });
      
      if (res.ok) {
        // Refetch roles to get updated list
        const newRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_PATH}/api/role`, {
          headers: headers,
        });
        const newData = await newRes.json();
        
        let updatedRoles = [];
        if (newData.data && Array.isArray(newData.data)) {
          updatedRoles = newData.data;
        } else if (Array.isArray(newData)) {
          updatedRoles = newData;
        }
        
        setAllRoles(updatedRoles);
        setTimeout(() => {
          alert(`Role "${data.roleName}" created successfully!`);
        }, 100);
      } else {
        const result = await res.json();
        console.error("Error creating role:", result);
        alert("Failed to create role. Please try again.");
      }
    } catch (err) {
      console.error("Internal server error", err);
      alert("Failed to create role. Please check your connection.");
    }
  };

  const handleUpdateRole = async (roleId, data) => {
    try {
      const token = getAuthToken();
      const headers = { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };
      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_PATH}/api/role/${roleId}`, {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify(data),
      });
      
      if (res.ok) {
        setAllRoles(allRoles.map(role => {
          if (role._id === roleId) {
            return {
              ...role,
              roleName: data.roleName,
              roleNameKey: data.roleNameKey
            };
          }
          return role;
        }));
        setTimeout(() => {
          alert(`Role "${data.roleName}" updated successfully!`);
        }, 100);
      }
    } catch (err) {
      console.error("Error updating role:", err);
      alert("Failed to update role. Please try again.");
    }
  };

  const handleSavePermissions = (permissionsData) => {
    // Update local state if needed
    console.log("Permissions saved:", permissionsData);
    alert("Permissions updated successfully!");
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

  const renderTabContent = () => {
    if (error) {
      return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="text-red-600 mb-4">
            <Shield size={48} className="mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Error Loading Data</h3>
            <p className="text-gray-600">{error}</p>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      );
    }

    switch (activeTab) {
      case "roles":
        return (
          <div className="space-y-4">
            {/* Action Buttons Row */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowCreateEditModal(true)} 
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  <Plus size={20} /> Create Role
                </button>
                <button 
                  onClick={() => setShowManageModal(true)} 
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
                >
                  <Settings size={20} /> Manage Role Permissions
                </button>
              </div>
            </div>
            
            {loadingRoles ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
                </div>
                <TableLoadingSkeleton rows={5} columns={5} />
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 cursor-pointer" onClick={() => handleSort("name")}>
                          <div className="flex items-center gap-2">Role Name <SortIcon column="name" /></div>
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          <div className="flex items-center gap-2">
                            Status
                            <select 
                              value={statusFilter} 
                              onChange={(e) => setStatusFilter(e.target.value)}
                              className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <option value="all">All</option>
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
                            </select>
                          </div>
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 cursor-pointer" onClick={() => handleSort("users")}>
                          <div className="flex items-center gap-2">Users <SortIcon column="users" /></div>
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Last Modified</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredRoles.map((role) => (
                        <tr key={role._id} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-medium text-gray-900">{role.roleName}</div>
                              <div className="text-sm text-gray-500">{role.roleNameKey}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-1">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                role.status === "Active" || !role.status
                                  ? "bg-green-100 text-green-800 border border-green-200" 
                                  : "bg-red-100 text-red-800 border border-red-200"
                              }`}>
                                {role.status || "Active"}
                              </span>
                              {role.status === "Inactive" && (
                                <span className="text-xs text-gray-500">Click Activate to enable</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">{role.memberCount || "0"} users</td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {role.lastModified ? new Date(role.lastModified).toLocaleDateString() : "N/A"}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => { setSelectedRole(role); setShowViewModal(true); }} 
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition" 
                                title="View Permissions"
                              >
                                <Eye size={16} />
                              </button>
                              <button 
                                onClick={() => { setEditRole(role); setShowCreateEditModal(true); }} 
                                className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition" 
                                title="Edit Role"
                              >
                                <Pencil size={16} />
                              </button>
                              <button 
                                onClick={() => { setManageSelectedRole(role); setShowManageModal(true); }} 
                                className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition" 
                                title="Manage Permissions"
                              >
                                <Settings size={16} />
                              </button>
                              {role.status === "Active" || !role.status ? (
                                <button 
                                  onClick={() => handleDeactivateRole(role._id)} 
                                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition" 
                                  title="Deactivate Role"
                                >
                                  <Trash2 size={16} />
                                </button>
                              ) : (
                                <button 
                                  onClick={() => handleActivateRole(role._id)} 
                                  className="p-2 text-green-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition" 
                                  title="Activate Role"
                                >
                                  <span className="text-xs font-medium">Activate</span>
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
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
        allRoles={allRoles}
      />

      <ViewPermissionsModal
        isOpen={showViewModal}
        onClose={() => { setShowViewModal(false); setSelectedRole(null); }}
        role={selectedRole}
      />

      <ManageRoleModal
        isOpen={showManageModal}
        onClose={() => { setShowManageModal(false); setManageSelectedRole(null); }}
        role={manageSelectedRole}
        onSave={handleSavePermissions}
        allRoles={allRoles}
      />
    </div>
  );
}