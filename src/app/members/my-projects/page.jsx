'use client';

import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Folder, Calendar, Users, ArrowRight, Search } from 'lucide-react';

export default function MembersProjectsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          const mockProjects = [
            {
              id: '1',
              name: 'Skyline Tower Construction',
              status: 'In Progress',
              progress: 65,
              dueDate: '2024-06-15',
              teamMembers: 8,
              lastUpdated: '2024-01-15'
            },
            {
              id: '2',
              name: 'Riverfront Residential Complex',
              status: 'Planning',
              progress: 20,
              dueDate: '2024-09-30',
              teamMembers: 5,
              lastUpdated: '2024-01-10'
            },
            {
              id: '3',
              name: 'Metro Bridge Renovation',
              status: 'Completed',
              progress: 100,
              dueDate: '2023-12-20',
              teamMembers: 12,
              lastUpdated: '2023-12-20'
            }
          ];
          setProjects(mockProjects);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Planning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Projects</h1>
        <p className="text-gray-600 mt-2">
          Manage and track all your assigned projects
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Folder className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {project.name}
                    </h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span>Due Date</span>
                  <span className="font-medium">{project.dueDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Team Members</span>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">{project.teamMembers}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Last Updated</span>
                  <span className="font-medium">{project.lastUpdated}</span>
                </div>
              </div>

              {/* Action Button */}
              <Link
                href={`/members/my-projects/${project.id}/dashboard`}
                className="mt-4 w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span>View Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <Folder className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-500">
            {searchTerm ? 'No projects match your search.' : 'You are not assigned to any projects yet.'}
          </p>
        </div>
      )}
    </div>
  );
}