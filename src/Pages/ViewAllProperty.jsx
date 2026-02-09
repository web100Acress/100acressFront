import React from "react";
import showToast from "../Utils/toastUtils";

const ViewAllProperty = ({ category, title, imageSrc, tags }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      showToast.error('Please enter a search term');
      return;
    }
    showToast.loading('Searching properties...', { id: 'searchProperties' });
    // Simulate search - replace with actual search logic
    setTimeout(() => {
      showToast.success('Search completed!', { id: 'searchProperties' });
    }, 1000);
  };

  return (
    <div>
      <p className="text-center font-semibold lg:text-3xl sm:text-xl pt-4 text-black ">
        View All Properties
      </p>
      <div className="flex items-center justify-center ">
        <div className="border-b-red-600 focus-within:border-none focus-within:ring focus-within:ring-offset-2 my-10 flex h-10 items-center justify-start border-b-2 bg-gray-100 leading-4 ring-red-600 sm:w-96">
          <input
            placeholder="Search For Your Property"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="peer ml-2 flex-grow bg-transparent text-gray-500 outline-none"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="peer-focus:mr-2 z-20 cursor-pointer text-red-600 outline-none duration-150 hover:scale-125"
          >
            <svg className="h-6 w-6 stroke-2" viewBox="0 0 32 32" fill="none">
              <circle
                cx="15"
                cy="14"
                r="8"
                stroke="currentColor"
                fill="transparent"
              ></circle>
              <line
                x1="21.1514"
                y1="19.7929"
                x2="26.707"
                y2="25.3484"
                stroke="currentColor"
                fill="transparent"
              ></line>
            </svg>
          </button>
        </div>
      </div>
      {/* 
      <section className="">
  <div className="mx-auto grid max-w-screen-lg grid-cols-1 gap-5  sm:grid-cols-2 md:grid-cols-3 lg:gap-10">
    <article className="h-90 col-span-1 m-auto min-h-full cursor-pointer overflow-hidden rounded-lg pb-2 shadow-lg transition-transform duration-200 hover:translate-y-2">
      <a href="#" className="block h-full w-full">
        <img
          className="max-h-40 w-full object-cover"
          alt="featured image"
          src="https://images.unsplash.com/photo-1605146768851-eda79da39897?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGNhbmFkYSUyMGhvdXNlfGVufDB8fDB8fHww"
        />
        <div className="w-full bg-white p-4">
          <p className="text-md font-medium text-indigo-500">Nature</p>
          <p className="mb-2 text-xl font-medium text-gray-800">
            A Visit to Mount Abignale
          </p>
          <p className="text-md font-light text-gray-400">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse vel
            neque ipsam?
          </p>
          <div className="justify-starts mt-4 flex flex-wrap items-center">
            <div className="mr-2 mt-1 rounded-2xl bg-blue-100 py-1.5 px-4 text-xs text-gray-600">
              #js
            </div>
            <div className="mr-2 mt-1 rounded-2xl bg-blue-100 py-1.5 px-4 text-xs text-gray-600">
              #icefactory
            </div>
          </div>
        </div>
      </a>
    </article>
    <article className="h-90 col-span-1 m-auto min-h-full cursor-pointer overflow-hidden rounded-lg pb-2 shadow-lg transition-transform duration-200 hover:translate-y-2">
      <a href="#" className="block h-full w-full">
        <img
          className="max-h-40 w-full object-cover"
          alt="featured image"
          src="https://images.unsplash.com/photo-1577915589428-13e8f1d5c552?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNhbmFkYSUyMGhvdXNlfGVufDB8fDB8fHww"
        />
        <div className="w-full bg-white p-4">
          <p className="text-md font-medium text-indigo-500">Gardening</p>
          <p className="mb-2 text-xl font-medium text-gray-800">
            Sunflowers are my favorite
          </p>
          <p className="text-md font-light text-gray-400">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse vel
            neque ipsam?
          </p>
          <div className="justify-starts mt-4 flex flex-wrap items-center">
            <div className="mr-2 mt-1 rounded-2xl bg-blue-100 py-1.5 px-4 text-xs text-gray-600">
              #js
            </div>
            <div className="mr-2 mt-1 rounded-2xl bg-blue-100 py-1.5 px-4 text-xs text-gray-600">
              #icefactory
            </div>
          </div>
        </div>
      </a>
    </article>
    <article className="h-90 col-span-1 m-auto min-h-full cursor-pointer overflow-hidden rounded-lg pb-2 shadow-lg transition-transform duration-200 hover:translate-y-2">
      <a href="#" className="block h-full w-full">
        <img
          className="max-h-40 w-full object-cover"
          alt="featured image"
          src="https://images.unsplash.com/photo-1577915589400-f00cebf8993c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FuYWRhJTIwaG91c2V8ZW58MHx8MHx8fDA%3D"
        />
        <div className="w-full bg-white p-4">
          <p className="text-md font-medium text-indigo-500">Coding</p>
          <p className="mb-2 text-xl font-medium text-gray-800">
            Getting to know the Ice Factory Pattern
          </p>
          <p className="text-md font-light text-gray-400">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse vel
            neque ipsam?
          </p>
          <div className="justify-starts mt-4 flex flex-wrap items-center">
            <div className="mr-2 mt-1 rounded-2xl bg-blue-100 py-1.5 px-4 text-xs text-gray-600">
              #js
            </div>
            <div className="mr-2 mt-1 rounded-2xl bg-blue-100 py-1.5 px-4 text-xs text-gray-600">
              #icefactory
            </div>
          </div>
        </div>
      </a>
    </article>
  </div>
</section> */}

      {/* <div className="flex mx-20 gap-4">
           <div className="w-1/2 h-60 shadow-xl rounded-xl flex ">
               <div className="object-fit w-[350px] ">
                  <img className="h-60 rounded-l-xl" src="https://images.unsplash.com/photo-1577915589428-13e8f1d5c552?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNhbmFkYSUyMGhvdXNlfGVufDB8fDB8fHww"/>
               </div>
               <div className="mx-4">
                <strong className="text-center font-semibold text-black text-xl ">East View Garden</strong>
                <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-[172px]">View All Details</button>
               </div>
              
           </div>

           <div className="w-1/2 h-60 shadow-xl rounded-xl flex">
           <div className="object-fit w-[350px]">
                  <img className="h-60 rounded-l-xl" src="https://images.unsplash.com/photo-1605146768851-eda79da39897?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGNhbmFkYSUyMGhvdXNlfGVufDB8fDB8fHww"/>
               </div>
               <div className="mx-4">
                <strong className="text-center font-semibold text-black text-xl ">East View Garden</strong>
                <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-[172px]">View All Details</button>
               </div>
               
           </div>
     </div> */}

      <div className="flex flex-wrap justify-center items-center  gap-4">
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4  mb-4 border-2 border-red-600 ">
          <div className="w-full h-64   ">
            <div className="object-fit  ">
              <img
                className="h-64 w-90 "
                src="https://images.unsplash.com/photo-1577915589428-13e8f1d5c552?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNhbmFkYSUyMGhvdXNlfGVufDB8fDB8fHww"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 border-2 border-red-600 ">
          <div className="h-64 w-90 ">
          <div className="object-fit  ">
              <img
                className="h-64"
                src="https://images.unsplash.com/photo-1605146768851-eda79da39897?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGNhbmFkYSUyMGhvdXNlfGVufDB8fDB8fHww"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4  mb-4 border-2 border-red-600">
          <div className="h-64 w-90 ">
          <div className="object-fit  ">
              <img
                className="h-64"
                src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fGNhbmFkYSUyMGhvdXNlfGVufDB8fDB8fHww"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>



    </div>
  );
};

export default ViewAllProperty;
