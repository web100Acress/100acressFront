import React from 'react';
import { useParams } from 'react-router-dom';
import ProjectLayout2 from "./ProjectLayout2";

/**
 * ProjectRouter - Routes all projects to ProjectLayout2
 */
const ProjectRouter = () => {
  const { pUrl } = useParams();
  
  // Always render ProjectLayout2 for all projects
  return <ProjectLayout2 />;
};

export default ProjectRouter;
