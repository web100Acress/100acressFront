import React, { useEffect, useState} from "react";
import Footer from "../Components/Actual_Components/Footer";
import { Helmet } from "react-helmet";
import CommonProject from "../Utils/CommonProject";
import ProjectSearching from "./ProjectSearching";
import {  useSelector } from "react-redux";
import Api_Service from "../Redux/utils/Api_Service";

const NewLaunch = () => {

  let query = "newlaunch";
  const [filteredProjectsParent, setFilteredProjectsParent] = useState([]);
  const {getAllProjects} = Api_Service();
  const newLaunch = useSelector(store => store?.allsectiondata?.newlaunch);

  useEffect(()=>{
    getAllProjects(query,0);
  },[])

  return (
    <div>
      {/* <NewLaunchSearch /> */}
      <div className="mt-auto">
      <div className="max-w-screen pt-2 sm:pt-2 md:pt-2" target="_top">
        <h1 className=" p-1 text-center text-2xl mt-16 sm:text-xl md:text-2xl lg:text-3xl text-red-600 font-bold ">
          New Launch Projects in Gurgaon
        </h1> 

        <h2 className="text-sm text-justify mb-4  sm:text-xl md:text-xl lg:text-sm font-normal lg:mx-20 md:mx-10 mx-5 sm:mx-4">
        New Launch Properties in Gurgaon include commercial and residential
          projects that will meet various requirements. These developments are
          equipped with modern amenities, great places close to business areas,
          as well as extensive green spaces. They're designed to meet the
          ever-changing demands of urban dwellers who want peace, convenience,
          and a vibrant lifestyle.
        </h2>
      </div>
        <ProjectSearching setFilteredProjectsParent={setFilteredProjectsParent}/>
      </div>
      <Helmet>
        <title>
          Projects in New Launch - Flats, Villas, House in gurugram.
        </title>
        <meta
          name="description"
          content="Real Estate Properties in New Panipat- Get Details for Residential &amp; Commercial Properties"
        />
      </Helmet>
        {filteredProjectsParent.length === 0 &&
        <CommonProject
        data={newLaunch}
        animation="fade-up"
        />}
      <Footer />
    </div>
  );
};

export default NewLaunch;
