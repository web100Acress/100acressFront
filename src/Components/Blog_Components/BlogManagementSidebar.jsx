import React, {useState} from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Newspaper, Feather, FilePenLine, FilePlus2, LogOutIcon, MenuIcon, X } from 'lucide-react';
import axios from'axios';
import { useNavigate } from'react-router-dom';

function BlogManagementSidebar() {
   
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const history = useNavigate();

   const HandleUserLogout = async () => {
      console.log("User trying to logout..")
      try {
        await axios.get("/api/postPerson/logout");
        localStorage.removeItem("myToken");
        localStorage.removeItem("mySellerId");
        localStorage.removeItem("userRole");
        history("/");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };


  return (
    <>
    
    <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        type="button" 
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span className="sr-only">Open sidebar</span>
        <MenuIcon className="w-6 h-6" />
      </button>
<div className='flex'>
   <div className='basis-1/5'>
      <aside id="default-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 `} aria-label="Sidebar">
         
         <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <button 
                  onClick={() => setSidebarOpen(false)}
                  className="sm:hidden absolute top-2.5 right-2.5 p-1 text-gray-500 hover:text-gray-700"
               >
                  <X className="w-5 h-5" />
            </button>
            <div className='flex mb-4 space-x-4'>
               <Feather className='w-10 h-10 text-center text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true"'/>
               <span className='text-2xl text-white font-bold '>Blog Management</span>
            </div>
            <ul className="space-y-2 font-medium">
               <li>
                  <Link to="/seo/blogs" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <Newspaper className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" />
                     <span className="ms-3">All Blogs</span>
                  </Link>
               </li>
               <li>
                  <Link to="/seo/blogs/write" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                           <FilePlus2 className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" />
                        <span className="ms-3">Add Blog</span>
                     </Link>
               </li>
               <li>
               <Link to="/seo/blogs/edit/:id" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white pointer-events-none hover:text-white group " >
                        <FilePenLine className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" />
                     <span className="ms-3">Edit Blog</span>
                  </Link>
               </li>
               <li>
               <button type='button' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={HandleUserLogout}>
                        <LogOutIcon className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" />
                     <span className="ms-3">Sign Out</span>
                  </button>
               </li>


            </ul>
         </div>
      </aside>
   </div>
   <div className='basis-4/5'>
      <Outlet />
   </div>
</div>
    </>
  )
}

export default BlogManagementSidebar;