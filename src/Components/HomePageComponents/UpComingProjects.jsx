import React, {  useEffect, useState } from "react";
import Footer from "../Actual_Components/Footer";
import CommonProject from "../../Utils/CommonProject";
import { Helmet } from "react-helmet";
import ProjectSearching from "../../Pages/ProjectSearching";
import {  useSelector } from "react-redux";
import Api_Service from "../../Redux/utils/Api_Service";
import { staticData } from "../../ProjectTypes/config/staticData";
const UpComingProjects = () => {

  let query = "allupcomingproject";
  const {getAllProjects} = Api_Service();
  const allupcomingProject = useSelector(store => store?.allsectiondata?.allupcomingproject);
  const [filtereddata,setFilteredData] = useState([]);
  const [datafromsearch,setDatafromsearch] = useState({});
  function handleDatafromSearch(data){
    setFilteredData(data);
  };

  useEffect(()=>{
    getAllProjects(query,0);
  },[])
  
  
  useEffect(()=>{
    setDatafromsearch({ allupcomingProject });
  },[allupcomingProject])

  
  const upcomingData = staticData.status.upcoming;
  
  return (
    <div>
      <Helmet>
        <title>{upcomingData.metaTitle}</title>
        <meta name="description" content={upcomingData.description} />
        <meta name="keywords" content={upcomingData.keywords} />
        <link rel="canonical" href={upcomingData.canonical} />
      </Helmet>
      <div className="max-w-screen pt-2 sm:pt-2 md:pt-2" target="_top">
        <h1 className=" p-1 text-center text-2xl mt-16 sm:text-xl md:text-2xl lg:text-3xl text-red-600 font-bold tracking-[0.1em]">
          {upcomingData.title}
        </h1> 

        <h2 className="text-sm text-justify mb-4  sm:text-xl md:text-xl lg:text-sm font-normal lg:mx-20 md:mx-10 mx-5 sm:mx-4 tracking-[0.1em]" >
          {upcomingData.heroSubtitle}
        </h2>
      </div>
        <ProjectSearching searchdata={allupcomingProject} sendDatatoparent={handleDatafromSearch}/>
        <CommonProject
        data={filtereddata.length === 0 ? datafromsearch?.allupcomingProject : filtereddata}
        animation="fade-up"
        />
      <Footer />
    </div>
  );
};

export default UpComingProjects;