import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  MenuIcon, 
  X, 
  Newspaper, 
  FilePlus2, 
  NotebookText,
  BarChart3,
  Settings,
  User
} from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BlogManagementSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCreateArticle, setShowCreateArticle] = useState(false);
  const history = useNavigate();
  const location = useLocation();

  const HandleUserLogout = async () => {
    console.log("User trying to logout..")
    try {
      await axios.get("/postPerson/logout");
      localStorage.removeItem("myToken");
      localStorage.removeItem("mySellerId");
      localStorage.removeItem("userRole");
      history("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Check if current route is active
  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Menu Button - Always visible on mobile */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        type="button" 
        className="inline-flex items-center p-2 mt-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200 lg:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <MenuIcon className="w-6 h-6" />
      </button>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)}></div>
          <aside 
            className="fixed top-0 left-0 z-40 w-64 h-full bg-white border-r border-gray-200 shadow-lg transform transition-transform duration-300 ease-in-out"
            aria-label="Mobile Sidebar"
          >
            <div className="h-full px-3 py-4 overflow-y-auto bg-white">
              {/* Mobile Close Button */}
              <button 
                onClick={() => setSidebarOpen(false)}
                className="absolute top-3 right-3 p-1.5 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className='flex items-center mb-3 space-x-2 pb-2 border-b border-gray-200'>
                <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md'>
                  <Newspaper className='w-4 h-4 text-white'/>
                </div>
                <div>
                  <span className='text-lg font-bold text-gray-900'>Blog Mgmt</span>
                  <p className='text-xs text-gray-500'>Mobile</p>
                </div>
              </div>

              {/* Navigation Menu - Mobile Optimized */}
              <ul className="space-y-1 font-medium">
                <li>
                  <Link 
                    to="/seo/blogs" 
                    className={`flex items-center p-3 text-gray-700 rounded-lg hover:bg-blue-50 group transition-all duration-200 ${
                      isActiveRoute('/seo/blogs') 
                        ? 'bg-blue-100 text-blue-700 border-l-3 border-blue-500' 
                        : ''
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <BarChart3 className={`w-4 h-4 transition-all duration-200 ${
                      isActiveRoute('/seo/blogs') 
                        ? 'text-blue-600' 
                        : 'text-gray-500 group-hover:text-blue-600'
                    }`} />
                    <span className="ms-3 font-medium text-sm">Dashboard</span>
                  </Link>
                </li>
              
                <li>
                  <Link 
                    to="/seo/blogs/manage" 
                    className={`flex items-center p-3 text-gray-700 rounded-lg hover:bg-green-50 group transition-all duration-200 ${
                      isActiveRoute('/seo/blogs/manage') 
                        ? 'bg-green-100 text-green-700 border-l-3 border-green-500' 
                        : ''
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Newspaper className={`w-4 h-4 transition-all duration-200 ${
                      isActiveRoute('/seo/blogs/manage') 
                        ? 'text-green-600' 
                        : 'text-gray-500 group-hover:text-green-600'
                    }`} />
                    <span className="ms-3 font-medium text-sm">All Blogs</span>
                  </Link>
                </li>
              
                <li>
                  <Link 
                    to="/seo/blogs/write" 
                    className={`flex items-center p-3 text-gray-700 rounded-lg hover:bg-purple-50 group transition-all duration-200 ${
                      isActiveRoute('/seo/blogs/write') 
                        ? 'bg-purple-100 text-purple-700 border-l-3 border-purple-500' 
                        : ''
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <FilePlus2 className={`w-4 h-4 transition-all duration-200 ${
                      isActiveRoute('/seo/blogs/write') 
                        ? 'text-purple-600' 
                        : 'text-gray-500 group-hover:text-purple-600'
                    }`} />
                    <span className="ms-3 font-medium text-sm">Add Blog</span>
                  </Link>
                </li>
               
                {/* Create Article (between Add Blog and Drafts) */}
                <li>
                  <button 
                    type='button'
                    onMouseDown={() => setShowCreateArticle(true)}
                    onClick={() => {
                      setShowCreateArticle(true);
                      setSidebarOpen(false);
                    }}
                    className="w-full flex items-center p-3 text-gray-700 rounded-lg hover:bg-blue-50 group transition-all duration-200 focus:outline-none"
                  >
                    <NotebookText className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                    <span className="ms-3 font-medium text-sm">Create Article</span>
                  </button>
                </li>

               
                <li>
                  <Link 
                    to="/seo/blogs/drafts" 
                    className={`flex items-center p-3 text-gray-700 rounded-lg hover:bg-orange-50 group transition-all duration-200 ${
                      isActiveRoute('/seo/blogs/drafts') 
                        ? 'bg-orange-100 text-orange-700 border-l-3 border-orange-500' 
                        : ''
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <NotebookText className={`w-4 h-4 transition-all duration-200 ${
                      isActiveRoute('/seo/blogs/drafts') 
                        ? 'text-orange-600' 
                        : 'text-gray-500 group-hover:text-orange-600'
                    }`} />
                    <span className="ms-3 font-medium text-sm">All Drafts</span>
                  </Link>
                </li>
              </ul>

              {/* Settings Section */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="space-y-1">
                  {/* Logout */}
                  <button 
                    type='button' 
                    onClick={HandleUserLogout}
                    className="flex items-center w-full p-3 text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg hover:from-red-600 hover:to-red-700 group transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    <div className="flex items-center justify-center w-6 h-6 bg-white/20 rounded-md group-hover:bg-white/30 transition-all duration-300">
                      <Settings className="w-3 h-3 text-white group-hover:scale-110 transition-all duration-300" />
                    </div>
                    <span className="ms-2 font-medium text-sm">Sign Out</span>
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-3 pt-2">
                <div className="text-center">
                  <p className="text-xs text-gray-500">© 2024 Blog Management</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

export default BlogManagementSidebar;
