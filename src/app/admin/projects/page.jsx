// "use client";

// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import {
//   Search,
//   Grid3X3,
//   List,
//   Filter,
//   ChevronRight,
//   User,
//   Briefcase,
//   Clock,
//   Target,
//   DollarSign,
//   Plus,
//   X,
//   Loader2,
//   RefreshCw,
//   AlertCircle,
// } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast";
// const ProjectsPage = () => {
//   const [activeTab, setActiveTab] = useState("All Projects");
//   const [viewMode, setViewMode] = useState("grid");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterOpen, setFilterOpen] = useState(false);
//   const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [statsLoading, setStatsLoading] = useState(true);
//   const [newProject, setNewProject] = useState({
//     name: "",
//     code: "",
//     type: "",
//     startDate: "",
//     endDate: "",
//     currency: "INR",
//     zoneOffset: "+00:00",
//     budget: "",
//     location: "",
//     description: "",
//     projectPhoto: null,
//     status: "planned",
//     tags: [],
//   });
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});

//   // Fetch projects from API
//   const fetchProjects = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_API_PATH}/api/projects`
//       );

//       if (!response.ok) {
//         if (response.status === 404) {
//           throw new Error("Projects endpoint not found");
//         } else if (response.status >= 500) {
//           throw new Error("Server error occurred");
//         } else {
//           throw new Error(`Failed to fetch projects: ${response.status}`);
//         }
//       }

//       const data = await response.json();
//       setProjects(data.projects || []);
//       setError(null);
//     } catch (err) {
//       console.error("Error fetching projects:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//       setStatsLoading(false);
//     }
//   };

//   // Calculate stats from projects data
//   const calculateStats = () => {
//     const totalProjects = projects.length;
//     const inProgress = projects.filter(
//       (p) => p.status === "In Progress"
//     ).length;
//     const completed = projects.filter((p) => p.status === "Completed").length;

//     // Calculate total budget (assuming budget is stored as a number)
//     const totalBudget = projects.reduce((sum, project) => {
//       return sum + (parseFloat(project.budget) || 0);
//     }, 0);

//     return [
//       {
//         label: "Total Projects",
//         value: totalProjects.toString(),
//         change: "+12%",
//         icon: Briefcase,
//       },
//       {
//         label: "In Progress",
//         value: inProgress.toString(),
//         change: "+3",
//         icon: Clock,
//       },
//       {
//         label: "Completed",
//         value: completed.toString(),
//         change: "+5",
//         icon: Target,
//       },
//       {
//         label: "Total Budget",
//         value: `₹${totalBudget.toFixed(1)}B`,
//         change: "+18%",
//         icon: DollarSign,
//       },
//     ];
//   };

//   const projectStats = statsLoading ? [] : calculateStats();

//   // Tab data based on project statuses
//   const tabs = [
//     { name: "All Projects", count: projects.length },
//     {
//       name: "In Planning",
//       count: projects.filter((p) => p.status === "In Planning").length,
//     },
//     {
//       name: "In Design",
//       count: projects.filter((p) => p.status === "In Design").length,
//     },
//     {
//       name: "In Progress",
//       count: projects.filter((p) => p.status === "In Progress").length,
//     },
//     {
//       name: "Under Review",
//       count: projects.filter((p) => p.status === "Under Review").length,
//     },
//     {
//       name: "Completed",
//       count: projects.filter((p) => p.status === "Completed").length,
//     },
//   ];

//   // Filter projects based on active tab and search term
//   const filteredProjects = projects.filter((project) => {
//     const matchesSearch =
//       project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (project.location &&
//         project.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       project.status.toLowerCase().includes(searchTerm.toLowerCase());

//     if (activeTab === "All Projects") return matchesSearch;
//     return matchesSearch && project.status === activeTab;
//     const MS_PER_DAY = 1000 * 60 * 60 * 24;
//     const now = Date.now();

//     // Ensure we don't get negative days
//     const elapsedDays = Math.max(
//       0,
//       Math.floor((now - project.startDate) / MS_PER_DAY)
//     );
//     const remainingDays = Math.max(
//       0,
//       Math.floor((project.endDate - now) / MS_PER_DAY)
//     );

//     // Additional useful calculations
//     const totalProjectDays = Math.floor(
//       (project.endDate - project.startDate) / MS_PER_DAY
//     );
//     const progressPercentage =
//       totalProjectDays > 0 ? (elapsedDays / totalProjectDays) * 100 : 0;
//   });

//   // Validation function
//   const validateForm = () => {
//     const newErrors = {};

//     if (!newProject.name.trim()) {
//       newErrors.name = "Project name is required";
//     }

//     if (!newProject.code.trim()) {
//       newErrors.code = "Project code is required";
//     }

//     if (!newProject.type) {
//       newErrors.type = "Project type is required";
//     }

//     if (!newProject.budget) {
//       newErrors.budget = "Budget is required";
//     } else if (
//       isNaN(parseFloat(newProject.budget)) ||
//       parseFloat(newProject.budget) <= 0
//     ) {
//       newErrors.budget = "Budget must be a valid positive number";
//     }

//     if (newProject.startDate && newProject.endDate) {
//       const start = new Date(newProject.startDate);
//       const end = new Date(newProject.endDate);
//       if (end < start) {
//         newErrors.endDate = "End date cannot be before start date";
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Create new project function
//   const createProject = async (formData) => {
//     try {
//       const body = Object.fromEntries(formData.entries());

//       if (body.budget) {
//         body.budget = Number(body.budget);
//       }

//       body.currency = body.currency || "INR";
//       body.zoneOffset = body.zoneOffset || "+00:00";
//       body.status = body.status || "planned";
//       body.tags = body.tags
//         ? body.tags.split(",").map((tag) => tag.trim())
//         : [];

//       console.log("📤 Sending JSON payload:", body);

//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_API_PATH}/api/projects`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(body),
//         }
//       );

//       const data = await res.json();
//       if (!res.ok || !data.success) {
//         throw new Error(data.error || `HTTP error! status: ${res.status}`);
//       }

//       console.log("✅ Project created:", data);
//       toast.success("Project Created Sucessfully...!!");
//       fetchProjects();
//       return data;
//     } catch (error) {
//       console.error("❌ Error creating project:", error);
//       throw error;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate form before submission
//     if (!validateForm()) {
//       // Mark all fields as touched to show errors
//       const allFields = {
//         name: true,
//         code: true,
//         type: true,
//         budget: true,
//         startDate: true,
//         endDate: true,
//       };
//       setTouched(allFields);
//       return;
//     }

//     try {
//       setLoading(true);

//       // Create FormData from the form
//       const formData = new FormData(e.target);

//       // Add any fields that might not be in the form
//       if (newProject.tags.length > 0) {
//         formData.set("tags", newProject.tags.join(","));
//       }

//       const result = await createProject(formData);

//       // Add the new project to the state
//       if (result.project) {
//         setProjects((prev) => [...prev, result.project]);
//       }

//       // Reset form and close modal
//       setNewProject({
//         name: "",
//         code: "",
//         type: "",
//         startDate: "",
//         endDate: "",
//         currency: "INR",
//         zoneOffset: "+00:00",
//         budget: "",
//         location: "",
//         description: "",
//         projectPhoto: null,
//         status: "planned",
//         tags: [],
//       });

//       setTouched({});
//       setErrors({});
//       setIsProjectDropdownOpen(false);
//       fetchProjects();
//     } catch (error) {
//       console.error("Error creating project:", error);
//       setError(error.message || "Failed to create project");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBlur = (e) => {
//     const { name } = e.target;
//     setTouched({ ...touched, [name]: true });

//     // Validate the field that was just blurred
//     validateForm();
//   };

//   // Handle input changes for new project form
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewProject((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     if (errors[name]) {
//       setErrors({ ...errors, [name]: "" });
//     }
//   };

//   const handleTagsChange = (e) => {
//     const tagsString = e.target.value;
//     const tagsArray = tagsString
//       .split(",")
//       .map((tag) => tag.trim())
//       .filter((tag) => tag !== "");
//     setNewProject((prev) => ({
//       ...prev,
//       tags: tagsArray,
//     }));
//   };

//   // Handle file upload
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Check file size (5MB limit)
//       if (file.size > 5 * 1024 * 1024) {
//         setError("File size must be less than 5MB");
//         return;
//       }

//       setNewProject((prev) => ({
//         ...prev,
//         projectPhoto: file,
//       }));
//     }
//   };

//   // Fetch projects on component mount
//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   useEffect(() => {
//     if (newProject.startDate && newProject.endDate) {
//       const start = new Date(newProject.startDate);
//       const end = new Date(newProject.endDate);

//       if (end < start) {
//         setError("End date cannot be before start date");
//       } else {
//         setError(null);
//       }
//     }
//   }, [newProject.startDate, newProject.endDate]);

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case "High":
//         return "bg-red-100 text-red-700 border-red-200";
//       case "Medium":
//         return "bg-yellow-100 text-yellow-700 border-yellow-200";
//       case "Low":
//         return "bg-green-100 text-green-700 border-green-200";
//       default:
//         return "bg-gray-100 text-gray-700 border-gray-200";
//     }
//   };

//   const handleStatClick = (label) => {
//     if (label === "Total Projects") setActiveTab("All Projects");
//     if (label === "In Progress") setActiveTab("In Progress");
//     if (label === "Completed") setActiveTab("Completed");
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
//           <p className="text-gray-600">Loading projects...</p>
//         </div>
//       </div>
//     );
//   }

//   console.log(filteredProjects);

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <Toaster />
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="mb-8"
//         >
//           <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                 Projects Overview
//               </h1>
//               <p className="text-gray-600">
//                 Manage and track all your construction projects
//               </p>
//             </div>
//             <div className="flex items-center gap-4">
//               <div className="relative w-64">
//                 <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search projects..."
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
//                   <span>Process</span>
//                 </motion.button>
//                 {filterOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-20">
//                     {tabs.map((tab) => (
//                       <button
//                         key={tab.name}
//                         onClick={() => {
//                           setActiveTab(tab.name);
//                           setFilterOpen(false);
//                         }}
//                         className={`flex items-center justify-between w-full px-4 py-2 text-sm ${
//                           activeTab === tab.name
//                             ? "bg-blue-50 text-blue-600 font-medium"
//                             : "text-gray-700 hover:bg-gray-50"
//                         }`}
//                       >
//                         {tab.name}
//                         <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
//                           {tab.count}
//                         </span>
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//               <div className="flex rounded-xl border-2 border-gray-300 p-1 bg-gray-100">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   onClick={() => setViewMode("grid")}
//                   className={`p-2 rounded-lg ${
//                     viewMode === "grid"
//                       ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
//                       : "text-gray-500 hover:text-gray-700"
//                   }`}
//                 >
//                   <Grid3X3 className="w-5 h-5" />
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   onClick={() => setViewMode("list")}
//                   className={`p-2 rounded-lg ${
//                     viewMode === "list"
//                       ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
//                       : "text-gray-500 hover:text-gray-700"
//                   }`}
//                 >
//                   <List className="w-5 h-5" />
//                 </motion.button>
//               </div>
//               <div className="relative">
//                 <div className="relative z-50">
//                   {/* Plus Button */}
//                   <motion.div
//                     whileHover={{ scale: 1.05 }}
//                     onClick={() =>
//                       setIsProjectDropdownOpen(!isProjectDropdownOpen)
//                     }
//                     className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-lg font-bold cursor-pointer shadow-lg hover:shadow-xl transition-all"
//                   >
//                     <Plus size={20} />
//                   </motion.div>

//                   {/* Backdrop with darker blur effect for modern look */}
//                   {isProjectDropdownOpen && (
//                     <div
//                       className="fixed inset-0 bg-white bg-opacity-40 backdrop-blur-md z-40"
//                       onClick={() => setIsProjectDropdownOpen(false)}
//                     />
//                   )}

//                   {/* Project Creation Form */}
//                   {isProjectDropdownOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, scale: 0.95 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       transition={{ type: "spring", damping: 20 }}
//                       className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-3xl h-[90vh] max-h-[700px] bg-white rounded-xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden"
//                     >
//                       {/* Header */}
//                       <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
//                         <div className="flex justify-between items-center">
//                           <div>
//                             <h3 className="text-xl font-semibold text-gray-800">
//                               Create New Project
//                             </h3>
//                             <p className="text-sm text-gray-600 mt-1">
//                               Fill in the project details
//                             </p>
//                           </div>
//                           <button
//                             onClick={() => setIsProjectDropdownOpen(false)}
//                             className="p-1 hover:bg-gray-200 rounded-full transition"
//                           >
//                             <X size={20} className="text-gray-600" />
//                           </button>
//                         </div>
//                       </div>

//                       {/* Form Content - Optimized layout */}
//                       <div className="flex-1 overflow-y-auto px-6 py-4">
//                         <form onSubmit={handleSubmit}>
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             {/* Left Column */}
//                             <div className="space-y-4">
//                               {/* Project Name */}
//                               <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                   Project Name *
//                                 </label>
//                                 <input
//                                   type="text"
//                                   name="name"
//                                   value={newProject.name}
//                                   onChange={handleInputChange}
//                                   maxLength={30}
//                                   onBlur={handleBlur}
//                                   placeholder="Enter project name"
//                                   className={`w-full px-3 py-2 text-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                                     errors.name && touched.name
//                                       ? "border-red-500"
//                                       : "border-gray-300"
//                                   }`}
//                                 />
//                                 {errors.name && touched.name && (
//                                   <p className="mt-1 text-sm text-red-600">
//                                     {errors.name}
//                                   </p>
//                                 )}
//                               </div>

//                               {/* Project Code */}
//                               <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                   Project Code *
//                                 </label>
//                                 <input
//                                   type="text"
//                                   name="code"
//                                   value={newProject.code}
//                                   onChange={handleInputChange}
//                                   onBlur={handleBlur}
//                                   placeholder="Enter unique project code"
//                                   className={`w-full px-3 py-2 text-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                                     errors.code && touched.code
//                                       ? "border-red-500"
//                                       : "border-gray-300"
//                                   }`}
//                                 />
//                                 {errors.code && touched.code && (
//                                   <p className="mt-1 text-sm text-red-600">
//                                     {errors.code}
//                                   </p>
//                                 )}
//                               </div>

//                               {/* Project Type */}
//                               <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                   Type *
//                                 </label>
//                                 <select
//                                   name="type"
//                                   value={newProject.type}
//                                   onChange={handleInputChange}
//                                   onBlur={handleBlur}
//                                   className={`w-full px-3 py-2 text-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                                     errors.type && touched.type
//                                       ? "border-red-500"
//                                       : "border-gray-300"
//                                   }`}
//                                 >
//                                   <option value="">Select type</option>
//                                   <option value="Residential">
//                                     Residential
//                                   </option>
//                                   <option value="Commercial">Commercial</option>
//                                   <option value="Industrial">Industrial</option>
//                                   <option value="Infrastructure">
//                                     Infrastructure
//                                   </option>
//                                 </select>
//                                 {errors.type && touched.type && (
//                                   <p className="mt-1 text-sm text-red-600">
//                                     {errors.type}
//                                   </p>
//                                 )}
//                               </div>

//                               {/* Start and End Dates */}
//                               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                 <div>
//                                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Start Date
//                                   </label>
//                                   <input
//                                     type="date"
//                                     name="startDate"
//                                     value={newProject.startDate}
//                                     onChange={handleInputChange}
//                                     onBlur={handleBlur}
//                                     className={`w-full px-3 py-2 text-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                                       errors.startDate && touched.startDate
//                                         ? "border-red-500"
//                                         : "border-gray-300"
//                                     }`}
//                                   />
//                                 </div>
//                                 <div>
//                                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     End Date
//                                   </label>
//                                   <input
//                                     type="date"
//                                     name="endDate"
//                                     value={newProject.endDate}
//                                     onChange={handleInputChange}
//                                     onBlur={handleBlur}
//                                     className={`w-full px-3 py-2 text-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                                       errors.endDate && touched.endDate
//                                         ? "border-red-500"
//                                         : "border-gray-300"
//                                     }`}
//                                   />
//                                   {errors.endDate && touched.endDate && (
//                                     <p className="mt-1 text-sm text-red-600">
//                                       {errors.endDate}
//                                     </p>
//                                   )}
//                                 </div>
//                               </div>

//                               {/* Currency and Time Zone Offset */}
//                               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                 <div>
//                                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Currency
//                                   </label>
//                                   <select
//                                     name="currency"
//                                     value={newProject.currency}
//                                     onChange={handleInputChange}
//                                     className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                   >
//                                     <option value="INR">INR (₹)</option>
//                                     <option value="USD">USD ($)</option>
//                                     <option value="EUR">EUR (€)</option>
//                                     <option value="GBP">GBP (£)</option>
//                                   </select>
//                                 </div>
//                                 <div>
//                                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Time Zone Offset
//                                   </label>
//                                   <select
//                                     name="zoneOffset"
//                                     value={newProject.zoneOffset}
//                                     onChange={handleInputChange}
//                                     className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                   >
//                                     <option value="+00:00">UTC (+00:00)</option>
//                                     <option value="+05:30">IST (+05:30)</option>
//                                     <option value="-05:00">EST (-05:00)</option>
//                                     <option value="-08:00">PST (-08:00)</option>
//                                     <option value="+01:00">CET (+01:00)</option>
//                                   </select>
//                                 </div>
//                               </div>
//                             </div>

//                             {/* Right Column */}
//                             <div className="space-y-4">
//                               {/* Budget */}
//                               <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                   Budget *
//                                 </label>
//                                 <input
//                                   type="number"
//                                   name="budget"
//                                   value={newProject.budget}
//                                   onChange={handleInputChange}
//                                   onBlur={handleBlur}
//                                   step="0.01"
//                                   min="0"
//                                   placeholder="Enter budget amount"
//                                   className={`w-full px-3 py-2 text-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                                     errors.budget && touched.budget
//                                       ? "border-red-500"
//                                       : "border-gray-300"
//                                   }`}
//                                 />
//                                 {errors.budget && touched.budget && (
//                                   <p className="mt-1 text-sm text-red-600">
//                                     {errors.budget}
//                                   </p>
//                                 )}
//                               </div>

//                               {/* Location */}
//                               <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                   Location
//                                 </label>
//                                 <input
//                                   type="text"
//                                   name="location"
//                                   maxLength={30}
//                                   value={newProject.location}
//                                   onChange={handleInputChange}
//                                   placeholder="Enter project location"
//                                   className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                 />
//                               </div>

//                               {/* Description */}
//                               <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                   Description
//                                 </label>
//                                 <textarea
//                                   rows={3}
//                                   name="description"
//                                   value={newProject.description}
//                                   maxLength={60}
//                                   onChange={handleInputChange}
//                                   placeholder="Enter project description"
//                                   className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                 />
//                               </div>

//                               {/* Tags */}
//                               <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                   Tags
//                                 </label>
//                                 <input
//                                   type="text"
//                                   name="tags"
//                                   onChange={handleTagsChange}
//                                   placeholder="Enter comma-separated tags"
//                                   className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                 />
//                                 <p className="text-xs text-gray-600 mt-1">
//                                   Separate tags with commas
//                                 </p>
//                               </div>

//                               {/* Project Status */}
//                               <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                   Status
//                                 </label>
//                                 <select
//                                   name="status"
//                                   value={newProject.status}
//                                   onChange={handleInputChange}
//                                   className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                 >
//                                   <option value="planned">Planned</option>
//                                   <option value="in-progress">
//                                     In Progress
//                                   </option>
//                                   <option value="on-hold">On Hold</option>
//                                   <option value="completed">Completed</option>
//                                   <option value="cancelled">Cancelled</option>
//                                 </select>
//                               </div>

//                               {/* Project Photo */}
//                               <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                   Project Photo
//                                 </label>
//                                 <div className="flex items-center gap-3 mt-1">
//                                   <label className="flex-1 px-3 py-2 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition flex items-center justify-center">
//                                     <span className="text-sm text-gray-700 flex items-center">
//                                       <svg
//                                         className="w-4 h-4 mr-2"
//                                         fill="none"
//                                         stroke="currentColor"
//                                         viewBox="0 0 24 24"
//                                         xmlns="http://www.w3.org/2000/svg"
//                                       >
//                                         <path
//                                           strokeLinecap="round"
//                                           strokeLinejoin="round"
//                                           strokeWidth="2"
//                                           d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//                                         ></path>
//                                       </svg>
//                                       {newProject.projectPhoto
//                                         ? newProject.projectPhoto.name
//                                         : "Choose File"}
//                                     </span>
//                                     <input
//                                       type="file"
//                                       className="hidden"
//                                       accept="image/*"
//                                       onChange={handleFileChange}
//                                     />
//                                   </label>
//                                 </div>
//                                 <p className="text-xs text-gray-600 mt-1">
//                                   JPEG, PNG or GIF (Max 5MB)
//                                 </p>
//                               </div>
//                             </div>
//                           </div>

//                           {/* Form Actions */}
//                           <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
//                             <div className="flex gap-3 justify-end">
//                               <button
//                                 type="button"
//                                 onClick={() => setIsProjectDropdownOpen(false)}
//                                 className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium text-sm"
//                               >
//                                 Cancel
//                               </button>
//                               <button
//                                 type="submit"
//                                 className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium text-sm"
//                               >
//                                 Create Project
//                               </button>
//                             </div>
//                           </div>
//                         </form>
//                       </div>
//                     </motion.div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {projectStats.map((stat, i) => {
//             const Icon = stat.icon;

//             // Pick theme color based on label
//             const getIconColor = (label) => {
//               switch (label) {
//                 case "Total Projects":
//                   return "text-blue-600";
//                 case "In Progress":
//                   return "text-orange-500";
//                 case "Completed":
//                   return "text-green-600";
//                 case "Total Budget":
//                   return "text-teal-600";
//                 default:
//                   return "text-gray-700";
//               }
//             };

//             return (
//               <motion.div
//                 whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
//                 transition={{ type: "spring", stiffness: 300 }}
//                 key={i}
//                 onClick={() => handleStatClick(stat.label)}
//                 className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 flex items-center justify-between cursor-pointer"
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-xl flex items-center justify-center">
//                     <Icon className={`w-7 h-7 ${getIconColor(stat.label)}`} />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-bold text-gray-900">
//                       {stat.value}
//                     </h3>
//                     <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
//                       {stat.label}
//                     </p>
//                   </div>
//                 </div>
//                 <span className="text-xs font-medium text-green-600">
//                   {stat.change}
//                 </span>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* Project Cards */}
//         {filteredProjects.length === 0 ? (
//           <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-12 text-center">
//             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Search className="w-8 h-8 text-gray-400" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-700 mb-2">
//               No projects found
//             </h3>
//             <p className="text-gray-500">
//               {searchTerm
//                 ? `No projects match your search for "${searchTerm}"`
//                 : `No projects found in the ${activeTab} category`}
//             </p>
//           </div>
//         ) : (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//             className={
//               viewMode === "grid"
//                 ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
//                 : "space-y-6"
//             }
//           >
//             {filteredProjects.map((project) => (
//               <motion.div
//                 key={project._id || project.id}
//                 whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
//                 transition={{ type: "spring", stiffness: 300 }}
//                 className={`bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden ${
//                   viewMode === "list"
//                     ? "flex flex-col md:flex-row md:items-stretch p-6 gap-6"
//                     : "flex flex-col"
//                 }`}
//               >
//                 {/* Card Top - Changed to darker blue */}
//                 <div className="bg-blue-500 px-6 py-8 relative overflow-hidden">
//                   <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
//                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-16 translate-x-16"></div>
//                   <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/20 rounded-full translate-y-12 -translate-x-12"></div>
//                   <div className="relative z-10">
//                     <div className="flex items-center gap-4 mb-4">
//                       <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl">
//                         {project.icon || "🏗️"}
//                       </div>
//                       <div className="max-w-[250px]">
//                         <h3 className="font-bold text-xl text-white truncate">
//                           {project.name}
//                         </h3>
//                         <p className="text-blue-100 text-sm truncate">
//                           {project.location}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <span
//                         className={`inline-flex items-center gap-2 px-1 py-0.5 rounded-full text-xs font-medium border ${
//                           project.statusColor ||
//                           "bg-blue-100 text-blue-700 border-blue-200"
//                         }`}
//                       >
//                         {project.status}
//                       </span>
//                       <span
//                         className={`inline-flex items-center gap-2 px-1 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(
//                           project.priority
//                         )}`}
//                       >
//                         {project.priority}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div
//                   className={`p-6 ${
//                     viewMode === "list"
//                       ? "flex flex-col justify-between w-full md:w-2/3"
//                       : "flex-1"
//                   }`}
//                 >
//                   <div className="mb-4 max-w-[300px]">
//                     <p className="text-gray-600 text-sm truncate">
//                       {project.description}
//                     </p>
//                   </div>
//                   <div className="grid grid-cols-2 gap-4 mb-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center p-2">
//                         <Clock className="w-5 h-5 text-gray-700 font-bold" />
//                       </div>
//                       <div>
//                         <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
//                           Duration
//                         </p>
//                         <p className="text-gray-900 text-sm font-semibold">
//                           {project.duration}d
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center p-2">
//                         <DollarSign className="w-5 h-5 text-gray-700 font-bold" />
//                       </div>
//                       <div>
//                         <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
//                           Budget
//                         </p>
//                         <p className="text-gray-900 text-sm font-semibold">
//                           ₹{project.budget}M
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center p-2">
//                         <User className="w-5 h-5 text-gray-700 font-bold" />
//                       </div>
//                       <div>
//                         <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
//                           Team
//                         </p>
//                         <p className="text-gray-900 text-sm font-semibold">
//                           {project.team}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center p-2">
//                         <Target className="w-5 h-5 text-gray-700 font-bold" />
//                       </div>
//                       <div>
//                         <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
//                           Timeline
//                         </p>
//                         <p className="text-gray-900 text-sm font-semibold">
//                           {project.elapsed}d/{project.remaining}d
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="mb-4">
//                     <div className="flex justify-between text-xs mb-2">
//                       <span className="text-gray-500 font-medium uppercase tracking-wide">
//                         Progress
//                       </span>
//                       <span className="text-gray-700 font-semibold">
//                         {project.progress}%
//                       </span>
//                     </div>
//                     <div className="w-full bg-gray-200 rounded-full h-2">
//                       <div
//                         style={{ width: `${project.progress}%` }}
//                         className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full"
//                       />
//                     </div>
//                   </div>
//                   <div
//                     className={`flex items-center ${
//                       viewMode === "list"
//                         ? "justify-between"
//                         : "justify-between"
//                     }`}
//                   >
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={
//                           project.avatar ||
//                           `https://ui-avatars.com/api/?name=${project.manager}&background=random`
//                         }
//                         alt={project.manager}
//                         className="w-10 h-10 rounded-full border border-gray-200"
//                       />
//                       <div>
//                         <p className="text-sm font-medium text-gray-900">
//                           {project.manager}
//                         </p>
//                         <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
//                           Manager
//                         </p>
//                       </div>
//                     </div>

//                     {/* View button */}
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
//                     >
//                       View <ChevronRight className="w-4 h-4" />
//                     </motion.button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProjectsPage;

"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Grid3X3,
  List,
  Filter,
  ChevronRight,
  User,
  Briefcase,
  Clock,
  Target,
  DollarSign,
  Plus,
  X,
  IndianRupee,
  Loader2,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const ProjectsPage = () => {
  const [activeTab, setActiveTab] = useState("All Projects");
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [newProject, setNewProject] = useState({
    name: "",
    code: "",
    type: "",
    startDate: "",
    endDate: "",
    currency: "INR",
    zoneOffset: "+00:00",
    budget: "",
    location: "",
    description: "",
    projectPhoto: null,
    status: "planned",
    tags: [],
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Fetch projects from API
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_PATH}/api/projects`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Projects endpoint not found");
        } else if (response.status >= 500) {
          throw new Error("Server error occurred");
        } else {
          throw new Error(`Failed to fetch projects: ${response.status}`);
        }
      }

      const data = await response.json();
      console.log("ds", data);
      setProjects(data.projects || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError(err.message);
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
      setStatsLoading(false);
    }
  };

  // Calculate stats from projects data
  const calculateStats = () => {
    const totalProjects = projects.length;
    const inProgress = projects.filter(
      (p) => p.status === "in-progress"
    ).length;
    const completed = projects.filter((p) => p.status === "completed").length;

    const totalBudgets = projects.reduce(
      (sum, project) => sum + (project.budget || 0),
      0
    );

    console.log("Total Budget:", totalBudgets);
    return [
      {
        label: "Total Projects",
        value: totalProjects.toString(),
        change: "+12%",
        icon: Briefcase,
      },
      {
        label: "In Progress",
        value: inProgress.toString(),
        change: "+3",
        icon: Clock,
      },
      {
        label: "Completed",
        value: completed.toString(),
        change: "+5",
        icon: Target,
      },
      {
        label: "Total Budget",
        value: `₹${(totalBudgets / 1000000000).toFixed(3)}B`, // Convert to billions
        change: "+18%",
        icon: DollarSign,
      },
    ];
  };

  const projectStats = statsLoading ? [] : calculateStats();

  // Tab data based on project statuses - fixed to match API status values
  const tabs = [
    { name: "All Projects", count: projects.length },
    {
      name: "planned",
      count: projects.filter((p) => p.status === "planned").length,
    },
    {
      name: "in-progress",
      count: projects.filter((p) => p.status === "in-progress").length,
    },
    {
      name: "on-hold",
      count: projects.filter((p) => p.status === "on-hold").length,
    },
    {
      name: "completed",
      count: projects.filter((p) => p.status === "completed").length,
    },
    {
      name: "cancelled",
      count: projects.filter((p) => p.status === "cancelled").length,
    },
  ];

  // Calculate project timeline information
  const calculateProjectTimeline = (project) => {
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    const now = Date.now();

    // Parse dates from API (assuming they're stored as ISO strings)
    const startDate = new Date(project.startDate || now);
    const endDate = new Date(project.endDate || now);

    // If no valid dates, return default values
    if (
      !project.startDate ||
      !project.endDate ||
      isNaN(startDate.getTime()) ||
      isNaN(endDate.getTime())
    ) {
      return {
        elapsed: 0,
        remaining: 0,
        progress: 0,
        duration: 0,
        status: "no-dates",
      };
    }

    // Ensure we don't get negative days
    const elapsedDays = Math.max(
      0,
      Math.floor((now - startDate.getTime()) / MS_PER_DAY)
    );
    const remainingDays = Math.max(
      0,
      Math.floor((endDate.getTime() - now) / MS_PER_DAY)
    );

    // Additional useful calculations
    const totalProjectDays = Math.max(
      1, // Avoid division by zero
      Math.floor((endDate.getTime() - startDate.getTime()) / MS_PER_DAY)
    );

    let progressPercentage = Math.min(
      100,
      Math.max(0, (elapsedDays / totalProjectDays) * 100)
    );

    // If project hasn't started yet
    if (now < startDate.getTime()) {
      progressPercentage = 0;
    }
    // If project is completed
    else if (now > endDate.getTime()) {
      progressPercentage = 100;
    }

    return {
      elapsed: elapsedDays,
      remaining: remainingDays,
      progress: Math.round(progressPercentage),
      duration: totalProjectDays,
      status:
        now > endDate.getTime()
          ? "completed"
          : now < startDate.getTime()
          ? "not-started"
          : "in-progress",
    };
  };

  // Filter projects based on active tab and search term
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.location &&
        project.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
      project.status.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "All Projects") return matchesSearch;
    return matchesSearch && project.status === activeTab;
  });

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!newProject.name.trim()) {
      newErrors.name = "Project name is required";
    }

    if (!newProject.code.trim()) {
      newErrors.code = "Project code is required";
    }

    if (!newProject.type) {
      newErrors.type = "Project type is required";
    }

    if (!newProject.budget) {
      newErrors.budget = "Budget is required";
    } else if (
      isNaN(parseFloat(newProject.budget)) ||
      parseFloat(newProject.budget) <= 0
    ) {
      newErrors.budget = "Budget must be a valid positive number";
    }

    if (newProject.startDate && newProject.endDate) {
      const start = new Date(newProject.startDate);
      const end = new Date(newProject.endDate);
      if (end < start) {
        newErrors.endDate = "End date cannot be before start date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Create new project function
  const createProject = async (formData) => {
    try {
      const body = Object.fromEntries(formData.entries());

      if (body.budget) {
        body.budget = Number(body.budget);
      }

      body.currency = body.currency || "INR";
      body.zoneOffset = body.zoneOffset || "+00:00";
      body.status = body.status || "planned";
      body.tags = body.tags
        ? body.tags.split(",").map((tag) => tag.trim())
        : [];

      console.log("📤 Sending JSON payload:", body);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_PATH}/api/projects`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || `HTTP error! status: ${res.status}`);
      }

      console.log("✅ Project created:", data);
      toast.success("Project Created Successfully...!!");
      fetchProjects();
      return data;
    } catch (error) {
      console.error("❌ Error creating project:", error);
      toast.error("Failed to create project");
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      // Mark all fields as touched to show errors
      const allFields = {
        name: true,
        code: true,
        type: true,
        budget: true,
        startDate: true,
        endDate: true,
      };
      setTouched(allFields);
      return;
    }

    try {
      setLoading(true);

      // Create FormData from the form
      const formData = new FormData(e.target);

      // Add any fields that might not be in the form
      if (newProject.tags.length > 0) {
        formData.set("tags", newProject.tags.join(","));
      }

      const result = await createProject(formData);

      // Add the new project to the state
      if (result.project) {
        setProjects((prev) => [...prev, result.project]);
      }

      // Reset form and close modal
      setNewProject({
        name: "",
        code: "",
        type: "",
        startDate: "",
        endDate: "",
        currency: "INR",
        zoneOffset: "+00:00",
        budget: "",
        location: "",
        description: "",
        projectPhoto: null,
        status: "planned",
        tags: [],
      });

      setTouched({});
      setErrors({});
      setIsProjectDropdownOpen(false);
      fetchProjects();
    } catch (error) {
      console.error("Error creating project:", error);
      setError(error.message || "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });

    // Validate the field that was just blurred
    validateForm();
  };

  // Handle input changes for new project form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleTagsChange = (e) => {
    const tagsString = e.target.value;
    const tagsArray = tagsString
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");
    setNewProject((prev) => ({
      ...prev,
      tags: tagsArray,
    }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        toast.error("File size must be less than 5MB");
        return;
      }

      setNewProject((prev) => ({
        ...prev,
        projectPhoto: file,
      }));
    }
  };

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (newProject.startDate && newProject.endDate) {
      const start = new Date(newProject.startDate);
      const end = new Date(newProject.endDate);

      if (end < start) {
        setErrors({
          ...errors,
          endDate: "End date cannot be before start date",
        });
      } else if (errors.endDate) {
        const newErrors = { ...errors };
        delete newErrors.endDate;
        setErrors(newErrors);
      }
    }
  }, [newProject.startDate, newProject.endDate]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700 border-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Low":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const handleStatClick = (label) => {
    if (label === "Total Projects") setActiveTab("All Projects");
    if (label === "In Progress") setActiveTab("in-progress");
    if (label === "Completed") setActiveTab("completed");
  };

  // Format status for display
  const formatStatus = (status) => {
    return status
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Loading state
  if (loading && projects.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Toaster />
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Projects Overview
              </h1>
              <p className="text-gray-600">
                Manage and track all your construction projects
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-64">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
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
                  <span>Process</span>
                </motion.button>
                {filterOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-20">
                    {tabs.map((tab) => (
                      <button
                        key={tab.name}
                        onClick={() => {
                          setActiveTab(tab.name);
                          setFilterOpen(false);
                        }}
                        className={`flex items-center justify-between w-full px-4 py-2 text-sm ${
                          activeTab === tab.name
                            ? "bg-blue-50 text-blue-600 font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {tab.name === "All Projects"
                          ? tab.name
                          : formatStatus(tab.name)}
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                          {tab.count}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex rounded-xl border-2 border-gray-300 p-1 bg-gray-100">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg ${
                    viewMode === "grid"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg ${
                    viewMode === "list"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <List className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="relative">
                <div className="relative z-50">
                  {/* Plus Button */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    onClick={() =>
                      setIsProjectDropdownOpen(!isProjectDropdownOpen)
                    }
                    className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-lg font-bold cursor-pointer shadow-lg hover:shadow-xl transition-all"
                  >
                    <Plus size={20} />
                  </motion.div>

                  {/* Backdrop with darker blur effect for modern look */}
                  {isProjectDropdownOpen && (
                    <div
                      className="fixed inset-0 bg-white bg-opacity-40 backdrop-blur-md z-40"
                      onClick={() => setIsProjectDropdownOpen(false)}
                    />
                  )}

                  {/* Project Creation Form */}
                  {isProjectDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", damping: 20 }}
                      className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-3xl h-[90vh] max-h-[700px] bg-white rounded-xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden"
                    >
                      {/* Header */}
                      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-800">
                              Create New Project
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              Fill in the project details
                            </p>
                          </div>
                          <button
                            onClick={() => setIsProjectDropdownOpen(false)}
                            className="p-1 hover:bg-gray-200 rounded-full transition"
                          >
                            <X size={20} className="text-gray-600" />
                          </button>
                        </div>
                      </div>

                      {/* Form Content - Optimized layout */}
                      <div className="flex-1 overflow-y-auto px-6 py-4">
                        <form onSubmit={handleSubmit}>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Left Column */}
                            <div className="space-y-4">
                              {/* Project Name */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Project Name *
                                </label>
                                <input
                                  type="text"
                                  name="name"
                                  value={newProject.name}
                                  onChange={handleInputChange}
                                  maxLength={30}
                                  onBlur={handleBlur}
                                  placeholder="Enter project name"
                                  className={`w-full px-3 py-2 text-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.name && touched.name
                                      ? "border-red-500"
                                      : "border-gray-300"
                                  }`}
                                />
                                {errors.name && touched.name && (
                                  <p className="mt-1 text-sm text-red-600">
                                    {errors.name}
                                  </p>
                                )}
                              </div>

                              {/* Project Code */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Project Code *
                                </label>
                                <input
                                  type="text"
                                  name="code"
                                  value={newProject.code}
                                  onChange={handleInputChange}
                                  onBlur={handleBlur}
                                  placeholder="Enter unique project code"
                                  className={`w-full px-3 py-2 text-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.code && touched.code
                                      ? "border-red-500"
                                      : "border-gray-300"
                                  }`}
                                />
                                {errors.code && touched.code && (
                                  <p className="mt-1 text-sm text-red-600">
                                    {errors.code}
                                  </p>
                                )}
                              </div>

                              {/* Project Type */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Type *
                                </label>
                                <select
                                  name="type"
                                  value={newProject.type}
                                  onChange={handleInputChange}
                                  onBlur={handleBlur}
                                  className={`w-full px-3 py-2 text-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.type && touched.type
                                      ? "border-red-500"
                                      : "border-gray-300"
                                  }`}
                                >
                                  <option value="">Select type</option>
                                  <option value="Residential">
                                    Residential
                                  </option>
                                  <option value="Commercial">Commercial</option>
                                  <option value="Industrial">Industrial</option>
                                  <option value="Infrastructure">
                                    Infrastructure
                                  </option>
                                </select>
                                {errors.type && touched.type && (
                                  <p className="mt-1 text-sm text-red-600">
                                    {errors.type}
                                  </p>
                                )}
                              </div>

                              {/* Start and End Dates */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Start Date
                                  </label>
                                  <input
                                    type="date"
                                    name="startDate"
                                    value={newProject.startDate}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className={`w-full px-3 py-2 text-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                      errors.startDate && touched.startDate
                                        ? "border-red-500"
                                        : "border-gray-300"
                                    }`}
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    End Date
                                  </label>
                                  <input
                                    type="date"
                                    name="endDate"
                                    value={newProject.endDate}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className={`w-full px-3 py-2 text-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                      errors.endDate && touched.endDate
                                        ? "border-red-500"
                                        : "border-gray-300"
                                    }`}
                                  />
                                  {errors.endDate && touched.endDate && (
                                    <p className="mt-1 text-sm text-red-600">
                                      {errors.endDate}
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* Currency and Time Zone Offset */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Currency
                                  </label>
                                  <select
                                    name="currency"
                                    value={newProject.currency}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  >
                                    <option value="INR">INR (₹)</option>
                                    <option value="USD">USD ($)</option>
                                    <option value="EUR">EUR (€)</option>
                                    <option value="GBP">GBP (£)</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Time Zone Offset
                                  </label>
                                  <select
                                    name="zoneOffset"
                                    value={newProject.zoneOffset}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  >
                                    <option value="+00:00">UTC (+00:00)</option>
                                    <option value="+05:30">IST (+05:30)</option>
                                    <option value="-05:00">EST (-05:00)</option>
                                    <option value="-08:00">PST (-08:00)</option>
                                    <option value="+01:00">CET (+01:00)</option>
                                  </select>
                                </div>
                              </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4">
                              {/* Budget */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Budget *
                                </label>
                                <input
                                  type="number"
                                  name="budget"
                                  value={newProject.budget}
                                  onChange={handleInputChange}
                                  onBlur={handleBlur}
                                  step="0.01"
                                  min="0"
                                  placeholder="Enter budget amount"
                                  className={`w-full px-3 py-2 text-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.budget && touched.budget
                                      ? "border-red-500"
                                      : "border-gray-300"
                                  }`}
                                />
                                {errors.budget && touched.budget && (
                                  <p className="mt-1 text-sm text-red-600">
                                    {errors.budget}
                                  </p>
                                )}
                              </div>

                              {/* Location */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Location
                                </label>
                                <input
                                  type="text"
                                  name="location"
                                  maxLength={30}
                                  value={newProject.location}
                                  onChange={handleInputChange}
                                  placeholder="Enter project location"
                                  className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>

                              {/* Description */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Description
                                </label>
                                <textarea
                                  rows={3}
                                  name="description"
                                  value={newProject.description}
                                  maxLength={60}
                                  onChange={handleInputChange}
                                  placeholder="Enter project description"
                                  className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>

                              {/* Tags */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Tags
                                </label>
                                <input
                                  type="text"
                                  name="tags"
                                  onChange={handleTagsChange}
                                  placeholder="Enter comma-separated tags"
                                  className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <p className="text-xs text-gray-600 mt-1">
                                  Separate tags with commas
                                </p>
                              </div>

                              {/* Project Status */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Status
                                </label>
                                <select
                                  name="status"
                                  value={newProject.status}
                                  onChange={handleInputChange}
                                  className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                  <option value="planned">Planned</option>
                                  <option value="in-progress">
                                    In Progress
                                  </option>
                                  <option value="on-hold">On Hold</option>
                                  <option value="completed">Completed</option>
                                  <option value="cancelled">Cancelled</option>
                                </select>
                              </div>

                              {/* Project Photo */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Project Photo
                                </label>
                                <div className="flex items-center gap-3 mt-1">
                                  <label className="flex-1 px-3 py-2 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition flex items-center justify-center">
                                    <span className="text-sm text-gray-700 flex items-center">
                                      <svg
                                        className="w-4 h-4 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        ></path>
                                      </svg>
                                      {newProject.projectPhoto
                                        ? newProject.projectPhoto.name
                                        : "Choose File"}
                                    </span>
                                    <input
                                      type="file"
                                      className="hidden"
                                      accept="image/*"
                                      onChange={handleFileChange}
                                    />
                                  </label>
                                </div>
                                <p className="text-xs text-gray-600 mt-1">
                                  JPEG, PNG or GIF (Max 5MB)
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Form Actions */}
                          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                            <div className="flex gap-3 justify-end">
                              <button
                                type="button"
                                onClick={() => setIsProjectDropdownOpen(false)}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium text-sm"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium text-sm"
                              >
                                Create Project
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Error state */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6 flex items-center gap-3">
            <AlertCircle className="w-5 h-5" />
            <div>
              <p className="font-medium">Error loading projects</p>
              <p className="text-sm">{error}</p>
            </div>
            <button
              onClick={fetchProjects}
              className="ml-auto flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-lg text-sm font-medium"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {projectStats.map((stat, i) => {
            const Icon = stat.icon;

            // Pick theme color based on label
            const getIconColor = (label) => {
              switch (label) {
                case "Total Projects":
                  return "text-blue-600";
                case "In Progress":
                  return "text-orange-500";
                case "Completed":
                  return "text-green-600";
                case "Total Budget":
                  return "text-teal-600";
                default:
                  return "text-gray-700";
              }
            };

            return (
              <motion.div
                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                transition={{ type: "spring", stiffness: 300 }}
                key={i}
                onClick={() => handleStatClick(stat.label)}
                className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center">
                    <Icon className={`w-7 h-7 ${getIconColor(stat.label)}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {stat.value}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                      {stat.label}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-medium text-green-600">
                  {stat.change}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Project Cards */}
        {filteredProjects.length === 0 && !loading ? (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No projects found
            </h3>
            <p className="text-gray-500">
              {searchTerm
                ? `No projects match your search for "${searchTerm}"`
                : `No projects found in the ${
                    activeTab === "All Projects"
                      ? activeTab
                      : formatStatus(activeTab)
                  } category`}
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
                : "space-y-6"
            }
          >
            {filteredProjects.map((project) => {
              const timeline = calculateProjectTimeline(project);
              const getProgressColor = () => {
                if (timeline.status === "completed")
                  return "from-green-400 to-green-600";
                if (timeline.status === "not-started")
                  return "from-gray-400 to-gray-600";
                if (timeline.progress > 75)
                  return "from-yellow-400 to-yellow-600";
                return "from-blue-400 to-blue-600";
              };
              return (
                <motion.div
                  key={project._id || project.id}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden ${
                    viewMode === "list"
                      ? "flex flex-col md:flex-row md:items-stretch p-6 gap-6"
                      : "flex flex-col"
                  }`}
                >
                  {/* Card Top - Changed to darker blue */}
                  <div className="bg-blue-500 px-6 py-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/20 rounded-full translate-y-12 -translate-x-12"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl">
                          {project.icon || "🏗️"}
                        </div>
                        <div className="max-w-[250px]">
                          <h3 className="font-bold text-xl text-white truncate">
                            {project.name}
                          </h3>
                          <p className="text-blue-100 text-sm truncate">
                            {project.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-2 px-1 py-0.5 rounded-full text-xs font-medium border ${
                            project.statusColor ||
                            "bg-blue-100 text-blue-700 border-blue-200"
                          }`}
                        >
                          {formatStatus(project.status)}
                        </span>
                        <span
                          className={`inline-flex items-center gap-2 px-1 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(
                            project.priority || "Medium"
                          )}`}
                        >
                          {project.priority || "Medium"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`p-6 ${
                      viewMode === "list"
                        ? "flex flex-col justify-between w-full md:w-2/3"
                        : "flex-1"
                    }`}
                  >
                    <div className="mb-4 max-w-[300px]">
                      <p className="text-gray-600 text-sm truncate">
                        {project.description}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center p-2">
                          <Clock className="w-5 h-5 text-gray-700 font-bold" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                            Duration
                          </p>
                          <p className="text-gray-900 text-sm font-semibold">
                            {timeline.duration > 0
                              ? `${timeline.duration}d`
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center p-2">
                          <IndianRupee className="w-5 h-5 text-gray-700 font-bold" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                            Budget
                          </p>
                          <p className="text-gray-900 text-sm font-semibold">
                            ₹{project.budget.toFixed(1)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center p-2">
                          <User className="w-5 h-5 text-gray-700 font-bold" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                            Team
                          </p>
                          <p className="text-gray-900 text-sm font-semibold">
                            {project.teamSize || "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center p-2">
                          <Target className="w-5 h-5 text-gray-700 font-bold" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                            Timeline
                          </p>
                          <p className="text-gray-900 text-sm font-semibold">
                            {timeline.duration > 0
                              ? `${timeline.elapsed}d / ${timeline.remaining}d`
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-gray-500 font-medium uppercase tracking-wide">
                          Progress
                        </span>
                        <span className="text-gray-700 font-semibold">
                          {timeline.progress}%
                          {timeline.status === "completed" && " (Completed)"}
                          {timeline.status === "not-started" &&
                            " (Not Started)"}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          style={{ width: `${timeline.progress}%` }}
                          className={`bg-gradient-to-r ${getProgressColor()} h-2 rounded-full transition-all duration-500`}
                        />
                      </div>
                      <div className="flex justify-between text-xs mt-1 text-gray-500">
                        <span>
                          {project.startDate
                            ? new Date(project.startDate).toLocaleDateString()
                            : "No start date"}
                        </span>
                        <span>
                          {project.endDate
                            ? new Date(project.endDate).toLocaleDateString()
                            : "No end date"}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`flex items-center ${
                        viewMode === "list"
                          ? "justify-between"
                          : "justify-between"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            project.managerAvatar ||
                            `https://ui-avatars.com/api/?name=${
                              project.manager || "Project"
                            }&background=random`
                          }
                          alt={project.manager || "Project Manager"}
                          className="w-10 h-10 rounded-full border border-gray-200"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {project.manager || "Project Manager"}
                          </p>
                          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                            Manager
                          </p>
                        </div>
                      </div>

                      {/* View button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
                      >
                        View <ChevronRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
