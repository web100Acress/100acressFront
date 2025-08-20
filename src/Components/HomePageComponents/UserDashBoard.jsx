import React, { useContext } from "react";

// import Footer from "../Actual_Components/Footer";
import { AuthContext } from "../../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import LuxuryFooter from "../Actual_Components/LuxuryFooter";


const UserDashBoard = () => {
  const navigate = useNavigate();
  const { agentData, handleDeleteUser } = useContext(AuthContext);

  const resolveUserId = () => {
    try {
      const raw = localStorage.getItem("mySellerId");
      if (raw) {
        try { return JSON.parse(raw); } catch { return raw; }
      }
      return (agentData && agentData._id) || "";
    } catch {
      return (agentData && agentData._id) || "";
    }
  };
  const goUserEdit = () => {
    const id = resolveUserId();
    if (id) navigate(`/useredit/${id}`);
    else navigate('/userdashboard/');
  };
  const canManageBlogs =
    agentData &&
    typeof agentData.role === "string" &&
    ["contentwriter", "blog"].includes(agentData.role.toLowerCase());
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
    <div className="mt-12" style={{ overflowX: "hidden" }}>
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
              {/* Single combined action button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={goUserEdit}
                  className="bg-gray-800 text-white text-sm py-2 px-4 rounded-md"
                >
                  Edit / Change Password
                </button>
              </div>
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
              {canManageBlogs && (
                <Link
                  to={"/seo/blogs"}
                  className="bg-blue-600 md:w-1/2 w-full text-white text-md py-2 rounded-md md:mr-2 mb-2 md:mb-0"
                >
                  Go to Blog Panel
                </Link>
              )}
              <Link
                to={"/postproperty/"}
                className="bg-red-600 md:w-1/2 w-full text-white text-md py-2 rounded-md md:mr-2 mb-2 md:mb-0"
              >
                Post Property
              </Link>
              <button
                onClick={() => navigate(`/userviewproperty/${resolveUserId()}`)}
                className="bg-red-600 md:w-1/2 w-full text-white text-md py-2 rounded-md  mb-2 md:mb-0"
              >
                Edit Post Properties
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr className="mx-10" />

      <LuxuryFooter />
    </div>
  );
};

export default UserDashBoard;
