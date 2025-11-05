
// 'use client';
// import { useState, useEffect, useRef, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Search, Grid3X3, List, Plus, Pencil, X, Check,
//   ArrowRight, User, Camera, GripVertical, FolderOpen,
//   UserPlus, Briefcase, Move, Trash2, Loader2
// } from 'lucide-react';
// const apiBase = process.env.NEXT_PUBLIC_BACKEND_API_PATH || '';
// const MembersPage = () => {
//   // Core state
//   const [viewMode, setViewMode] = useState('grid');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [members, setMembers] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [roles, setRoles] = useState([]);
//   const [loading, setLoading] = useState({
//     image: false,
//     submit: false,
//     page: true,
//     delete: false
//   });

//   // Modals
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isAddDepartmentModalOpen, setIsAddDepartmentModalOpen] = useState(false);

//   // Member forms
//   const [selectedMember, setSelectedMember] = useState(null);
//   const [currentStep, setCurrentStep] = useState(1);
//   const [newMember, setNewMember] = useState({
//     staffNumber: '', name: '', email: '', phone: '', department: '', role: '', status: 'Active',
//     code: '', grade: '', discipline: '', prefferedLanguage: 'English', service: '', profileImage: '', projects: [],
//   });
//   const [selectedProjects, setSelectedProjects] = useState([]);
//   const [availableProjects, setAvailableProjects] = useState([]);
//   const [draggedProject, setDraggedProject] = useState(null);

//   // Department forms
//   const [newDepartment, setNewDepartment] = useState({ name: '' });
//   const [editDepartment, setEditDepartment] = useState(null);

//   // API helpers
//   const fetchData = useCallback(async () => {
//     try {
//       setLoading(prev => ({ ...prev, page: true }));
//       const [depts, projs, roleList, membersData] = await Promise.all([
//         fetchDepartments(),
//         fetchProjects(),
//         fetchRoles(),
//         fetchMembers()
//       ]);

//       setDepartments(depts);
//       setProjects(projs);
//       setRoles(roleList);
//       setMembers(membersData);
//     } catch (error) {
//       console.error('Failed to fetch data:', error);
//     } finally {
//       setLoading(prev => ({ ...prev, page: false }));
//     }
//   }, []);

//   const fetchRoles = async () => {
//     try {
//       const res = await fetch(`http://localhost:3001/api/role`,{
//          headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${sessionStorage.getItem('token')}`,
//         },
//       });

//       console.log("res",res);
//       const { success, data } = await res.json();

//       console.log("Roles",data);
//       return success ? data.map(r => ({ id: r._id, name: r.roleName })) : [];
//     } catch {
//       return [];
//     }
//   };

//   const fetchProjects = async () => {
//     try {
//       const token = localStorage.getItem('token') || '';
//       const headers = { Accept: 'application/json' };
//       if (token) headers.Authorization = `Bearer ${token}`;

//       const res = await fetch(`http://localhost:3001/api/projects`, { headers });
//       const { success, projects } = await res.json();
//       console.log("projects", projects);
//       return success ? projects.map(p => ({ id: p._id, name: p.name })) : [];
//     } catch {
//       return [];
//     }
//   };

//   const fetchDepartments = async () => {
//     try {
//       const res = await fetch(`${apiBase}/api/department`);
//       const { success, data } = await res.json();
//       return success ? data.map(d => ({ id: d._id, name: d.departmentName })) : [];
//     } catch {
//       return [];
//     }
//   };

//   const fetchMembers = async () => {
//     try {
//       const token = localStorage.getItem('token') || '';
//       const headers = { Accept: 'application/json' };
//       if (token) headers.Authorization = `Bearer ${token}`;

//       const res = await fetch(`http://localhost:3001/api/member`, { headers });
//       const { success, data } = await res.json();
//       console.log("members", data)

//       if (!success) return [];

//       return data.map(m => ({
//         id: m._id,
//         staffNumber: m.staffNumber,
//         name: m.name,
//         email: m.email,
//         phone: m.phone || '',
//         department: m.departmentName || 'Unknown',
//         roleName: m.role?.roleName || 'Unknown',
//         status: m.status || 'Active',
//         profileImage: m.profileImage || '',
//         projects: m.projects || [],
//         projectNames: (m.projects || []).map(pid =>
//           projects.find(p => p.id === pid)?.name
//         ).filter(Boolean),
//         avatar: m.profileImage || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=40&h=40&fit=crop',
//       }));
//     } catch {
//       return [];
//     }
//   };

//   // Delete member handler
//   const handleDeleteMember = async (memberId) => {
//     console.log(memberId);
//     if (!confirm('Are you sure you want to delete this member? This action cannot be undone.')) {
//       return;
//     }

//     setLoading(prev => ({ ...prev, delete: true }));
//     try {
//       const token = sessionStorage.getItem('token') || '';
//       const headers = { 
//         'Content-Type': 'application/json',
//         Accept: 'application/json'
//       };
//       if (token) headers.Authorization = `Bearer ${token}`;

//       const res = await fetch(`${apiBase}/api/member/delete/${memberId}`, {
//         method: 'DELETE',
//         headers
//       });

//       const data = await res.json();

//       if (data.success) {
//         // Remove the member from the local state
//         setMembers(prev => prev.filter(member => member.id !== memberId));
//         alert('Member deleted successfully');
//       } else {
//         alert(data.message || 'Failed to delete member');
//       }
//     } catch (err) {
//       console.error('Delete error:', err);
//       alert('Failed to delete member: ' + err.message);
//     } finally {
//       setLoading(prev => ({ ...prev, delete: false }));
//     }
//   };

//   // Image upload handler
//   const handleImageUpload = async (file) => {
//     if (!file) return;

//     setLoading(prev => ({ ...prev, image: true }));
//     try {
//       const formData = new FormData();
//       formData.append('file', file);

//       const res = await fetch('/api/upload', { method: 'POST', body: formData });
//       const data = await res.json();

//       if (data.url) {
//         setNewMember(prev => ({ ...prev, profileImage: data.url }));
//       } else {
//         alert('Image upload failed');
//       }
//     } catch (error) {
//       alert('Failed to upload image');
//     } finally {
//       setLoading(prev => ({ ...prev, image: false }));
//     }
//   }; 

//   // Drag & drop handlers
//   const handleDragStart = (e, project, source) => {
//     setDraggedProject({ ...project, source });
//     e.dataTransfer.effectAllowed = 'move';
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     e.dataTransfer.dropEffect = 'move';
//   };

//   const handleDrop = (e, target) => {
//     e.preventDefault();
//     if (!draggedProject) return;

//     if (target === 'selected' && draggedProject.source === 'available') {
//       setAvailableProjects(prev => prev.filter(p => p.id !== draggedProject.id));
//       setSelectedProjects(prev => [...prev, draggedProject]);
//     } else if (target === 'available' && draggedProject.source === 'selected') {
//       setSelectedProjects(prev => prev.filter(p => p.id !== draggedProject.id));
//       setAvailableProjects(prev => [...prev, draggedProject]);
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
//     const currentIds = currentProjects.map(p => p.id || p);
//     setSelectedProjects(projects.filter(p => currentIds.includes(p.id)));
//     setAvailableProjects(projects.filter(p => !currentIds.includes(p.id)));
//   }, [projects]);

//   // Member CRUD operations
//   const handleAddMember = async (e) => {
//     e.preventDefault();
//     setLoading(prev => ({ ...prev, submit: true }));

//     try {
//       const payload = {
//         ...newMember,
//         projects: selectedProjects.map(p => p.id)
//       };

//       const res = await fetch(`${apiBase}/api/member`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${sessionStorage.getItem('token')}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (data.success) {
//         await fetchData();
//         setIsAddModalOpen(false);
//         resetMemberForm();
//       } else {
//         alert(data.message || 'Failed to add member');
//       }
//     } catch (err) {
//       alert('Failed to add member: ' + err.message);
//     } finally {
//       setLoading(prev => ({ ...prev, submit: false }));
//     }
//   };

//   const handleEditMember = async (e) => {
//     e.preventDefault();
//     setLoading(prev => ({ ...prev, submit: true }));

//     try {
//       const token = sessionStorage.getItem('token') || '';
//       const headers = { 'Content-Type': 'application/json' };
//       if (token) headers.Authorization = `Bearer ${token}`;

//       const payload = { 
//         ...selectedMember, 
//         projects: selectedProjects.map(p => p.id),
//         department: selectedMember.department // Make sure department is included
//       };
      
//       // Remove unnecessary fields
//       const { id, avatar, icon, projectNames, roleName, ...cleanPayload } = payload;

//       const res = await fetch(`${apiBase}/api/member/${selectedMember.id}`, {
//         method: 'PUT',
//         headers,
//         body: JSON.stringify(cleanPayload)
//       });

//       const data = await res.json();

//       if (data.success) {
//         await fetchData();
//         setIsEditModalOpen(false);
//         setSelectedMember(null);
//         setSelectedProjects([]);
//       } else {
//         alert(data.message || 'Failed to edit member');
//       }
//     } catch (err) {
//       alert('Failed to edit member: ' + err.message);
//     } finally {
//       setLoading(prev => ({ ...prev, submit: false }));
//     }
//   };

//   // Department CRUD operations
//   const handleAddDepartment = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`${apiBase}/api/department`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newDepartment),
//       });

//       const data = await res.json();

//       if (data.success) {
//         const updatedDepts = await fetchDepartments();
//         setDepartments(updatedDepts);
//         setIsAddDepartmentModalOpen(false);
//         setNewDepartment({ name: '' });
//       } else {
//         alert(data.message || 'Failed to add department');
//       }
//     } catch (err) {
//       alert('Failed to add department: ' + err.message);
//     }
//   };

//   const handleUpdateDepartment = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`${apiBase}/api/department/${editDepartment.id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name: editDepartment.name }),
//       });

//       const data = await res.json();

//       if (data.success) {
//         const updatedDepts = await fetchDepartments();
//         setDepartments(updatedDepts);
//         setEditDepartment(null);
//       } else {
//         alert(data.message || 'Failed to update department');
//       }
//     } catch (err) {
//       alert('Failed to update department: ' + err.message);
//     }
//   };

//   const handleDeleteDepartment = async (id) => {
//     if (!confirm('Are you sure you want to delete this department?')) return;

//     try {
//       const res = await fetch(`${apiBase}/api/department/${id}`, { method: 'DELETE' });
//       const data = await res.json();

//       if (data.success) {
//         const updatedDepts = await fetchDepartments();
//         setDepartments(updatedDepts);
//       } else {
//         alert(data.message || 'Failed to delete department');
//       }
//     } catch (err) {
//       alert('Failed to delete department: ' + err.message);
//     }
//   };

//   // Form helpers
//   const resetMemberForm = () => {
//     setNewMember({
//       staffNumber: '', name: '', email: '', phone: '', department: '', role: '', status: 'Active',
//       code: '', grade: '', discipline: '', prefferedLanguage: 'English', service: '', profileImage: '', projects: [],
//     });
//     setSelectedProjects([]);
//     setCurrentStep(1);
//   };

//   const openAddModal = () => {
//     resetMemberForm();
//     initializeDragDrop();
//     setIsAddModalOpen(true);
//   };

//   const openEditModal = (member) => {
//     setSelectedMember({ 
//       ...member, 
//       projects: member.projects || [],
//       department: member.department || '',
//       role: member.role || ''
//     });
//     initializeDragDrop(member.projects);
//     setIsEditModalOpen(true);
//     setCurrentStep(1); // Reset to first step when editing
//   };

//   // Effects
//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   // UI helpers
//   const filteredMembers = members.filter((m) =>
//     m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     m.department.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Styles
//   const scrollbarStyles = `
//     .thin-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
//     .thin-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 3px; }
//     .thin-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
//     .thin-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
//   `;

//   // Loading state
//   if (loading.page) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="flex items-center gap-3 text-gray-600">
//           <Loader2 className="w-6 h-6 animate-spin" />
//           <span>Loading members...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <style>{scrollbarStyles}</style>

//       <div className="max-w-7xl mx-auto">
//         {/* Add Member Modal */}
//         <AnimatePresence>
//           {isAddModalOpen && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
//               onClick={() => setIsAddModalOpen(false)}
//             >
//               <div
//                 className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 {/* Header */}
//                 <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
//                   <h2 className="text-xl font-semibold text-gray-800">Add New Member</h2>
//                   <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>

//                 {/* Progress Steps */}
//                 <div className="px-6 py-4 border-b border-gray-100">
//                   <div className="flex justify-center items-center">
//                     {[
//                       { number: 1, label: 'Personal' },
//                       { number: 2, label: 'Work' },
//                       { number: 3, label: 'Projects' },
//                     ].map((step, index) => (
//                       <div key={step.number} className="flex items-center">
//                         <div className="flex flex-col items-center">
//                           <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${currentStep >= step.number ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
//                             {currentStep > step.number ? <Check className="w-4 h-4" /> : <span>{step.number}</span>}
//                           </div>
//                           <span className={`text-xs mt-1 ${currentStep >= step.number ? 'text-blue-500 font-medium' : 'text-gray-500'}`}>{step.label}</span>
//                         </div>
//                         {index < 2 && <div className={`w-12 h-0.5 mx-2 transition-colors ${currentStep > step.number ? 'bg-blue-500' : 'bg-gray-200'}`} />}
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Scrollable Content */}
//                 <div className="flex-1 overflow-y-auto thin-scrollbar">
//                   <form onSubmit={handleAddMember} className="p-6">
//                     {currentStep === 1 && (
//                       <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
//                         {/* Profile Image */}
//                         <div className="flex items-center gap-4">
//                           <div className="relative">
//                             <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center overflow-hidden">
//                               {newMember.profileImage ? (
//                                 <img src={newMember.profileImage} alt="Profile" className="w-full h-full object-cover" />
//                               ) : loading.image ? (
//                                 <Loader2 className="w-6 h-6 text-gray-500 animate-spin" />
//                               ) : (
//                                 <User className="w-6 h-6 text-gray-500" />
//                               )}
//                             </div>
//                             <label htmlFor="profile-upload" className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1.5 rounded-full shadow cursor-pointer">
//                               <Camera className="w-3 h-3" />
//                               <input
//                                 id="profile-upload"
//                                 type="file"
//                                 accept="image/*"
//                                 className="hidden"
//                                 onChange={(e) => {
//                                   const file = e.target.files?.[0];
//                                   if (file) handleImageUpload(file);
//                                 }}
//                               />
//                             </label>
//                           </div>
//                           <div>
//                             <h3 className="text-sm font-medium text-gray-700">Profile Photo</h3>
//                             <p className="text-xs text-gray-500">Click to upload</p>
//                           </div>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
//                             <input
//                               type="text"
//                               value={newMember.name}
//                               onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
//                               placeholder="John Doe"
//                               className="w-full px-3 py-2 text-black bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                               required
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
//                             <input
//                               type="email"
//                               value={newMember.email}
//                               onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
//                               placeholder="xyz@gmail.com"
//                               className="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                               required
//                             />
//                           </div>
//                           <div className="md:col-span-2">
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//                             <input
//                               type="text"
//                               value={newMember.phone}
//                               onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
//                               placeholder="+91 000-000-0000"
//                               className="w-full px-3 py-2 bg-white border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
//                             <select
//                               value={newMember.department}
//                               onChange={(e) => setNewMember({ ...newMember, department: e.target.value })}
//                               className="w-full px-3 text-black py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                             >
//                               <option value="">Select department</option>
//                               {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
//                             </select>
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
//                             <select
//                               value={newMember.role}
//                               onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
//                               className="w-full px-3 py-2 text-black bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                             >
//                               <option value="">Select role</option>
//                               {roles.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
//                             </select>
//                           </div>
//                         </div>
//                       </motion.div>
//                     )}

//                     {currentStep === 2 && (
//                       <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Staff Number <span className="text-red-500">*</span></label>
//                             <input
//                               type="text"
//                               value={newMember.staffNumber}
//                               onChange={(e) => setNewMember({ ...newMember, staffNumber: e.target.value })}
//                               placeholder="EMP-001"
//                               className="w-full px-3 py-2 bg-white border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                               required
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
//                             <input
//                               type="text"
//                               value={newMember.code}
//                               onChange={(e) => setNewMember({ ...newMember, code: e.target.value })}
//                               placeholder="ENG-101"
//                               className="w-full px-3 py-2 bg-white border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
//                             <input
//                               type="text"
//                               value={newMember.grade}
//                               onChange={(e) => setNewMember({ ...newMember, grade: e.target.value })}
//                               placeholder="Senior, Level 3"
//                               className="w-full px-3 py-2 bg-white border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Discipline</label>
//                             <input
//                               type="text"
//                               value={newMember.discipline}
//                               onChange={(e) => setNewMember({ ...newMember, discipline: e.target.value })}
//                               placeholder="Mechanical, Software"
//                               className="w-full px-3 py-2 bg-white border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Language</label>
//                             <select
//                               value={newMember.prefferedLanguage}
//                               onChange={(e) => setNewMember({ ...newMember, prefferedLanguage: e.target.value })}
//                               className="w-full text-black px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                             >
//                               <option value="English">English</option>
//                               <option value="Spanish">Spanish</option>
//                               <option value="French">French</option>
//                               <option value="German">German</option>
//                               <option value="Chinese">Chinese</option>
//                             </select>
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Services</label>
//                             <select
//                               value={newMember.service}
//                               onChange={(e) => setNewMember({ ...newMember, service: e.target.value })}
//                               className="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                             >
//                               <option value="">Select a service</option>
//                               <option value="Construction">Construction</option>
//                             </select>
//                           </div>
//                         </div>
//                       </motion.div>
//                     )}

//                     {currentStep === 3 && (
//                       <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
//                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//                           <div className="border border-gray-300 rounded-lg p-3 bg-gray-50 h-64" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'available')}>
//                             <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
//                               <FolderOpen className="w-4 h-4 text-gray-500" />
//                               Available Projects
//                               <span className="ml-auto text-xs bg-gray-200 px-2 py-1 rounded">{availableProjects.length}</span>
//                             </h4>
//                             <div className="space-y-2 h-44 overflow-y-auto thin-scrollbar">
//                               {availableProjects.map((project) => (
//                                 <div key={project.id} draggable onDragStart={(e) => handleDragStart(e, project, 'available')} className="flex items-center gap-2 p-2 bg-white rounded border border-gray-200 hover:border-blue-300 cursor-move text-sm">
//                                   <GripVertical className="w-4 h-4 text-gray-400" />
//                                   <span className="flex-1 text-gray-700 truncate">{project.project_name}</span>
//                                   <button onClick={() => handleSelectProject(project)} className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600">Add</button>
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                           <div className="border border-blue-300 rounded-lg p-3 bg-blue-50 h-64" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'selected')}>
//                             <h4 className="text-sm font-medium text-blue-700 mb-3 flex items-center gap-2">
//                               <Briefcase className="w-4 h-4 text-blue-500" />
//                               Selected Projects
//                               <span className="ml-auto text-xs bg-blue-200 px-2 py-1 rounded">{selectedProjects.length}</span>
//                             </h4>
//                             <div className="space-y-2 h-44 overflow-y-auto thin-scrollbar">
//                               {selectedProjects.map((project) => (
//                                 <div key={project.id} draggable onDragStart={(e) => handleDragStart(e, project, 'selected')} className="flex items-center gap-2 p-2 bg-white rounded border border-blue-200 hover:border-blue-500 cursor-move text-sm">
//                                   <GripVertical className="w-4 h-4 text-blue-400" />
//                                   <span className="flex-1 text-gray-700 truncate">{project.project_name}</span>
//                                   <button onClick={() => handleDeselectProject(project)} className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600">Remove</button>
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                       </motion.div>
//                     )}
//                   </form>
//                 </div>

//                 {/* Footer */}
//                 <div className="border-t border-gray-100 px-6 py-4 bg-gray-50">
//                   <div className="flex justify-between items-center">
//                     <div className="text-xs text-gray-500">
//                       {currentStep === 1 && 'Enter personal details'}
//                       {currentStep === 2 && 'Assign work ID and role'}
//                       {currentStep === 3 && 'Assign projects'}
//                     </div>
//                     <div className="flex gap-2">
//                       {currentStep > 1 && (
//                         <button type="button" onClick={() => setCurrentStep(currentStep - 1)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 text-sm font-medium">
//                           Previous
//                         </button>
//                       )}
//                       {currentStep < 3 ? (
//                         <button
//                           type="button"
//                           onClick={() => setCurrentStep(currentStep + 1)}
//                           className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm font-medium flex items-center gap-1 disabled:opacity-50"
//                           disabled={
//                             (currentStep === 1 && (!newMember.name || !newMember.email)) ||
//                             (currentStep === 2 && !newMember.staffNumber)
//                           }
//                         >
//                           Next <ArrowRight className="w-3 h-3" />
//                         </button>
//                       ) : (
//                         <button
//                           onClick={handleAddMember}
//                           disabled={loading.submit}
//                           className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm font-medium flex items-center gap-1 disabled:opacity-50"
//                         >
//                           {loading.submit ? (
//                             <Loader2 className="w-4 h-4 animate-spin" />
//                           ) : (
//                             <UserPlus className="w-4 h-4" />
//                           )}
//                           {loading.submit ? 'Adding...' : 'Add Member'}
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Edit Member Modal */}
//         <AnimatePresence>
//           {isEditModalOpen && selectedMember && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
//               onClick={() => setIsEditModalOpen(false)}
//             >
//               <div
//                 className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 {/* Header */}
//                 <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
//                   <h2 className="text-xl font-semibold text-gray-800">Edit Member</h2>
//                   <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>

//                 {/* Progress Steps */}
//                 <div className="px-6 py-4 border-b border-gray-100">
//                   <div className="flex justify-center items-center">
//                     {[
//                       { number: 1, label: 'Personal' },
//                       { number: 2, label: 'Work' },
//                       { number: 3, label: 'Projects' },
//                     ].map((step, index) => (
//                       <div key={step.number} className="flex items-center">
//                         <div className="flex flex-col items-center">
//                           <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${currentStep >= step.number ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
//                             {currentStep > step.number ? <Check className="w-4 h-4" /> : <span>{step.number}</span>}
//                           </div>
//                           <span className={`text-xs mt-1 ${currentStep >= step.number ? 'text-blue-500 font-medium' : 'text-gray-500'}`}>{step.label}</span>
//                         </div>
//                         {index < 2 && <div className={`w-12 h-0.5 mx-2 transition-colors ${currentStep > step.number ? 'bg-blue-500' : 'bg-gray-200'}`} />}
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Scrollable Content */}
//                 <div className="flex-1 overflow-y-auto thin-scrollbar">
//                   <form onSubmit={handleEditMember} className="p-6">
//                     {currentStep === 1 && (
//                       <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
//                         {/* Profile Image */}
//                         <div className="flex items-center gap-4">
//                           <div className="relative">
//                             <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center overflow-hidden">
//                               {selectedMember.profileImage ? (
//                                 <img src={selectedMember.profileImage} alt="Profile" className="w-full h-full object-cover" />
//                               ) : loading.image ? (
//                                 <Loader2 className="w-6 h-6 text-gray-500 animate-spin" />
//                               ) : (
//                                 <User className="w-6 h-6 text-gray-500" />
//                               )}
//                             </div>
//                             <label htmlFor="profile-upload-edit" className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1.5 rounded-full shadow cursor-pointer">
//                               <Camera className="w-3 h-3" />
//                               <input
//                                 id="profile-upload-edit"
//                                 type="file"
//                                 accept="image/*"
//                                 className="hidden"
//                                 onChange={(e) => {
//                                   const file = e.target.files?.[0];
//                                   if (file) handleImageUpload(file);
//                                 }}
//                               />
//                             </label>
//                           </div>
//                           <div>
//                             <h3 className="text-sm font-medium text-gray-700">Profile Photo</h3>
//                             <p className="text-xs text-gray-500">Click to upload</p>
//                           </div>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
//                             <input
//                               type="text"
//                               value={selectedMember.name}
//                               onChange={(e) => setSelectedMember({ ...selectedMember, name: e.target.value })}
//                               placeholder="John Doe"
//                               className="w-full px-3 py-2 text-black bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                               required
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
//                             <input
//                               type="email"
//                               value={selectedMember.email}
//                               onChange={(e) => setSelectedMember({ ...selectedMember, email: e.target.value })}
//                               placeholder="xyz@gmail.com"
//                               className="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                               required
//                             />
//                           </div>
//                           <div className="md:col-span-2">
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//                             <input
//                               type="text"
//                               value={selectedMember.phone}
//                               onChange={(e) => setSelectedMember({ ...selectedMember, phone: e.target.value })}
//                               placeholder="+91 000-000-0000"
//                               className="w-full px-3 py-2 bg-white border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
//                             <select
//                               value={selectedMember.department}
//                               onChange={(e) => setSelectedMember({ ...selectedMember, department: e.target.value })}
//                               className="w-full px-3 text-black py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                             >
//                               <option value="">Select department</option>
//                               {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
//                             </select>
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
//                             <select
//                               value={selectedMember.role}
//                               onChange={(e) => setSelectedMember({ ...selectedMember, role: e.target.value })}
//                               className="w-full px-3 py-2 text-black bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                             >
//                               <option value="">Select role</option>
//                               {roles.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
//                             </select>
//                           </div>
//                         </div>
//                       </motion.div>
//                     )}

//                     {currentStep === 2 && (
//                       <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Staff Number <span className="text-red-500">*</span></label>
//                             <input
//                               type="text"
//                               value={selectedMember.staffNumber}
//                               onChange={(e) => setSelectedMember({ ...selectedMember, staffNumber: e.target.value })}
//                               placeholder="EMP-001"
//                               className="w-full px-3 py-2 bg-white border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                               required
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
//                             <input
//                               type="text"
//                               value={selectedMember.code}
//                               onChange={(e) => setSelectedMember({ ...selectedMember, code: e.target.value })}
//                               placeholder="ENG-101"
//                               className="w-full px-3 py-2 bg-white border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
//                             <input
//                               type="text"
//                               value={selectedMember.grade}
//                               onChange={(e) => setSelectedMember({ ...selectedMember, grade: e.target.value })}
//                               placeholder="Senior, Level 3"
//                               className="w-full px-3 py-2 bg-white border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Discipline</label>
//                             <input
//                               type="text"
//                               value={selectedMember.discipline}
//                               onChange={(e) => setSelectedMember({ ...selectedMember, discipline: e.target.value })}
//                               placeholder="Mechanical, Software"
//                               className="w-full px-3 py-2 bg-white border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Language</label>
//                             <select
//                               value={selectedMember.prefferedLanguage}
//                               onChange={(e) => setSelectedMember({ ...selectedMember, prefferedLanguage: e.target.value })}
//                               className="w-full text-black px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                             >
//                               <option value="English">English</option>
//                               <option value="Spanish">Spanish</option>
//                               <option value="French">French</option>
//                               <option value="German">German</option>
//                               <option value="Chinese">Chinese</option>
//                             </select>
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Services</label>
//                             <select
//                               value={selectedMember.service}
//                               onChange={(e) => setSelectedMember({ ...selectedMember, service: e.target.value })}
//                               className="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                             >
//                               <option value="">Select a service</option>
//                               <option value="Construction">Construction</option>
//                             </select>
//                           </div>
//                         </div>
//                       </motion.div>
//                     )}

//                     {currentStep === 3 && (
//                       <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
//                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//                           <div className="border border-gray-300 rounded-lg p-3 bg-gray-50 h-64" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'available')}>
//                             <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
//                               <FolderOpen className="w-4 h-4 text-gray-500" />
//                               Available Projects
//                               <span className="ml-auto text-xs bg-gray-200 px-2 py-1 rounded">{availableProjects.length}</span>
//                             </h4>
//                             <div className="space-y-2 h-44 overflow-y-auto thin-scrollbar">
//                               {availableProjects.map((project) => (
//                                 <div key={project.id} draggable onDragStart={(e) => handleDragStart(e, project, 'available')} className="flex items-center gap-2 p-2 bg-white rounded border border-gray-200 hover:border-blue-300 cursor-move text-sm">
//                                   <GripVertical className="w-4 h-4 text-gray-400" />
//                                   <span className="flex-1 text-gray-700 truncate">{project.project_name}</span>
//                                   <button onClick={() => handleSelectProject(project)} className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600">Add</button>
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                           <div className="border border-blue-300 rounded-lg p-3 bg-blue-50 h-64" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'selected')}>
//                             <h4 className="text-sm font-medium text-blue-700 mb-3 flex items-center gap-2">
//                               <Briefcase className="w-4 h-4 text-blue-500" />
//                               Selected Projects
//                               <span className="ml-auto text-xs bg-blue-200 px-2 py-1 rounded">{selectedProjects.length}</span>
//                             </h4>
//                             <div className="space-y-2 h-44 overflow-y-auto thin-scrollbar">
//                               {selectedProjects.map((project) => (
//                                 <div key={project.id} draggable onDragStart={(e) => handleDragStart(e, project, 'selected')} className="flex items-center gap-2 p-2 bg-white rounded border border-blue-200 hover:border-blue-500 cursor-move text-sm">
//                                   <GripVertical className="w-4 h-4 text-blue-400" />
//                                   <span className="flex-1 text-gray-700 truncate">{project.project_name}</span>
//                                   <button onClick={() => handleDeselectProject(project)} className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600">Remove</button>
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                       </motion.div>
//                     )}
//                   </form>
//                 </div>

//                 {/* Footer */}
//                 <div className="border-t border-gray-100 px-6 py-4 bg-gray-50">
//                   <div className="flex justify-between items-center">
//                     <div className="text-xs text-gray-500">
//                       {currentStep === 1 && 'Enter personal details'}
//                       {currentStep === 2 && 'Assign work ID and role'}
//                       {currentStep === 3 && 'Assign projects'}
//                     </div>
//                     <div className="flex gap-2">
//                       {currentStep > 1 && (
//                         <button type="button" onClick={() => setCurrentStep(currentStep - 1)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 text-sm font-medium">
//                           Previous
//                         </button>
//                       )}
//                       {currentStep < 3 ? (
//                         <button
//                           type="button"
//                           onClick={() => setCurrentStep(currentStep + 1)}
//                           className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm font-medium flex items-center gap-1 disabled:opacity-50"
//                           disabled={
//                             (currentStep === 1 && (!selectedMember.name || !selectedMember.email)) ||
//                             (currentStep === 2 && !selectedMember.staffNumber)
//                           }
//                         >
//                           Next <ArrowRight className="w-3 h-3" />
//                         </button>
//                       ) : (
//                         <button
//                           onClick={handleEditMember}
//                           disabled={loading.submit}
//                           className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm font-medium flex items-center gap-1 disabled:opacity-50"
//                         >
//                           {loading.submit ? (
//                             <Loader2 className="w-4 h-4 animate-spin" />
//                           ) : (
//                             <Pencil className="w-4 h-4" />
//                           )}
//                           {loading.submit ? 'Updating...' : 'Update Member'}
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Add Department Modal */}
//         <AnimatePresence>
//           {isAddDepartmentModalOpen && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
//               onClick={() => {
//                 setIsAddDepartmentModalOpen(false);
//                 setEditDepartment(null);
//               }}
//             >
//               <div
//                 className="bg-white rounded-2xl shadow-lg w-full max-w-md"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="bg-blue-500 px-4 py-3 flex justify-between items-center">
//                   <h2 className="text-xl font-bold text-white">{editDepartment ? 'Edit Department' : 'Add New Department'}</h2>
//                   <button onClick={() => { setIsAddDepartmentModalOpen(false); setEditDepartment(null); }} className="text-white hover:text-blue-100">
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>
//                 <div className="p-4">
//                   <label className="block text-sm font-medium text-black mb-2">Department Name</label>
//                   <input
//                     type="text"
//                     value={editDepartment ? editDepartment.name : newDepartment.name}
//                     onChange={(e) =>
//                       editDepartment
//                         ? setEditDepartment({ ...editDepartment, name: e.target.value })
//                         : setNewDepartment({ name: e.target.value })
//                     }
//                     className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                     required
//                   />
//                   <div className="flex justify-end gap-3 pt-4">
//                     <button
//                       onClick={() => {
//                         setIsAddDepartmentModalOpen(false);
//                         setEditDepartment(null);
//                       }}
//                       className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
//                     >
//                       Cancel
//                     </button>
//                     <button onClick={editDepartment ? handleUpdateDepartment : handleAddDepartment} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
//                       {editDepartment ? 'Update' : 'Add'}
//                     </button>
//                   </div>
//                   <div className="mt-6">
//                     <h3 className="text-sm font-medium text-gray-700 mb-3">Existing Departments</h3>
//                     <div className="space-y-2 max-h-48 overflow-y-auto thin-scrollbar">
//                       {departments.map((dept) => (
//                         <div key={dept.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200">
//                           <span className="text-sm text-gray-700">{dept.name}</span>
//                           <div className="flex gap-2">
//                             <button onClick={() => setEditDepartment(dept)} className="p-1 text-blue-500 hover:text-blue-600">
//                               <Pencil className="w-4 h-4" />
//                             </button>
//                             <button onClick={() => handleDeleteDepartment(dept.id)} className="p-1 text-red-500 hover:text-red-600">
//                               <Trash2 className="w-4 h-4" />
//                             </button>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Page Header */}
//         <div className="mb-6">
//           <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900 mb-1">Members Overview</h1>
//               <p className="text-gray-600">Manage and track all your team members</p>
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="relative w-60">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search members..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//               <button
//                 onClick={() => setIsAddDepartmentModalOpen(true)}
//                 className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//               >
//                 <Plus className="w-4 h-4" />
//                 Add Department
//               </button>
//               <button
//                 onClick={openAddModal}
//                 className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//               >
//                 <Plus className="w-4 h-4" />
//                 Add Member
//               </button>
//               <div className="flex rounded-lg border border-gray-300 p-1 bg-gray-100">
//                 <button
//                   onClick={() => setViewMode('grid')}
//                   className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-500 hover:text-gray-700'}`}
//                 >
//                   <Grid3X3 className="w-4 h-4" />
//                 </button>
//                 <button
//                   onClick={() => setViewMode('list')}
//                   className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-500 hover:text-gray-700'}`}
//                 >
//                   <List className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//           <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-lg flex items-center justify-center">
//                 <Briefcase className="w-6 h-6 text-blue-600" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-bold text-gray-900">{members.length}</h3>
//                 <p className="text-xs text-gray-500 uppercase">Total Members</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Member Cards */}
//         <div className={viewMode === 'grid'
//           ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'
//           : 'space-y-4'
//         }>
//           {filteredMembers.map((member) => (
//             <div
//               key={member.id}
//               className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden ${viewMode === 'list' ? 'flex flex-col md:flex-row md:items-stretch gap-4' : 'flex flex-col'
//                 }`}
//             >
//               <div className="bg-blue-600 px-4 py-6">
//                 <div className="flex items-center gap-4 mb-4">
//                   <img
//                     src={member.avatar}
//                     alt={member.name}
//                     className="w-12 h-12 rounded-xl object-cover"
//                     loading="lazy"
//                   />
//                   <div className="max-w-[250px]">
//                     <h3 className="font-bold text-lg text-white truncate">{member.name}</h3>
//                     <p className="text-blue-100 text-sm truncate">{member.email}</p>
//                   </div>
//                 </div>
//                 <span className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium border ${member.status === 'Active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'
//                   }`}>
//                   {member.status}
//                 </span>
//               </div>
//               <div className={`p-4 flex-1 flex flex-col ${viewMode === 'list' ? 'md:w-2/3' : ''}`}>
//                 <div className="flex items-center gap-4 mb-4">
//                   <div className="flex items-center gap-2">
//                     <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
//                       <Briefcase className="w-4 h-4 text-gray-700" />
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500 uppercase">Department</p>
//                       <p className="text-gray-900 text-sm font-semibold">{member.department}</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mb-4">
//                   <p className="text-xs text-gray-500 uppercase mb-2">Assigned Projects</p>
//                   <div className="flex flex-wrap gap-2">
//                     {(() => {
//                       const memberProjectNames = (member.projects || []).map(pid =>
//                         projects.find(p => p.id === pid)?.name
//                       ).filter(Boolean);

//                       return memberProjectNames.length > 0 ? (
//                         memberProjectNames.slice(0, 3).map((p, i) => (
//                           <span key={i} className="text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-700">
//                             {p}
//                           </span>
//                         ))
//                       ) : (
//                         <span className="text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-700">No Projects Assigned</span>
//                       );
//                     })()}
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-gray-100 px-4 py-3">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={() => openEditModal(member)}
//                       className="flex items-center gap-2 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600"
//                     >
//                       Edit <Pencil className="w-4 h-4" />
//                     </button>
//                     <button
//                       onClick={() => handleDeleteMember(member.id)}
//                       disabled={loading.delete}
//                       className="flex items-center gap-2 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50"
//                     >
//                       {loading.delete ? (
//                         <Loader2 className="w-4 h-4 animate-spin" />
//                       ) : (
//                         <Trash2 className="w-4 h-4" />
//                       )}
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MembersPage;



'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Grid3X3, List, Plus, Pencil, X, Check,
  ArrowRight, User, Camera, GripVertical, FolderOpen,
  UserPlus, Briefcase, Move, Trash2, Loader2, Key
} from 'lucide-react';
const apiBase = process.env.NEXT_PUBLIC_BACKEND_API_PATH || '';
const MembersPage = () => {
  // Core state
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [members, setMembers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [projects, setProjects] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState({
    image: false,
    submit: false,
    page: true,
    delete: false
  });

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddDepartmentModalOpen, setIsAddDepartmentModalOpen] = useState(false);

  // Member forms
  const [selectedMember, setSelectedMember] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [newMember, setNewMember] = useState({
    staffNumber: '', name: '', email: '', phone: '', department: '', role: '', status: 'Active',
    code: '', grade: '', discipline: '', prefferedLanguage: 'English', service: '', profileImage: '', projects: [],
  });
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [availableProjects, setAvailableProjects] = useState([]);
  const [draggedProject, setDraggedProject] = useState(null);

  // Password fields for edit modal
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  // Department forms
  const [newDepartment, setNewDepartment] = useState({ name: '' });
  const [editDepartment, setEditDepartment] = useState(null);

  // API helpers
  const fetchData = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, page: true }));
      const [depts, projs, roleList, membersData] = await Promise.all([
        fetchDepartments(),
        fetchProjects(),
        fetchRoles(),
        fetchMembers()
      ]);

      setDepartments(depts);
      setProjects(projs);
      setRoles(roleList);
      setMembers(membersData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(prev => ({ ...prev, page: false }));
    }
  }, []);

  const fetchRoles = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/role`,{
         headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });

      console.log("res",res);
      const { success, data } = await res.json();

      console.log("Roles",data);
      return success ? data.map(r => ({ id: r._id, name: r.roleName })) : [];
    } catch {
      return [];
    }
  };

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token') || '';
      const headers = { Accept: 'application/json' };
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await fetch(`http://localhost:3001/api/projects`, { headers });
      const { success, projects } = await res.json();
      console.log("projects", projects);
      return success ? projects.map(p => ({ id: p._id, name: p.name })) : [];
    } catch {
      return [];
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await fetch(`${apiBase}/api/department`);
      const { success, data } = await res.json();
      return success ? data.map(d => ({ id: d._id, name: d.departmentName })) : [];
    } catch {
      return [];
    }
  };

  const fetchMembers = async () => {
    try {
      const token = localStorage.getItem('token') || '';
      const headers = { Accept: 'application/json' };
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await fetch(`http://localhost:3001/api/member`, { headers });
      const { success, data } = await res.json();
      console.log("members", data)

      if (!success) return [];

      return data.map(m => ({
        id: m._id,
        staffNumber: m.staffNumber,
        name: m.name,
        email: m.email,
        phone: m.phone || '',
        department: m.departmentName || 'Unknown',
        roleName: m.role?.roleName || 'Unknown',
        status: m.status || 'Active',
        profileImage: m.profileImage || '',
        projects: m.projects || [],
        projectNames: (m.projects || []).map(pid =>
          projects.find(p => p.id === pid)?.name
        ).filter(Boolean),
        avatar: m.profileImage || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=40&h=40&fit=crop',
      }));
    } catch {
      return [];
    }
  };

  // Delete member handler
  const handleDeleteMember = async (memberId) => {
    console.log(memberId);
    if (!confirm('Are you sure you want to delete this member? This action cannot be undone.')) {
      return;
    }

    setLoading(prev => ({ ...prev, delete: true }));
    try {
      const token = sessionStorage.getItem('token') || '';
      const headers = { 
        'Content-Type': 'application/json',
        Accept: 'application/json'
      };
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await fetch(`${apiBase}/api/member/delete/${memberId}`, {
        method: 'DELETE',
        headers
      });

      const data = await res.json();

      if (data.success) {
        // Remove the member from the local state
        setMembers(prev => prev.filter(member => member.id !== memberId));
        alert('Member deleted successfully');
      } else {
        alert(data.message || 'Failed to delete member');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete member: ' + err.message);
    } finally {
      setLoading(prev => ({ ...prev, delete: false }));
    }
  };

  // Update password handler
  const handleUpdatePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New password and confirm password do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    setLoading(prev => ({ ...prev, submit: true }));
    try {
      const token = sessionStorage.getItem('token') || '';
      const headers = { 
        'Content-Type': 'application/json',
        Accept: 'application/json'
      };
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await fetch(`${apiBase}/api/member/${selectedMember.id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
          newPassword: passwordData.newPassword
        })
      });

      const data = await res.json();

      if (data.success) {
        alert('Password updated successfully');
        setPasswordData({ newPassword: '', confirmPassword: '' });
      } else {
        alert(data.message || 'Failed to update password');
      }
    } catch (err) {
      alert('Failed to update password: ' + err.message);
    } finally {
      setLoading(prev => ({ ...prev, submit: false }));
    }
  };

  // Image upload handler
  const handleImageUpload = async (file) => {
    if (!file) return;

    setLoading(prev => ({ ...prev, image: true }));
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();

      if (data.url) {
        if (isEditModalOpen && selectedMember) {
          setSelectedMember(prev => ({ ...prev, profileImage: data.url }));
        } else {
          setNewMember(prev => ({ ...prev, profileImage: data.url }));
        }
      } else {
        alert('Image upload failed');
      }
    } catch (error) {
      alert('Failed to upload image');
    } finally {
      setLoading(prev => ({ ...prev, image: false }));
    }
  }; 

  // Drag & drop handlers
  const handleDragStart = (e, project, source) => {
    setDraggedProject({ ...project, source });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, target) => {
    e.preventDefault();
    if (!draggedProject) return;

    if (target === 'selected' && draggedProject.source === 'available') {
      setAvailableProjects(prev => prev.filter(p => p.id !== draggedProject.id));
      setSelectedProjects(prev => [...prev, draggedProject]);
    } else if (target === 'available' && draggedProject.source === 'selected') {
      setSelectedProjects(prev => prev.filter(p => p.id !== draggedProject.id));
      setAvailableProjects(prev => [...prev, draggedProject]);
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

  const initializeDragDrop = useCallback((currentProjects = []) => {
    const currentIds = currentProjects.map(p => p.id || p);
    setSelectedProjects(projects.filter(p => currentIds.includes(p.id)));
    setAvailableProjects(projects.filter(p => !currentIds.includes(p.id)));
  }, [projects]);

  // Member CRUD operations
  const handleAddMember = async (e) => {
    e.preventDefault();
    setLoading(prev => ({ ...prev, submit: true }));

    try {
      const payload = {
        ...newMember,
        projects: selectedProjects.map(p => p.id)
      };

      const res = await fetch(`${apiBase}/api/member`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        await fetchData();
        setIsAddModalOpen(false);
        resetMemberForm();
      } else {
        alert(data.message || 'Failed to add member');
      }
    } catch (err) {
      alert('Failed to add member: ' + err.message);
    } finally {
      setLoading(prev => ({ ...prev, submit: false }));
    }
  };

  const handleEditMember = async (e) => {
    e.preventDefault();
    setLoading(prev => ({ ...prev, submit: true }));

    try {
      const token = sessionStorage.getItem('token') || '';
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers.Authorization = `Bearer ${token}`;

      const payload = { 
        ...selectedMember, 
        projects: selectedProjects.map(p => p.id),
        department: selectedMember.department // Make sure department is included
      };
      
      // Remove unnecessary fields
      const { id, avatar, icon, projectNames, roleName, ...cleanPayload } = payload;

      const res = await fetch(`${apiBase}/api/member/${selectedMember.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(cleanPayload)
      });

      const data = await res.json();

      if (data.success) {
        await fetchData();
        setIsEditModalOpen(false);
        setSelectedMember(null);
        setSelectedProjects([]);
        setPasswordData({ newPassword: '', confirmPassword: '' }); // Reset password fields
      } else {
        alert(data.message || 'Failed to edit member');
      }
    } catch (err) {
      alert('Failed to edit member: ' + err.message);
    } finally {
      setLoading(prev => ({ ...prev, submit: false }));
    }
  };

  // Department CRUD operations
  const handleAddDepartment = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${apiBase}/api/department`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDepartment),
      });

      const data = await res.json();

      if (data.success) {
        const updatedDepts = await fetchDepartments();
        setDepartments(updatedDepts);
        setIsAddDepartmentModalOpen(false);
        setNewDepartment({ name: '' });
      } else {
        alert(data.message || 'Failed to add department');
      }
    } catch (err) {
      alert('Failed to add department: ' + err.message);
    }
  };

  const handleUpdateDepartment = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${apiBase}/api/department/${editDepartment.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editDepartment.name }),
      });

      const data = await res.json();

      if (data.success) {
        const updatedDepts = await fetchDepartments();
        setDepartments(updatedDepts);
        setEditDepartment(null);
      } else {
        alert(data.message || 'Failed to update department');
      }
    } catch (err) {
      alert('Failed to update department: ' + err.message);
    }
  };

  const handleDeleteDepartment = async (id) => {
    if (!confirm('Are you sure you want to delete this department?')) return;

    try {
      const res = await fetch(`${apiBase}/api/department/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (data.success) {
        const updatedDepts = await fetchDepartments();
        setDepartments(updatedDepts);
      } else {
        alert(data.message || 'Failed to delete department');
      }
    } catch (err) {
      alert('Failed to delete department: ' + err.message);
    }
  };

  // Form helpers
  const resetMemberForm = () => {
    setNewMember({
      staffNumber: '', name: '', email: '', phone: '', department: '', role: '', status: 'Active',
      code: '', grade: '', discipline: '', prefferedLanguage: 'English', service: '', profileImage: '', projects: [],
    });
    setSelectedProjects([]);
    setCurrentStep(1);
  };

  const openAddModal = () => {
    resetMemberForm();
    initializeDragDrop();
    setIsAddModalOpen(true);
  };

  const openEditModal = (member) => {
    setSelectedMember({ 
      ...member, 
      projects: member.projects || [],
      department: member.department || '',
      role: member.role || ''
    });
    setPasswordData({ newPassword: '', confirmPassword: '' }); // Reset password fields
    initializeDragDrop(member.projects);
    setIsEditModalOpen(true);
    setCurrentStep(1); // Reset to first step when editing
  };

  // Effects
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // UI helpers
  const filteredMembers = members.filter((m) =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Styles
  const scrollbarStyles = `
    .thin-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
    .thin-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 3px; }
    .thin-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
    .thin-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
  `;

  // Loading state
  if (loading.page) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-600">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading members...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <style>{scrollbarStyles}</style>

      <div className="max-w-7xl mx-auto">
        {/* Add Member Modal - No changes needed here */}

        {/* Edit Member Modal with Account Tab */}
        <AnimatePresence>
          {isEditModalOpen && selectedMember && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setIsEditModalOpen(false)}
            >
              <div
                className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">Edit Member</h2>
                  <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Progress Steps - Updated to include Account tab */}
                <div className="px-6 py-4 border-b border-gray-100">
                  <div className="flex justify-center items-center">
                    {[
                      { number: 1, label: 'Personal' },
                      { number: 2, label: 'Work' },
                      { number: 3, label: 'Projects' },
                      { number: 4, label: 'Account' },
                    ].map((step, index) => (
                      <div key={step.number} className="flex items-center">
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${currentStep >= step.number ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                            {currentStep > step.number ? <Check className="w-4 h-4" /> : <span>{step.number}</span>}
                          </div>
                          <span className={`text-xs mt-1 ${currentStep >= step.number ? 'text-blue-500 font-medium' : 'text-gray-500'}`}>{step.label}</span>
                        </div>
                        {index < 3 && <div className={`w-12 h-0.5 mx-2 transition-colors ${currentStep > step.number ? 'bg-blue-500' : 'bg-gray-200'}`} />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto thin-scrollbar">
                  <form onSubmit={handleEditMember} className="p-6">
                    {/* Steps 1-3 remain the same as before */}
                    {currentStep === 1 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                        {/* Profile Image */}
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center overflow-hidden">
                              {selectedMember.profileImage ? (
                                <img src={selectedMember.profileImage} alt="Profile" className="w-full h-full object-cover" />
                              ) : loading.image ? (
                                <Loader2 className="w-6 h-6 text-gray-500 animate-spin" />
                              ) : (
                                <User className="w-6 h-6 text-gray-500" />
                              )}
                            </div>
                            <label htmlFor="profile-upload-edit" className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1.5 rounded-full shadow cursor-pointer">
                              <Camera className="w-3 h-3" />
                              <input
                                id="profile-upload-edit"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleImageUpload(file);
                                }}
                              />
                            </label>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-700">Profile Photo</h3>
                            <p className="text-xs text-gray-500">Click to upload</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                            <input
                              type="text"
                              value={selectedMember.name}
                              onChange={(e) => setSelectedMember({ ...selectedMember, name: e.target.value })}
                              placeholder="John Doe"
                              className="w-full px-3 py-2 text-black bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                            <input
                              type="email"
                              value={selectedMember.email}
                              onChange={(e) => setSelectedMember({ ...selectedMember, email: e.target.value })}
                              placeholder="xyz@gmail.com"
                              className="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input
                              type="text"
                              value={selectedMember.phone}
                              onChange={(e) => setSelectedMember({ ...selectedMember, phone: e.target.value })}
                              placeholder="+91 000-000-0000"
                              className="w-full px-3 py-2 bg-white border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                            <select
                              value={selectedMember.department}
                              onChange={(e) => setSelectedMember({ ...selectedMember, department: e.target.value })}
                              className="w-full px-3 text-black py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="">Select department</option>
                              {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                            <select
                              value={selectedMember.role}
                              onChange={(e) => setSelectedMember({ ...selectedMember, role: e.target.value })}
                              className="w-full px-3 py-2 text-black bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="">Select role</option>
                              {roles.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
                            </select>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 2 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Staff Number <span className="text-red-500">*</span></label>
                            <input
                              type="text"
                              value={selectedMember.staffNumber}
                              onChange={(e) => setSelectedMember({ ...selectedMember, staffNumber: e.target.value })}
                              placeholder="EMP-001"
                              className="w-full px-3 py-2 bg-white border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
                            <input
                              type="text"
                              value={selectedMember.code}
                              onChange={(e) => setSelectedMember({ ...selectedMember, code: e.target.value })}
                              placeholder="ENG-101"
                              className="w-full px-3 py-2 bg-white border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                            <input
                              type="text"
                              value={selectedMember.grade}
                              onChange={(e) => setSelectedMember({ ...selectedMember, grade: e.target.value })}
                              placeholder="Senior, Level 3"
                              className="w-full px-3 py-2 bg-white border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Discipline</label>
                            <input
                              type="text"
                              value={selectedMember.discipline}
                              onChange={(e) => setSelectedMember({ ...selectedMember, discipline: e.target.value })}
                              placeholder="Mechanical, Software"
                              className="w-full px-3 py-2 bg-white border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Language</label>
                            <select
                              value={selectedMember.prefferedLanguage}
                              onChange={(e) => setSelectedMember({ ...selectedMember, prefferedLanguage: e.target.value })}
                              className="w-full text-black px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                            <select
                              value={selectedMember.service}
                              onChange={(e) => setSelectedMember({ ...selectedMember, service: e.target.value })}
                              className="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="">Select a service</option>
                              <option value="Construction">Construction</option>
                            </select>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 3 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div className="border border-gray-300 rounded-lg p-3 bg-gray-50 h-64" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'available')}>
                            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                              <FolderOpen className="w-4 h-4 text-gray-500" />
                              Available Projects
                              <span className="ml-auto text-xs bg-gray-200 px-2 py-1 rounded">{availableProjects.length}</span>
                            </h4>
                            <div className="space-y-2 h-44 overflow-y-auto thin-scrollbar">
                              {availableProjects.map((project) => (
                                <div key={project.id} draggable onDragStart={(e) => handleDragStart(e, project, 'available')} className="flex items-center gap-2 p-2 bg-white rounded border border-gray-200 hover:border-blue-300 cursor-move text-sm">
                                  <GripVertical className="w-4 h-4 text-gray-400" />
                                  <span className="flex-1 text-gray-700 truncate">{project.project_name}</span>
                                  <button onClick={() => handleSelectProject(project)} className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600">Add</button>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="border border-blue-300 rounded-lg p-3 bg-blue-50 h-64" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'selected')}>
                            <h4 className="text-sm font-medium text-blue-700 mb-3 flex items-center gap-2">
                              <Briefcase className="w-4 h-4 text-blue-500" />
                              Selected Projects
                              <span className="ml-auto text-xs bg-blue-200 px-2 py-1 rounded">{selectedProjects.length}</span>
                            </h4>
                            <div className="space-y-2 h-44 overflow-y-auto thin-scrollbar">
                              {selectedProjects.map((project) => (
                                <div key={project.id} draggable onDragStart={(e) => handleDragStart(e, project, 'selected')} className="flex items-center gap-2 p-2 bg-white rounded border border-blue-200 hover:border-blue-500 cursor-move text-sm">
                                  <GripVertical className="w-4 h-4 text-blue-400" />
                                  <span className="flex-1 text-gray-700 truncate">{project.project_name}</span>
                                  <button onClick={() => handleDeselectProject(project)} className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600">Remove</button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* New Account Tab */}
                    {currentStep === 4 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <Key className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">Account Settings</h3>
                            <p className="text-sm text-gray-600">Update password for {selectedMember.name}</p>
                          </div>
                        </div>

                        <div className="space-y-4 max-w-md">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                            <input
                              type="password"
                              value={passwordData.newPassword}
                              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                              placeholder="Enter new password"
                              className="w-full px-3 py-2 bg-white border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters long</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                            <input
                              type="password"
                              value={passwordData.confirmPassword}
                              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                              placeholder="Confirm new password"
                              className="w-full px-3 py-2 bg-white border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          
                          {passwordData.newPassword && passwordData.confirmPassword && (
                            <div className={`p-3 rounded-lg ${passwordData.newPassword === passwordData.confirmPassword ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                              <p className={`text-sm ${passwordData.newPassword === passwordData.confirmPassword ? 'text-green-700' : 'text-red-700'}`}>
                                {passwordData.newPassword === passwordData.confirmPassword 
                                  ? '✓ Passwords match' 
                                  : '✗ Passwords do not match'}
                              </p>
                            </div>
                          )}

                          <button
                            type="button"
                            onClick={handleUpdatePassword}
                            disabled={!passwordData.newPassword || !passwordData.confirmPassword || passwordData.newPassword !== passwordData.confirmPassword || loading.submit}
                            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                          >
                            {loading.submit ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Key className="w-4 h-4" />
                            )}
                            {loading.submit ? 'Updating Password...' : 'Update Password'}
                          </button>
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
                      {currentStep === 4 && 'Update account password'}
                    </div>
                    <div className="flex gap-2">
                      {currentStep > 1 && (
                        <button type="button" onClick={() => setCurrentStep(currentStep - 1)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 text-sm font-medium">
                          Previous
                        </button>
                      )}
                      {currentStep < 4 ? (
                        <button
                          type="button"
                          onClick={() => setCurrentStep(currentStep + 1)}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm font-medium flex items-center gap-1 disabled:opacity-50"
                          disabled={
                            (currentStep === 1 && (!selectedMember.name || !selectedMember.email)) ||
                            (currentStep === 2 && !selectedMember.staffNumber)
                          }
                        >
                          Next <ArrowRight className="w-3 h-3" />
                        </button>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={handleEditMember}
                            disabled={loading.submit}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm font-medium flex items-center gap-1 disabled:opacity-50"
                          >
                            {loading.submit ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Pencil className="w-4 h-4" />
                            )}
                            {loading.submit ? 'Updating...' : 'Update Member'}
                          </button>
                        </div>
                      )}
                    </div>
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
              onClick={() => {
                setIsAddDepartmentModalOpen(false);
                setEditDepartment(null);
              }}
            >
              <div
                className="bg-white rounded-2xl shadow-lg w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-blue-500 px-4 py-3 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-white">{editDepartment ? 'Edit Department' : 'Add New Department'}</h2>
                  <button onClick={() => { setIsAddDepartmentModalOpen(false); setEditDepartment(null); }} className="text-white hover:text-blue-100">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4">
                  <label className="block text-sm font-medium text-black mb-2">Department Name</label>
                  <input
                    type="text"
                    value={editDepartment ? editDepartment.name : newDepartment.name}
                    onChange={(e) =>
                      editDepartment
                        ? setEditDepartment({ ...editDepartment, name: e.target.value })
                        : setNewDepartment({ name: e.target.value })
                    }
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      onClick={() => {
                        setIsAddDepartmentModalOpen(false);
                        setEditDepartment(null);
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button onClick={editDepartment ? handleUpdateDepartment : handleAddDepartment} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                      {editDepartment ? 'Update' : 'Add'}
                    </button>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Existing Departments</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto thin-scrollbar">
                      {departments.map((dept) => (
                        <div key={dept.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200">
                          <span className="text-sm text-gray-700">{dept.name}</span>
                          <div className="flex gap-2">
                            <button onClick={() => setEditDepartment(dept)} className="p-1 text-blue-500 hover:text-blue-600">
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteDepartment(dept.id)} className="p-1 text-red-500 hover:text-red-600">
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

        {/* Page Header */}
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
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{members.length}</h3>
                <p className="text-xs text-gray-500 uppercase">Total Members</p>
              </div>
            </div>
          </div>
        </div>

        {/* Member Cards */}
        <div className={viewMode === 'grid'
          ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'
          : 'space-y-4'
        }>
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden ${viewMode === 'list' ? 'flex flex-col md:flex-row md:items-stretch gap-4' : 'flex flex-col'
                }`}
            >
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
                <span className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium border ${member.status === 'Active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'
                  }`}>
                  {member.status}
                </span>
              </div>
              <div className={`p-4 flex-1 flex flex-col ${viewMode === 'list' ? 'md:w-2/3' : ''}`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-4 h-4 text-gray-700" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Department</p>
                      <p className="text-gray-900 text-sm font-semibold">{member.department}</p>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-xs text-gray-500 uppercase mb-2">Assigned Projects</p>
                  <div className="flex flex-wrap gap-2">
                    {(() => {
                      const memberProjectNames = (member.projects || []).map(pid =>
                        projects.find(p => p.id === pid)?.name
                      ).filter(Boolean);

                      return memberProjectNames.length > 0 ? (
                        memberProjectNames.slice(0, 3).map((p, i) => (
                          <span key={i} className="text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-700">
                            {p}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-700">No Projects Assigned</span>
                      );
                    })()}
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(member)}
                      className="flex items-center gap-2 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600"
                    >
                      Edit <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteMember(member.id)}
                      disabled={loading.delete}
                      className="flex items-center gap-2 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50"
                    >
                      {loading.delete ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                      Delete
                    </button>
                  </div>
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