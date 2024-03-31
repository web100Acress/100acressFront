import React, { useContext } from "react";
import Nav from "../../aadharhomes/Nav";
import Footer from "../Actual_Components/Footer";
import { AuthContext } from "../../AuthContext";
import { Link } from "react-router-dom";
const UserDashBoard = () => {
  const { agentData, handleDeleteUser } = useContext(AuthContext);
  let filteredRentProperties = [];
  let filteredSellProperties = [];

  if (agentData && agentData.postProperty) {
    filteredRentProperties = agentData.postProperty.filter(
      (property) => property.propertyLooking === "rent"
    );
    filteredSellProperties = agentData.postProperty.filter(
      (property) => property.propertyLooking === "Sell"
    );
  } else {
    console.log("agentData or agentData.postProperty is undefined.");
  }

  return (
    <div style={{ overflowX: "hidden" }}>
      <Nav />
      <div className="mx-10 my-10">
        <div className="max-w-full mx-auto my-10 flex flex-col md:flex-row items-start rounded-xl border p-4 text-center md:max-w-[83rem]">
          <div className="w-full md:w-1/2 md:mr-6">
            <div className="mb-2 px-6 md:px-10">
              <p className="text-sm font-bold text-left text-gray-500">
                {agentData.role}
              </p>
              <input
                type="name"
                name="name"
                placeholder="Name"
                value={agentData.name}
                className="w-full mt-4 outline-none placeholder-black text-black border-b-2 border-black mobile-input"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={agentData.email}
                className="w-full mt-4 outline-none placeholder-black text-black border-b-2 border-black mobile-input"
              />
              <input
                type="mobile"
                name="mobile"
                placeholder="Mobile"
                value={agentData.mobile}
                className="w-full mt-4 outline-none placeholder-black text-black border-b-2 border-black mobile-input"
              />
            </div>
          </div>
          <div className="mx-auto mt-3">
            <div className="font-bold text-lg ">
              <p>Property Status</p>
            </div>
            <div className="flex flex-col md:flex-row items-center p-2 space-y-2 md:space-x-2 md:space-y-0">
              <div className="flex flex-col items-center flex-1 rounded-lg bg-gray-100 px-3 py-3 md:mr-2 md:ml-0">
                <p className="text-sm font-medium text-gray-500">
                  Total Listing
                </p>
                <p className="text-3xl font-medium text-gray-600">
                  {" "}
                  {agentData.postProperty && agentData.postProperty.length}
                </p>
              </div>
              <div className="flex flex-col items-center flex-1 rounded-lg bg-gray-100 px-3 py-2 md:mr-2 md:ml-0">
                <p className="text-sm font-medium text-gray-500">
                  Sell <br/> Property
                </p>
                <p className="text-3xl font-medium text-gray-600">
                  {" "}
                  {filteredRentProperties.length}
                </p>
              </div>
              <div className="flex flex-col items-center flex-1 rounded-lg bg-gray-100 px-3 py-2 md:mr-2 md:ml-0">
                <p className="text-sm font-medium text-gray-500">
                  Rent Property
                </p>
                <p className="text-3xl font-medium text-gray-600">
                  {" "}
                  {filteredSellProperties.length}
                </p>
              </div>
            </div>
            <div className="d-flex flex-col md:flex-row w-full mt-3">
              <Link
                to={"/postproperty"}
                className="bg-red-600 md:w-1/2 w-full text-white text-md py-2 rounded-md md:mr-2 mb-2 md:mb-0"
              >
                Post Property
              </Link>
              <button className="bg-red-600 md:w-1/2 w-full text-white text-md py-2 rounded-md  mb-2 md:mb-0">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr className="mx-10" />

      <div>
        <h2 class="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
          All Your Listing Property on 100acress Are Up-To-Date
        </h2>
      </div>

      <div className="flex flex-wrap justify-center px-4 py-4">
        {agentData.postProperty &&
          agentData.postProperty.map((item, index) => {
            const userId = item._id;
            const id =item._id;
            return (
              <div className="w-full md:w-1/3 mb-4" key={index}>
                {" "}
                <div className="flex w-full px-2">
                  <div className="w-full max-w-full md:max-w-3xl overflow-hidden rounded-lg shadow-lg md:flex">
                    <div
                      className="w-full h-32  xl:h-50 lg:h-36 md:h-30 sm:h-32 md:w-2/5 rounded-l-lg bg-cover bg-center text-white"
                      style={{
                        backgroundImage:
                          item.frontImage && item.frontImage.url
                            ? `url(${item.frontImage.url})`
                            : null,
                      }}
                    />
                    <div className="w-full md:w-3/5 ml-0 md:ml-4">
                      <div className="py-3 md:py-5 px-2">
                        <p className="text-md font-medium text-gray-800 mb-0">
                          {item.propertyName}
                        </p>
                        <p className="mb-0 text-gray-500 text-sm">
                          {item.city}, {item.state}
                        </p>
                        <div className="flex">
                          <div className="d-flex mt-1">
                            <Link to={`/useredit/${id}`}>
                              <button className="bg-green-600 px-3 text-white py-1 rounded-md mr-2">
                              Edit
                            </button>
                            </Link>
                            
                            <button
                              onClick={() => {
                                handleDeleteUser(userId);
                                localStorage.setItem("user", userId);
                              }}
                              className="bg-red-600 text-white px-2 py-1 rounded-md mr-2"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <Footer />
    </div>
  );
};

export default UserDashBoard;
