// ProjectContext.js
'use client';

import { createContext, useContext } from "react";

// Create the ProjectContext
const ProjectContext = createContext(undefined);

// Provider component to wrap the app or relevant component tree
export const ProjectProvider = ({ projectId, children }) => {
  return (
    <ProjectContext.Provider value={{ projectId }}>
      {children}
    </ProjectContext.Provider>
  );
};

// Custom hook to consume the projectId
export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
};

export default ProjectContext;