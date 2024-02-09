import React, { useState, useEffect } from "react";
import Nav from "../aadharhomes/Nav";
import Footer from "../Components/Actual_Components/Footer";
import axios from "axios";
import { Link } from "react-router-dom";

const UserViewProperty = () => {

  const [userViewProperty, setUserViewProperty] = useState([]);
   const userId =  localStorage.getItem("mySellerId");
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.100acress.com/postPerson/propertyView/${userId}`
        );
        setUserViewProperty(res.data.data.postProperty);
  
      } catch (error) {
        console.log(error.res || error);
      }
    };

    fetchData();
  }, []);
  

  return (
    <div style={{ overflowX: "hidden" }}>
      <Nav />
      <section className="flex flex-col bg-white ">
        <div className="grid max-w-md grid-cols-1 p-4  sm:max-w-lg  md:max-w-screen-xl md:grid-cols-2 md:px-10 lg:grid-cols-4 sm:gap-2 lg:gap-4">
          {userViewProperty.map((item, index) => {
            return (
              <Link>
                <article
                  key={index}
                  className="mb-4  overflow-hidden rounded-xl  border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
                >
                  {item && item.frontImage && (
                    <div>
                      <img
                        src={item.frontImage.url}
                        alt="image"
                        className="w-full h-48 object-fit"
                      />
                    </div>
                  )}

                  <div className="p-4">
                    <div className="pb-2">
                      <a className="text-lg font-semibold hover:text-red-600  duration-500 ease-in-out">
                        {item.projectName}
                      </a>
                      <br />
                      <a className="text-sm hover:text-red-600  duration-500 ease-in-out">
                        {item.city}
                      </a>
                    </div>
                    <ul className="m-0 flex list-none items-center justify-between px-0 pt-6 pb-0">
                      <li className="text-left">
                        <span className="text-sm font-extrabold text-black">
                          {item.state}
                        </span>
                      </li>

                      <li className="text-left">
                        <button
                          type="button"
                          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 py-2  text-center me-2"
                        >
                          View Details
                        </button>
                      </li>
                    </ul>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UserViewProperty;
