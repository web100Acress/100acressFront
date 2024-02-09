// import React, { useEffect, useState } from "react";
// import { Box, HStack, Input, Center, Divider, Select } from "@chakra-ui/react";
// import { SearchIcon } from "@chakra-ui/icons";

// function Search() {
//   const [isSmallScreen, setIsSmallScreen] = useState();

//   useEffect(() => {
//     const handleResize = () => {
//       setIsSmallScreen(window.innerWidth >= 480);
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <Box bg="white" p={{ base: 4, sm: 2 }} borderRadius="20px" width="full">
//       <HStack
//         alignItems="center"
//         className="HSTACK"
//         justifyContent={isSmallScreen ? "space-around" : "flex-start"}
//       >
//         {isSmallScreen && (
//           <Select color="#7480a0" w="150px" variant="ghost">
//             <option value="Residential">Residential</option>
//             <option value="Commercial">Commercial</option>
//           </Select>
//         )}
//         <Center position="relative">
//           <Input
//             variant="unstyled"
//             placeholder="Enter your query"
//             w={isSmallScreen ? "calc(100% - 20px)" : "150px"}
//             pr={isSmallScreen ? "2.5rem" : "2px"}
//           />
//           {isSmallScreen && (
//             <Box
//               p="3"
//               bg="red"
//               position="absolute"
//               right="0"
//               top="50%"
//               transform="translateY(-50%)"
//               borderRadius="20px"
//               cursor="pointer"
//             >
//               <SearchIcon color="white" />
//             </Box>
//           )}
//         </Center>
//         {isSmallScreen && (
//           <>
//             <Divider orientation="vertical" m={3} h={6} borderColor="gray.300" />
//             <Center>
//               <Input
//                 variant="unstyled"
//                 placeholder="Enter location"
//                 w="full"
//                 style={{ margin: "0 10px" }}
//               />
//             </Center>
//           </>
//         )}
//       </HStack>
//     </Box>
//   );
// }

// export default Search;

import React, { useState } from "react";
import { Link } from "react-router-dom";
const Search = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    location: "",
    query: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="w-70 bg-white border-white border-t-none lg:h-14 md:h-10 sm:h-8 rounded-lg lg:rounded-2xl md:rounded-xl sm:rounded-lg  px-2 lg:px-4 md:px-3 sm:px-2  ">
        <div className="flex items-center xl:h-14 lg:h-14 md:h-10 sm:h-8">
          <button
            type="button"
            onClick={toggleDropdown}
            className=" mt-1 lg:mt-3 md:mt-3 sm:mt-2 ml-4  text-left rounded-md text-sm font-medium text-gray-500 focus:outline-none hidden lg:flex md:flex sm:hidden"
          >
            <span className="w-30 ">Residential</span>

            <svg
              className="ml-4 h-5 w-5 text-red-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6.293 7.293a1 1 0 011.414 0l3.293 3.293 3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414 1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <div className="w-60 mt-1 lg:mt-3 md:mt-3 sm:mt-2 ml-2 lg:ml-8 md:ml-6 sm:ml-4 lg:w-60 md:w-60 sm:w-70 outline-none ">
            <input
            className="outline-none"
              type="text"
              name="query"
              placeholder="Enter Your Query"
              value={formData.query}
              onChange={handleInputChange}
            />
          </div>

      

          <div className="w-60 mt-1 lg:mt-3 md:mt-3 sm:mt-2 ml-6 hidden lg:block md:block sm:hidden ">
            <input
            className="outline-none"
              type="text"
              name="location"
              placeholder="Enter Your Location"
              value={formData.location}
              onChange={handleInputChange}
            />
            {/* You can use the 'location' state for further processing or sending it to other components */}
          </div>

          <div className="ml-2  my-1 mt-1 lg:mt-3 md:mt-3 sm:mt-2  lg:ml-20 md:ml-12 sm:ml-2 ">
            <Link
              to={{
                pathname: `/searchdata/${encodeURIComponent(
                  JSON.stringify(formData)
                )}`,
                state: formData,
              }}
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500">
                <i className="fas fa-search text-white "></i>
              </div>
            </Link>
          </div>
        </div>
        {isOpen && (
          <div className="mt-[-10] w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-0">
              <a
                href=""
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Residential
              </a>
              <a
                href=""
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Commercial
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
