// 'use client';

// import { useState, useEffect, useCallback, memo } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Search, Grid3X3, List, Filter, ChevronRight,
//   Users, Settings, Plus, Pencil, Clock, Briefcase, X, Trash2, Loader2,
//   Move, GripVertical
// } from 'lucide-react';

// const MembersPage = () => {
//   const apiBase = process.env.NEXT_PUBLIC_BACKEND_API_PATH || '';
//   const [activeTab, setActiveTab] = useState('All Members');
//   const [viewMode, setViewMode] = useState('grid');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterOpen, setFilterOpen] = useState(false);
//   const [expandedProjects, setExpandedProjects] = useState({});
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [selectedMember, setSelectedMember] = useState(null);
//   const [members, setMembers] = useState([]);
//   const [roles, setRoles] = useState([]);
//   const [projects, setProjects] = useState([]);

//   const initialMemberState = {
//     staffNumber: '',
//     name: '',
//     email: '',
//     phone: '',
//     department: '',
//     role: '',
//     status: 'Active',
//     prefferedLanguage: 'English',
//     service: '',
//     code: '',
//     grade: '',
//     discipline: '',
//     profileImage: '',
//     manager: '',
//     projects: [],
//   };

//   const [newMember, setNewMember] = useState(initialMemberState);

//   // Drag and drop states
//   const [availableProjects, setAvailableProjects] = useState([]);
//   const [selectedProjects, setSelectedProjects] = useState([]);
//   const [draggedProject, setDraggedProject] = useState(null);

//   // Memoized calculations
//   const memberStats = useCallback(() => [
//     { label: 'Total Members', value: members.length, change: '+2', icon: Users },
//     { label: 'Admins', value: members.filter(m => m.roleName === 'approver').length, change: '+0', icon: Settings },
//     { label: 'Consultants', value: members.filter(m => m.roleName === 'Consultant').length, change: '+1', icon: Users },
//     { label: 'Contractors', value: members.filter(m => m.roleName === 'Contractor').length, change: '+1', icon: Users }
//   ], [members]);

//   const tabs = useCallback(() => [
//     { name: 'All Members', count: members.length },
//     { name: 'Admins', count: members.filter(m => m.roleName === 'approver').length },
//     { name: 'Consultants', count: members.filter(m => m.roleName === 'Consultant').length },
//     { name: 'Contractors', count: members.filter(m => m.roleName === 'Contractor').length }
//   ], [members]);

//   const filteredMembers = useCallback(() => {
//     return members.filter((member) => {
//       const matchesSearch =
//         member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         member.roleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         member.status.toLowerCase().includes(searchTerm.toLowerCase());

//       if (activeTab === 'All Members') return matchesSearch;
//       return matchesSearch && member.roleName === activeTab;
//     });
//   }, [members, searchTerm, activeTab]);

//   const getRoleColor = (status) => {
//     switch (status) {
//       case 'Active':
//         return 'bg-green-100 text-green-700 border-green-200';
//       case 'Inactive':
//         return 'bg-red-100 text-red-700 border-red-200';
//       default:
//         return 'bg-gray-100 text-gray-700 border-gray-200';
//     }
//   };

//   const getIcon = (roleName) => {
//     switch (roleName) {
//       case 'approver':
//         return '👤';
//       case 'Consultant':
//         return '🧑‍💼';
//       case 'Contractor':
//         return '👷';
//       default:
//         return '👤';
//     }
//   };

//   const handleStatClick = (label) => {
//     if (label === 'Total Members') setActiveTab('All Members');
//     if (label === 'Admins') setActiveTab('approver');
//     if (label === 'Consultants') setActiveTab('Consultant');
//     if (label === 'Contractors') setActiveTab('Contractor');
//   };

//   const toggleProjects = (memberId) => {
//     setExpandedProjects((prev) => ({
//       ...prev,
//       [memberId]: !prev[memberId]
//     }));
//   };

//   // Drag and drop functions
//   const handleDragStart = (e, project, source) => {
//     setDraggedProject({ ...project, source });
//     e.dataTransfer.effectAllowed = 'move';
//     e.dataTransfer.setData('application/json', JSON.stringify(project));
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     e.dataTransfer.dropEffect = 'move';
//   };

//   const handleDrop = (e, target) => {
//     e.preventDefault();
//     if (!draggedProject) return;

//     try {
//       const projectData = JSON.parse(e.dataTransfer.getData('application/json'));

//       if (target === 'selected' && draggedProject.source === 'available') {
//         // Move from available to selected
//         setAvailableProjects(prev => prev.filter(p => p.id !== projectData.id));
//         setSelectedProjects(prev => [...prev, projectData]);
//       } else if (target === 'available' && draggedProject.source === 'selected') {
//         // Move from selected to available
//         setSelectedProjects(prev => prev.filter(p => p.id !== projectData.id));
//         setAvailableProjects(prev => [...prev, projectData]);
//       }
//     } catch (error) {
//       console.error('Error handling drop:', error);
//     }

//     setDraggedProject(null);
//   };

//   const handleSelectProject = (project) => {
//     setAvailableProjects(prev => prev.filter(p => p.id !== project.id));
//     setSelectedProjects(prev => [...prev, project]);
//   };

//   const handleDeselectProject = (project) => {
//     setSelectedProjects(prev => prev.filter(p => p.id !== project.id));
//     setAvailableProjects(prev => [...prev, project]);
//   };

//   const initializeDragDrop = useCallback((currentProjects = []) => {
//     const currentProjectIds = currentProjects.map(p => p.id || p);
//     const selected = projects.filter(p => currentProjectIds.includes(p.id));
//     const available = projects.filter(p => !currentProjectIds.includes(p.id));
//     setSelectedProjects(selected);
//     setAvailableProjects(available);
//   }, [projects]);

//   const fetchRoles = async () => {
//     try {
//       const res = await fetch(`${apiBase}/api/role`, {
//         headers: {
//           'Accept': 'application/json',
//         },
//       });
//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }
//       const contentType = res.headers.get('content-type');
//       if (!contentType || !contentType.includes('application/json')) {
//         throw new Error('Response is not JSON');
//       }
//       const { success, roles } = await res.json();
//       if (success) {
//         const mappedRoles = roles.map(r => ({
//           id: r._id,
//           name: r.name
//         }));
//         setRoles(mappedRoles);
//         console.log('Fetched roles:', mappedRoles);
//         return mappedRoles;
//       } else {
//         console.error('API error:', roles.message);
//         return [];
//       }
//     } catch (error) {
//       console.error('Failed to fetch roles:', error);
//       return [];
//     }
//   };

//   const fetchProjects = async () => {
//     try {
//       const token = localStorage.getItem('token') || '';
//       const headers = {
//         'Accept': 'application/json',
//       };
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       }
//       const res = await fetch(`${apiBase}/api/projects`, {
//         headers,
//       });
//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }
//       const contentType = res.headers.get('content-type');
//       if (!contentType || !contentType.includes('application/json')) {
//         throw new Error('Response is not JSON');
//       }
//       const { success, projects } = await res.json();
//       if (success) {
//         const mappedProjects = projects.map(p => ({
//           id: p._id,
//           name: p.name
//         }));
//         setProjects(mappedProjects);
//         console.log('Fetched projects:', mappedProjects);
//         return mappedProjects;
//       } else {
//         console.error('API error:', projects.message);
//         return [];
//       }
//     } catch (error) {
//       console.error('Failed to fetch projects:', error);
//       return [];
//     }
//   };

//   const fetchMembers = async (rolesData, projectsData) => {
//     try {
//       const token = localStorage.getItem('token') || '';
//       const headers = {
//         'Accept': 'application/json',
//       };
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       }
//       const res = await fetch(`${apiBase}/api/member`, {
//         headers,
//       });
//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }
//       const contentType = res.headers.get('content-type');
//       if (!contentType || !contentType.includes('application/json')) {
//         throw new Error('Response is not JSON');
//       }
//       const { success, data } = await res.json();
//       console.log('Fetched members:', data);
//       if (success) {
//         setMembers(data.map(m => {
//           const role = rolesData.find(r => r.id === (m.role?._id || m.role));
//           const roleName = role ? role.name : (typeof m.role === 'string' ? m.role : m.role?._id || 'Unknown');
//           const projectNames = (m.projects || []).map(projectId => {
//             const project = projectsData.find(p => p.id === projectId);
//             return project ? project.name : 'Unknown Project';
//           }).filter(name => name !== 'Unknown Project');

//           return {
//             id: m._id,
//             staffNumber: m.staffNumber,
//             name: m.name,
//             email: m.email,
//             phone: m.phone || '',
//             department: m.department || '',
//             role: m.role?._id || m.role || '',
//             roleName: roleName,
//             status: m.status || 'Active',
//             prefferedLanguage: m.prefferedLanguage || 'English',
//             service: m.service || '',
//             code: m.code || '',
//             grade: m.grade || '',
//             discipline: m.discipline || '',
//             profileImage: m.profileImage || '',
//             manager: m.manager?._id || m.manager || '',
//             managerName: m.managerName || 'None',
//             projects: m.projects || [],
//             projectNames: projectNames,
//             lastLogin: m.lastLogin || 'Not logged in yet',
//             avatar: m.profileImage || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=40&h=40&fit=crop',
//             icon: getIcon(roleName),
//           };
//         }));
//       } else {
//         console.error('API error:', data.message);
//       }
//     } catch (error) {
//       console.error('Failed to fetch members:', error);
//     }
//   };

//   useEffect(() => {
//     const initializeData = async () => {
//       try {
//         const [rolesData, projectsData] = await Promise.all([fetchRoles(), fetchProjects()]);
//         await fetchMembers(rolesData, projectsData);
//       } catch (error) {
//         console.error('Failed to initialize data:', error);
//       }
//     };
//     initializeData();
//   }, []);

//   const handleAddMember = async (e) => {
//     e.preventDefault();
//     try {
//       const token = sessionStorage.getItem('token') || '';
//       console.log("member token:",token);
//       const headers = {
//         'Content-Type': 'application/json',
//       };
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       }
//       const payload = {
//         ...newMember,
//         manager: newMember.manager || null,
//         status: newMember.status || 'Active',
//         projects: selectedProjects.map(p => p.id),
//       };
//       console.log('Add member payload:', payload);
//       const res = await fetch(`${apiBase}/api/member`, {
//         method: 'POST',
//         headers,
//         body: JSON.stringify(payload),
//       });
//       const text = await res.text();
//       console.log('Add member response:', text);
//       const data = JSON.parse(text);
//       if (data.success) {
//         const [rolesData, projectsData] = await Promise.all([fetchRoles(), fetchProjects()]);
//         await fetchMembers(rolesData, projectsData);
//         setIsAddModalOpen(false);
//         setNewMember(initialMemberState);
//         setSelectedProjects([]);
//         setAvailableProjects(projectsData);
//       } else {
//         alert(data.message || 'Failed to add member');
//       }
//     } catch (error) {
//       console.error('Failed to add member:', error, 'Response:', error.message);
//       alert('Failed to add member: ' + error.message);
//     }
//   };
// const handleEditMember = async (e) => {
//   e.preventDefault();
//   try {
//     const token = sessionStorage.getItem('token') || '';
//     const headers = {
//       'Content-Type': 'application/json',
//     };
//     if (token) {
//       headers['Authorization'] = `Bearer ${token}`;
//     }
//     const payload = {
//       ...selectedMember,
//       manager: selectedMember.manager || null,
//       status: selectedMember.status || 'Active',
//       projects: selectedProjects.map(p => p.id),
//     };
//     delete payload.id;
//     delete payload.roleName;
//     delete payload.managerName;
//     delete payload.projectNames;
//     delete payload.avatar;
//     delete payload.icon;
//     delete payload.lastLogin;
//     console.log('Edit member payload:', payload);
//     const res = await fetch(`${apiBase}/api/member/${selectedMember._id}`, {  // Use _id instead of staffNumber
//       method: 'PUT',
//       headers,
//       body: JSON.stringify(payload),
//     });
//     const text = await res.text();
//     console.log('Edit member response:', text);
//     if (!res.ok) {
//       throw new Error(`HTTP error! status: ${res.status}, response: ${text}`);
//     }
//     const contentType = res.headers.get('content-type');
//     if (!contentType || !contentType.includes('application/json')) {
//       throw new Error('Response is not JSON: ' + text);
//     }
//     const data = JSON.parse(text);
//     if (data.success) {
//       const [rolesData, projectsData] = await Promise.all([fetchRoles(), fetchProjects()]);
//       await fetchMembers(rolesData, projectsData);
//       setIsEditModalOpen(false);
//       setSelectedMember(null);
//       setSelectedProjects([]);
//       setAvailableProjects(projectsData);
//     } else {
//       alert(data.message || 'Failed to edit member');
//     }
//   } catch (error) {
//     console.error('Failed to edit member:', error, 'Response:', error.message);
//     alert('Failed to edit member: ' + error.message);
//   }
// };

//   const openEditModal = (member) => {
//     setSelectedMember({
//       ...member,
//       projects: member.projects || [],
//       status: member.status || 'Active',
//     });
//     initializeDragDrop(member.projects);
//     setIsEditModalOpen(true);
//   };

//   const openAddModal = () => {
//     setNewMember(initialMemberState);
//     initializeDragDrop();
//     setIsAddModalOpen(true);
//   };

//   // Stable input handlers to prevent unnecessary re-renders
//   const handleNewMemberChange = useCallback((field, value) => {
//     setNewMember(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   }, []);

//   const handleSelectedMemberChange = useCallback((field, value) => {
//     setSelectedMember(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   }, []);

//   // Custom scrollbar styles
//   const scrollbarStyles = `
//     .thin-scrollbar::-webkit-scrollbar {
//       width: 6px;
//       height: 6px;
//     }
//     .thin-scrollbar::-webkit-scrollbar-track {
//       background: #f1f5f9;
//       border-radius: 3px;
//     }
//     .thin-scrollbar::-webkit-scrollbar-thumb {
//       background: #cbd5e1;
//       border-radius: 3px;
//     }
//     .thin-scrollbar::-webkit-scrollbar-thumb:hover {
//       background: #94a3b8;
//     }
//   `;

//   // Memoized Components
//   const FormField = memo(({ label, children, className = '' }) => (
//     <div className={`mb-4 ${className}`}>
//       <label className="block text-sm font-medium text-black mb-2">{label}</label>
//       {children}
//     </div>
//   ));

//   FormField.displayName = 'FormField';

//   // Project Selection Component
//   const ProjectSelection = memo(() => (
//     <div className="mb-6">
//       <style jsx>{scrollbarStyles}</style>
//       <label className="block text-sm font-medium text-black mb-3">Projects</label>
//       <div className="grid grid-cols-2 gap-4 h-64">
//         {/* Available Projects */}
//         <div 
//           className="border-2 border-gray-300 rounded-xl p-4 bg-gradient-to-br from-gray-50 to-gray-100 thin-scrollbar"
//           onDragOver={handleDragOver}
//           onDrop={(e) => handleDrop(e, 'available')}
//         >
//           <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
//             <Move className="w-4 h-4" />
//             Available Projects
//           </h4>
//           <div className="space-y-2 h-48 overflow-y-auto thin-scrollbar">
//             {availableProjects.map((project) => (
//               <div
//                 key={project.id}
//                 draggable
//                 onDragStart={(e) => handleDragStart(e, project, 'available')}
//                 onDragEnd={() => setDraggedProject(null)}
//                 className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-move group hover:border-blue-300"
//               >
//                 <GripVertical className="w-4 h-4 text-gray-400 group-hover:text-blue-500 flex-shrink-0" />
//                 <span className="flex-1 text-sm text-gray-700 truncate">{project.name}</span>
//                 <button
//                   onClick={() => handleSelectProject(project)}
//                   className="px-2 py-1 bg-blue-500 text-white rounded-lg text-xs hover:bg-blue-600 transition-colors flex-shrink-0"
//                 >
//                   Add
//                 </button>
//               </div>
//             ))}
//             {availableProjects.length === 0 && (
//               <div className="text-center text-gray-500 text-sm py-8">
//                 No available projects
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Selected Projects */}
//         <div 
//           className="border-2 border-blue-300 rounded-xl p-4 bg-gradient-to-br from-blue-50 to-blue-100 thin-scrollbar"
//           onDragOver={handleDragOver}
//           onDrop={(e) => handleDrop(e, 'selected')}
//         >
//           <h4 className="text-sm font-medium text-blue-700 mb-3 flex items-center gap-2">
//             <Briefcase className="w-4 h-4" />
//             Selected Projects ({selectedProjects.length})
//           </h4>
//           <div className="space-y-2 h-48 overflow-y-auto thin-scrollbar">
//             {selectedProjects.map((project) => (
//               <div
//                 key={project.id}
//                 draggable
//                 onDragStart={(e) => handleDragStart(e, project, 'selected')}
//                 onDragEnd={() => setDraggedProject(null)}
//                 className="flex items-center gap-3 p-3 bg-white rounded-lg border border-blue-200 shadow-sm hover:shadow-md transition-all cursor-move group hover:border-blue-500"
//               >
//                 <GripVertical className="w-4 h-4 text-blue-400 group-hover:text-blue-600 flex-shrink-0" />
//                 <span className="flex-1 text-sm text-gray-700 truncate">{project.name}</span>
//                 <button
//                   onClick={() => handleDeselectProject(project)}
//                   className="px-2 py-1 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600 transition-colors flex-shrink-0"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//             {selectedProjects.length === 0 && (
//               <div className="text-center text-blue-500 text-sm py-8">
//                 Drag projects here or click "Add"
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <p className="text-xs text-gray-500 mt-2 text-center">
//         💡 Drag and drop projects between columns or use the Add/Remove buttons
//       </p>
//     </div>
//   ));

//   ProjectSelection.displayName = 'ProjectSelection';





//   const EditMemberModal = memo(() => (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
//       onClick={() => setIsEditModalOpen(false)}
//     >
//       <motion.div
//         initial={{ scale: 0.8, y: 50 }}
//         animate={{ scale: 1, y: 0 }}
//         exit={{ scale: 0.8, y: 50 }}
//         className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col thin-scrollbar"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
//           <div className="flex justify-between items-center">
//             <h2 className="text-2xl font-bold text-white">Edit Member</h2>
//             <button
//               onClick={() => setIsEditModalOpen(false)}
//               className="text-white hover:text-blue-100 transition-colors"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>
//         </div>

//         {/* Form Content */}
//         <div className="flex-1 overflow-y-auto p-6 thin-scrollbar">
//           <form onSubmit={handleEditMember}>
//             <div className="grid grid-cols-2 gap-6">
//               {/* Left Column */}
//               <div className="space-y-4">
//                 <FormField label="Staff Number">
//                   <input
//                     type="text"
//                     value={selectedMember.staffNumber}
//                     onChange={(e) => handleSelectedMemberChange('staffNumber', e.target.value)}
//                     placeholder="Enter staff number"
//                     className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 text-black bg-white"
//                     required
//                   />
//                 </FormField>

//                 <FormField label="Name">
//                   <input
//                     type="text"
//                     value={selectedMember.name}
//                     onChange={(e) => handleSelectedMemberChange('name', e.target.value)}
//                     placeholder="Enter name"
//                     className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 text-black bg-white"
//                     required
//                   />
//                 </FormField>

//                 <FormField label="Email">
//                   <input
//                     type="email"
//                     value={selectedMember.email}
//                     onChange={(e) => handleSelectedMemberChange('email', e.target.value)}
//                     placeholder="Enter email"
//                     className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 text-black bg-white"
//                     required
//                   />
//                 </FormField>

//                 <FormField label="Phone">
//                   <input
//                     type="text"
//                     value={selectedMember.phone}
//                     onChange={(e) => handleSelectedMemberChange('phone', e.target.value)}
//                     placeholder="Enter phone"
//                     className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 text-black bg-white"
//                   />
//                 </FormField>

//                 <FormField label="Department">
//                   <input
//                     type="text"
//                     value={selectedMember.department}
//                     onChange={(e) => handleSelectedMemberChange('department', e.target.value)}
//                     placeholder="Enter department"
//                     className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 text-black bg-white"
//                     required
//                   />
//                 </FormField>

//                 <FormField label="Role">
//                   <select
//                     value={selectedMember.role}
//                     onChange={(e) => handleSelectedMemberChange('role', e.target.value)}
//                     className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-black bg-white"
//                     required
//                   >
//                     <option value="">Select Role</option>
//                     {roles.map((role) => (
//                       <option key={role.id} value={role.id}>
//                         {role.name}
//                       </option>
//                     ))}
//                   </select>
//                 </FormField>
//               </div>

//               {/* Right Column */}
//               <div className="space-y-4">
//                 <FormField label="Status">
//                   <select
//                     value={selectedMember.status}
//                     onChange={(e) => handleSelectedMemberChange('status', e.target.value)}
//                     className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-black bg-white"
//                     required
//                   >
//                     <option value="Active">Active</option>
//                     <option value="Inactive">Inactive</option>
//                   </select>
//                 </FormField>

//                 <FormField label="Preferred Language">
//                   <select
//                     value={selectedMember.prefferedLanguage}
//                     onChange={(e) => handleSelectedMemberChange('prefferedLanguage', e.target.value)}
//                     className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-black bg-white"
//                   >
//                     <option value="English">English</option>
//                     <option value="Arabic">Arabic</option>
//                   </select>
//                 </FormField>

//                 <FormField label="Service">
//                   <input
//                     type="text"
//                     value={selectedMember.service}
//                     onChange={(e) => handleSelectedMemberChange('service', e.target.value)}
//                     placeholder="Enter service"
//                     className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 text-black bg-white"
//                     required
//                   />
//                 </FormField>

//                 <FormField label="Code">
//                   <input
//                     type="text"
//                     value={selectedMember.code}
//                     onChange={(e) => handleSelectedMemberChange('code', e.target.value)}
//                     placeholder="Enter code"
//                     className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 text-black bg-white"
//                   />
//                 </FormField>

//                 <FormField label="Grade">
//                   <input
//                     type="text"
//                     value={selectedMember.grade}
//                     onChange={(e) => handleSelectedMemberChange('grade', e.target.value)}
//                     placeholder="Enter grade"
//                     className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 text-black bg-white"
//                   />
//                 </FormField>

//                 <FormField label="Manager">
//                   <select
//                     value={selectedMember.manager}
//                     onChange={(e) => handleSelectedMemberChange('manager', e.target.value)}
//                     className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-black bg-white"
//                   >
//                     <option value="">No Manager</option>
//                     {members
//                       .filter(m => m.id !== selectedMember.id)
//                       .map((m) => (
//                         <option key={m.id} value={m.id}>
//                           {m.name}
//                         </option>
//                       ))}
//                   </select>
//                 </FormField>
//               </div>
//             </div>

//             {/* Additional Fields */}
//             <div className="grid grid-cols-2 gap-6 mt-4">
//               <FormField label="Discipline">
//                 <input
//                   type="text"
//                   value={selectedMember.discipline}
//                   onChange={(e) => handleSelectedMemberChange('discipline', e.target.value)}
//                   placeholder="Enter discipline"
//                   className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 text-black bg-white"
//                 />
//               </FormField>

//               <FormField label="Profile Image URL">
//                 <input
//                   type="text"
//                   value={selectedMember.profileImage}
//                   onChange={(e) => handleSelectedMemberChange('profileImage', e.target.value)}
//                   placeholder="Enter profile image URL"
//                   className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 text-black bg-white"
//                 />
//               </FormField>
//             </div>

//             {/* Project Selection */}
//             <ProjectSelection />

//             {/* Form Actions */}
//             <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 type="button"
//                 onClick={() => setIsEditModalOpen(false)}
//                 className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors"
//               >
//                 Cancel
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 type="submit"
//                 className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-md"
//               >
//                 Save Changes
//               </motion.button>
//             </div>
//           </form>
//         </div>
//       </motion.div>
//     </motion.div>
//   ));

//   EditMemberModal.displayName = 'EditMemberModal';

//   // Main content component to prevent re-renders
//   const MainContent = memo(() => {
//     const currentMemberStats = memberStats();
//     const currentTabs = tabs();
//     const currentFilteredMembers = filteredMembers();

//     const getIconColor = (label) => {
//       switch (label) {
//         case 'Total Members':
//           return 'text-blue-600';
//         case 'Admins':
//           return 'text-purple-600';
//         case 'Consultants':
//           return 'text-yellow-600';
//         case 'Contractors':
//           return 'text-orange-600';
//         default:
//           return 'text-gray-700';
//       }
//     };

//     return (
//       <>
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="mb-8"
//         >
//           <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">Members Overview</h1>
//               <p className="text-gray-600">Manage and track all your team members</p>
//             </div>
//             <div className="flex items-center gap-4">
//               <div className="relative w-64">
//                 <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search members..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-12 pr-6 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 font-medium placeholder:text-gray-400 text-gray-700"
//                 />
//               </div>
//               <div className="relative">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setFilterOpen(!filterOpen)}
//                   className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
//                 >
//                   <Filter className="w-4 h-4" />
//                   <span>Role</span>
//                 </motion.button>
//                 {filterOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-20">
//                     {currentTabs.map((tab) => (
//                       <button
//                         key={tab.name}
//                         onClick={() => { setActiveTab(tab.name); setFilterOpen(false); }}
//                         className={`flex items-center justify-between w-full px-4 py-2 text-sm ${activeTab === tab.name ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
//                       >
//                         {tab.name}
//                         <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{tab.count}</span>
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={openAddModal}
//                 className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
//               >
//                 <Plus className="w-4 h-4" />
//                 <span>Add Member</span>
//               </motion.button>
//               <div className="flex rounded-xl border-2 border-gray-300 p-1 bg-gray-100">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   onClick={() => setViewMode('grid')}
//                   className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' : 'text-gray-500 hover:text-gray-700'}`}
//                 >
//                   <Grid3X3 className="w-5 h-5" />
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   onClick={() => setViewMode('list')}
//                   className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' : 'text-gray-500 hover:text-gray-700'}`}
//                 >
//                   <List className="w-5 h-5" />
//                 </motion.button>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {currentMemberStats.map((stat, i) => {
//             const Icon = stat.icon;

//             return (
//               <motion.div
//                 whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
//                 transition={{ type: 'spring', stiffness: 300 }}
//                 key={i}
//                 onClick={() => handleStatClick(stat.label)}
//                 className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 flex items-center justify-between cursor-pointer"
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-xl flex items-center justify-center">
//                     <Icon className={`w-7 h-7 ${getIconColor(stat.label)}`} />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-bold text-gray-900">{stat.value}</h3>
//                     <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
//                       {stat.label}
//                     </p>
//                   </div>
//                 </div>
//                 <span className="text-xs font-medium text-green-600">{stat.change}</span>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* Member Cards */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//           className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8' : 'space-y-6'}
//         >
//           {currentFilteredMembers.map((member) => (
//             <motion.div
//               key={member.id}
//               whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
//               transition={{ type: 'spring', stiffness: 300 }}
//               className={`bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden ${viewMode === 'list' ? 'flex flex-col md:flex-row md:items-stretch gap-6' : 'flex flex-col'}`}
//             >





//               {/* Card Top - Blue Mask */}
//               <div className="bg-blue-600 px-6 py-8 relative overflow-hidden">
//                 <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
//                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-16 translate-x-16"></div>
//                 <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/20 rounded-full translate-y-12 -translate-x-12"></div>
//                 <div className="relative z-10">
//                   <div className="flex items-center gap-4 mb-4">
//                     <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl">
//                       {member.icon}
//                     </div>
//                     <div className="max-w-[250px]">
//                       <h3 className="font-bold text-xl text-white truncate">{member.name}</h3>
//                       <p className="text-blue-100 text-sm truncate">{member.email}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <span className={`inline-flex items-center gap-2 px-1 py-0.5 rounded-full text-xs font-medium border ${getRoleColor(member.status)}`}>
//                       {member.status}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               {/* Card Middle - Content */}
//               <div className={`p-6 flex-1 flex flex-col ${viewMode === 'list' ? 'md:w-2/3' : ''}`}>
//                 <div className="flex items-center gap-6 mb-4">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center p-2">
//                       <Users className="w-5 h-5 text-gray-700 font-bold" />
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Role</p>
//                       <p className="text-gray-900 text-sm font-semibold">{member.roleName}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center p-2">
//                       <Briefcase className="w-5 h-5 text-gray-700 font-bold" />
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Projects</p>
//                       <p className="text-gray-900 text-sm font-semibold">{member.projectNames.length}</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mb-4">
//                   <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">Assigned Projects</p>
//                   <div className="flex flex-wrap gap-2">
//                     {member.projectNames.length > 0 ? (
//                       (expandedProjects[member.id] ? member.projectNames : member.projectNames.slice(0, 3)).map((p, i) => (
//                         <span
//                           key={i}
//                           className="text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-700 font-medium"
//                         >
//                           {p}
//                         </span>
//                       ))
//                     ) : (
//                       <span className="text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-700 font-medium">
//                         No Projects Assigned
//                       </span>
//                     )}
//                     {member.projectNames.length > 3 && (
//                       <button
//                         onClick={() => toggleProjects(member.id)}
//                         className="text-xs px-2 py-1 rounded-md bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 transition"
//                       >
//                         {expandedProjects[member.id] ? '...less' : '...more'}
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//               {/* Card Bottom - Grey Mask */}
//               <div className="bg-gray-100 px-6 py-4 relative overflow-hidden">
//                 <div className="absolute inset-0 bg-gradient-to-tl from-white/10 to-transparent"></div>
//                 <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full -translate-y-12 translate-x-12"></div>
//                 <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/20 rounded-full translate-y-16 -translate-x-16"></div>
//                 <div className="relative z-10 flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <Clock className="w-5 h-5 text-gray-700" />
//                     <div>
//                       <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Last Login</p>
//                       <p className="text-gray-600 text-sm font-semibold">{member.lastLogin}</p>
//                     </div>
//                   </div>
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => openEditModal(member)}
//                     className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
//                   >
//                     Edit <Pencil className="w-4 h-4" />
//                   </motion.button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </>
//     );
//   });

//   MainContent.displayName = 'MainContent';

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <style jsx global>{scrollbarStyles}</style>
//       <div className="max-w-7xl mx-auto">
//         {/* Modals */}
//         <AnimatePresence>

//           {isEditModalOpen && selectedMember && <EditMemberModal />}
//         </AnimatePresence>

//         {/* Main Content */}
//         <MainContent />
//       </div>
//     </div>
//   );
// };

// export default MembersPage;

'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Grid3X3, List, Filter, ChevronRight,
  Users, Settings, Plus, Pencil, Clock, Briefcase, X, Trash2, Loader2,
  Move, GripVertical, User, Camera, FolderOpen, UserPlus, ChevronDown, Lightbulb, ArrowRight, Check
} from 'lucide-react';

const MembersPage = () => {
  const apiBase = process.env.NEXT_PUBLIC_BACKEND_API_PATH || '';
  const [activeTab, setActiveTab] = useState('All Members');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);
  const [isAddDepartmentModalOpen, setIsAddDepartmentModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [members, setMembers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [projects, setProjects] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [newRole, setNewRole] = useState({ name: '' });
  const [newDepartment, setNewDepartment] = useState({ name: '' });
  const [editDepartment, setEditDepartment] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return newMember.staffNumber.trim() && newMember.name.trim() && newMember.email.trim();
      case 2:
        return newMember.department.trim() && newMember.role.trim();
      case 3:
        return true; // Projects are optional
      default:
        return false;
    }
  };

  const [newMember, setNewMember] = useState({
    staffNumber: '',
    name: '',
    email: '',
    phone: '',
    department: '',
    role: '',
    code: '',
    grade: '',
    discipline: '',
    prefferedLanguage: 'English',
    service: '',
    profileImage: '',
    projects: [],
  });
  const [availableProjects, setAvailableProjects] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [draggedProject, setDraggedProject] = useState(null);

  const filterRef = useRef(null);
  const getCompletedFields = () => {
    const requiredFields = ['staffNumber', 'name', 'email'];
    return requiredFields.filter(field => newMember[field].trim()).length;
  }
  useEffect(() => {
    if (!isAddModalOpen) {
      setCurrentStep(1);
      // Reset newMember state if needed
    }
  }, [isAddModalOpen]);
  // Close filter when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Calculate stats and tabs inline
  const memberStats = [
    { label: 'Total Members', value: members.length, change: '+2', icon: Users },
    { label: 'Admins', value: members.filter(m => m.roleName === 'approver').length, change: '+0', icon: Settings },
    { label: 'Consultants', value: members.filter(m => m.roleName === 'Consultant').length, change: '+1', icon: Users },
    { label: 'Contractors', value: members.filter(m => m.roleName === 'Contractor').length, change: '+1', icon: Users },
  ];

  const tabs = [
    { name: 'All Members', count: members.length },
    { name: 'Admins', count: members.filter(m => m.roleName === 'approver').length },
    { name: 'Consultants', count: members.filter(m => m.roleName === 'Consultant').length },
    { name: 'Contractors', count: members.filter(m => m.roleName === 'Contractor').length },
  ];

  // Filter members inline
  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.roleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.status.toLowerCase().includes(searchTerm.toLowerCase());
    return activeTab === 'All Members' ? matchesSearch : matchesSearch && member.roleName === activeTab;
  });

  // Utility functions
  const getRoleColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700 border-green-200';
      case 'Inactive': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getIcon = (roleName) => {
    switch (roleName) {
      case 'approver': return '👤';
      case 'Consultant': return '🧑‍💼';
      case 'Contractor': return '👷';
      default: return '👤';
    }
  };

  const handleStatClick = (label) => {
    if (label === 'Total Members') setActiveTab('All Members');
    if (label === 'Admins') setActiveTab('Admins');
    if (label === 'Consultants') setActiveTab('Consultants');
    if (label === 'Contractors') setActiveTab('Contractors');
  };

  const toggleProjects = (memberId) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [memberId]: !prev[memberId],
    }));
  };

  const handleFilterClick = (tabName) => {
    setActiveTab(tabName);
    setFilterOpen(false);
  };

  // Drag and drop functions
  const handleDragStart = (e, project, source) => {
    setDraggedProject({ ...project, source });
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('application/json', JSON.stringify(project));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, target) => {
    e.preventDefault();
    if (!draggedProject) return;
    try {
      const projectData = JSON.parse(e.dataTransfer.getData('application/json'));
      if (target === 'selected' && draggedProject.source === 'available') {
        setAvailableProjects(prev => prev.filter(p => p.id !== projectData.id));
        setSelectedProjects(prev => [...prev, projectData]);
      } else if (target === 'available' && draggedProject.source === 'selected') {
        setSelectedProjects(prev => prev.filter(p => p.id !== projectData.id));
        setAvailableProjects(prev => [...prev, projectData]);
      }
    } catch (error) {
      console.error('Error handling drop:', error);
    }
    setDraggedProject(null);
  };

  const handleSelectProject = (project) => {
    setAvailableProjects(prev => prev.filter(p => p.id !== project.id));
    setSelectedProjects(prev => [...prev, project]);
  };

  const handleDeselectProject = (project) => {
    setSelectedProjects(prev => prev.filter(p => p.id !== project.id));
    setAvailableProjects(prev => [...prev, project]);
  };

  const initializeDragDrop = (currentProjects = []) => {
    const currentProjectIds = currentProjects.map(p => p.id || p);
    const selected = projects.filter(p => currentProjectIds.includes(p.id));
    const available = projects.filter(p => !currentProjectIds.includes(p.id));
    setSelectedProjects(selected);
    setAvailableProjects(available);
  };

  // API functions
  const fetchRoles = async () => {
    try {
      const res = await fetch(`${apiBase}/api/role`, {
        headers: { 'Accept': 'application/json' },
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const { success, roles } = await res.json();
      if (success) {
        const mappedRoles = roles.map(r => ({ id: r._id, name: r.name }));
        setRoles(mappedRoles);
        return mappedRoles;
      }
      console.error('API error:', roles.message);
      return [];
    } catch (error) {
      console.error('Failed to fetch roles:', error);
      return [];
    }
  };

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token') || '';
      const headers = { 'Accept': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch(`http://localhost:3001/api/projects`, { headers });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const { success, projects } = await res.json();
      if (success) {
        const mappedProjects = projects.map(p => ({ id: p._id, name: p.name }));
        setProjects(mappedProjects);
        return mappedProjects;
      }
      console.error('API error:', projects.message);
      return [];
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      return [];
    }
  };

  const fetchDepartments = async () => {
    try {



      const res = await fetch(`${apiBase}/api/department`);
      // const datas=  await res.json();
      // console.log(datas);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const { success, data } = await res.json();
      if (success) {
        const mappedDepartments = data.map(d => ({
          id: d._id, name: d.
            departmentName
        }));
        setDepartments(mappedDepartments);
        console.log(departments)
        return mappedDepartments;
      }
      console.error('API error:', data.message);
      return [];
    } catch (error) {
      console.error('Failed to fetch departments:', error);
      return [];
    }
  };

  const fetchMembers = async (rolesData, projectsData, departmentsData) => {
    try {
      const token = localStorage.getItem('token') || '';
      const headers = { 'Accept': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch(`${apiBase}/api/member`, { headers });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const { success, data } = await res.json();
      if (success) {
        setMembers(data.map(m => {
          const role = rolesData.find(r => r.id === (m.role?._id || m.role));
          const roleName = role ? role.name : (typeof m.role === 'string' ? m.role : m.role?._id || 'Unknown');
          const projectNames = (m.projects || []).map(projectId => {
            const project = projectsData.find(p => p.id === projectId);
            return project ? project.name : 'Unknown Project';
          }).filter(name => name !== 'Unknown Project');
          const department = departmentsData.find(d => d.id === (m.department?._id || m.department));
          const departmentName = department ? department.name : (typeof m.department === 'string' ? m.department : 'Unknown');
          return {
            id: m._id,
            staffNumber: m.staffNumber,
            name: m.name,
            email: m.email,
            phone: m.phone || '',
            department: departmentName,
            role: m.role?._id || m.role || '',
            roleName: roleName,
            status: m.status || 'Active',
            prefferedLanguage: m.prefferedLanguage || 'English',
            service: m.service || '',
            code: m.code || '',
            grade: m.grade || '',
            discipline: m.discipline || '',
            profileImage: m.profileImage || '',
            manager: m.manager?._id || m.manager || '',
            managerName: m.managerName || 'None',
            projects: m.projects || [],
            projectNames: projectNames,
            lastLogin: m.lastLogin || 'Not logged in yet',
            avatar: m.profileImage || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=40&h=40&fit=crop',
            icon: getIcon(roleName),
          };
        }));
      } else {
        console.error('API error:', data.message);
      }
    } catch (error) {
      console.error('Failed to fetch members:', error);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      try {
        const [rolesData, projectsData, departmentsData] = await Promise.all([fetchRoles(), fetchProjects(), fetchDepartments()]);
        await fetchMembers(rolesData, projectsData, departmentsData);
      } catch (error) {
        console.error('Failed to initialize data:', error);
      }
    };
    initializeData();
  }, []);

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('token') || '';
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const payload = {
        ...newMember,
        manager: newMember.manager || null,
        status: newMember.status || 'Active',
        projects: selectedProjects.map(p => p.id),
      };
      const res = await fetch(`${apiBase}/api/member`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        const [rolesData, projectsData, departmentsData] = await Promise.all([fetchRoles(), fetchProjects(), fetchDepartments()]);
        await fetchMembers(rolesData, projectsData, departmentsData);
        setIsAddModalOpen(false);
        setNewMember({
          staffNumber: '',
          name: '',
          email: '',
          phone: '',
          department: '',
          role: '',
          status: 'Active',
          prefferedLanguage: 'English',
          service: '',
          code: '',
          grade: '',
          discipline: '',
          profileImage: '',
          manager: '',
          projects: [],
        });
        setSelectedProjects([]);
        setAvailableProjects(projectsData);
      } else {
        alert(data.message || 'Failed to add member');
      }
    } catch (error) {
      console.error('Failed to add member:', error);
      alert('Failed to add member: ' + error.message);
    }
  };

  const handleEditMember = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('token') || '';
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const payload = { ...selectedMember };
      delete payload.id;
      delete payload.roleName;
      delete payload.managerName;
      delete payload.projectNames;
      delete payload.avatar;
      delete payload.icon;
      delete payload.lastLogin;
      payload.manager = selectedMember.manager || null;
      payload.status = selectedMember.status || 'Active';
      payload.projects = selectedProjects.map(p => p.id);
      const res = await fetch(`${apiBase}/api/member/${selectedMember.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        const [rolesData, projectsData, departmentsData] = await Promise.all([fetchRoles(), fetchProjects(), fetchDepartments()]);
        await fetchMembers(rolesData, projectsData, departmentsData);
        setIsEditModalOpen(false);
        setSelectedMember(null);
        setSelectedProjects([]);
        setAvailableProjects(projectsData);
      } else {
        alert(data.message || 'Failed to edit member');
      }
    } catch (error) {
      console.error('Failed to edit member:', error);
      alert('Failed to edit member: ' + error.message);
    }
  };

  const handleAddRole = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('token') || '';
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch(`${apiBase}/api/role`, {
        method: 'POST',
        headers,
        body: JSON.stringify(newRole),
      });
      const data = await res.json();
      if (data.success) {
        await fetchRoles();
        setIsAddRoleModalOpen(false);
        setNewRole({ name: '' });
        alert('Role added successfully!');
      } else {
        alert(data.message || 'Failed to add role');
      }
    } catch (error) {
      console.error('Failed to add role:', error);
      alert('Failed to add role: ' + error.message);
    }
  };

  const handleAddDepartment = async (e) => {
    e.preventDefault();
    try {

      console.log(newDepartment);

      const res = await fetch(`${apiBase}/api/department`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(newDepartment),
      });
      const data = await res.json();
      console.log("department", data);
      if (data.success) {
        await fetchDepartments();
        setNewDepartment({ name: '' });
        alert('Department added successfully!');
      } else {
        alert(data.message || 'Failed to add department');
      }
    } catch (error) {
      console.error('Failed to add department:', error);
      alert('Failed to add department: ' + error.message);
    }
  };

  const handleUpdateDepartment = async (e) => {
    e.preventDefault();
    try {

      const res = await fetch(`${apiBase}/api/department/${editDepartment.id}`, {
        method: 'PUT',
        headers:{ 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editDepartment.name }),
      });
      const data = await res.json();
      if (data.success) {
        await fetchDepartments();
        setEditDepartment(null);
        alert('Department updated successfully!');
      } else {
        alert(data.message || 'Failed to update department');
      }
    } catch (error) {
      console.error('Failed to update department:', error);
      alert('Failed to update department: ' + error.message);
    }
  };

  const handleDeleteDepartment = async (id) => {
    if (!confirm('Are you sure you want to delete this department?')) return;
    try {
  
      const res = await fetch(`${apiBase}/api/department/${id}`, {
        method: 'DELETE',
        headers:{ 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.success) {
        await fetchDepartments();
        alert('Department deleted successfully!');
      } else {
        alert(data.message || 'Failed to delete department');
      }
    } catch (error) {
      console.error('Failed to delete department:', error);
      alert('Failed to delete department: ' + error.message);
    }
  };

  const openEditModal = (member) => {
    setSelectedMember({
      ...member,
      projects: member.projects || [],
      status: member.status || 'Active',
    });
    initializeDragDrop(member.projects);
    setIsEditModalOpen(true);
  };

  const openAddModal = () => {
    setNewMember({
      staffNumber: '',
      name: '',
      email: '',
      phone: '',
      department: '',
      role: '',
      status: 'Active',
      prefferedLanguage: 'English',
      service: '',
      code: '',
      grade: '',
      discipline: '',
      profileImage: '',
      manager: '',
      projects: [],
    });
    initializeDragDrop();
    setIsAddModalOpen(true);
  };

  // Input handlers
  const handleNewMemberChange = (field, value) => {
    setNewMember(prev => ({ ...prev, [field]: value }));
  };

  const handleSelectedMemberChange = (field, value) => {
    setSelectedMember(prev => ({ ...prev, [field]: value }));
  };

  const handleNewRoleChange = (value) => {
    setNewRole({ name: value });
  };

  const handleNewDepartmentChange = (value) => {
    setNewDepartment({ name: value });
  };

  const handleEditDepartmentChange = (value) => {
    setEditDepartment(prev => ({ ...prev, name: value }));
  };

  // Custom scrollbar styles
  const scrollbarStyles = `
    .thin-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
    .thin-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 3px; }
    .thin-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
    .thin-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
  `;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Add Role Modal */}
        <AnimatePresence>
          {isAddRoleModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setIsAddRoleModalOpen(false)}
            >
              <div
                className="bg-white rounded-2xl shadow-lg w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-blue-500 px-4 py-3">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">Add New Role</h2>
                    <button
                      onClick={() => setIsAddRoleModalOpen(false)}
                      className="text-white hover:text-blue-100"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-black mb-2">Role Name</label>
                    <input
                      type="text"
                      value={newRole.name}
                      onChange={(e) => handleNewRoleChange(e.target.value)}
                      placeholder="Enter role name"
                      className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsAddRoleModalOpen(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddRole}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Add Role
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Department Modal */}
        <AnimatePresence>
          {isAddDepartmentModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setIsAddDepartmentModalOpen(false)}
            >
              <div
                className="bg-white rounded-2xl overflow-hidden shadow-lg w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-blue-500 px-4 py-3">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">
                      {editDepartment ? 'Edit Department' : 'Add New Department'}
                    </h2>
                    <button
                      onClick={() => {
                        setIsAddDepartmentModalOpen(false);
                        setEditDepartment(null);
                      }}
                      className="text-white hover:text-blue-100"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-black mb-2">Department Name</label>
                    <input
                      type="text"
                      value={editDepartment ? editDepartment.name : newDepartment.name}
                      onChange={(e) => editDepartment ? handleEditDepartmentChange(e.target.value) : handleNewDepartmentChange(e.target.value)}
                      placeholder="Enter department name"
                      className="w-full px-3 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddDepartmentModalOpen(false);
                        setEditDepartment(null);
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={editDepartment ? handleUpdateDepartment : handleAddDepartment}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      {editDepartment ? 'Update Department' : 'Add Department'}
                    </button>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Existing Departments</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto thin-scrollbar">
                      {departments.map((dept) => (
                        <div
                          key={dept.id}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <span className="text-sm text-gray-700">{dept.name}</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditDepartment(dept)}
                              className="p-1 text-blue-500 hover:text-blue-600"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteDepartment(dept.id)}
                              className="p-1 text-red-500 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>



        <AnimatePresence>
          {isAddModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setIsAddModalOpen(false)}
            >
              <div
                className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">Add New Member</h2>
                    <button
                      onClick={() => setIsAddModalOpen(false)}
                      className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Centered Progress Steps */}
                <div className="px-6 py-4 border-b border-gray-100">
                  <div className="flex justify-center items-center">
                    {[
                      { number: 1, label: 'Personal' },
                      { number: 2, label: 'Work' },
                      { number: 3, label: 'Projects' },
                    ].map((step, index) => (
                      <div key={step.number} className="flex items-center">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${currentStep >= step.number
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 text-gray-500'
                              }`}
                          >
                            {currentStep > step.number ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <span>{step.number}</span>
                            )}
                          </div>
                          <span className={`text-xs mt-1 ${currentStep >= step.number ? 'text-blue-500 font-medium' : 'text-gray-500'}`}>
                            {step.label}
                          </span>
                        </div>
                        {index < 2 && (
                          <div
                            className={`w-12 h-0.5 mx-2 transition-colors ${currentStep > step.number ? 'bg-blue-500' : 'bg-gray-200'
                              }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto thin-scrollbar">
                  <form onSubmit={handleAddMember} className="p-6">
                    {/* Step 1: Personal Info */}
                    {currentStep === 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-5"
                      >
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center overflow-hidden">
                              {newMember.profileImage ? (
                                <img src={newMember.profileImage} alt="Profile" className="w-full h-full object-cover" />
                              ) : (
                                <User className="w-6 h-6 text-gray-500" />
                              )}
                            </div>
                            <label
                              htmlFor="profile-upload"
                              className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1.5 rounded-full shadow cursor-pointer"
                            >
                              <Camera className="w-3 h-3" />
                              <input
                                id="profile-upload"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      handleNewMemberChange('profileImage', reader.result);
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                                className="hidden"
                              />
                            </label>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-700">Profile Photo</h3>

                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={newMember.name}
                              onChange={(e) => handleNewMemberChange('name', e.target.value)}
                              placeholder="John Doe"
                              className="w-full px-3 py-2 text-black bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Email <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              value={newMember.email}
                              onChange={(e) => handleNewMemberChange('email', e.target.value)}
                              placeholder="john.doe@company.com"
                              className="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input
                              type="text"
                              value={newMember.phone}
                              onChange={(e) => handleNewMemberChange('phone', e.target.value)}
                              placeholder="+1 (555) 000-0000"
                              className="w-full px-3 py-2 bg-white border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                            <select
                              value={newMember.department}
                              onChange={(e) => handleNewMemberChange('department', e.target.value)}
                              className="w-full px-3 text-black py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="">Select department</option>
                              {departments.map((dept) => (
                                <option key={dept.id} value={dept.id}>{dept.name}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                            <select
                              value={newMember.role}
                              onChange={(e) => handleNewMemberChange('role', e.target.value)}
                              className="w-full px-3 py-2 text-black bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="">Select role</option>
                              {roles.map((role) => (
                                <option key={role.id} value={role.id}>{role.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Work ID & Role */}
                    {currentStep === 2 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-5"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Staff Number <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={newMember.staffNumber}
                              onChange={(e) => handleNewMemberChange('staffNumber', e.target.value)}
                              placeholder="EMP-001"
                              className="w-full px-3 py-2 bg-white border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
                            <input
                              type="text"
                              value={newMember.code}
                              onChange={(e) => handleNewMemberChange('code', e.target.value)}
                              placeholder="ENG-101"
                              className="w-full px-3 py-2 bg-white border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                            <input
                              type="text"
                              value={newMember.grade}
                              onChange={(e) => handleNewMemberChange('grade', e.target.value)}
                              placeholder="Senior, Level 3"
                              className="w-full px-3 py-2 bg-white border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Discipline</label>
                            <input
                              type="text"
                              value={newMember.discipline}
                              onChange={(e) => handleNewMemberChange('discipline', e.target.value)}
                              placeholder="Mechanical, Software"
                              className="w-full px-3 py-2 bg-white border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Language</label>
                            <select
                              value={newMember.prefferedLanguage}
                              onChange={(e) => handleNewMemberChange('prefferedLanguage', e.target.value)}
                              className="w-full text-black  px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="English">English</option>
                              <option value="Spanish">Spanish</option>
                              <option value="French">French</option>
                              <option value="German">German</option>
                              <option value="Chinese">Chinese</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Services</label>
                            <input
                              type="text"
                              value={newMember.service}
                              onChange={(e) => handleNewMemberChange('service', e.target.value)}
                              placeholder="Consulting, Development, Support"
                              className="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Projects */}
                    {currentStep === 3 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-5"
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div
                            className="border border-gray-300 rounded-lg p-3 bg-gray-50 h-64"
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, 'available')}
                          >
                            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                              <FolderOpen className="w-4 h-4 text-gray-500" />
                              Available Projects
                              <span className="ml-auto text-xs bg-gray-200 px-2 py-1 rounded">
                                {availableProjects.length}
                              </span>
                            </h4>
                            <div className="space-y-2 h-44 overflow-y-auto thin-scrollbar">
                              {availableProjects.map((project) => (
                                <div
                                  key={project.id}
                                  draggable
                                  onDragStart={(e) => handleDragStart(e, project, 'available')}
                                  className="flex items-center gap-2 p-2 bg-white rounded border border-gray-200 hover:border-blue-300 cursor-move text-sm"
                                >
                                  <GripVertical className="w-4 h-4 text-gray-400" />
                                  <span className="flex-1 text-gray-700 truncate">{project.name}</span>
                                  <button
                                    onClick={() => handleSelectProject(project)}
                                    className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                                  >
                                    Add
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div
                            className="border border-blue-300 rounded-lg p-3 bg-blue-50 h-64"
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, 'selected')}
                          >
                            <h4 className="text-sm font-medium text-blue-700 mb-3 flex items-center gap-2">
                              <Briefcase className="w-4 h-4 text-blue-500" />
                              Selected Projects
                              <span className="ml-auto text-xs bg-blue-200 px-2 py-1 rounded">
                                {selectedProjects.length}
                              </span>
                            </h4>
                            <div className="space-y-2 h-44 overflow-y-auto thin-scrollbar">
                              {selectedProjects.map((project) => (
                                <div
                                  key={project.id}
                                  draggable
                                  onDragStart={(e) => handleDragStart(e, project, 'selected')}
                                  className="flex items-center gap-2 p-2 bg-white rounded border border-blue-200 hover:border-blue-500 cursor-move text-sm"
                                >
                                  <GripVertical className="w-4 h-4 text-blue-400" />
                                  <span className="flex-1 text-gray-700 truncate">{project.name}</span>
                                  <button
                                    onClick={() => handleDeselectProject(project)}
                                    className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                                  >
                                    Remove
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </form>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-100 px-6 py-4 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                      {currentStep === 1 && 'Enter personal details'}
                      {currentStep === 2 && 'Assign work ID and role'}
                      {currentStep === 3 && 'Assign projects'}
                    </div>
                    <div className="flex gap-2">
                      {currentStep > 1 && (
                        <button
                          type="button"
                          onClick={() => setCurrentStep(currentStep - 1)}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 text-sm font-medium"
                        >
                          Previous
                        </button>
                      )}

                      {currentStep < 3 ? (
                        <button
                          type="button"
                          onClick={() => setCurrentStep(currentStep + 1)}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm font-medium flex items-center gap-1"
                          disabled={
                            (currentStep === 1 && (!newMember.name || !newMember.email)) ||
                            (currentStep === 2 && !newMember.staffNumber)
                          }
                        >
                          Next
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      ) : (
                        <button
                          onClick={handleAddMember}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm font-medium flex items-center gap-1"
                        >
                          <UserPlus className="w-4 h-4" />
                          Add Member
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
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
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setIsEditModalOpen(false)}
            >
              <div
                className="bg-white rounded-2xl shadow-lg w-full max-w-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-blue-500 px-4 py-3">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">Edit Member</h2>
                    <button
                      onClick={() => setIsEditModalOpen(false)}
                      className="text-white hover:text-blue-100"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-black mb-2">Staff Number</label>
                      <input
                        type="text"
                        value={selectedMember.staffNumber}
                        onChange={(e) => handleSelectedMemberChange('staffNumber', e.target.value)}
                        placeholder="Enter staff number"
                        className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-black mb-2">Name</label>
                      <input
                        type="text"
                        value={selectedMember.name}
                        onChange={(e) => handleSelectedMemberChange('name', e.target.value)}
                        placeholder="Enter name"
                        className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-black mb-2">Email</label>
                      <input
                        type="email"
                        value={selectedMember.email}
                        onChange={(e) => handleSelectedMemberChange('email', e.target.value)}
                        placeholder="Enter email"
                        className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-black mb-2">Phone</label>
                      <input
                        type="text"
                        value={selectedMember.phone}
                        onChange={(e) => handleSelectedMemberChange('phone', e.target.value)}
                        placeholder="Enter phone number"
                        className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div className="mb-4 text-black">
                      <label className="block text-sm font-medium text-black mb-2">Department</label>
                     <select
  value={selectedMember.department}
  onChange={(e) => handleSelectedMemberChange('department', e.target.value)}
  className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
>
  <option value="" className="text-gray-500">Select department</option>
  {departments.map((dept) => (
    <option key={dept.id} value={dept.name} className="text-gray-900">
      {dept.name}
    </option>
  ))}
</select>

                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-black mb-2">Role</label>
                      <select
                        value={selectedMember.role}
                        onChange={(e) => handleSelectedMemberChange('role', e.target.value)}
                        className="w-full px-3 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        <option value="">Select role</option>
                        {roles.map((role) => (
                          <option key={role.id} value={role.id}>{role.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-black mb-2">Status</label>
                      <select
                        value={selectedMember.status}
                        onChange={(e) => handleSelectedMemberChange('status', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-black mb-2">Preferred Language</label>
                      <input
                        type="text"
                        value={selectedMember.prefferedLanguage}
                        onChange={(e) => handleSelectedMemberChange('prefferedLanguage', e.target.value)}
                        placeholder="Enter preferred language"
                        className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <style jsx>{scrollbarStyles}</style>
                    <label className="block text-sm font-medium text-black mb-3">Projects</label>
                    <div className="grid grid-cols-2 gap-4 h-64">
                      <div
                        className="border border-gray-300 rounded-lg p-4 bg-gray-50 thin-scrollbar"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, 'available')}
                      >
                        <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                          <Move className="w-4 h-4" />
                          Available Projects
                        </h4>
                        <div className="space-y-2 h-48 overflow-y-auto thin-scrollbar">
                          {availableProjects.map((project) => (
                            <div
                              key={project.id}
                              draggable
                              onDragStart={(e) => handleDragStart(e, project, 'available')}
                              className="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-200 hover:border-blue-300 cursor-move"
                            >
                              <GripVertical className="w-4 h-4 text-gray-400" />
                              <span className="flex-1 text-sm text-gray-700 truncate">{project.name}</span>
                              <button
                                onClick={() => handleSelectProject(project)}
                                className="px-2 py-1 bg-blue-500 text-white rounded-lg text-xs hover:bg-blue-600"
                              >
                                Add
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div
                        className="border border-blue-300 rounded-lg p-4 bg-blue-50 thin-scrollbar"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, 'selected')}
                      >
                        <h4 className="text-sm font-medium text-blue-700 mb-3 flex items-center gap-2">
                          <Briefcase className="w-4 h-4" />
                          Selected Projects ({selectedProjects.length})
                        </h4>
                        <div className="space-y-2 h-48 overflow-y-auto thin-scrollbar">
                          {selectedProjects.map((project) => (
                            <div
                              key={project.id}
                              draggable
                              onDragStart={(e) => handleDragStart(e, project, 'selected')}
                              className="flex items-center gap-3 p-2 bg-white rounded-lg border border-blue-200 hover:border-blue-500 cursor-move"
                            >
                              <GripVertical className="w-4 h-4 text-blue-400" />
                              <span className="flex-1 text-sm text-gray-700 truncate">{project.name}</span>
                              <button
                                onClick={() => handleDeselectProject(project)}
                                className="px-2 py-1 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600"
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsEditModalOpen(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleEditMember}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Members Overview</h1>
              <p className="text-gray-600">Manage and track all your team members</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative w-60">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="relative" ref={filterRef}>
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="flex items-center gap-2 bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600"
                >
                  <Filter className="w-4 h-4" />
                </button>
                {filterOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                    {tabs.map((tab) => (
                      <button
                        key={tab.name}
                        onClick={() => handleFilterClick(tab.name)}
                        className={`flex items-center justify-between w-full px-4 py-2 text-sm ${activeTab === tab.name ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                          }`}
                      >
                        {tab.name}
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                          {tab.count}
                        </span>
                      </button>
                    ))}
                    <div className="border-t border-gray-200 mt-2 pt-2">
                      <button
                        onClick={() => {
                          setIsAddRoleModalOpen(true);
                          setFilterOpen(false);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-green-600 hover:bg-green-50"
                      >
                        <Plus className="w-4 h-4" />
                        Add New Role
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={() => setIsAddDepartmentModalOpen(true)}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                <Plus className="w-4 h-4" />
                Add Department
              </button>
              <button
                onClick={openAddModal}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                <Plus className="w-4 h-4" />
                Add Member
              </button>
              <div className="flex rounded-lg border border-gray-300 p-1 bg-gray-100">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {memberStats.map((stat, i) => {
            const Icon = stat.icon;
            const iconColor = stat.label === 'Total Members' ? 'text-blue-600' :
              stat.label === 'Admins' ? 'text-purple-600' :
                stat.label === 'Consultants' ? 'text-yellow-600' :
                  stat.label === 'Contractors' ? 'text-orange-600' : 'text-gray-700';
            return (
              <div
                key={i}
                onClick={() => handleStatClick(stat.label)}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                    <Icon className={`w-6 h-6 ${iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{stat.value}</h3>
                    <p className="text-xs text-gray-500 uppercase">{stat.label}</p>
                  </div>
                </div>
                <span className="text-xs text-green-600">{stat.change}</span>
              </div>
            );
          })}
        </div>

        {/* Member Cards */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden ${viewMode === 'list' ? 'flex flex-col md:flex-row md:items-stretch gap-4' : 'flex flex-col'
                }`}
            >
              {/* Card Header */}
              <div className="bg-blue-600 px-4 py-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-12 h-12 rounded-xl object-cover"
                    loading="lazy"
                  />
                  <div className="max-w-[250px]">
                    <h3 className="font-bold text-lg text-white truncate">{member.name}</h3>
                    <p className="text-blue-100 text-sm truncate">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium border ${getRoleColor(member.status)}`}>
                    {member.status}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className={`p-4 flex-1 flex flex-col ${viewMode === 'list' ? 'md:w-2/3' : ''}`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Users className="w-4 h-4 text-gray-700" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Role</p>
                      <p className="text-gray-900 text-sm font-semibold">{member.roleName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-4 h-4 text-gray-700" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Projects</p>
                      <p className="text-gray-900 text-sm font-semibold">{member.projectNames.length}</p>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-xs text-gray-500 uppercase mb-2">Assigned Projects</p>
                  <div className="flex flex-wrap gap-2">
                    {member.projectNames.length > 0 ? (
                      (expandedProjects[member.id] ? member.projectNames : member.projectNames.slice(0, 3)).map((p, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-700"
                        >
                          {p}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-700">
                        No Projects Assigned
                      </span>
                    )}
                    {member.projectNames.length > 3 && (
                      <button
                        onClick={() => toggleProjects(member.id)}
                        className="text-xs px-2 py-1 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200"
                      >
                        {expandedProjects[member.id] ? '...less' : '...more'}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="bg-gray-100 px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-700" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Last Login</p>
                      <p className="text-gray-600 text-sm">{member.lastLogin}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => openEditModal(member)}
                    className="flex items-center gap-2 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Edit <Pencil className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MembersPage;