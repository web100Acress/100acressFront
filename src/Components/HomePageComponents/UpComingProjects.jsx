import React, {  useEffect, useState } from "react";
import Footer from "../Actual_Components/Footer";
import CommonProject from "../../Utils/CommonProject";
import { Helmet } from "react-helmet";
import ProjectSearching from "../../Pages/ProjectSearching";
import {  useSelector } from "react-redux";
import Api_Service from "../../Redux/utils/Api_Service";
const UpComingProjects = () => {

  let query = "allupcomingproject";
  const [filteredProjectsParent,setFilteredProjectsParent] = useState([]);
  const {getAllProjects} = Api_Service();
  const allupcomingProject = useSelector(store => store?.allsectiondata?.allupcomingproject);

  useEffect(()=>{
    getAllProjects(query,0);
  },[])
  
  return (
    <div>
      <Helmet>
        <meta
          name="description"
          content="Explore best upcoming projects in Gurgaon with modern amenities. Find residential & commercial spaces customized to your lifestyle. Visit 100acress today!"
          />
        <title>
        Discover Upcoming Projects in Gurgaon - 100acress
        </title>
        <link
          rel="canonical"
          href="https://www.100acress.com/projects/upcoming-projects-in-gurgaon/"
        />
      </Helmet>
      <div className="max-w-screen pt-2 sm:pt-2 md:pt-2" target="_top">
        <h1 className=" p-1 text-center text-2xl mt-16 sm:text-xl md:text-2xl lg:text-3xl text-red-600 font-bold ">
          UpComing Projects in Gurgaon
        </h1> 

        <h2 className="text-sm text-justify mb-4  sm:text-xl md:text-xl lg:text-sm font-normal lg:mx-20 md:mx-10 mx-5 sm:mx-4">
          Upcoming Properties in Gurgaon include commercial and residential
          projects that will meet various requirements. These developments are
          equipped with modern amenities, great places close to business areas,
          as well as extensive green spaces. They're designed to meet the
          ever-changing demands of urban dwellers who want peace, convenience,
          and a vibrant lifestyle.
        </h2>
      </div>
        <ProjectSearching setFilteredProjectsParent={setFilteredProjectsParent}/>
        {filteredProjectsParent.length === 0 &&
        <CommonProject
        data={allupcomingProject}
        animation="fade-up"
        />}
      <Footer />
    </div>
  );
};

export default UpComingProjects;