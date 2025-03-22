import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
const customStyle = {
  position: "absolute",
  marginLeft: "250px",
  right: "auto",
  width: "80%",
};
const UserDetails = () => {
  const [userData, setUserData] = useState([]);
  const fetchData = async () => {
    try {
      const res = await axios.get(
        "/api/property/buy/ViewAll"
      );
      setUserData(res.data.collectdata);
    } catch (error) {
      console.log(error || error.message);
    }
  };

  useEffect(() => {
    fetchData();
    console.log(userData, "userData");
  }, []);

  return (
    <>
      <Sidebar />
      <div className="" style={customStyle}>
        <div class="flex justify-end">
          <button
            type="button"
            class="py-2 mt-2 px-2 hover:bg-blue-500 hover:text-white inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-blue-600 text-blue-600 hover:border-blue-500  disabled:opacity-50 disabled:pointer-events-none dark:border-blue-500 dark:text-blue-500 dark:hover:text-blue-400 dark:hover:border-blue-400"
          >
            Download Data
          </button>
        </div>

        <div className="-m-1.5 overflow-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <div className="table border-collapse table-auto w-full divide-y divide-gray-200 dark:divide-neutral-700">
                <div className="table-header-group">
                  <div className="table-row">
                
                    <div className="table-cell px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                      Name
                    </div>
                    <div className="table-cell px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                      Mobile
                    </div>
                    <div className="table-cell px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                      Property Name
                    </div>
                    <div className="table-cell px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                      Price
                    </div>
                    <div className="table-cell text-center px-6 py-3  text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                      City
                    </div>
                  </div>
                </div>
                <div className="table-row-group divide-y divide-gray-200 bg-white dark:divide-neutral-700 dark:bg-neutral-800">
                  {userData.map((item, index) =>
                    item.postProperty.map((property, propertyIndex) => (
                      <div
                        key={`${index}-${propertyIndex}`}
                        className="table-row"
                      >
                        
                        <div className="table-cell px-6 py-2 text-center whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                          {item.name}
                        </div>
                        <div className="table-cell px-6 py-2 text-center whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                          {property.number}
                        </div>
                        <div className="table-cell px-6 py-2 text-center whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                          {property.propertyName}
                        </div>
                        <div className="table-cell px-6 py-2 text-center whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                          {property.price}
                        </div>
                        <div className="table-cell px-6 py-2 text-center whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                          {property.city}
                          {", "} {property.state}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* <CSVLink data={flattenedData} headers={headers} filename={"location_data.csv"}>
        <button>Download CSV</button>
      </CSVLink> */}

      </div>
    </>
  );
};

export default UserDetails;
