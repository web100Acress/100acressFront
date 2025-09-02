import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SuggestedProjects = () => {
  // Top 8 projects data
  const topProjects = [
    {
      id: 1,
      title: "Luxury Apartments in Gurugram",
      location: "Sector 65, Gurugram",
      price: "₹1.2 Cr - ₹2.5 Cr",
      image:
        "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/uploads/1735897666267-ban.jpg",
      url: "/projects/luxury-apartments-gurugram",
    },
    {
      id: 2,
      title: "Premium Villas in Sohna Road",
      location: "Sohna Road, Gurugram",
      price: "₹2.5 Cr - ₹5 Cr",
      image:
        "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/uploads/1741245723440-thumbnail.jpg",
      url: "/projects/premium-villas-sohna",
    },
    {
      id: 3,
      title: "Affordable Housing Dwarka Expressway",
      location: "Dwarka Expressway",
      price: "₹75 L - ₹1.2 Cr",
      image:
        "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/thumbnails/1740914828774-100acre/project/axam5uv3telszz9uyaqa",
      url: "/projects/affordable-housing-dwarka",
    },
    {
      id: 4,
      title: "Luxury Floors Golf Course Road",
      location: "Golf Course Road, Gurugram",
      price: "₹3 Cr - ₹6 Cr",
      image:
        "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/thumbnails/1740914828774-100acre/project/axam5uv3telszz9uyaqa",
      url: "/projects/luxury-floors-golf-course",
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Suggested Properties For You
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Explore our handpicked selection of premium properties
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {topProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Link
                to={project.url}
                className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    src={project.image}
                    alt={project.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div>
                      <p className="text-white font-semibold">{project.price}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {project.location}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link
            to="/all-projects"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
          >
            View All Projects
            <svg
              className="ml-2 -mr-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default SuggestedProjects;
