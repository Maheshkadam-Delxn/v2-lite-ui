

// 'use client';

// import { useState, useMemo, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   Search, 
//   Eye, 
//   Pencil, 
//   Plus, 
//   Trash2, 
//   Settings,
//   Users,
//   Shield,
//   X,
//   User,
//   Key,
//   Calendar,
//   Phone,
//   Mail,
//   Activity,
//   Folder,
//   FileText,
//   AlertCircle,
//   DollarSign,
//   Tag,
//   Type,
//   Check,
//   ChevronDown,
//   ChevronUp
// } from "lucide-react";

// const roles = [
//   { 
//     id: 1,
//     name: "Project Admin", 
//     key: "PROJECT_ADMIN", 
//     status: "Active",
//     users: 12,
//     permissions: 45,
//     description: "Full administrative access to all project features",
//     lastModified: "2024-01-15"
//   },
//   { 
//     id: 2,
//     name: "Consultant", 
//     key: "CONSULTANT", 
//     status: "Active",
//     users: 8,
//     permissions: 25,
//     description: "Limited access for consulting activities",
//     lastModified: "2024-01-10"
//   },
//   { 
//     id: 3,
//     name: "Approver", 
//     key: "APPROVER", 
//     status: "Active",
//     users: 5,
//     permissions: 18,
//     description: "Can approve and review submissions",
//     lastModified: "2024-01-08"
//   },
//   { 
//     id: 4,
//     name: "Contractor", 
//     key: "CONTRACTOR", 
//     status: "Inactive",
//     users: 3,
//     permissions: 12,
//     description: "Basic access for contract workers",
//     lastModified: "2024-01-05"
//   },
//   { 
//     id: 5,
//     name: "Viewer", 
//     key: "VIEWER", 
//     status: "Active",
//     users: 25,
//     permissions: 8,
//     description: "Read-only access to project data",
//     lastModified: "2024-01-12"
//   },
// ];

// const members = [
//   {
//     id: 1,
//     name: "Alan David",
//     role: "Project Admin",
//     mobile: "+919764585655",
//     email: "vbjpa4378@acedby.com",
//     memberSince: "2024-01-15"
//   },
//   {
//     id: 2,
//     name: "Mukesh Sinha",
//     role: "Consultant",
//     mobile: "98563212225",
//     email: "vfkashoffice38@gmail.com",
//     memberSince: "2024-01-10"
//   },
//   {
//     id: 3,
//     name: "moteen",
//     role: "Consultant",
//     mobile: "+98765456787",
//     email: "mo3@gmail.com",
//     memberSince: "2024-01-08"
//   },
//   {
//     id: 4,
//     name: "Sonalika",
//     role: "Approver",
//     mobile: "69553635353",
//     email: "bldsov382@pricegh.com",
//     memberSince: "2024-01-05"
//   }
// ];

// const approvalWorkflows = [
//   {
//     id: 1,
//     project: "Granite Horizon",
//     approvalFor: "Alan David",
//     module: "Indent",
//     status: "Yes"
//   },
//   {
//     id: 2,
//     project: "Granite Horizon",
//     approvalFor: "Alan David",
//     module: "Bill Payment",
//     status: "Yes"
//   },
//   {
//     id: 3,
//     project: "Granite Horizon",
//     approvalFor: "Alan David",
//     module: "Document",
//     status: "Yes"
//   },
//   {
//     id: 4,
//     project: "Granite Horizon",
//     approvalFor: "Alan David",
//     module: "Drawing",
//     status: "Yes"
//   }
// ];

// const dashboardPermissions = [
//   {
//     id: 1,
//     title: "Not Started Activity",
//     project: "Granite Horizon",
//     role: "Project Admin",
//     type: "Counter"
//   },
//   {
//     id: 2,
//     title: "Drawings Under Review",
//     project: "Granite Horizon",
//     role: "Project Admin",
//     type: "Counter",
//     description: "Dashboard widget permission for Granite Horizon"
//   },
//   {
//     id: 3,
//     title: "Open GBN",
//     project: "Granite Horizon",
//     role: "Project Admin",
//     type: "Counter",
//     description: "Dashboard widget permission for Granite Horizon"
//   },
//   {
//     id: 4,
//     title: "Paid Bill",
//     project: "Granite Horizon",
//     role: "Project Admin",
//     type: "Counter",
//     description: "Dashboard widget permission for Granite Horizon"
//   }
// ];

// const modules = [
//   {
//     id: 1,
//     name: "Change BOQ",
//     permissions: {
//       add: false,
//       update: false,
//       delete: false,
//       view: false,
//       menuVisible: false
//     }
//   },
//   {
//     id: 2,
//     name: "Snagging Report(Parent-RFI)",
//     permissions: {
//       add: false,
//       update: false,
//       delete: false,
//       view: false,
//       menuVisible: false
//     }
//   },
//   {
//     id: 3,
//     name: "Material",
//     permissions: {
//       add: false,
//       update: false,
//       delete: false,
//       view: false,
//       menuVisible: false
//     }
//   },
//   {
//     id: 4,
//     name: "RFI",
//     permissions: {
//       add: false,
//       update: false,
//       delete: false,
//       view: false,
//       menuVisible: false
//     }
//   },
//   {
//     id: 5,
//     name: "Material Consumption Report(Parent-Daily Progress Reports)",
//     permissions: {
//       recordAccess: false,
//       close: false,
//       saveChanges: false
//     }
//   }
// ];

// const tabs = [
//   { id: "roles", name: "Role Permission", icon: Shield },
//   { id: "users", name: "User Permission", icon: Users },
//   { id: "workflow", name: "Approval Workflow", icon: Settings },
//   { id: "dashboard", name: "Dashboard Permission", icon: Eye },
// ];

// // Separate modal component to prevent re-renders
// const CreateRoleModal = ({ isOpen, onClose, onCreate }) => {
//   const [roleName, setRoleName] = useState("");
//   const [roleKey, setRoleKey] = useState("");
//   const [copyFrom, setCopyFrom] = useState(false);
//   const [selectedCopy, setSelectedCopy] = useState("");

//   const handleClose = useCallback(() => {
//     setRoleName("");
//     setRoleKey("");
//     setCopyFrom(false);
//     setSelectedCopy("");
//     onClose();
//   }, [onClose]);

//   const handleCreate = useCallback(() => {
//     if (roleName && roleKey) {
//       onCreate({ roleName, roleKey });
//       handleClose();
//     }
//   }, [roleName, roleKey, onCreate, handleClose]);

//   const handleCopyChange = useCallback((value) => {
//     setCopyFrom(value);
//     if (!value) {
//       setSelectedCopy("");
//       setRoleName("");
//       setRoleKey("");
//     }
//   }, []);

//   const handleRoleSelect = useCallback((selectedRoleName) => {
//     setSelectedCopy(selectedRoleName);
//     const selectedRole = roles.find((role) => role.name === selectedRoleName);
//     if (selectedRole) {
//       setRoleName(selectedRole.name);
//       setRoleKey(selectedRole.key);
//     }
//   }, []);

//   if (!isOpen) return null;

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//         onClick={handleClose}
//       >
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.9, opacity: 0 }}
//           className="bg-white rounded-2xl p-6 w-full max-w-md"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-semibold text-gray-800">Create New Role</h3>
//             <button
//               onClick={handleClose}
//               className="p-2 hover:bg-gray-100 rounded-lg transition"
//             >
//               <X size={16} />
//             </button>
//           </div>
          
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Role Name</label>
//               <input
//                 type="text"
//                 value={roleName}
//                 onChange={(e) => setRoleName(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Enter role name"
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Role Key</label>
//               <input
//                 type="text"
//                 value={roleKey}
//                 onChange={(e) => setRoleKey(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="ROLE_KEY"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Do you want to copy from existing role?
//               </label>
//               <div className="flex items-center space-x-4">
//                 <label className="flex items-center space-x-2">
//                   <input
//                     type="radio"
//                     name="copyOption"
//                     checked={copyFrom}
//                     onChange={() => handleCopyChange(true)}
//                   />
//                   <span>Yes</span>
//                 </label>
//                 <label className="flex items-center space-x-2">
//                   <input
//                     type="radio"
//                     name="copyOption"
//                     checked={!copyFrom}
//                     onChange={() => handleCopyChange(false)}
//                   />
//                   <span>No</span>
//                 </label>
//               </div>
//               {copyFrom && (
//                 <div className="mt-3">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Select role to copy
//                   </label>
//                   <select
//                     value={selectedCopy}
//                     onChange={(e) => handleRoleSelect(e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     <option value="">Select a role</option>
//                     {roles.map((role) => (
//                       <option key={role.id} value={role.name}>
//                         {role.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               )}
//             </div>
            
//             <div className="flex gap-3 pt-4">
//               <button
//                 onClick={handleClose}
//                 className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleCreate}
//                 disabled={!roleName || !roleKey}
//                 className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
//               >
//                 Create Role
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// // Manage Role Modal Component
// const ManageRoleModal = ({ isOpen, onClose, role, onSave }) => {
//   const [selectedRole, setSelectedRole] = useState("");
//   const [modulePermissions, setModulePermissions] = useState([]);
//   const [expandedModules, setExpandedModules] = useState({});

//   // Initialize modules when modal opens
//   useState(() => {
//     if (isOpen) {
//       setModulePermissions([...modules]);
//       // Expand all modules by default
//       const expanded = {};
//       modules.forEach(module => {
//         expanded[module.id] = true;
//       });
//       setExpandedModules(expanded);
//     }
//   }, [isOpen]);

//   const handleClose = useCallback(() => {
//     setSelectedRole("");
//     setModulePermissions([]);
//     setExpandedModules({});
//     onClose();
//   }, [onClose]);

//   const handleSave = useCallback(() => {
//     if (selectedRole) {
//       onSave({
//         role: selectedRole,
//         permissions: modulePermissions
//       });
//       handleClose();
//     }
//   }, [selectedRole, modulePermissions, onSave, handleClose]);

//   const toggleModule = useCallback((moduleId) => {
//     setExpandedModules(prev => ({
//       ...prev,
//       [moduleId]: !prev[moduleId]
//     }));
//   }, []);

//   const togglePermission = useCallback((moduleId, permissionKey) => {
//     setModulePermissions(prev => 
//       prev.map(module => {
//         if (module.id === moduleId) {
//           return {
//             ...module,
//             permissions: {
//               ...module.permissions,
//               [permissionKey]: !module.permissions[permissionKey]
//             }
//           };
//         }
//         return module;
//       })
//     );
//   }, []);

//   const toggleAllPermissions = useCallback((moduleId) => {
//     setModulePermissions(prev => 
//       prev.map(module => {
//         if (module.id === moduleId) {
//           const currentPermissions = module.permissions;
//           const allSelected = Object.values(currentPermissions).every(Boolean);
//           const newPermissions = {};
          
//           Object.keys(currentPermissions).forEach(key => {
//             newPermissions[key] = !allSelected;
//           });
          
//           return {
//             ...module,
//             permissions: newPermissions
//           };
//         }
//         return module;
//       })
//     );
//   }, []);

//   if (!isOpen) return null;

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//         onClick={handleClose}
//       >
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.9, opacity: 0 }}
//           className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="flex justify-between items-center p-6 border-b border-gray-200">
//             <h3 className="text-lg font-semibold text-gray-800">Manage Who Can View</h3>
//             <button
//               onClick={handleClose}
//               className="p-2 hover:bg-gray-100 rounded-lg transition"
//             >
//               <X size={16} />
//             </button>
//           </div>
          
//           <div className="p-6 overflow-y-auto max-h-[70vh]">
//             {/* Role Selection */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-3">Role</label>
//               <div className="flex flex-wrap gap-2">
//                 {roles.map((roleItem) => (
//                   <button
//                     key={roleItem.id}
//                     onClick={() => setSelectedRole(roleItem.name)}
//                     className={`px-4 py-2 rounded-lg border transition ${
//                       selectedRole === roleItem.name
//                         ? "bg-blue-500 text-white border-blue-500"
//                         : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
//                     }`}
//                   >
//                     {roleItem.name}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Module Permissions */}
//             <div className="space-y-3">
//               {modulePermissions.map((module) => (
//                 <div key={module.id} className="border border-gray-200 rounded-lg">
//                   {/* Module Header */}
//                   <div 
//                     className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer"
//                     onClick={() => toggleModule(module.id)}
//                   >
//                     <span className="font-medium text-gray-900">{module.name}</span>
//                     <div className="flex items-center gap-4">
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           toggleAllPermissions(module.id);
//                         }}
//                         className="text-sm text-blue-600 hover:text-blue-700 font-medium"
//                       >
//                         {Object.values(module.permissions).every(Boolean) ? 'Deselect All' : 'Select All'}
//                       </button>
//                       {expandedModules[module.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                     </div>
//                   </div>

//                   {/* Permissions Checkboxes */}
//                   {expandedModules[module.id] && (
//                     <div className="p-4 bg-white border-t border-gray-200">
//                       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//                         {Object.entries(module.permissions).map(([permissionKey, isChecked]) => (
//                           <label key={permissionKey} className="flex items-center space-x-2 cursor-pointer">
//                             <div className="relative">
//                               <input
//                                 type="checkbox"
//                                 checked={isChecked}
//                                 onChange={() => togglePermission(module.id, permissionKey)}
//                                 className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
//                               />
//                               {isChecked && (
//                                 <Check className="absolute top-0 left-0 w-4 h-4 text-white pointer-events-none" />
//                               )}
//                             </div>
//                             <span className="text-sm text-gray-700 capitalize">
//                               {permissionKey === 'menuVisible' ? 'Menu Visible' : 
//                                permissionKey === 'recordAccess' ? 'Record Access' :
//                                permissionKey === 'saveChanges' ? 'Save changes' : permissionKey}
//                             </span>
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Footer Actions */}
//           <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
//             <button
//               onClick={handleClose}
//               className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSave}
//               disabled={!selectedRole}
//               className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
//             >
//               Save Changes
//             </button>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// // View Permissions Modal Component
// const ViewPermissionsModal = ({ isOpen, onClose, role }) => {
//   const [modulePermissions, setModulePermissions] = useState([]);

//   useState(() => {
//     if (isOpen) {
//       // For demo, using sample permissions data
//       setModulePermissions([...modules].map(module => ({
//         ...module,
//         permissions: Object.keys(module.permissions).reduce((acc, key) => {
//           acc[key] = Math.random() > 0.5; // Random true/false for demo
//           return acc;
//         }, {})
//       })));
//     }
//   }, [isOpen]);

//   const handleClose = useCallback(() => {
//     setModulePermissions([]);
//     onClose();
//   }, [onClose]);

//   if (!isOpen) return null;

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//         onClick={handleClose}
//       >
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.9, opacity: 0 }}
//           className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="flex justify-between items-center p-6 border-b border-gray-200">
//             <h3 className="text-lg font-semibold text-gray-800">
//               Permissions for {role?.name || 'Role'}
//             </h3>
//             <button
//               onClick={handleClose}
//               className="p-2 hover:bg-gray-100 rounded-lg transition"
//             >
//               <X size={16} />
//             </button>
//           </div>
          
//           <div className="p-6 overflow-y-auto max-h-[70vh]">
//             <div className="space-y-4">
//               {modulePermissions.map((module) => (
//                 <div key={module.id} className="border border-gray-200 rounded-lg p-4">
//                   <h4 className="font-medium text-gray-900 mb-3">{module.name}</h4>
//                   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
//                     {Object.entries(module.permissions).map(([permissionKey, isEnabled]) => (
//                       <div key={permissionKey} className="flex items-center space-x-2">
//                         <div className={`w-3 h-3 rounded-full ${isEnabled ? 'bg-green-500' : 'bg-gray-300'}`} />
//                         <span className="text-sm text-gray-600 capitalize">
//                           {permissionKey === 'menuVisible' ? 'Menu Visible' : 
//                            permissionKey === 'recordAccess' ? 'Record Access' :
//                            permissionKey === 'saveChanges' ? 'Save changes' : permissionKey}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="flex justify-end p-6 border-t border-gray-200 bg-gray-50">
//             <button
//               onClick={handleClose}
//               className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//             >
//               Close
//             </button>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default function EnhancedPermissionsPage() {
//   const [activeTab, setActiveTab] = useState("roles");
//   const [search, setSearch] = useState("");
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showManageModal, setShowManageModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [selectedRole, setSelectedRole] = useState(null);
//   const [sortBy, setSortBy] = useState("name");
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [memberSearch, setMemberSearch] = useState("");

//   const filteredAndSortedRoles = useMemo(() => {
//     let filtered = roles.filter((role) => {
//       const matchesSearch = 
//         role.name.toLowerCase().includes(search.toLowerCase()) ||
//         role.key.toLowerCase().includes(search.toLowerCase()) ||
//         role.description.toLowerCase().includes(search.toLowerCase());
      
//       return matchesSearch;
//     });

//     return filtered.sort((a, b) => {
//       const multiplier = sortOrder === "asc" ? 1 : -1;
      
//       switch (sortBy) {
//         case "name":
//           return a.name.localeCompare(b.name) * multiplier;
//         case "users":
//           return (a.users - b.users) * multiplier;
//         case "permissions":
//           return (a.permissions - b.permissions) * multiplier;
//         case "lastModified":
//           return (new Date(a.lastModified).getTime() - new Date(b.lastModified).getTime()) * multiplier;
//         default:
//           return 0;
//       }
//     });
//   }, [search, sortBy, sortOrder]);

//   const filteredMembers = useMemo(() => {
//     return members.filter(member => 
//       member.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
//       member.role.toLowerCase().includes(memberSearch.toLowerCase()) ||
//       member.email.toLowerCase().includes(memberSearch.toLowerCase()) ||
//       member.mobile.includes(memberSearch)
//     );
//   }, [memberSearch]);

//   const openCreateModal = useCallback(() => {
//     setShowCreateModal(true);
//   }, []);

//   const openManageModal = useCallback((role = null) => {
//     setSelectedRole(role);
//     setShowManageModal(true);
//   }, []);

//   const openViewModal = useCallback((role) => {
//     setSelectedRole(role);
//     setShowViewModal(true);
//   }, []);

//   const handleCreateRole = useCallback((data) => {
//     console.log("Creating role:", data);
//     // After creating role, open manage modal
//     setTimeout(() => {
//       openManageModal({ name: data.roleName, key: data.roleKey });
//     }, 100);
//   }, [openManageModal]);

//   const handleSavePermissions = useCallback((data) => {
//     console.log("Saving permissions:", data);
//     // Save permissions logic here
//   }, []);

//   const handleCloseCreateModal = useCallback(() => {
//     setShowCreateModal(false);
//   }, []);

//   const handleCloseManageModal = useCallback(() => {
//     setShowManageModal(false);
//     setSelectedRole(null);
//   }, []);

//   const handleCloseViewModal = useCallback(() => {
//     setShowViewModal(false);
//     setSelectedRole(null);
//   }, []);

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header with Search and Actions */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
//         {/* Title */}
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Permissions Management</h1>
//           <p className="text-gray-600 mt-1">Manage roles, users, and access controls</p>
//         </div>

//         {/* Search + Actions */}
//         <div className="flex flex-col sm:flex-row gap-3">
//           {/* Search Box */}
//           <div className="relative w-full sm:w-64">
//             <Search className="absolute left-3 top-3 text-gray-400" size={18} />
//             <input
//               type="text"
//               placeholder="Search..."
//               value={activeTab === "users" ? memberSearch : search}
//               onChange={(e) =>
//                 activeTab === "users"
//                   ? setMemberSearch(e.target.value)
//                   : setSearch(e.target.value)
//               }
//               className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg 
//                          placeholder-gray-500 text-gray-900
//                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
//                          transition"
//             />
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-2">
//             <button
//               onClick={() => openManageModal()}
//               className="flex items-center gap-2 px-4 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
//             >
//               <Settings size={16} />
//               Manage Role
//             </button>

//             <button
//               onClick={openCreateModal}
//               className="flex items-center gap-2 px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//             >
//               <Plus size={16} />
//               Add Role
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex w-full bg-gray-100 p-1 rounded-xl mb-6">
//         {tabs.map((tab) => {
//           const Icon = tab.icon;
//           return (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-all flex-1 justify-center
//                 ${
//                   activeTab === tab.id
//                     ? "bg-blue-50 text-blue-600 shadow-sm"
//                     : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
//                 }`}
//             >
//               <Icon size={18} />
//               {tab.name}
//             </button>
//           );
//         })}
//       </div>

//       {/* Content based on active tab */}
//       {activeTab === "roles" && (
//         <div className="space-y-4">
//           {filteredAndSortedRoles.map((role, idx) => (
//             <motion.div
//               key={role.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: idx * 0.05 }}
//               whileHover={{ y: -2 }}
//               className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
//             >
//               <div className="p-6">
//                 <div className="flex items-start justify-between">
//                   <div className="flex-1">
//                     <div className="flex items-center gap-3 mb-3">
//                       <div className="p-2 bg-blue-50 rounded-lg">
//                         <Shield className="text-blue-600" size={20} />
//                       </div>
//                       <div>
//                         <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
//                         <p className="text-sm text-gray-600">{role.description}</p>
//                       </div>
//                       <span className={`ml-auto px-2.5 py-1 text-xs font-medium rounded-full ${
//                         role.status === "Active" 
//                           ? "bg-green-100 text-green-700" 
//                           : "bg-gray-100 text-gray-700"
//                       }`}>
//                         {role.status}
//                       </span>
//                     </div>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mt-4 pl-12">
//                       <div className="flex items-center gap-2">
//                         <Key size={16} className="text-gray-400" />
//                         <div>
//                           <p className="text-gray-500 text-xs">Role Key</p>
//                           <p className="font-mono text-gray-800 text-sm">{role.key}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <User size={16} className="text-gray-400" />
//                         <div>
//                           <p className="text-gray-500 text-xs">Users</p>
//                           <p className="font-semibold text-blue-600 text-sm">{role.users}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Shield size={16} className="text-gray-400" />
//                         <div>
//                           <p className="text-gray-500 text-xs">Permissions</p>
//                           <p className="font-semibold text-purple-600 text-sm">{role.permissions}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Calendar size={16} className="text-gray-400" />
//                         <div>
//                           <p className="text-gray-500 text-xs">Last Modified</p>
//                           <p className="text-gray-800 text-sm">{role.lastModified}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Actions */}
//                   <div className="flex items-center gap-2 ml-4">
//                     <button 
//                       onClick={() => openViewModal(role)}
//                       className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition" 
//                       title="View Permissions"
//                     >
//                       <Eye size={16} />
//                     </button>
//                     <button 
//                       onClick={() => openManageModal(role)}
//                       className="p-2 rounded-lg bg-yellow-50 hover:bg-yellow-100 text-yellow-600 transition" 
//                       title="Edit Permissions"
//                     >
//                       <Pencil size={16} />
//                     </button>
//                     <button className="p-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 transition" title="Manage">
//                       <Settings size={16} />
//                     </button>
//                     <button className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition" title="Delete">
//                       <Trash2 size={16} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           ))}

//           {filteredAndSortedRoles.length === 0 && (
//             <div className="text-center py-12">
//               <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Shield className="text-gray-400" size={24} />
//               </div>
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No roles found</h3>
//               <p className="text-gray-500 mb-4">Try adjusting your search criteria.</p>
//               <button
//                 onClick={openCreateModal}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//               >
//                 Create New Role
//               </button>
//             </div>
//           )}
//         </div>
//       )}

//       {activeTab === "users" && (
//         <div className="space-y-4">
//           {filteredMembers.map((member, idx) => (
//             <motion.div
//               key={member.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: idx * 0.05 }}
//               whileHover={{ y: -2 }}
//               className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
//             >
//               <div className="p-6">
//                 <div className="flex items-start justify-between">
//                   <div className="flex-1">
//                     <div className="flex items-center gap-3 mb-3">
//                       <div className="p-2 bg-blue-50 rounded-lg">
//                         <User className="text-blue-600" size={20} />
//                       </div>
//                       <div>
//                         <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
//                       </div>
//                       <span className="ml-auto px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
//                         Active
//                       </span>
//                     </div>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mt-4 pl-12">
//                       <div className="flex items-center gap-2">
//                         <User size={16} className="text-gray-400" />
//                         <div>
//                           <p className="text-gray-500 text-xs">Role Name</p>
//                           <p className="font-semibold text-gray-700 text-sm">{member.role}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Phone size={16} className="text-gray-400" />
//                         <div>
//                           <p className="text-gray-500 text-xs">Mobile Number</p>
//                           <p className="font-semibold text-gray-700 text-sm">{member.mobile}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Mail size={16} className="text-gray-400" />
//                         <div>
//                           <p className="text-gray-500 text-xs">Email ID</p>
//                           <p className="font-semibold text-gray-700 text-sm truncate">{member.email}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Calendar size={16} className="text-gray-400" />
//                         <div>
//                           <p className="text-gray-500 text-xs">Member Since</p>
//                           <p className="text-gray-700 text-sm">{member.memberSince}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Actions */}
//                   <div className="flex items-center gap-2 ml-4">
//                     <button className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition" title="View">
//                       <Eye size={16} />
//                     </button>
//                     <button className="p-2 rounded-lg bg-yellow-50 hover:bg-yellow-100 text-yellow-600 transition" title="Edit">
//                       <Pencil size={16} />
//                     </button>
//                     <button className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition" title="Delete">
//                       <Trash2 size={16} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           ))}

//           {filteredMembers.length === 0 && (
//             <div className="text-center py-12">
//               <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <User className="text-gray-400" size={24} />
//               </div>
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No members found</h3>
//               <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria.</p>
//               <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
//                 Add New Member
//               </button>
//             </div>
//           )}
//         </div>
//       )}

//       {activeTab === "workflow" && (
//         <div className="space-y-4">
//           {approvalWorkflows.map((workflow, idx) => (
//             <motion.div
//               key={workflow.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: idx * 0.05 }}
//               className="bg-white rounded-xl border border-gray-200 p-6"
//             >
//               <div className="flex items-start justify-between">
//                 <div className="flex-1">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                     Project : {workflow.project}
//                   </h3>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div>
//                       <p className="text-gray-500 text-sm mb-1">Approval For</p>
//                       <p className="font-medium text-gray-900">{workflow.approvalFor}</p>
//                     </div>
//                     <div>
//                       <p className="text-gray-500 text-sm mb-1">Module</p>
//                       <p className="font-medium text-gray-900">{workflow.module}</p>
//                     </div>
//                     <div>
//                       <p className="text-gray-500 text-sm mb-1">Status</p>
//                       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                         {workflow.status}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Actions */}
//                 <div className="flex items-center gap-2 ml-4">
//                   <button className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition" title="View">
//                     <Eye size={16} />
//                   </button>
//                   <button className="p-2 rounded-lg bg-yellow-50 hover:bg-yellow-100 text-yellow-600 transition" title="Edit">
//                     <Pencil size={16} />
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       )}

//       {activeTab === "dashboard" && (
//         <div className="space-y-4">
//           {dashboardPermissions.map((permission, idx) => (
//             <motion.div
//               key={permission.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: idx * 0.05 }}
//               whileHover={{ y: -2 }}
//               className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
//             >
//               <div className="p-6">
//                 <div className="flex items-start justify-between">
//                   <div className="flex-1">
//                     <div className="flex items-center gap-3 mb-3">
//                       <div className="p-2 bg-blue-50 rounded-lg">
//                         {permission.title === "Not Started Activity" && <Activity className="text-blue-600" size={20} />}
//                         {permission.title === "Drawings Under Review" && <FileText className="text-blue-600" size={20} />}
//                         {permission.title === "Open GBN" && <AlertCircle className="text-blue-600" size={20} />}
//                         {permission.title === "Paid Bill" && <DollarSign className="text-blue-600" size={20} />}
//                       </div>
//                       <div>
//                         <h3 className="text-lg font-semibold text-gray-900">{permission.title}</h3>
//                         {permission.description && (
//                           <p className="text-sm text-gray-600">{permission.description}</p>
//                         )}
//                       </div>
//                       <span className="ml-auto px-2.5 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
//                         {permission.type}
//                       </span>
//                     </div>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mt-4 pl-12">
//                       <div className="flex items-center gap-2">
//                         <Folder size={16} className="text-gray-400" />
//                         <div>
//                           <p className="text-gray-500 text-xs">Project</p>
//                           <p className="font-semibold text-blue-600 text-sm">{permission.project}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <User size={16} className="text-gray-400" />
//                         <div>
//                           <p className="text-gray-500 text-xs">Role</p>
//                           <p className="text-gray-800 text-sm">{permission.role}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Tag size={16} className="text-gray-400" />
//                         <div>
//                           <p className="text-gray-500 text-xs">Title</p>
//                           <p className="text-gray-800 text-sm">{permission.title}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Type size={16} className="text-gray-400" />
//                         <div>
//                           <p className="text-gray-500 text-xs">Type</p>
//                           <p className="text-gray-800 text-sm">{permission.type}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Actions */}
//                   <div className="flex items-center gap-2 ml-4">
//                     <button className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition" title="View">
//                       <Eye size={16} />
//                     </button>
//                     <button className="p-2 rounded-lg bg-yellow-50 hover:bg-yellow-100 text-yellow-600 transition" title="Edit">
//                       <Pencil size={16} />
//                     </button>
//                     <button className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition" title="Delete">
//                       <Trash2 size={16} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       )}

//       {/* Pagination - Show only when there are items */}
//       {(filteredMembers.length > 0 || filteredAndSortedRoles.length > 0) && (
//         <div className="flex justify-center items-center gap-4 mt-8">
//           <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition">
//             Previous
//           </button>
//           <div className="flex items-center gap-2">
//             <button className="w-8 h-8 rounded-lg bg-blue-500 text-white text-sm font-medium">1</button>
//             <button className="w-8 h-8 rounded-lg border border-gray-300 text-gray-600 text-sm hover:bg-gray-50 transition">2</button>
//             <button className="w-8 h-8 rounded-lg border border-gray-300 text-gray-600 text-sm hover:bg-gray-50 transition">3</button>
//           </div>
//           <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition">
//             Next
//           </button>
//         </div>
//       )}

//       {/* Modals */}
//       <CreateRoleModal 
//         isOpen={showCreateModal}
//         onClose={handleCloseCreateModal}
//         onCreate={handleCreateRole}
//       />

//       <ManageRoleModal 
//         isOpen={showManageModal}
//         onClose={handleCloseManageModal}
//         role={selectedRole}
//         onSave={handleSavePermissions}
//       />

//       <ViewPermissionsModal 
//         isOpen={showViewModal}
//         onClose={handleCloseViewModal}
//         role={selectedRole}
//       />
//     </div>
//   );
// }


// ... (keep all the existing imports and data arrays)



'use client';

import { useState, useMemo, useCallback, useEffect } from "react";
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
    email: "vbjpa4378@acedby.com",
    memberSince: "2024-01-15"
  },
  {
    id: 2,
    name: "Mukesh Sinha",
    role: "Consultant",
    mobile: "98563212225",
    email: "vfkashoffice38@gmail.com",
    memberSince: "2024-01-10"
  },
  {
    id: 3,
    name: "moteen",
    role: "Consultant",
    mobile: "+98765456787",
    email: "mo3@gmail.com",
    memberSince: "2024-01-08"
  },
  {
    id: 4,
    name: "Sonalika",
    role: "Approver",
    mobile: "69553635353",
    email: "bldsov382@pricegh.com",
    memberSince: "2024-01-05"
  }
];

const approvalWorkflows = [
  {
    id: 1,
    project: "Granite Horizon",
    approvalFor: "Alan David",
    module: "Indent",
    status: "Yes"
  },
  {
    id: 2,
    project: "Granite Horizon",
    approvalFor: "Alan David",
    module: "Bill Payment",
    status: "Yes"
  },
  {
    id: 3,
    project: "Granite Horizon",
    approvalFor: "Alan David",
    module: "Document",
    status: "Yes"
  },
  {
    id: 4,
    project: "Granite Horizon",
    approvalFor: "Alan David",
    module: "Drawing",
    status: "Yes"
  }
];

const dashboardPermissions = [
  {
    id: 1,
    title: "Not Started Activity",
    project: "Granite Horizon",
    role: "Project Admin",
    type: "Counter"
  },
  {
    id: 2,
    title: "Drawings Under Review",
    project: "Granite Horizon",
    role: "Project Admin",
    type: "Counter",
    description: "Dashboard widget permission for Granite Horizon"
  },
  {
    id: 3,
    title: "Open GBN",
    project: "Granite Horizon",
    role: "Project Admin",
    type: "Counter",
    description: "Dashboard widget permission for Granite Horizon"
  },
  {
    id: 4,
    title: "Paid Bill",
    project: "Granite Horizon",
    role: "Project Admin",
    type: "Counter",
    description: "Dashboard widget permission for Granite Horizon"
  }
];

const modules = [
  {
    id: 1,
    name: "Change BOQ",
    permissions: {
      add: false,
      update: false,
      delete: false,
      view: false,
      menuVisible: false
    }
  },
  {
    id: 2,
    name: "Snagging Report(Parent-RFI)",
    permissions: {
      add: false,
      update: false,
      delete: false,
      view: false,
      menuVisible: false
    },
    hasRecordAccess: true
  },
  {
    id: 3,
    name: "Material",
    permissions: {
      add: false,
      update: false,
      delete: false,
      view: false,
      menuVisible: false
    },
    hasRecordAccess: true
  },
  {
    id: 4,
    name: "RFI",
    permissions: {
      add: false,
      update: false,
      delete: false,
      view: false,
      menuVisible: false
    }
  },
  {
    id: 5,
    name: "Work Order",
    permissions: {
      add: false,
      update: false,
      delete: false,
      view: false,
      menuVisible: false
    },
    hasRecordAccess: true
  },
  {
    id: 6,
    name: "Advance Payment(Parent-Work Order)",
    permissions: {
      recordAccess: false,
      close: false,
      saveChanges: false
    }
  }
];

const tabs = [
  { id: "roles", name: "Role Permission", icon: Shield },
  { id: "users", name: "User Permission", icon: Users },
  { id: "workflow", name: "Approval Workflow", icon: Settings },
  { id: "dashboard", name: "Dashboard Permission", icon: Eye },
];

// Storage for role permissions
let rolePermissionsStorage = {
  "PROJECT_ADMIN": {
    "Change BOQ": { add: true, update: true, delete: true, view: true, menuVisible: true },
    "Snagging Report(Parent-RFI)": { add: true, update: true, delete: false, view: true, menuVisible: true, recordAccess: "all" },
    "Material": { add: false, update: false, delete: false, view: true, menuVisible: true, recordAccess: "specific" },
    "RFI": { add: false, update: false, delete: false, view: true, menuVisible: false },
    "Work Order": { add: true, update: true, delete: true, view: true, menuVisible: true, recordAccess: "all" },
    "Advance Payment(Parent-Work Order)": { recordAccess: true, close: true, saveChanges: true }
  },
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

  // Initialize form when modal opens or editRole changes
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

  const handleClose = useCallback(() => {
    setRoleName("");
    setRoleKey("");
    setCopyFrom(false);
    setSelectedCopyRole("");
    onClose();
  }, [onClose]);

  const handleSave = useCallback(() => {
    if (roleName && roleKey) {
      const roleData = {
        roleName,
        roleKey: roleKey.toUpperCase(),
        copyFrom: copyFrom ? selectedCopyRole : null
      };
      
      if (editRole) {
        onUpdate(editRole.id, roleData);
      } else {
        onCreate(roleData);
      }
      handleClose();
    }
  }, [roleName, roleKey, copyFrom, selectedCopyRole, editRole, onCreate, onUpdate, handleClose]);

  const handleCopyChange = useCallback((value) => {
    setCopyFrom(value);
    if (!value) {
      setSelectedCopyRole("");
    }
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl p-6 w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {editRole ? 'Edit Role' : 'Create New Role'}
            </h3>
            <button
              onClick={handleClose}
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
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter role name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role Key</label>
              <input
                type="text"
                value={roleKey}
                onChange={(e) => setRoleKey(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ROLE_KEY"
                disabled={!!editRole} // Disable key editing for existing roles
              />
              {editRole && (
                <p className="text-xs text-gray-500 mt-1">Role key cannot be changed for existing roles</p>
              )}
            </div>

            {!editRole && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Do you want to copy permissions from existing role?
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="copyOption"
                      checked={copyFrom}
                      onChange={() => handleCopyChange(true)}
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="copyOption"
                      checked={!copyFrom}
                      onChange={() => handleCopyChange(false)}
                    />
                    <span>No</span>
                  </label>
                </div>
                {copyFrom && (
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select role to copy permissions from
                    </label>
                    <select
                      value={selectedCopyRole}
                      onChange={(e) => setSelectedCopyRole(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a role</option>
                      {roles.map((role) => (
                        <option key={role.id} value={role.key}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}
            
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
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

// Manage Role Modal Component - For granting permissions
const ManageRoleModal = ({ isOpen, onClose, onSave }) => {
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedService, setSelectedService] = useState("CONSTRUCTION");
  const [modulePermissions, setModulePermissions] = useState([]);
  const [recordAccessSettings, setRecordAccessSettings] = useState({});

  // Initialize modules when modal opens
  useEffect(() => {
    if (isOpen) {
      // Start with default permissions (all false)
      const defaultPermissions = modules.map(module => ({
        ...module,
        permissions: { ...module.permissions }
      }));
      setModulePermissions(defaultPermissions);
      
      // Initialize record access settings
      const settings = {};
      modules.forEach(module => {
        if (module.hasRecordAccess) {
          settings[module.id] = 'all';
        }
      });
      setRecordAccessSettings(settings);
    }
  }, [isOpen]);

  // Load permissions when role is selected
  useEffect(() => {
    if (selectedRole && rolePermissionsStorage[selectedRole]) {
      const savedPermissions = rolePermissionsStorage[selectedRole];
      const updatedModules = modules.map(module => {
        const savedModule = savedPermissions[module.name];
        if (savedModule) {
          // Extract record access if present
          if (savedModule.recordAccess && module.hasRecordAccess) {
            setRecordAccessSettings(prev => ({
              ...prev,
              [module.id]: savedModule.recordAccess
            }));
          }
          
          return {
            ...module,
            permissions: { ...savedModule }
          };
        }
        return module;
      });
      setModulePermissions(updatedModules);
    } else if (selectedRole) {
      // Reset to default if no saved permissions
      const defaultPermissions = modules.map(module => ({
        ...module,
        permissions: { ...module.permissions }
      }));
      setModulePermissions(defaultPermissions);
    }
  }, [selectedRole]);

  const handleClose = useCallback(() => {
    setSelectedRole("");
    setSelectedService("CONSTRUCTION");
    setModulePermissions([]);
    setRecordAccessSettings({});
    onClose();
  }, [onClose]);

  const handleSave = useCallback(() => {
    if (selectedRole) {
      const permissionsData = {};
      modulePermissions.forEach(module => {
        permissionsData[module.name] = { 
          ...module.permissions,
          ...(module.hasRecordAccess && { recordAccess: recordAccessSettings[module.id] })
        };
      });
      
      onSave({
        role: selectedRole,
        service: selectedService,
        permissions: permissionsData
      });
      handleClose();
    }
  }, [selectedRole, selectedService, modulePermissions, recordAccessSettings, onSave, handleClose]);

  const togglePermission = useCallback((moduleId, permissionKey) => {
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
  }, []);

  const toggleModuleCheckbox = useCallback((moduleId) => {
    setModulePermissions(prev => 
      prev.map(module => {
        if (module.id === moduleId) {
          const allPermissions = Object.values(module.permissions);
          const allChecked = allPermissions.every(Boolean);
          const newPermissions = {};
          
          Object.keys(module.permissions).forEach(key => {
            newPermissions[key] = !allChecked;
          });
          
          return {
            ...module,
            permissions: newPermissions
          };
        }
        return module;
      })
    );
  }, []);

  const isModuleFullySelected = useCallback((module) => {
    return Object.values(module.permissions).every(Boolean);
  }, []);

  const isModulePartiallySelected = useCallback((module) => {
    const values = Object.values(module.permissions);
    return values.some(Boolean) && !values.every(Boolean);
  }, []);

  const handleRecordAccessChange = useCallback((moduleId, value) => {
    setRecordAccessSettings(prev => ({
      ...prev,
      [moduleId]: value
    }));
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white">
            <h3 className="text-lg font-semibold">Manage Role Permissions</h3>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-blue-700 rounded transition"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="p-6 overflow-y-auto max-h-[70vh]">
            {/* Role and Service Dropdowns */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Role to Manage</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Role</option>
                  {roles.map((roleItem) => (
                    <option key={roleItem.id} value={roleItem.key}>
                      {roleItem.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="CONSTRUCTION">CONSTRUCTION</option>
                  <option value="DESIGN">DESIGN</option>
                  <option value="CONSULTING">CONSULTING</option>
                </select>
              </div>
            </div>

            {selectedRole && (
              <>
                <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800">Granting permissions for: {roles.find(r => r.key === selectedRole)?.name}</h4>
                  <p className="text-blue-600 text-sm mt-1">Check the permissions you want to grant for each module</p>
                </div>

                {/* Module Permissions List */}
                <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                  {modulePermissions.map((module) => {
                    const isFullySelected = isModuleFullySelected(module);
                    const isPartiallySelected = isModulePartiallySelected(module);
                    
                    return (
                      <div key={module.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        {/* Module Row */}
                        <div className="flex items-center p-4">
                          {/* Module Checkbox and Name */}
                          <div className="flex items-center gap-3 flex-1">
                            <div className="relative">
                              <input
                                type="checkbox"
                                checked={isFullySelected}
                                ref={(el) => {
                                  if (el) {
                                    el.indeterminate = isPartiallySelected;
                                  }
                                }}
                                onChange={() => toggleModuleCheckbox(module.id)}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-900">{module.name}</span>
                          </div>

                          {/* Record Access Label (right aligned) */}
                          {module.hasRecordAccess && (
                            <div className="text-sm text-gray-600">
                              Record Access
                            </div>
                          )}
                        </div>

                        {/* Permission Checkboxes */}
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
                                  {permissionKey === 'menuVisible' ? 'Menu Visible' : 
                                  permissionKey === 'recordAccess' ? 'Record Access' :
                                  permissionKey === 'saveChanges' ? 'Save changes' : permissionKey}
                                </span>
                              </label>
                            ))}
                          </div>

                          {/* Radio buttons for modules with recordAccess */}
                          {module.hasRecordAccess && (
                            <div className="flex items-center gap-6 mt-3 pl-6">
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  name={`recordAccess-${module.id}`}
                                  checked={recordAccessSettings[module.id] === 'all'}
                                  onChange={() => handleRecordAccessChange(module.id, 'all')}
                                  className="w-4 h-4 text-blue-600"
                                />
                                <span className="text-sm text-gray-700">All Records</span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  name={`recordAccess-${module.id}`}
                                  checked={recordAccessSettings[module.id] === 'specific'}
                                  onChange={() => handleRecordAccessChange(module.id, 'specific')}
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

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={handleClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-white transition"
            >
              Close
            </button>
            <button
              onClick={handleSave}
              disabled={!selectedRole}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
            >
              Save Permissions
            </button>
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
      const roleKey = roles.find(r => r.name === role.name)?.key;
      if (roleKey && rolePermissionsStorage[roleKey]) {
        const permissionsData = modules.map(module => {
          const savedPermissions = rolePermissionsStorage[roleKey][module.name];
          return {
            ...module,
            permissions: savedPermissions || { ...module.permissions }
          };
        });
        setModulePermissions(permissionsData);
      } else {
        // Default view if no permissions set
        const defaultPermissions = modules.map(module => ({
          ...module,
          permissions: { ...module.permissions }
        }));
        setModulePermissions(defaultPermissions);
      }
    }
  }, [isOpen, role]);

  const handleClose = useCallback(() => {
    setModulePermissions([]);
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={handleClose}
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
              <h3 className="text-lg font-semibold">
                Permissions for {role?.name || 'Role'}
              </h3>
              <p className="text-green-100 text-sm mt-1">
                View all assigned permissions
              </p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-green-700 rounded-lg transition"
            >
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
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          isEnabled ? 'text-green-600 bg-green-50 border-green-200' : 'text-gray-600 bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${isEnabled ? 'bg-green-500' : 'bg-gray-400'}`} />
                          <span className="text-sm font-medium capitalize">
                            {permissionKey === 'menuVisible' ? 'Menu Visible' : 
                             permissionKey === 'recordAccess' ? 'Record Access' :
                             permissionKey === 'saveChanges' ? 'Save Changes' : 
                             permissionKey}
                          </span>
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          isEnabled 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
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

          <div className="flex justify-end p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
            >
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
  const [allRoles, setAllRoles] = useState(roles);

  const filteredAndSortedRoles = useMemo(() => {
    let filtered = allRoles.filter((role) => {
      const matchesSearch = 
        role.name.toLowerCase().includes(search.toLowerCase()) ||
        role.key.toLowerCase().includes(search.toLowerCase()) ||
        role.description.toLowerCase().includes(search.toLowerCase());
      
      return matchesSearch;
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
          return (new Date(a.lastModified).getTime() - new Date(b.lastModified).getTime()) * multiplier;
        default:
          return 0;
      }
    });
  }, [search, sortBy, sortOrder, allRoles]);

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

  const openCreateModal = useCallback(() => {
    setEditRole(null);
    setShowCreateEditModal(true);
  }, []);

  const openEditModal = useCallback((role) => {
    setEditRole(role);
    setShowCreateEditModal(true);
  }, []);

  const openManageModal = useCallback(() => {
    setShowManageModal(true);
  }, []);

  const openViewModal = useCallback((role) => {
    setSelectedRole(role);
    setShowViewModal(true);
  }, []);

  const handleCreateRole = useCallback((data) => {
    console.log("Creating role:", data);
    
    // Create new role
    const newRole = {
      id: allRoles.length + 1,
      name: data.roleName,
      key: data.roleKey,
      status: "Active",
      users: 0,
      permissions: 0,
      description: "Newly created role",
      lastModified: new Date().toISOString().split('T')[0]
    };

    // If copying permissions, copy from selected role
    if (data.copyFrom && rolePermissionsStorage[data.copyFrom]) {
      rolePermissionsStorage[data.roleKey] = { ...rolePermissionsStorage[data.copyFrom] };
      newRole.permissions = Object.keys(rolePermissionsStorage[data.copyFrom]).length * 5; // Estimate
    } else {
      rolePermissionsStorage[data.roleKey] = {};
      newRole.permissions = 0;
    }

    setAllRoles(prev => [...prev, newRole]);
    
    // Show success message
    setTimeout(() => {
      alert(`Role "${data.roleName}" created successfully! ${data.copyFrom ? 'Permissions copied.' : 'Use Manage Role to assign permissions.'}`);
    }, 100);
  }, [allRoles]);

  const handleUpdateRole = useCallback((roleId, data) => {
    console.log("Updating role:", roleId, data);
    
    setAllRoles(prev => prev.map(role => {
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

    // Show success message
    setTimeout(() => {
      alert(`Role "${data.roleName}" updated successfully!`);
    }, 100);
  }, []);

  const handleSavePermissions = useCallback((data) => {
    console.log("Saving permissions:", data);
    
    // Save permissions to storage
    rolePermissionsStorage[data.role] = data.permissions;
    
    // Update role permissions count
    setAllRoles(prev => prev.map(role => {
      if (role.key === data.role) {
        const permissionCount = Object.values(data.permissions).reduce((count, modulePerms) => {
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

    // Show success message
    setTimeout(() => {
      alert(`Permissions saved successfully for ${data.role}!`);
    }, 100);
  }, []);

  const handleCloseCreateEditModal = useCallback(() => {
    setShowCreateEditModal(false);
    setEditRole(null);
  }, []);

  const handleCloseManageModal = useCallback(() => {
    setShowManageModal(false);
  }, []);

  const handleCloseViewModal = useCallback(() => {
    setShowViewModal(false);
    setSelectedRole(null);
  }, []);

  const handleSort = useCallback((column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  }, [sortBy, sortOrder]);

  const SortIcon = useCallback(({ column }) => {
    if (sortBy !== column) return <ChevronDown size={16} className="opacity-30" />;
    return sortOrder === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  }, [sortBy, sortOrder]);

  // Render different content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "roles":
        return (
          <div className="space-y-4">
            {/* Roles Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th 
                        className="px-6 py-4 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                        onClick={() => handleSort("name")}
                      >
                        <div className="flex items-center gap-2">
                          Role Name
                          <SortIcon column="name" />
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th 
                        className="px-6 py-4 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                        onClick={() => handleSort("users")}
                      >
                        <div className="flex items-center gap-2">
                          Users
                          <SortIcon column="users" />
                        </div>
                      </th>
                      <th 
                        className="px-6 py-4 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                        onClick={() => handleSort("permissions")}
                      >
                        <div className="flex items-center gap-2">
                          Permissions
                          <SortIcon column="permissions" />
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredAndSortedRoles.map((role) => (
                      <tr key={role.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-gray-900">{role.name}</div>
                            <div className="text-sm text-gray-500">{role.key}</div>
                            <div className="text-sm text-gray-400 mt-1">{role.description}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            role.status === "Active" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-gray-100 text-gray-800"
                          }`}>
                            {role.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{role.users} users</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{role.permissions} permissions</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openViewModal(role)}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                              title="View Permissions"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => openEditModal(role)}
                              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition"
                              title="Edit Role"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                              title="Delete Role"
                            >
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
            {/* User Permissions Table */}
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
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {member.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="text-gray-900">{member.mobile}</div>
                            <div className="text-gray-500">{member.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {new Date(member.memberSince).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                              title="View User"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition"
                              title="Edit User"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                              title="Remove User"
                            >
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
            {/* Approval Workflow Table */}
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
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {workflow.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                              title="View Workflow"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition"
                              title="Edit Workflow"
                            >
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
            {/* Dashboard Permissions Table */}
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
                            {permission.description && (
                              <div className="text-sm text-gray-500 mt-1">{permission.description}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-900">{permission.project}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            {permission.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-900">{permission.type}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                              title="View Permission"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition"
                              title="Edit Permission"
                            >
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
      {/* Header with Search and Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Permissions Management</h1>
          <p className="text-gray-600 mt-1">Manage roles, users, and access permissions</p>
        </div>
        
        {/* Search and Action Buttons */}
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
              <button
                onClick={openCreateModal}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                <Plus size={20} />
                Create Role
              </button>
              <button
                onClick={openManageModal}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
              >
                <Pencil size={20} />
                Manage Role
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-6">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 transition ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600 bg-blue-50"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium whitespace-nowrap">{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}

      {/* Modals */}
      <CreateEditRoleModal
        isOpen={showCreateEditModal}
        onClose={handleCloseCreateEditModal}
        onCreate={handleCreateRole}
        onUpdate={handleUpdateRole}
        editRole={editRole}
      />

      <ManageRoleModal
        isOpen={showManageModal}
        onClose={handleCloseManageModal}
        onSave={handleSavePermissions}
      />

      <ViewPermissionsModal
        isOpen={showViewModal}
        onClose={handleCloseViewModal}
        role={selectedRole}
      />
    </div>
  );
}