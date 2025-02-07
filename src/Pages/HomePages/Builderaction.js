import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

function SpacesAvailable() {
  useEffect(() => { AOS.init(); }, []);

  const projects = [
    {
      title: "Adani Realty",
      link:"developers/adani-realty",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/builder/adanireality.webp",
      backgroungURL: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/builder/adaniprojectimage.jpg"
    },
    { 
      title: "M3M India", 
      link: "/developers/m3m-india/", 
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/builder/m3m.webp", 
      backgroungURL: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/builder/m3mbuilderimage.jpg"
    },
    { 
      title: "Central Park", 
      link: "/developers/central-park/", 
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/builder/centralpark.jpg" ,
      backgroungURL: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/builder/centralparkprojct.jpg"
    }
  ];

  return (
    <div data-aos="flip-up" className="px-4" style={{ boxShadow: "0px 0px 0px 0px #0000001a" }}>
      <div className="flex items-center">
        <h1 className="text-3xl xl:text-4xl lg:text-3xl md:text-2xl sm:text-left px-10 pt-4">
          Recommended Builders
        </h1>
      </div> 
    
      <div className="grid  lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 mx-0 gap-3 pb-2 pt-3">
        {projects.map((project, index) => (
        <Link
        to={project.link}
        data-aos="flip-right"
        key={index}
        className="flex items-center gap-1 p-2 rounded-lg shadow-sm relative bg-cover bg-center"
        style={{
          backgroundImage: `url(${project.backgroungURL})`,
        }}
      >
        <div className="absolute inset-0 bg-black/30 rounded-lg"></div>
      
        <div className="relative w-24 h-24 flex items-center justify-center overflow-hidden rounded-full ml-[9rem] border-2 border-gray-200">
          <img
            src={project.image}
            alt="Inside Hole"
            className="absolute w-20 h-20 bg-white border border-black shadow-sm object-contain rounded-full"
          />
        </div>
      
        {/* Text Content */}
        {/* <div className="relative z-10 ml-[4rem]" >
          <h3 className="text-lg font-semibold text-white">{project.title}</h3>
        </div> */}
      </Link>
      
        ))}
      </div>
    </div>
  );
}

export default SpacesAvailable;
