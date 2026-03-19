import React, { useEffect, useState} from "react";
import Footer from "../Components/Actual_Components/Footer";
import { Helmet } from "react-helmet";
import CommonProject from "../Utils/CommonProject";
import ProjectSearching from "./ProjectSearching";
import {  useSelector } from "react-redux";
import Api_Service from "../Redux/utils/Api_Service";
import { staticData } from "../ProjectTypes/config/staticData";

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

  const newLaunchData = staticData.status.newlaunch;

  return (
    <div>
      {/* <NewLaunchSearch /> */}
      <Helmet>
        <title>{newLaunchData.metaTitle}</title>
        <meta name="description" content={newLaunchData.description} />
        <meta name="keywords" content={newLaunchData.keywords} />
        <link rel="canonical" href={newLaunchData.canonical} />
      </Helmet>
      <div className="mt-auto">
      <div className="max-w-screen pt-2 sm:pt-2 md:pt-2" target="_top">
        <h1 className=" p-1 text-center text-2xl mt-4 sm:text-xl md:text-2xl lg:text-3xl text-red-600 font-bold  tracking-[0.1em]">
          {newLaunchData.title}
        </h1> 

        <h2 className="text-sm text-justify mb-4  sm:text-xl md:text-xl lg:text-sm font-normal lg:mx-20 md:mx-10 mx-5 sm:mx-4 tracking-[0.1em]">
          {newLaunchData.heroSubtitle}
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
