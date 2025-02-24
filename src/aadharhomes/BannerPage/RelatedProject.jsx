import React, { useContext } from "react";
import { DataContext } from "../../MyContext";
const RelatedProject = () => {
    const {allProjectData} = useContext(DataContext);

  return (
    <div>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full px-4 py-6">

        <div className="relative m-auto w-full max-w-sm flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
          <a
            href="#"
            className="relative flex h-48 overflow-hidden rounded-t-lg"
          >
            <img
              className="object-cover w-full"
              src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              alt="product image"
            />
            <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-sm font-medium text-white">
              39% OFF
            </span>
          </a>
          <div className="p-4">
            <a href="#">
              <h5 className="text-lg font-semibold tracking-tight text-gray-900">
                Nike Air MX Super 2500 - Red
              </h5>
            </a>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">$449</span>
            </div>
            <a
              href="#"
              className="mt-4 flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Add to cart
            </a>
          </div>
        </div>

        
      </section>
    </div>
  );
};

export default RelatedProject;
