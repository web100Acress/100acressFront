import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Api_service from '../Redux/utils/Api_Service';
import DubaiProjectPage from './Dubai/ProjectDetail/DubaiProjectPage';
import ProjectLayout2 from '../aadharhomes/BannerPage/updatedbannerpage/components/ProjectLayout2';

/**
 * ProjectRouter - Smart router that determines if a project slug belongs to:
 * 1. Dubai/united-arab-emirates project -> renders DubaiProjectPage
 * 2. Regular project -> renders ProjectLayout2
 */
const ProjectRouter = () => {
  const { pUrl } = useParams();
  const { getProjectbyState } = Api_service();
  const dubaiProjects = useSelector(store => store?.stateproject?.dubai || []);
  const [isDubaiProject, setIsDubaiProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch Dubai projects if not already loaded
    if (!Array.isArray(dubaiProjects) || dubaiProjects.length === 0) {
      getProjectbyState("Dubai", 0);
    }
  }, []);

  useEffect(() => {
    // Wait for Dubai projects to be loaded before making decision
    if (!pUrl) return;
    
    if (dubaiProjects && dubaiProjects.length > 0) {
      // Debug: Log first project structure
      console.log('ProjectRouter - First Dubai project sample:', {
        slugURL: dubaiProjects[0]?.slugURL,
        pUrl: dubaiProjects[0]?.pUrl,
        slug: dubaiProjects[0]?.slug,
        projectName: dubaiProjects[0]?.projectName
      });
      
      // Check if this slug belongs to a Dubai project
      const isDubai = dubaiProjects.some(p => {
        // Generate slug from project name
        const nameSlug = p.projectName
          ?.toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '');
        
        const matches = 
          p.slugURL === pUrl || 
          p.pUrl === pUrl || 
          p.slug === pUrl ||
          p._id === pUrl ||
          nameSlug === pUrl;
        
        if (matches) {
          console.log('ProjectRouter - Match found:', p.projectName, 'with slug:', nameSlug);
        }
        return matches;
      });
      
      console.log('ProjectRouter - Checking slug:', pUrl);
      console.log('ProjectRouter - Dubai projects count:', dubaiProjects.length);
      console.log('ProjectRouter - Is Dubai project:', isDubai);
      
      setIsDubaiProject(isDubai);
      setLoading(false);
    }
    // If Dubai projects are still loading, keep waiting
  }, [dubaiProjects, pUrl]);

  // Show loading state while checking
  if (loading || isDubaiProject === null) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gold mb-4"></div>
          <p className="text-white text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  // Render appropriate component based on project type
  if (isDubaiProject === true) {
    console.log('ProjectRouter - Rendering DubaiProjectPage for:', pUrl);
    return <DubaiProjectPage />;
  } else {
    console.log('ProjectRouter - Rendering ProjectLayout2 for:', pUrl);
    return <ProjectLayout2 />;
  }
};

export default ProjectRouter;
