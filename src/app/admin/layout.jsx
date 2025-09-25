// app/dashboard/layout.js
'use client';

import { useParams } from 'next/navigation';
import DashboardSlidebar from '../../components/DashboardSlidebar';
import { ProjectProvider } from '@/context/ProjectContext';

export default function DashboardLayout({ children }) {
  const params = useParams();
  const projectId = params?.id;
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardSlidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <ProjectProvider projectId={projectId || null}>
          {children}
        </ProjectProvider>
      </main>
    </div>
  );
}
