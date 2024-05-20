import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom';
const customStyle = {
    position:"absolute",
    top:"100px",
   marginLeft: "250px",
   right:"auto",
    width:"80%"
     
   };
  
 
const UserAdmin = () => {
    const [viewAll, setViewAll] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get("https://api.100acress.com/postPerson/view");
          setViewAll(res.data.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, []);

    const filteredProjects = viewAll.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredProjects.slice(indexOfFirstRow, indexOfLastRow);
  
    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
      setCurrentPage(1);
    };

    
  
    
  return (
    <>
    <Sidebar />
    <div  className="" style={customStyle} >
    <div
          className="flex items-center mb-2 mt-2"
          style={{ marginLeft: "100px" }}
        >
          <button className="text-bold bg-red-600 p-2 text-white rounded-md mr-10">
            Search
          </button>
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border-b-2 w-50 border-red-600 text-black placeholder-black outline-none rounded-sm"
            value={searchTerm}
            onChange={handleSearch}
          />
          </div>
      <div className="flex justify-center items-center mt-0">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-5/6 mt-0">
          <table className="w-full text-sm text-left rtl:text-right text-black-100 dark:text-black-100 ">
            <thead className="text-xs text-black uppercase dark:text-black border-b-2  border-red-400">
              <tr className="">
                <th scope="col" className="px-6 py-3">
                  S No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>

                <th scope="col" className="px-6 py-3">
                  Mobile Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((item, index) => {
                const serialNumber = indexOfFirstRow + index + 1;
                const userId = item._id;
                return (
                  <tr key={index} className="bg-white-500 border-b border-red-400">
                    <td className="px-2 py-1">{serialNumber}</td>
                    <td className="px-2 py-1">{item.name}</td>
                    <td className="px-2 py-1">{item.email}</td>
                    <td className="px-2 py-1">{item.mobile}</td>
                    <td className="px-2 py-1 flex space-x-1">
                    <Link to={`/Admin/viewproperty/${userId}`}>
                     <button
                        type="button"
                        className="text-white bg-red-400 hover:bg-red-600 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-2 py-1.5 text-center"
                      >
                        View Property
                      </button>
                     </Link> 
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="flex justify-center mt-2 mb-2">
            {Array.from({ length: Math.ceil(viewAll.length / rowsPerPage) }, (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`mx-2 px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 ${currentPage === index + 1 ? "bg-red-600 text-white" : "bg-gray-300 text-gray-700"
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* <div className="flex justify-center mt-2 mb-2">
            {Array.from({ length: Math.ceil(viewAll.length / rowsPerPage) }, (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`mx-2 px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 ${currentPage === index + 1 ? "bg-red-600 text-white" : "bg-gray-300 text-gray-700"
                  }`}
              >
                {index + 1}
              </button>

            ))}
          </div> */}
          {/* <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal">
            <AddNew />
          </Modal> */}

        </div>
      
      </div>
      </div>

    </>
  )
}

export default UserAdmin