import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const customStyle = {
  position:"absolute",
  top:"100px",
 marginLeft: "250px",
 right:"auto",
  width:"80%"
   
 };
const UserProfile = () => {
  const [viewAll, setViewAll] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://api.100acress.com/preLaunch/viewAll");
        setViewAll(res.data.data);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = viewAll.slice(indexOfFirstRow, indexOfLastRow);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
 
  return (
    <>
     
      <Sidebar />
      <div className="" style={customStyle}>
      <div className="flex justify-end mr-20">
        <button
          className="bg-blue-700 p-2 sm:rounded-lg m-2 text-white"
        >
         User Name
        </button>
        <button
          className="bg-blue-700 p-2 m-2 sm:rounded-lg text-white"
        >
        User Email 
        </button>
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
                  Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((item, index) => {
                const serialNumber = indexOfFirstRow + index + 1;
                return (
                  <tr key={index} className="bg-white-500 border-b border-red-400">
                    <td className="px-2 py-1">{serialNumber}</td>
                    <td className="px-2 py-1">{item.projectName}</td>
                    <td className="px-2 py-1">{item.price}</td>
                    <td className="px-2 py-1 flex space-x-1">
                      <button
                        type="button"
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-2 py-0 text-center"
                      >
                        View
                      </button>
                      <button
                        type="button"

                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2 py-1.5 text-center"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="focus:outline-none text-white bg-yellow-500 hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 font-medium rounded-lg text-sm px-2 py-1.5 text-center"
                      >
                        Add BHK
                      </button>
                      <button
                        type="button"
                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 py-1.5 text-center"
                      >
                        Delete
                      </button>
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
        </div>
      
      </div>
      </div>
    </>
  );
};

export default UserProfile;


