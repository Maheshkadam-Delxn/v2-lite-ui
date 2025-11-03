



"use client";

import React, { useState, useEffect } from "react";
import { motion, number } from "framer-motion";
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
  Trash2,
  Edit3,
  Building,
  FileText,
  Tag,
  CreditCard,
  Calendar,
  MapPin,
  Globe,
  Image,
  Mail,
  Phone
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { useProject } from "../../../context/ProjectContext";

const ProjectsPage = () => {
  const { token } = useAuth();
  const { projectId } = useProject();
  const [activeTab, setActiveTab] = useState("All Projects");
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
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
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [deletingProjectId, setDeletingProjectId] = useState(null);
  const [formStep,setFormStep] = useState(1);
  const router = useRouter();

  // Fetch projects from API
  const fetchProjects = async (token) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_PATH}/api/projects`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("token:", token);

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized: Invalid or missing token");
        } else if (response.status === 404) {
          throw new Error("Projects endpoint not found");
        } else if (response.status >= 500) {
          throw new Error("Server error occurred");
        } else {
          throw new Error(`Failed to fetch projects: ${response.status}`);
        }
      }

      const data = await response.json();
      console.log("Fetched projects:", data);
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

  // Create new project function
  const createProject = async (formData, token) => {
    try {
      const body = Object.fromEntries(formData.entries());

      // Convert budget to number
      if (body.budget) {
        body.budget = Number(body.budget);
      }

      // Set default values
      body.currency = body.currency || "INR";
      body.zoneOffset = body.zoneOffset || "+00:00";
      body.status = body.status || "planned";
      body.tags = body.tags ? body.tags.split(",").map((tag) => tag.trim()) : [];

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_PATH}/api/projects`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || `HTTP error! status: ${res.status}`);
      }

      toast.success("Project Created Successfully");
      setProjects((prev) => [...prev, data.project]);
      return data;
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project");
      throw error;
    }
  };

  // Update project function
  const updateProject = async (projectId, formData, token) => {
    try {
      const body = Object.fromEntries(formData.entries());

      // Convert budget to number
      if (body.budget) {
        body.budget = Number(body.budget);
      }

      // Set default values
      body.currency = body.currency || "INR";
      body.zoneOffset = body.zoneOffset || "+00:00";
      body.status = body.status || "planned";
      body.tags = body.tags ? body.tags.split(",").map((tag) => tag.trim()) : [];

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_PATH}/api/projects/${projectId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || `HTTP error! status: ${res.status}`);
      }

      toast.success("Project Updated Successfully");
      setProjects((prev) =>
        prev.map((p) => (p._id === projectId ? data.project : p))
      );
      return data;
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Failed to update project");
      throw error;
    }
  };

  // Delete project function
  const deleteProject = async (projectId, token) => {
    try {
      setDeletingProjectId(projectId);
      
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_PATH}/api/projects/${projectId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error(`Failed to delete project: ${res.status}`);
      }

      const data = await res.json();
      
      if (data.success) {
        toast.success("Project deleted successfully");
        // Remove project from state
        setProjects(prev => prev.filter(project => project._id !== projectId));
      } else {
        throw new Error(data.error || "Failed to delete project");
      }
      
      return data;
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
      throw error;
    } finally {
      setDeletingProjectId(null);
    }
  };

  // Handle delete confirmation
  const handleDeleteProject = async (projectId, projectName) => {
    if (window.confirm(`Are you sure you want to delete "${projectName}"? This action cannot be undone.`)) {
      try {
        await deleteProject(projectId, token);
      } catch (error) {
        // Error is already handled in deleteProject function
      }
    }
  };

  // Handle edit project
  const handleEditProject = (project) => {
    setEditingProject(project);
    setNewProject({
      name: project.name || "",
      code: project.code || "",
      type: project.type || "",
      startDate: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : "",
      endDate: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : "",
      currency: project.currency || "INR",
      zoneOffset: project.zoneOffset || "+00:00",
      budget: project.budget || "",
      location: project.location || "",
      description: project.description || "",
      projectPhoto: null,
      status: project.status || "planned",
      tags: project.tags || [],
      clientName: project.clientName || "",
      clientEmail: project.clientEmail || "",
      clientPhone: project.clientPhone || "",
      address: project.address || "",
    });
    setIsProjectDropdownOpen(true);
  };

  // Fetch projects on component mount
  useEffect(() => {
    if (token) {
      fetchProjects(token);
    }
  }, [token]);

  // Validate form
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

    if (!newProject.clientName.trim()) {
      newErrors.clientName = "Client name is required";
    }

    if (!newProject.clientPhone.trim()) {
      newErrors.clientPhone = "Client phone is required";
    }

    // Add validation for dates
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      const allFields = {
        name: true,
        code: true,
        type: true,
        budget: true,
        clientName: true,
        clientPhone: true,
        startDate: true,
        endDate: true,
      };
      setTouched(allFields);
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData(e.target);
      if (newProject.tags.length > 0) {
        formData.set("tags", newProject.tags.join(","));
      }

      let result;
      if (editingProject) {
        result = await updateProject(editingProject._id, formData, token);
        setEditingProject(null);
      } else {
        result = await createProject(formData, token);
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
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        address: "",
      });

      setTouched({});
      setErrors({});
      setFormStep(1);
      setIsProjectDropdownOpen(false);
    } catch (error) {
      setError(error.message || "Failed to save project");
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
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

  // Handle tags
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

  // Handle blur for validation
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    validateForm();
  };

  // Date validation effect
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

  // Calculate stats
  const calculateStats = () => {
    const totalProjects = projects.length;
    const inProgress = projects.filter((p) => p.status === "in-progress").length;
    const completed = projects.filter((p) => p.status === "completed").length;
    const totalBudgets = projects.reduce(
      (sum, project) => sum + (project.budget || 0),
      0
    );

    console.log("Total Budget:", totalBudgets);
    console.log("Projects:", projects);

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
        value: `₹${(totalBudgets / 1000000000).toFixed(3)}B`,
        change: "+18%",
        icon: DollarSign,
      },
    ];
  };

  const projectStats = statsLoading ? [] : calculateStats();

  // Tab data
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

  // Calculate project timeline
  const calculateProjectTimeline = (project) => {
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    const now = Date.now();
    const startDate = new Date(project.startDate || now);
    const endDate = new Date(project.endDate || now);

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

    const elapsedDays = Math.max(
      0,
      Math.floor((now - startDate.getTime()) / MS_PER_DAY)
    );
    const remainingDays = Math.max(
      0,
      Math.floor((endDate.getTime() - now) / MS_PER_DAY)
    );
    const totalProjectDays = Math.max(
      1,
      Math.floor((endDate.getTime() - startDate.getTime()) / MS_PER_DAY)
    );
    let progressPercentage = Math.min(
      100,
      Math.max(0, (elapsedDays / totalProjectDays) * 100)
    );

    if (now < startDate.getTime()) {
      progressPercentage = 0;
    } else if (now > endDate.getTime()) {
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

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.location &&
        project.location?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      project.status?.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "All Projects") return matchesSearch;
    return matchesSearch && project.status === activeTab;
  });

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

  const formatStatus = (status) => {
    return status
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Calculate approved budget (amount spent - placeholder logic; replace with actual calculation)
  const calculateApprovedBudget = (project) => {
    // Placeholder: Assume 70% of budget is spent; replace with actual API/data logic
    return project.budget ? (parseFloat(project.budget) * 0.7).toFixed(1) : 0;
  };

  const formSteps = [
    {number:1,title:"Basic Info",icon:Building},
    {number:2,title:"Details",icon:FileText},
    {number:3,title:"Client Info",icon:User}
  ];

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
      <Toaster position="top-right" reverseOrder={false} />
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
              {projectId && (
                <p className="text-sm text-gray-500 mt-1">
                  Current Project ID: {projectId}
                </p>
              )}
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
                    onClick={() => {
                      setEditingProject(null);
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
                        clientName: "",
                        clientEmail: "",
                        clientPhone: "",
                        address: "",
                      });
                      setFormStep(1);
                      setIsProjectDropdownOpen(!isProjectDropdownOpen);
                    }}
                    className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-lg font-bold cursor-pointer shadow-lg hover:shadow-xl transition-all"
                  >
                    <Plus size={20} />
                  </motion.div>

                  {/* Backdrop */}
                  {isProjectDropdownOpen && (
                    <div
                      className="fixed inset-0 bg-transparent backdrop-blur-md z-40"
                      onClick={() => setIsProjectDropdownOpen(false)}
                    />
                  )}

                  {/* Project Creation/Edit Form */}
                  {isProjectDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", damping: 20 }}
                      className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-3xl h-[90vh] max-h-[700px] bg-white rounded-xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden"
                    >
                      {/* Form Header */}
                      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-2xl font-bold">
                              {editingProject ? "Edit Project" : "Create New Project"}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              Fill in the project details
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              setIsProjectDropdownOpen(false);
                              setEditingProject(null);
                              setFormStep(1);
                            }}
                            className="p-1 hover:bg-gray-200 rounded-full transition"
                          >
                            <X size={20} className="text-gray-600" />
                          </button>
                        </div>

                        {/* Progress Steps */}
                        <div className="flex items-center justify-center mt-6">
                            {formSteps.map((step,index) => {
                              const StepIcon = step.icon;
                              const isActive = formStep === step.number;
                              const isCompleted = formStep > step.number;

                              return(
                                <div key={step.number} className="flex items-center">
                                <div className="flex flex-col items-center">
                                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                                    isActive 
                                      ? "bg-white text-blue-600 border-white scale-110" 
                                      : isCompleted
                                      ? "bg-green-500 border-green-500 text-white"
                                      : "bg-blue-400/50 border-blue-300 text-white"
                                  }`}>
                                    {isCompleted ? (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200 }}
                                      >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                      </motion.div>
                                    ) : (
                                      <StepIcon className="w-6 h-6" />
                                    )}
                                  </div>
                                  <span className={`text-xs mt-2 font-medium ${
                                    isActive ? "text-white" : "text-blue-100"
                                  }`}>
                                    {step.title}
                                  </span>
                                </div>
                                {index < formSteps.length - 1 && (
                                  <div className={`w-16 h-1 mx-2 rounded-full transition-all duration-300 ${
                                    isCompleted ? "bg-green-500" : "bg-blue-300"
                                  }`} />
                                )}
                              </div>
                            );
                            })}
                        </div>
                      </div>

                      {/* Form Content */}
                      <div className="flex-1 overflow-y-auto">
                        <form onSubmit={handleSubmit}>
                          <div className="p-8">
                            {/* Step 1: Basic Information */}
                            {formStep === 1 && (
                              <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                              >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                      <Building className="w-4 h-4" />
                                      Project Name *
                                    </label>
                                    <input
                                      type="text"
                                      name="name"
                                      value={newProject.name}
                                      onChange={handleInputChange}
                                      onBlur={handleBlur}
                                      maxLength={30}
                                      placeholder="Enter project name"
                                      className={`w-full px-4 py-3 text-gray-800 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                        errors.name && touched.name
                                          ? "border-red-500 bg-red-50"
                                          : "border-gray-300 focus:border-blue-500"
                                      }`}
                                    />
                                    {errors.name && touched.name && (
                                      <p className="text-sm text-red-600 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.name}
                                      </p>
                                    )}
                                  </div>

                                  <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                      <Tag className="w-4 h-4" />
                                      Project Code *
                                    </label>
                                    <input
                                      type="text"
                                      name="code"
                                      value={newProject.code}
                                      onChange={handleInputChange}
                                      onBlur={handleBlur}
                                      placeholder="Enter unique project code"
                                      className={`w-full px-4 py-3 text-gray-800 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                        errors.code && touched.code
                                          ? "border-red-500 bg-red-50"
                                          : "border-gray-300 focus:border-blue-500"
                                      }`}
                                    />
                                    {errors.code && touched.code && (
                                      <p className="text-sm text-red-600 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.code}
                                      </p>
                                    )}
                                  </div>

                                  <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                      <Building className="w-4 h-4" />
                                      Project Type *
                                    </label>
                                    <select
                                      name="type"
                                      value={newProject.type}
                                      onChange={handleInputChange}
                                      onBlur={handleBlur}
                                      className={`w-full px-4 py-3 text-gray-800 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                        errors.type && touched.type
                                          ? "border-red-500 bg-red-50"
                                          : "border-gray-300 focus:border-blue-500"
                                      }`}
                                    >
                                      <option value="">Select project type</option>
                                      <option value="Residential">Residential</option>
                                      <option value="Commercial">Commercial</option>
                                      <option value="Industrial">Industrial</option>
                                      <option value="Infrastructure">Infrastructure</option>
                                    </select>
                                    {errors.type && touched.type && (
                                      <p className="text-sm text-red-600 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.type}
                                      </p>
                                    )}
                                  </div>

                                  <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                      <CreditCard className="w-4 h-4" />
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
                                      className={`w-full px-4 py-3 text-gray-800 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                        errors.budget && touched.budget
                                          ? "border-red-500 bg-red-50"
                                          : "border-gray-300 focus:border-blue-500"
                                      }`}
                                    />
                                    {errors.budget && touched.budget && (
                                      <p className="text-sm text-red-600 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.budget}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                      <Calendar className="w-4 h-4" />
                                      Start Date
                                    </label>
                                    <input
                                      type="date"
                                      name="startDate"
                                      value={newProject.startDate}
                                      onChange={handleInputChange}
                                      onBlur={handleBlur}
                                      className="w-full px-4 py-3 text-gray-800 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                      <Calendar className="w-4 h-4" />
                                      End Date
                                    </label>
                                    <input
                                      type="date"
                                      name="endDate"
                                      value={newProject.endDate}
                                      onChange={handleInputChange}
                                      onBlur={handleBlur}
                                      className={`w-full px-4 py-3 text-gray-800 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                        errors.endDate && touched.endDate
                                          ? "border-red-500 bg-red-50"
                                          : "border-gray-300 focus:border-blue-500"
                                      }`}
                                    />
                                    {errors.endDate && touched.endDate && (
                                      <p className="text-sm text-red-600 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.endDate}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            )}

                            {/* Step 2: Project Details */}
                            {formStep === 2 && (
                              <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                              >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                      <MapPin className="w-4 h-4" />
                                      Location
                                    </label>
                                    <input
                                      type="text"
                                      name="location"
                                      maxLength={30}
                                      value={newProject.location}
                                      onChange={handleInputChange}
                                      placeholder="Enter project location"
                                      className="w-full px-4 py-3 text-gray-800 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                      <Globe className="w-4 h-4" />
                                      Currency & Timezone
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                      <select
                                        name="currency"
                                        value={newProject.currency}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-3 text-gray-800 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                      >
                                        <option value="INR">INR (₹)</option>
                                        <option value="USD">USD ($)</option>
                                        <option value="EUR">EUR (€)</option>
                                        <option value="GBP">GBP (£)</option>
                                      </select>
                                      <select
                                        name="zoneOffset"
                                        value={newProject.zoneOffset}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-3 text-gray-800 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                      >
                                        <option value="+05:30">IST (+05:30)</option>
                                        <option value="+00:00">UTC (+00:00)</option>
                                        <option value="-05:00">EST (-05:00)</option>
                                        <option value="-08:00">PST (-08:00)</option>
                                        <option value="+01:00">CET (+01:00)</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <FileText className="w-4 h-4" />
                                    Description
                                  </label>
                                  <textarea
                                    rows={3}
                                    name="description"
                                    value={newProject.description}
                                    maxLength={60}
                                    onChange={handleInputChange}
                                    placeholder="Enter project description..."
                                    className="w-full px-4 py-3 text-gray-800 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                                  />
                                  <p className="text-xs text-gray-500 text-right">
                                    {newProject.description.length}/60 characters
                                  </p>
                                </div>

                                <div className="space-y-2">
                                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <Tag className="w-4 h-4" />
                                    Tags
                                  </label>
                                  <input
                                    type="text"
                                    name="tags"
                                    value={newProject.tags.join(", ")}
                                    onChange={handleTagsChange}
                                    placeholder="Enter comma-separated tags (e.g., construction, residential, high-rise)"
                                    className="w-full px-4 py-3 text-gray-800 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                  />
                                  <p className="text-xs text-gray-500">
                                    Separate tags with commas
                                  </p>
                                  {newProject.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                      {newProject.tags.map((tag, index) => (
                                        <span
                                          key={index}
                                          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                                        >
                                          {tag}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>

                                <div className="space-y-2">
                                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <Image className="w-4 h-4" />
                                    Project Photo
                                  </label>
                                  <div className="flex items-center gap-3">
                                    <label className="flex-1 cursor-pointer">
                                      <div className="px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group">
                                        <div className="flex items-center justify-center gap-2 text-gray-600 group-hover:text-blue-600">
                                          <Image className="w-5 h-5" />
                                          <span className="font-medium">
                                            {newProject.projectPhoto
                                              ? newProject.projectPhoto.name
                                              : editingProject?.projectPhoto || "Choose project image"}
                                          </span>
                                        </div>
                                        <p className="text-xs text-gray-500 text-center mt-1">
                                          JPEG, PNG or GIF (Max 5MB)
                                        </p>
                                      </div>
                                      <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                      />
                                    </label>
                                  </div>
                                </div>
                              </motion.div>
                            )}

                            {/* Step 3: Client Information */}
                            {formStep === 3 && (
                              <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                              >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                      <User className="w-4 h-4" />
                                      Client Name *
                                    </label>
                                    <input
                                      type="text"
                                      name="clientName"
                                      value={newProject.clientName}
                                      onChange={handleInputChange}
                                      onBlur={handleBlur}
                                      placeholder="Enter client name"
                                      className={`w-full px-4 py-3 text-gray-800 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                        errors.clientName && touched.clientName
                                          ? "border-red-500 bg-red-50"
                                          : "border-gray-300 focus:border-blue-500"
                                      }`}
                                    />
                                    {errors.clientName && touched.clientName && (
                                      <p className="text-sm text-red-600 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.clientName}
                                      </p>
                                    )}
                                  </div>

                                  <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                      <Mail className="w-4 h-4" />
                                      Client Email
                                    </label>
                                    <input
                                      type="email"
                                      name="clientEmail"
                                      value={newProject.clientEmail}
                                      onChange={handleInputChange}
                                      placeholder="Enter client email"
                                      className="w-full px-4 py-3 text-gray-800 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                      <Phone className="w-4 h-4" />
                                      Client Phone *
                                    </label>
                                    <input
                                      type="tel"
                                      name="clientPhone"
                                      value={newProject.clientPhone}
                                      onChange={handleInputChange}
                                      onBlur={handleBlur}
                                      placeholder="Enter client phone number"
                                      className={`w-full px-4 py-3 text-gray-800 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                        errors.clientPhone && touched.clientPhone
                                          ? "border-red-500 bg-red-50"
                                          : "border-gray-300 focus:border-blue-500"
                                      }`}
                                    />
                                    {errors.clientPhone && touched.clientPhone && (
                                      <p className="text-sm text-red-600 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.clientPhone}
                                      </p>
                                    )}
                                  </div>

                                  <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                      <MapPin className="w-4 h-4" />
                                      Project Status
                                    </label>
                                    <select
                                      name="status"
                                      value={newProject.status}
                                      onChange={handleInputChange}
                                      className="w-full px-4 py-3 text-gray-800 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    >
                                      <option value="planned">Planned</option>
                                      <option value="in-progress">In Progress</option>
                                      <option value="on-hold">On Hold</option>
                                      <option value="completed">Completed</option>
                                      <option value="cancelled">Cancelled</option>
                                    </select>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <MapPin className="w-4 h-4" />
                                    Project Site Address
                                  </label>
                                  <textarea
                                    rows={3}
                                    name="address"
                                    value={newProject.address}
                                    onChange={handleInputChange}
                                    placeholder="Enter complete project site address..."
                                    className="w-full px-4 py-3 text-gray-800 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                                  />
                                </div>

                                {editingProject && (
                                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                                    <div className="space-y-2">
                                      <label className="flex items-center gap-2 text-sm font-medium text-yellow-700">
                                        <IndianRupee className="w-4 h-4" />
                                        Approved Budget (Spent)
                                      </label>
                                      <input
                                        type="number"
                                        value={calculateApprovedBudget(editingProject)}
                                        readOnly
                                        className="w-full px-4 py-3 text-yellow-800 border-2 border-yellow-300 rounded-xl bg-yellow-25"
                                      />
                                      <p className="text-xs text-yellow-600">
                                        This represents the amount already spent on the project
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </motion.div>
                            )}
                          </div>

                          {/* Form Footer */}
                          <div className="px-8 py-6 border-t border-gray-200 bg-gray-50">
                            <div className="flex justify-between items-center">
                              <div>
                                {formStep > 1 && (
                                  <motion.button
                                    type="button"
                                    onClick={() => setFormStep(formStep - 1)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-all font-medium flex items-center gap-2"
                                  >
                                    <ChevronRight className="w-4 h-4 rotate-180" />
                                    Previous
                                  </motion.button>
                                )}
                              </div>

                              <div className="flex gap-3">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setIsProjectDropdownOpen(false);
                                    setEditingProject(null);
                                    setFormStep(1);
                                  }}
                                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-all font-medium"
                                >
                                  Cancel
                                </button>

                                {formStep < 3 ? (
                                  <motion.button
                                    type="button"
                                    onClick={() => setFormStep(formStep + 1)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all font-medium flex items-center gap-2 shadow-lg"
                                  >
                                    Next
                                    <ChevronRight className="w-4 h-4" />
                                  </motion.button>
                                ) : (
                                  <motion.button
                                    type="submit"
                                    disabled={loading}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all font-medium flex items-center gap-2 shadow-lg disabled:opacity-50"
                                  >
                                    {loading ? (
                                      <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : editingProject ? (
                                      "Update Project"
                                    ) : (
                                      "Create Project"
                                    )}
                                  </motion.button>
                                )}
                              </div>
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
              onClick={() => fetchProjects(token)}
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
                  className={`bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden relative ${
                    viewMode === "list"
                      ? "flex flex-col md:flex-row p-6 gap-6 items-stretch"
                      : "flex flex-col"
                  }`}
                >
                  {/* Action Buttons */}
                  <div className={`absolute top-4 right-4 z-20 flex gap-2 ${
                    viewMode === "list" ? "md:top-6 md:right-6" : ""
                  }`}>
                    {/* Edit Button - Always visible */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEditProject(project)}
                      className="w-8 h-8 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200"
                      title="Edit Project"
                    >
                      <Edit3 className="w-4 h-4" />
                    </motion.button>
                    
                    {/* Delete Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteProject(project._id, project.name)}
                      disabled={deletingProjectId === project._id}
                      className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200"
                      title="Delete Project"
                    >
                      {deletingProjectId === project._id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </motion.button>
                  </div>

                  {/* Header Section - Consistent for both views */}
                  <div className={`bg-blue-500 relative overflow-hidden ${
                    viewMode === "list" 
                      ? "md:w-1/3 rounded-2xl" 
                      : "rounded-t-3xl"
                  }`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/20 rounded-full translate-y-12 -translate-x-12"></div>
                    <div className="relative z-10 p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl">
                          {project.icon || "🏗️"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-xl text-white truncate">
                            {project.name}
                          </h3>
                          <p className="text-blue-100 text-sm truncate">
                            {project.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${
                            project.statusColor ||
                            "bg-blue-100 text-blue-700 border-blue-200"
                          }`}
                        >
                          {formatStatus(project.status)}
                        </span>
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                            project.priority || "Medium"
                          )}`}
                        >
                          {project.priority || "Medium"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className={`flex-1 p-6 ${
                    viewMode === "list" ? "md:w-2/3" : ""
                  }`}>
                    {/* Description */}
                    <div className="mb-6">
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {project.description || "No description available"}
                      </p>
                    </div>

                    {/* Stats Grid */}
                    <div className={`grid gap-4 mb-6 ${
                      viewMode === "list" 
                        ? "grid-cols-2 lg:grid-cols-4" 
                        : "grid-cols-2"
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center p-2">
                          <Clock className="w-5 h-5 text-gray-700 font-bold" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide truncate">
                            Duration
                          </p>
                          <p className="text-gray-900 text-sm font-semibold truncate">
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
                        <div className="min-w-0">
                          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide truncate">
                            Budget
                          </p>
                          <p className="text-gray-900 text-sm font-semibold truncate">
                            ₹{(parseFloat(project.budget) || 0).toFixed(1)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center p-2">
                          <IndianRupee className="w-5 h-5 text-gray-700 font-bold" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide truncate">
                            Approved Budget
                          </p>
                          <p className="text-gray-900 text-sm font-semibold truncate">
                            ₹{calculateApprovedBudget(project)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center p-2">
                          <Target className="w-5 h-5 text-gray-700 font-bold" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide truncate">
                            Timeline
                          </p>
                          <p className="text-gray-900 text-sm font-semibold truncate">
                            {timeline.duration > 0
                              ? `${timeline.elapsed}d / ${timeline.remaining}d`
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-gray-500 font-medium uppercase tracking-wide">
                          Progress
                        </span>
                        <span className="text-gray-700 font-semibold">
                          {timeline.progress}%
                          {timeline.status === "completed" && " (Completed)"}
                          {timeline.status === "not-started" && " (Not Started)"}
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

                    {/* Footer with Manager and View Button */}
                    <div className={`flex items-center justify-between ${
                      viewMode === "list" ? "mt-auto" : ""
                    }`}>
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
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {project.manager || "Project Manager"}
                          </p>
                          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                            Manager
                          </p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          router.push(`/admin/my-projects/${project._id}/dashboard`)
                        }
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg whitespace-nowrap"
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