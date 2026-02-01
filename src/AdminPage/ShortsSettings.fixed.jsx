import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiBase } from '../config/apiBase';
import Sidebar from './Sidebar';
import { parseYouTubeVideoId, getEmbedUrl } from '../utils/youtubeUtils';
import showToast from '../utils/toastUtils';

const ShortsSettings = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [input, setInput] = useState('');
  const [video, setVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [parsed, setParsed] = useState('');
  const [previewKey, setPreviewKey] = useState(0);

  // Check authentication and load data on component mount
  useEffect(() => {
    const checkAuthAndLoad = async () => {
      const token = localStorage.getItem('token');
      console.log('Auth check - Token:', token ? 'Found' : 'Not found');
      
      if (!token) {
        console.warn('No authentication token found, redirecting to login');
        showToast.error('Please log in to access this page');
        navigate('/login');
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(`${getApiBase()}/settings/shorts-videos`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.status === 401) {
          localStorage.removeItem('token');
          throw new Error('Session expired. Please log in again.');
        }

        if (!response.ok) {
          throw new Error('Failed to load video');
        }

        const data = await response.json();
        if (data.value) {
          setVideo({
            id: '1',
            videoId: data.value,
            url: `https://youtube.com/watch?v=${data.value}`,
            addedAt: new Date().toISOString()
          });
        }
      } catch (error) {
        console.error('Error:', error);
        showToast.error(error.message || 'An error occurred');
        if (error.message.includes('expired') || error.message.includes('token')) {
          navigate('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndLoad();
  }, [navigate]);

  const getPreviewSrc = (video) => {
    if (!video?.videoId) return "";
    return getEmbedUrl(video.videoId);
  };

  const saveVideo = useCallback(async (videoToSave) => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        showToast.error('Your session has expired. Please log in again.');
        navigate('/login');
        return false;
      }

      const videoId = videoToSave?.videoId || '';
      const response = await fetch(`${getApiBase()}/settings/shorts-videos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ value: videoId })
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        throw new Error('Session expired. Please log in again.');
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to save video');
      }

      if (videoId) {
        const newVideo = {
          id: '1',
          videoId,
          url: `https://youtube.com/watch?v=${videoId}`,
          addedAt: new Date().toISOString()
        };
        setVideo(newVideo);
      } else {
        setVideo(null);
      }

      showToast.success(videoId ? 'Video saved successfully' : 'Video removed');
      setPreviewKey(prev => prev + 1);
      return true;
    } catch (error) {
      console.error('Save error:', error);
      showToast.error(error.message || 'Failed to save video');
      if (error.message.includes('expired') || error.message.includes('token')) {
        navigate('/login');
      }
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [navigate]);

  // Rest of your component JSX here...
  // [Previous JSX content remains the same]
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="p-4 mt-14">
          {/* Your existing JSX */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-bold mb-6">YouTube Shorts Settings</h1>
              {/* Rest of your form and preview JSX */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShortsSettings;
