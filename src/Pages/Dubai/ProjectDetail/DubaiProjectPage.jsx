import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { DubaiProvider, useDubai } from "../context/DubaiContext";
import { ThemeProvider } from "../context/ThemeContext";
import DubaiProjectHero from "./components/DubaiProjectHero";
import DubaiProjectAbout from "./components/DubaiProjectAbout";
import DubaiProjectHighlights from "./components/DubaiProjectHighlights";
import DubaiProjectPricing from "./components/DubaiProjectPricing";
import DubaiProjectGallery from "./components/DubaiProjectGallery";
import DubaiProjectAmenities from "./components/DubaiProjectAmenities";
import DubaiProjectLocation from "./components/DubaiProjectLocation";
import DubaiProjectFloorPlans from "./components/DubaiProjectFloorPlans";
import DubaiProjectDeveloper from "./components/DubaiProjectDeveloper";
import DubaiProjectContact from "./components/DubaiProjectContact";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import Api_service from "../../../Redux/utils/Api_Service";
import { useSelector } from "react-redux";

const DubaiProjectContent = () => {
  const { pUrl: projectSlug } = useParams();
  const navigate = useNavigate();
  const { selectedEmirate } = useDubai();
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getProjectbyState } = Api_service();
  const dubaiProjects = useSelector(store => store?.stateproject?.dubai || []);

  useEffect(() => {
    // Fetch Dubai projects if not already loaded
    if (!Array.isArray(dubaiProjects) || dubaiProjects.length === 0) {
      getProjectbyState("Dubai", 0);
    }
  }, []);

  useEffect(() => {
    console.log('DubaiProjectPage - projectSlug:', projectSlug);
    console.log('DubaiProjectPage - dubaiProjects count:', dubaiProjects?.length);
    
    if (dubaiProjects && dubaiProjects.length > 0 && projectSlug) {
      // Find project by slug - try multiple fields including generated name slug
      const project = dubaiProjects.find(p => {
        // Generate slug from project name
        const nameSlug = p.projectName
          ?.toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '');
        
        return (
          p.slugURL === projectSlug || 
          p.pUrl === projectSlug || 
          p.slug === projectSlug ||
          p._id === projectSlug ||
          nameSlug === projectSlug
        );
      });
      
      console.log('Found project:', project?.projectName || 'Not found');
      console.log('Available slugs:', dubaiProjects.map(p => ({
        slugURL: p.slugURL,
        pUrl: p.pUrl,
        slug: p.slug,
        _id: p._id,
        nameSlug: p.projectName?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      })));
      
      if (project) {
        setProjectData(project);
        setLoading(false);
      } else {
        setError("Project not found");
        setLoading(false);
        // Redirect to UAE page after 2 seconds
        setTimeout(() => navigate("/united-arab-emirates"), 2000);
      }
    }
  }, [dubaiProjects, projectSlug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gold mb-4"></div>
          <p className="text-white text-xl">Loading luxury property...</p>
        </div>
      </div>
    );
  }

  if (error || !projectData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-white text-2xl mb-4">Property Not Found</h2>
          <p className="text-muted-foreground mb-6">Redirecting to properties page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>{projectData.projectName} - Luxury Property in {projectData.city || selectedEmirate} | 100acress</title>
        <meta name="description" content={projectData.description || `Discover ${projectData.projectName}, a premium property in ${projectData.city || selectedEmirate}, UAE`} />
        <meta property="og:title" content={`${projectData.projectName} - ${projectData.city || selectedEmirate}`} />
        <meta property="og:description" content={projectData.description} />
        <meta property="og:image" content={projectData.frontImage?.url || projectData.images?.[0]?.url} />
      </Helmet>

      <Header />
      
      <DubaiProjectHero project={projectData} />
      
      <div className="relative">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="h-full w-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative">
          <DubaiProjectAbout project={projectData} />
          <DubaiProjectHighlights project={projectData} />
          <DubaiProjectPricing project={projectData} />
          <DubaiProjectGallery project={projectData} />
          <DubaiProjectAmenities project={projectData} />
          <DubaiProjectFloorPlans project={projectData} />
          <DubaiProjectLocation project={projectData} />
          <DubaiProjectDeveloper project={projectData} />
          <DubaiProjectContact project={projectData} />
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

const DubaiProjectPage = () => {
  return (
    <ThemeProvider>
      <DubaiProvider>
        <DubaiProjectContent />
      </DubaiProvider>
    </ThemeProvider>
  );
};

export default DubaiProjectPage;
