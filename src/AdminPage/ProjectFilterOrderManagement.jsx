import React, { useState, useEffect } from 'react';
import api from '../config/apiClient';
import { getProjectOrderData } from '../Utils/ProjectOrderData';
import Sidebar from './Sidebar';

const ProjectFilterOrderManagement = () => {
  const [projectOrders, setProjectOrders] = useState({});
  const [allProjects, setAllProjects] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [activeCity, setActiveCity] = useState('');
  const [projectCount, setProjectCount] = useState(4);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'city', 'status', 'type'

  const categories = [
    { key: 'luxury', label: 'Luxury', description: 'Premium luxury projects' },
    { key: 'trending', label: 'Trending', description: 'Trending projects' },
    { key: 'affordable', label: 'Affordable', description: 'Affordable housing projects' },
    { key: 'sco', label: 'SCO Plots', description: 'Shop-cum-office plots' },
    { key: 'commercial', label: 'Commercial', description: 'Commercial properties' },
    { key: 'budget', label: 'Budget', description: 'Budget-friendly projects' },
    { key: 'recommended', label: 'Recommended', description: 'Staff recommended projects' },
    { key: 'desiredLuxury', label: 'Desired Luxury', description: 'Most desired luxury projects' },
    { key: 'budgetPlots', label: 'Budget Plots', description: 'Budget-friendly plots' }
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Loading project orders from database...');
      
      // Load project orders from database
      const ordersResponse = await api.get('/api/project-orders');
      const orders = ordersResponse.data?.data || {};
      console.log('Project orders loaded from database:', orders);
      setProjectOrders(orders);
      
      // Load all projects for selection
      const response = await api.get('/project/viewAll/data');
      if (response.data && response.data.data) {
        const projects = response.data.data;
        setAllProjects(projects);
        
        // Extract unique cities from projects
        const uniqueCities = [...new Set(projects
          .map(project => project.city)
          .filter(city => city && city.trim() !== '')
        )].sort();
        
        setCities(uniqueCities);
        
        // Set first city as active if available
        if (uniqueCities.length > 0) {
          setActiveCity(uniqueCities[0]);
        }
      }
    } catch (err) {
      setError('Failed to load data. Please try again.');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMoveProject = (projectId, direction) => {
    const city = activeCity;
    const items = projectOrders[city] || [];
    const currentIndex = items.findIndex(item => item.id === projectId);
    
    if (currentIndex === -1) return;
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    // Check boundaries
    if (newIndex < 0 || newIndex >= items.length) return;
    
    // Reorder items
    const newItems = [...items];
    const [movedItem] = newItems.splice(currentIndex, 1);
    newItems.splice(newIndex, 0, movedItem);
    
    // Update order numbers
    const updatedItems = newItems.map((item, index) => ({
      ...item,
      order: index + 1
    }));
    
    setProjectOrders({
      ...projectOrders,
      [city]: updatedItems
    });
  };

  const handleProjectToggle = (projectId, isActive) => {
    const city = activeCity;
    const items = projectOrders[city] || [];
    const updatedItems = items.map(item => 
      item.id === projectId ? { ...item, isActive } : item
    );
    
    setProjectOrders({
      ...projectOrders,
      [city]: updatedItems
    });
  };

  const handleAddProject = () => {
    setShowAddProjectModal(true);
    setSearchTerm('');
  };

  const handleAddProjectFromModal = () => {
    const key = activeCity;
    const currentItems = projectOrders[key] || [];
    const maxOrder = Math.max(...currentItems.map(item => item.order), 0);
    
    // Use the same filtering logic as getAvailableProjects
    const availableProjects = getAvailableProjects();
    
    if (!searchTerm.trim()) {
      setError('Please enter a project name');
      return;
    }
    
    if (availableProjects.length === 0) {
      setError('No matching projects found');
      return;
    }
    
    const newProject = {
      id: Date.now(),
      name: availableProjects[0].projectName,
      order: maxOrder + 1,
      isActive: true
    };
    
    setProjectOrders({
      ...projectOrders,
      [key]: [...currentItems, newProject]
    });
    
    setSuccessMessage('Project added successfully');
    setShowAddProjectModal(false);
    setSearchTerm('');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const getAvailableProjects = () => {
    const key = activeCity;
    const currentItems = projectOrders[key] || [];
    const usedProjectNames = new Set(currentItems.map(item => item.name));
    
    // For City view - filter by city
    if (currentView === 'city') {
      return allProjects.filter(project => 
        project.city === key && 
        !usedProjectNames.has(project.projectName) &&
        project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // For Status view - filter by status AND search by project name
    if (currentView === 'status') {
      // If no search term, show all projects with that status
      if (!searchTerm.trim()) {
        return allProjects.filter(project => 
          project.project_Status === key && 
          !usedProjectNames.has(project.projectName)
        );
      }
      
      // If search term provided, filter by status AND project name
      return allProjects.filter(project => 
        project.project_Status === key && 
        !usedProjectNames.has(project.projectName) &&
        project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // For Type view - filter by type
    if (currentView === 'type') {
      return allProjects.filter(project => 
        project.propertyType === key && 
        !usedProjectNames.has(project.projectName) &&
        project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return [];
  };

  const handleRemoveProject = (projectId) => {
    const city = activeCity;
    const items = projectOrders[city] || [];
    const updatedItems = items.filter(item => item.id !== projectId);
    
    // Reorder remaining items
    const reorderedItems = updatedItems.map((item, index) => ({
      ...item,
      order: index + 1
    }));
    
    setProjectOrders({
      ...projectOrders,
      [city]: reorderedItems
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      
      // Check if user is authenticated
      const token = localStorage.getItem('myToken') || localStorage.getItem('token');
      console.log('Authentication token exists:', !!token);
      console.log('Token value:', token ? `${token.substring(0, 20)}...` : 'null');
      
      // Check current API base
      console.log('Current API base:', api.defaults.baseURL);
      
      let userRole = null;
      
      // Decode JWT to check role
      if (token) {
        try {
          const decoded = JSON.parse(atob(token.split('.')[1]));
          console.log('Decoded JWT token:', decoded);
          userRole = decoded.role?.toLowerCase();
          console.log('Role from JWT (lowercase):', userRole);
        } catch (e) {
          console.log('Could not decode JWT token:', e.message);
        }
      }
      
      if (!token) {
        setError('You are not logged in. Please log in first.');
        return;
      }
      
      if (userRole !== 'admin') {
        setError(`You do not have admin privileges. Current role: ${userRole || 'unknown'}`);
        return;
      }
      
      console.log('Saving project orders:', projectOrders);
      
      // Make sure we have data to save
      if (!projectOrders || Object.keys(projectOrders).length === 0) {
        setError('No project orders to save');
        return;
      }
      
      const response = await api.put('/api/project-orders', { data: projectOrders });
      console.log('Save response:', response);
      
      if (response.data && response.data.success) {
        setSuccessMessage('Project orders saved successfully!');
        // Reload data to confirm it was saved
        await loadData();
      } else {
        setError('Save failed: ' + (response.data?.message || 'Unknown error'));
      }
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to save project orders. Please try again.');
      console.error('Error saving project orders:', err);
      console.error('Error details:', err.response?.data);
    } finally {
      setSaving(false);
    }
  };

  const getVisibleProjects = () => {
    const city = activeCity;
    const cityProjects = projectOrders[city] || [];
    const activeProjects = cityProjects.filter(item => item.isActive);
    return activeProjects.slice(0, projectCount);
  };

  const getCurrentCityProjects = () => {
    return projectOrders[activeCity] || [];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex bg-gray-50">
        <Sidebar />
        <div className="flex-1 p-8 ml-[250px]">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="space-y-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 p-8 ml-[250px]">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Project Filter Order Management
          </h1>
          <p className="text-gray-600">
            Manage the order of projects by city, status, and type
          </p>
        </div>

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {successMessage}
          </div>
        )}
        
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Dashboard View */}
        {currentView === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* City Card */}
            <div 
              onClick={() => setCurrentView('city')}
              className="bg-white rounded-lg shadow-md p-8 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="text-center">
                <div className="text-5xl mb-4">🏙️</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">City</h2>
                <p className="text-gray-600 mb-4">Manage project order by city</p>
                <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                  Manage
                </button>
              </div>
            </div>

            {/* Status Card */}
            <div 
              onClick={() => setCurrentView('status')}
              className="bg-white rounded-lg shadow-md p-8 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="text-center">
                <div className="text-5xl mb-4">📊</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Status</h2>
                <p className="text-gray-600 mb-4">Manage project order by status</p>
                <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                  Manage
                </button>
              </div>
            </div>

            {/* Type Card */}
            <div 
              onClick={() => setCurrentView('type')}
              className="bg-white rounded-lg shadow-md p-8 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="text-center">
                <div className="text-5xl mb-4">🏢</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Type</h2>
                <p className="text-gray-600 mb-4">Manage project order by type</p>
                <button className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition">
                  Manage
                </button>
              </div>
            </div>
          </div>
        )}

        {/* City Management View */}
        {currentView === 'city' && (
          <div>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="mb-6 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >
              ← Back to Dashboard
            </button>

            {/* City Selection Dropdown */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Select City</h2>
              <select
                value={activeCity}
                onChange={(e) => setActiveCity(e.target.value)}
                className="w-full md:w-64 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              >
                <option value="">-- Choose a city --</option>
                {cities.map(city => (
                  <option key={city} value={city}>
                    {city} ({getCurrentCityProjects().filter(p => p.isActive).length} active)
                  </option>
                ))}
              </select>
            </div>

        {/* Project Count Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Display Settings</h2>
          <div className="flex items-center space-x-4">
            <label className="text-gray-700">Show top projects:</label>
            <select
              value={projectCount}
              onChange={(e) => setProjectCount(Number(e.target.value))}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={4}>Top 4</option>
              <option value={8}>Top 8</option>
              <option value={12}>Top 12</option>
            </select>
          </div>
        </div>

        {/* Current City Projects */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {activeCity} Projects
            </h2>
            <div className="space-x-2">
              <button
                onClick={handleAddProject}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                Add Project
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>

          <div className="space-y-2">
                {getCurrentCityProjects().map((project, index) => (
                  <div
                    key={project.id}
                    className="p-4 border rounded-lg bg-gray-50 border-gray-200 hover:border-gray-300 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {project.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            Order: {project.order}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={project.isActive}
                            onChange={(e) => handleProjectToggle(project.id, e.target.checked)}
                            className="mr-2"
                          />
                          <span className="text-sm">Active</span>
                        </label>
                        
                        <div className="flex flex-col space-y-1">
                          <button
                            onClick={() => handleMoveProject(project.id, 'up')}
                            disabled={index === 0}
                            className="p-1 text-gray-500 hover:bg-gray-200 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd"/>
                            </svg>
                          </button>
                          <button
                            onClick={() => handleMoveProject(project.id, 'down')}
                            disabled={index === getCurrentCityProjects().length - 1}
                            className="p-1 text-gray-500 hover:bg-gray-200 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                            </svg>
                          </button>
                        </div>
                        
                        <button
                          onClick={() => handleRemoveProject(project.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded transition"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {getCurrentCityProjects().length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No projects in this city. Click "Add Project" to get started.
                  </div>
                )}
              </div>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          <div className="text-sm text-gray-600 mb-4">
            This shows how the top {projectCount} projects will appear in the {activeCity} section:
          </div>
          <div className="space-y-2">
            {getVisibleProjects().map((project, index) => (
              <div key={project.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{project.name}</div>
                </div>
              </div>
            ))}
            {getVisibleProjects().length === 0 && (
              <div className="text-center py-4 text-gray-500">
                No active projects to display
              </div>
            )}
          </div>
        </div>
          </div>
        )}

        {/* Status Management View */}
        {currentView === 'status' && (
          <div>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="mb-6 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >
              ← Back to Dashboard
            </button>

            {/* Status Selection Dropdown */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Select Status</h2>
              <select
                value={activeCity}
                onChange={(e) => setActiveCity(e.target.value)}
                className="w-full md:w-64 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
              >
                <option value="">-- Choose a status --</option>
                <option value="newlaunch">New Launch</option>
                <option value="comingsoon">Coming Soon</option>
                <option value="underconstruction">Under Construction</option>
                <option value="readytomove">Ready to Move</option>
              </select>
            </div>

            {/* Project Count Selection */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Display Settings</h2>
              <div className="flex items-center space-x-4">
                <label className="text-gray-700">Show top projects:</label>
                <select
                  value={projectCount}
                  onChange={(e) => setProjectCount(Number(e.target.value))}
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value={4}>Top 4</option>
                  <option value={8}>Top 8</option>
                  <option value={12}>Top 12</option>
                </select>
              </div>
            </div>

            {/* Current Status Projects */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {activeCity} Projects
                </h2>
                <div className="space-x-2">
                  <button
                    onClick={handleAddProject}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                  >
                    Add Project
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {getCurrentCityProjects().map((project, index) => (
                  <div
                    key={project.id}
                    className="p-4 border rounded-lg bg-gray-50 border-gray-200 hover:border-gray-300 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {project.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            Order: {project.order}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={project.isActive}
                            onChange={(e) => handleProjectToggle(project.id, e.target.checked)}
                            className="mr-2"
                          />
                          <span className="text-sm">Active</span>
                        </label>
                        
                        <div className="flex flex-col space-y-1">
                          <button
                            onClick={() => handleMoveProject(project.id, 'up')}
                            disabled={index === 0}
                            className="p-1 text-gray-500 hover:bg-gray-200 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd"/>
                            </svg>
                          </button>
                          <button
                            onClick={() => handleMoveProject(project.id, 'down')}
                            disabled={index === getCurrentCityProjects().length - 1}
                            className="p-1 text-gray-500 hover:bg-gray-200 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                            </svg>
                          </button>
                        </div>
                        
                        <button
                          onClick={() => handleRemoveProject(project.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded transition"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {getCurrentCityProjects().length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No projects in this status. Click "Add Project" to get started.
                  </div>
                )}
              </div>
            </div>

            {/* Preview */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Preview</h2>
              <div className="text-sm text-gray-600 mb-4">
                This shows how the top {projectCount} projects will appear in the {activeCity} status section:
              </div>
              <div className="space-y-2">
                {getVisibleProjects().map((project, index) => (
                  <div key={project.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{project.name}</div>
                    </div>
                  </div>
                ))}
                {getVisibleProjects().length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    No active projects to display
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Type Management View */}
        {currentView === 'type' && (
          <div>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="mb-6 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >
              ← Back to Dashboard
            </button>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Type Management (Coming Soon)</h2>
              <p className="text-gray-600">Type-based project ordering will be available soon.</p>
            </div>
          </div>
        )}

      {/* Add Project Modal */}
      {showAddProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add Project to {activeCity}</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Project Name
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Type project name..."
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>

            {searchTerm && (
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2">
                  Available projects ({getAvailableProjects().length}):
                </div>
                <div className="max-h-32 overflow-y-auto border border-gray-200 rounded">
                  {getAvailableProjects().length > 0 ? (
                    getAvailableProjects().slice(0, 5).map((project, index) => (
                      <div key={project._id} className="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b last:border-b-0">
                        <div className="font-medium text-sm">{project.projectName}</div>
                        <div className="text-xs text-gray-500">{project.city}</div>
                      </div>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-sm text-gray-500">
                      No matching projects found
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowAddProjectModal(false);
                  setSearchTerm('');
                  setError(null);
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProjectFromModal}
                disabled={!searchTerm.trim() || getAvailableProjects().length === 0}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Project
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default ProjectFilterOrderManagement;
