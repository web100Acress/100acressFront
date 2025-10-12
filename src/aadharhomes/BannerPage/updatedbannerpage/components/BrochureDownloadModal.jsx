import React from 'react';
import CallbackModal from './CallbackModal';
import api from '../../../../config/apiClient';

const BrochureDownloadModal = ({ 
  isOpen, 
  onClose, 
  projectViewDetails, 
  projectTitle, 
  location 
}) => {
  const handleSuccess = () => {
    // Trigger brochure download after successful form submission
    downloadBrochure();
  };

  const downloadBrochure = async () => {
    try {
      // Get project ID and brochure URL from project data
      const projectId = projectViewDetails?._id;
      const brochureUrl = projectViewDetails?.project_Brochure?.url;
      
      console.log('Project ID:', projectId);
      console.log('Brochure URL:', brochureUrl);
      
      if (!projectId) {
        throw new Error('Project ID not found');
      }
      
      if (brochureUrl) {
        // If brochure URL is available, download directly from S3/CloudFront
        const link = document.createElement('a');
        link.href = brochureUrl;
        link.download = `${projectTitle.replace(/\s+/g, '_')}_Brochure.pdf`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return;
      }
      
      // Fallback: Fetch brochure from project_brochure schema in database
      const response = await api.get(`/project_brochure/${projectId}`, {
        responseType: 'blob'
      });
      
      // Create blob and download
      const blob = new Blob([response.data], { 
        type: 'application/pdf' 
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${projectTitle.replace(/\s+/g, '_')}_Brochure.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading brochure:', error);
      // Final fallback: try alternative endpoint
      try {
        const projectId = projectViewDetails?._id;
        
        const fallbackResponse = await api.get(`/api/project_brochure/${projectId}`, {
          responseType: 'blob'
        });
        
        const blob = new Blob([fallbackResponse.data], { 
          type: 'application/pdf' 
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${projectTitle.replace(/\s+/g, '_')}_Brochure.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (fallbackError) {
        console.error('Fallback download also failed:', fallbackError);
        alert('Brochure download failed. Please try again later.');
      }
    }
  };

  return (
    <CallbackModal
      isOpen={isOpen}
      onClose={onClose}
      projectViewDetails={projectViewDetails}
      projectTitle={projectTitle}
      location={location}
      onSuccess={handleSuccess}
    />
  );
};

export default BrochureDownloadModal;
