import { useState,useEffect } from "react"
import axios from "axios"
import { ArrowDown, ArrowUp, Edit, Eye, Plus, Trash2 } from "lucide-react";
import { Switch, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { PaginationControls } from "./BlogManagement";

export default function DraftBlogManagement() {

  const token = localStorage.getItem("myToken");
  const history = useNavigate();
  const [isPublishedLoading, setIsPublishedLoading] = useState(false);
  // Sample blog data
  const [blogs, setBlogs] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Do you Want to delete this Blog?');

  // State for search and sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [blogToDelete, setBlogToDelete] = useState(null);

  // Handle delete blog
  const showModal = () => {
    setOpenModal(true);
  };

  const handleIsPublished = async (checked,id) => {

    setIsPublishedLoading(true);

    try {
      const res = await axios.patch(`https://api.100acress.com/blog/update/${id}`,
      {
        isPublished: checked,
      },
      {
        headers: {
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }
    );
      if(res.status >= 200 && res.status < 300) {
        console.log("Blog status updated successfully");
        setBlogs(prevBlogs => prevBlogs.map(blog => blog._id === id ? { ...blog, isPublished: checked } : blog));
        console.log("Blog status updated successfully");
        setIsPublishedLoading(false);
      }
      else {
        setIsPublishedLoading(false);
        console.log("Something went wrong while updating the blog status", res.data) 
      }
    }
    catch (error) {
      
      console.log(error); 
    }
    finally {
      setIsPublishedLoading(false);
    }
  };


  const handleOk = async(id) => {
    setModalText('Wait...');
    setConfirmLoading(true);
    const isDeleted = await handleDeleteUser(id);
    if (isDeleted.success) {
      setModalText('Blog deleted successfully.');
      setBlogs(blogs.filter((blog) => blog._id !== id));
      setConfirmLoading(false);
      setOpenModal(false);
    }
    else {
      setModalText('Error deleting blog.');
      setConfirmLoading(false);
      setOpenModal(false);
    }

  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpenModal(false);
    setBlogToDelete(null);
  };

  // Filter and sort blogs
  const filteredBlogs = blogs?.filter(
      (blog) =>
        blog.blog_Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortField === "date") {
        return sortDirection === "asc"
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      } else {
        return sortDirection === "asc" ? a.blog_Title.localeCompare(b.blog_Title) : b.blog_Title.localeCompare(a.blog_Title)
      }
    });
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get(`https://api.100acress.com/blog/draft/view?page=${currentPage}&limit=${pageSize}`);
            console.log("Response",res.data);
            setBlogs(res.data.data);
            setTotalPages(res.data.totalPages);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);
  // Toggle sort direction
  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  function BlogPreview( description, maxLength = 80 ) {
    const getBlogPreview = (desc, maxLen) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = desc;
        let text = tempDiv.textContent;
        return text.length > maxLen ? text.substring(0, maxLen) + "..." : text;
    };

    const previewText = getBlogPreview(description, maxLength);
    return <p>{previewText}</p>;
}

const handleDeleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `https://api.100acress.com/blog/Delete/${id}`,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          }
        }
      );
      if (response.status >= 200 && response.status < 300) {
        return {success:true,error:false};
      } else {
        return {success:false,error:true};
      }
    } catch (error) {
        return {success:false,error:true};
    }
  };

  const handleDeleteButtonClick = (id) => {
    showModal();
    setBlogToDelete(id);
    setModalText('Do you Want to delete this Blog?');
  };
  function cleanString(str) {
    return str
        .replace(/\s+/g, '-')        // Replace all spaces with hyphen
        .replace(/[?!,\.;:\{\}\(\)\$\@]+/g, ''); // Replace punctuation with empty string
  }
  const handleBlogView = (Title,id) => {
    const blogTitle = cleanString(Title);
    history(`/blog/${blogTitle}/${id}`);
  };

  return (
    <>
    
      <div className="max-w-6xl  mx-auto p-4 md:p-6"> 
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">Blog Management</h1>
          <Link to="/seo/blogs/write">
            <button
              className="flex items-center gap-2 bg-primaryRed hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              <Plus size={18} />
              <span>Add New Blog</span>
            </button>
          </Link>
        </div>

        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search blogs..."
              className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryRed"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        {
          openModal && (
            <Modal
              title="Delete Blog"
              open={openModal}
              onOk={()=>handleOk(blogToDelete)} 
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <p>{modalText}</p>
            </Modal>
          )
        }
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Blog
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => toggleSort("title")}
                  >
                    <div className="flex items-center gap-1">
                      Title
                      {sortField === "title" &&
                        (sortDirection === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Author
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => toggleSort("date")}
                  >
                    <div className="flex items-center gap-1">
                      Date
                      {sortField === "date" &&
                        (sortDirection === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Published
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBlogs.length > 0 ? (
                  filteredBlogs.map((blog) => (
                    <>
                    <tr key={blog._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-16 w-24 relative">
                            <img
                              src={blog.blog_Image.url || "/placeholder.svg"}
                              alt={blog.blog_Title}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 hover:text-blue-600 cursor-pointer" 
                          onClick={() => handleBlogView(blog.blog_Title,blog._id)}
                        >
                          {blog.blog_Title}
                        </div>
                        <div className="text-sm text-gray-500 line-clamp-2">{BlogPreview(blog.blog_Description)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{blog.author}</td>
                      { blog.createdAt ? <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {new Date(blog.createdAt).toLocaleDateString()}
                      </td> : <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>}

                          
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Switch checked={blog?.isPublished} loading={isPublishedLoading}  onChange={(checked)=>handleIsPublished(checked,blog._id)} />
                      </td>
    
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button
                            className="text-primaryRed hover:text-blue-900"
                            onClick={() => handleBlogView(blog.blog_Title,blog._id)}
                            title="View"
                          >
                            <Eye size={18} />
                          </button>
                          <Link to={`/seo/blogs/edit/${blog._id}`}>
                            <button
                              className="text-indigo-600 hover:text-indigo-900"
                              title="Edit"
                            >
                              <Edit size={18} />
                            </button>
                          </Link>

                          <button
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleDeleteButtonClick(blog._id)}
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    </>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                      No blogs found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr>
                  {
                    totalPages >= 1 && (
                      <td className="px-6 py-4 text-center">
                        <PaginationControls
                          currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                          totalPages={totalPages}
                        />
                      </td>
                    )

                  }
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

