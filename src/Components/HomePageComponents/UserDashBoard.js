import React, { useContext } from "react";
import Nav from "../../aadharhomes/Nav";
import Footer from "../Actual_Components/Footer";
import { AuthContext } from "../../AuthContext";
import { Link } from "react-router-dom";
const UserDashBoard = () => {
  const { agentData } = useContext(AuthContext);
  let filteredRentProperties = [];
  let filteredSellProperties = [];

  if (agentData && agentData.postProperty) {
    filteredRentProperties = agentData.postProperty.filter(
      (property) => property.propertyLooking === "rent"
    );
    filteredSellProperties = agentData.postProperty.filter(
      (property) => property.propertyLooking === "Sell"
    );

    console.log("Filtered rent properties:", filteredRentProperties);
    console.log("Filtered sell properties:", filteredSellProperties);
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
                className="w-full mt-2 outline-none placeholder-black text-black border-b-2 border-black mobile-input"
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
                  {agentData.postProperty && agentData.postProperty.length}
                </p>
              </div>

              <div className="flex flex-col items-center flex-1 rounded-lg bg-gray-100 px-3 py-2 md:mr-2 md:ml-0">
                <p className="text-sm font-medium text-gray-500">
                  Rent Property
                </p>
                <p className="text-3xl font-medium text-gray-600">
                  {filteredRentProperties.length}
                </p>
              </div>
              <div className="flex flex-col items-center flex-1 rounded-lg bg-gray-100 px-3 py-2 md:mr-2 md:ml-0">
                <p className="text-sm font-medium text-gray-500">
                  Sell <br /> Property
                </p>
                <p className="text-3xl font-medium text-gray-600">
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
              <div className="bg-red-600 md:w-1/2 w-full text-white text-md py-2 rounded-md  mb-2 md:mb-0">
                Delete Account
              </div>
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
            return (
              <div key={index} className="w-full md:w-1/2 mb-6 ">
                <div className="flex w-full px-4 ">
                  <div className="w-full max-w-full md:max-w-3xl overflow-hidden rounded-lg bg-white shadow-lg md:flex h-60">
                    <div
                      className=" w-full h-40 md:w-2/5 md:h-auto rounded-lg bg-cover bg-center text-white"
                      style={{
                        // backgroundImage: "url(../OtherImages/capture2.png)",
                        //  backgroundImage: `url(${item.frontImage.url})`
                        backgroundImage:
                          item.frontImage && item.frontImage.url
                            ? `url(${item.frontImage.url})`
                            : null,
                      }}
                    />
                    <div className="w-full md:w-3/5 ml-0 md:ml-4 ">
                      <div className="py-4 md:py-8 px-2">
                        <p className="text-xl font-medium text-gray-800">
                          {item.propertyName}
                        </p>
                        <p className="mb-2 text-gray-500">
                          {item.city}, {item.state}
                        </p>
                        <div className="flex">
                          <div className="d-flex mt-2">
                            <div className="bg-green-600 px-3 text-white py-1 rounded-md mr-2">
                              Edit
                            </div>
                            <div className="bg-red-600 text-white px-2 py-1 rounded-md mr-2">
                              Delete
                            </div>
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
