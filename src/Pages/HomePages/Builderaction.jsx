import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Builderaction = () => {

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });
  }, []);

  const projects = [
    {
      title: "Emaar India",
      link: "/developers/emaar-india/",
      image: "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/signature.webp",
      backgroungURL: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/spaces/1e42f7ec-f7a8-4026-80c2-e340265abe4d.webp",
      // subtitle: "Global Standards",
      rating: 4.9,
      fetchpriority: "high",
      projects: 22
    },
    {
      title: "Adani Realty",
      link: "developers/adani-realty/",
      image: "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/adanireality.webp",
      backgroungURL: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/spaces/adc797c8-6b67-475d-a585-4f27c00e113d.webp",
      // subtitle: "Premium",
      fetchpriority: "high",
      rating: 4.8,
      projects: 15
    },
    {
      title: "Elan Group",
      link: "/developers/elan-group/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/uploads/1757160649396-download.jpeg",
      backgroungURL: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/spaces/c1d3f8e5-b322-4d0c-b753-1a8110fb731e.webp",
      // subtitle: "Affordable Luxury",
      rating: 4.5,
      projects: 18,
      fetchpriority: "high",
    },


    {
      title: "Experion Developers",
      link: "/developers/experion-developers/",
      image: "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/experion.webp",
      backgroungURL: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/spaces/20d33f41-23e6-456e-b684-4efcb81d4ed7.webp",
      // subtitle: "Smart Homes",
      rating: 4.6,
      fetchpriority: "high",
      projects: 12,
    },
    {
      title: "Signature Global",
      link: "/developers/signature-global/",
      image: "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/signature.webp",
      backgroungURL: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/spaces/2b60d387-e402-4a57-b61d-dd759200da77.webp",
      // subtitle: "Affordable Luxury",
      rating: 4.5,
      fetchpriority: "high",
      projects: 18,
    },
    {
      title: "M3M India",
      link: "/developers/m3m-india/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/spaces/7449f81f-7d27-4178-abe9-bc9a4fce8f87.webp",
      backgroungURL: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/spaces/7449f81f-7d27-4178-abe9-bc9a4fce8f87.webp",
      // subtitle: "Luxury Living",
      rating: 4.7,
      fetchpriority: "high",
      projects: 28
    }

  ];

  return (
    <div className="py-3 sm:py-5 lg:py-6 bg-gradient-to-br to-red-50/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Enhanced Header Section */}
        <div
          className="text-center mb-3 sm:mb-4"
          data-aos="fade-up"
        >
          {/* <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl mb-1">
            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div> */}

          <div className="flex flex-col items-center mb-4 sm:mb-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                Best Residential and Commercial Properties for You
              </span>
            </h2>
            <div className="h-1.5 w-32 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
          </div>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-1">
            Explore verified properties, affordable homes, ready-to-move flats, under-construction apartments, and new residential projects from leading builders in India.
          </p>

          {/* Stats Bar */}
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500 mt-1">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Trusted Developers
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Quality Assured
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Fast Delivery
            </div>
          </div>
        </div>

        {/* Enhanced Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 -ml-6">
          {projects.map((project, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="group"
            >
              <Link
                to={project.link}
                className="block bg-white rounded-3xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2 overflow-hidden border border-gray-100 group-hover:border-red-200"
              >
                {/* Image Container with Overlay */}
                <div className="relative h-44 sm:h-48 overflow-hidden rounded-t-3xl">
                  <img
                    fetchpriority="high"
                    src={project.backgroungURL}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Badges overlay at bottom */}
                  {/* <div className="absolute bottom-3 left-0 right-0 flex justify-between items-end px-4">
                  
                    <div className="bg-white/90 backdrop-blur-sm text-red-600 rounded-full px-3 py-1 text-xs font-semibold shadow-sm">
                      {project.projects}+ Projects
                    </div>

                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1 shadow-sm">
                      <span className="text-xs font-semibold text-gray-800">{project.rating}</span>
                      <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div> */}


                </div>

                {/* Content Section */}
                <div className="p-2">
                  {/* Title and Subtitle */}
                  <div className="mb-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-0 group-hover:text-red-600 transition-colors duration-300 text-center">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium text-center">
                      {project.subtitle}
                    </p>
                  </div>





                  {/* CTA Button */}
                  {/* <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-500 to-red-600 p-[1px] group-hover:from-red-600 group-hover:to-red-700 transition-all duration-300">
                    <div className="bg-gradient-to-r from-red-500 to-red-600 group-hover:from-red-600 group-hover:to-red-700 rounded-2xl px-6 py-3 text-center transition-all duration-300">
                      <div className="text-white font-semibold text-sm group-hover:scale-105 transition-transform duration-300">
                        View All Projects
                      </div>
                      
                    </div>
                  </div> */}
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-red-400 group-hover:to-red-500 transition-all duration-300 pointer-events-none"></div>
              </Link>
            </div>
          ))}
        </div>

        {/* View All Button */}
        {/* <div className="text-center mt-6 sm:mt-8" data-aos="fade-up" data-aos-delay="600">
          <Link 
            to="/developers" 
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl hover:from-orange-700 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-orange-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            View All Developers
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div> */}

        {/* Background Decorations */}
        <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-gradient-to-br from-red-100 to-red-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-gradient-to-tr from-red-100 to-red-200 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

export default Builderaction;