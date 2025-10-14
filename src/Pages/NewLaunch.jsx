import React, { useEffect, useState} from "react";
import Footer from "../Components/Actual_Components/Footer";
import { Helmet } from "react-helmet";
import CommonProject from "../Utils/CommonProject";
import ProjectSearching from "./ProjectSearching";
import {  useSelector } from "react-redux";
import Api_Service from "../Redux/utils/Api_Service";

const NewLaunch = () => {

  let query = "newlaunch";
  const {getAllProjects} = Api_Service();
  const newLaunch = useSelector(store => store?.allsectiondata?.newlaunch);
  const [filtereddata,setFilteredData] = useState([]);
  const [datafromsearch,setDatafromsearch] = useState({});
  function handleDatafromSearch(data){
    setFilteredData(data);
  };

  useEffect(()=>{
    getAllProjects(query,0);
  },[]);

  useEffect(()=>{
    setDatafromsearch({ newLaunch });
  },[newLaunch])

  return (
    <div>
      {/* <NewLaunchSearch /> */}
      <Helmet>
        <title>
          Projects in New Launch - Flats, Villas, House in gurugram.
        </title>
        <meta
          name="description"
          content="Real Estate Properties in New Panipat- Get Details for Residential &amp; Commercial Properties"
        />
        <link rel="canonical" href="https://www.100acress.com/new-launch-projects-in-gurgaon/" />
      </Helmet>
      <div className="mt-auto">
      <div className="max-w-screen pt-2 sm:pt-2 md:pt-2" target="_top">
        <h1 className=" p-1 text-center text-2xl mt-4 sm:text-xl md:text-2xl lg:text-3xl text-red-600 font-bold  tracking-[0.1em]">
          New Launch Projects in Gurgaon
        </h1> 

        <h2 className="text-sm text-justify mb-4  sm:text-xl md:text-xl lg:text-sm font-normal lg:mx-20 md:mx-10 mx-5 sm:mx-4 tracking-[0.1em]">
        New Launch Properties in Gurgaon include commercial and residential
          projects that will meet various requirements. These developments are
          equipped with modern amenities, great places close to business areas,
          as well as extensive green spaces. They're designed to meet the
          ever-changing demands of urban dwellers who want peace, convenience,
          and a vibrant lifestyle.
        </h2>
      </div>
        <ProjectSearching searchdata={newLaunch} sendDatatoparent={handleDatafromSearch}/>
 
        <CommonProject
        data={filtereddata.length === 0 ? datafromsearch?.newLaunch : filtereddata}
        animation="fade-up"
        />
        </div>
      <Footer />
    </div>
  );
};

export default NewLaunch;
