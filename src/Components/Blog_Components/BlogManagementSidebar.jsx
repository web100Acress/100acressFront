import React, {useState} from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  Newspaper, 
  Feather, 
  FilePlus2, 
  LogOutIcon, 
  MenuIcon, 
  X, 
  NotebookText,
  BarChart3,
  Settings,
  User
} from 'lucide-react';
import axios from'axios';
import { useNavigate } from'react-router-dom';

function BlogManagementSidebar() {
   
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const history = useNavigate();
   const location = useLocation();

   const HandleUserLogout = async () => {
      console.log("User trying to logout..")
      try {
        await axios.get("https://api.100acress.com/postPerson/logout");
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
    {/* Mobile Menu Button */}
    <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        type="button" 
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200"
      >
        <span className="sr-only">Open sidebar</span>
        <MenuIcon className="w-6 h-6" />
      </button>

<div className='flex'>
      {/* Sidebar */}
      <div className='w-64 flex-shrink-0'>
        <aside 
          id="default-sidebar" 
          className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } sm:translate-x-0 bg-white border-r border-gray-200 shadow-xl`} 
          aria-label="Sidebar"
        >
         
         <div className="h-full px-4 py-6 overflow-y-auto bg-white">
            {/* Mobile Close Button */}
            <button 
                  onClick={() => setSidebarOpen(false)}
                  className="sm:hidden absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200"
               >
                  <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className='flex items-center mb-4 space-x-3 pb-3 border-b border-gray-200'>
               <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg'>
                 <Feather className='w-6 h-6 text-white'/>
               </div>
               <div>
                 <span className='text-xl font-bold text-gray-900'>Blog Management</span>
                 <p className='text-xs text-gray-500'>Content Dashboard</p>
               </div>
            </div>

            {/* Navigation Menu */}
            <ul className="space-y-1 font-medium">
               <li>
                <Link 
                  to="/seo/blogs" 
                  className={`flex items-center p-3 text-gray-700 rounded-xl hover:bg-blue-50 group transition-all duration-200 ${
                    isActiveRoute('/seo/blogs') 
                      ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500' 
                      : ''
                  }`}
                >
                  <BarChart3 className={`w-5 h-5 transition-all duration-200 ${
                    isActiveRoute('/seo/blogs') 
                      ? 'text-blue-600' 
                      : 'text-gray-500 group-hover:text-blue-600'
                  }`} />
                  <span className="ms-3 font-medium">Dashboard</span>
                  </Link>
               </li>
              
               <li>
                <Link 
                  to="/seo/blogs/manage" 
                  className={`flex items-center p-3 text-gray-700 rounded-xl hover:bg-green-50 group transition-all duration-200 ${
                    isActiveRoute('/seo/blogs/manage') 
                      ? 'bg-green-100 text-green-700 border-l-4 border-green-500' 
                      : ''
                  }`}
                >
                  <Newspaper className={`w-5 h-5 transition-all duration-200 ${
                    isActiveRoute('/seo/blogs/manage') 
                      ? 'text-green-600' 
                      : 'text-gray-500 group-hover:text-green-600'
                  }`} />
                  <span className="ms-3 font-medium">All Blogs</span>
                     </Link>
               </li>
              
               <li>
                <Link 
                  to="/seo/blogs/write" 
                  className={`flex items-center p-3 text-gray-700 rounded-xl hover:bg-purple-50 group transition-all duration-200 ${
                    isActiveRoute('/seo/blogs/write') 
                      ? 'bg-purple-100 text-purple-700 border-l-4 border-purple-500' 
                      : ''
                  }`}
                >
                  <FilePlus2 className={`w-5 h-5 transition-all duration-200 ${
                    isActiveRoute('/seo/blogs/write') 
                      ? 'text-purple-600' 
                      : 'text-gray-500 group-hover:text-purple-600'
                  }`} />
                  <span className="ms-3 font-medium">Add Blog</span>
                  </Link>
               </li>
              
               <li>
                <Link 
                  to="/seo/blogs/drafts" 
                  className={`flex items-center p-3 text-gray-700 rounded-xl hover:bg-orange-50 group transition-all duration-200 ${
                    isActiveRoute('/seo/blogs/drafts') 
                      ? 'bg-orange-100 text-orange-700 border-l-4 border-orange-500' 
                      : ''
                  }`}
                >
                  <NotebookText className={`w-5 h-5 transition-all duration-200 ${
                    isActiveRoute('/seo/blogs/drafts') 
                      ? 'text-orange-600' 
                      : 'text-gray-500 group-hover:text-orange-600'
                  }`} />
                  <span className="ms-3 font-medium">All Drafts</span>
                </Link>
               </li>
            </ul>

            {/* Settings Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="space-y-2">
                {/* Settings */}
                <button className="flex items-center w-full p-3 text-gray-700 rounded-xl hover:bg-gray-50 group transition-all duration-200">
                  <Settings className="w-5 h-5 text-gray-500 group-hover:text-gray-600 transition-all duration-200" />
                  <span className="ms-3 font-medium">Settings</span>
                </button>

                {/* Profile */}
                <button className="flex items-center w-full p-3 text-gray-700 rounded-xl hover:bg-gray-50 group transition-all duration-200">
                  <User className="w-5 h-5 text-gray-500 group-hover:text-gray-600 transition-all duration-200" />
                  <span className="ms-3 font-medium">Profile</span>
                </button>

                {/* Logout */}
                <button 
                  type='button' 
                  onClick={HandleUserLogout}
                  className="flex items-center w-full p-3 text-red-600 rounded-xl hover:bg-red-50 group transition-all duration-200"
                >
                  <LogOutIcon className="w-5 h-5 text-red-500 group-hover:text-red-600 transition-all duration-200" />
                  <span className="ms-3 font-medium">Sign Out</span>
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-gray-200">
              <div className="text-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">BM</span>
                </div>
                <p className="text-xs text-gray-500">Blog Management v2.0</p>
              </div>
            </div>
         </div>
      </aside>
   </div>

      {/* Main Content */}
      <div className='flex-1 bg-gray-50 min-h-screen'>
      <Outlet />
   </div>
</div>
    </>
  )
}

export default BlogManagementSidebar;