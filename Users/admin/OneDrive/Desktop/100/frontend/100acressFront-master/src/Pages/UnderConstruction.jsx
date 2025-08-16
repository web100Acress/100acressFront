import React, {useEffect, useState } from "react";
import Footer from "../Components/Actual_Components/Footer";
import { Helmet } from "react-helmet";
import ProjectSearching from "./ProjectSearching";
import CommonProject from "../Utils/CommonProject";
import { useSelector } from "react-redux";
import Api_Service from "../Redux/utils/Api_Service";

const UnderConstruction = () => {
  let query = "underconstruction";
  const {getAllProjects} = Api_Service();
  const underConstruction = useSelector(store => store?.allsectiondata?.underconstruction);
    const [filtereddata,setFilteredData] = useState([]);
    const [datafromsearch,setDatafromsearch] = useState({});
    function handleDatafromSearch(data){
      setFilteredData(data);
    };

  useEffect(()=>{
      getAllProjects(query,0);
    },[]);


      useEffect(()=>{
        setDatafromsearch({ underConstruction });
      },[underConstruction])

  return (
    <div>
      <div className="max-w-screen pt-2 sm:pt-2 md:pt-2" target="_top">
        <h1 className=" p-1 text-center text-2xl mt-16 sm:text-xl md:text-2xl lg:text-3xl text-red-600 font-bold tracking-[0.1em]">
        Under Construction Projects in Gurgaon
        </h1> 

        <h2 className="text-sm text-justify mb-4  sm:text-xl md:text-xl lg:text-sm font-normal lg:mx-20 md:mx-10 mx-5 sm:mx-4 tracking-[0.1em]">
        Under Construction Properties in Gurgaon include commercial and residential
          projects that will meet various requirements. These developments are
          equipped with modern amenities, great places close to business areas,
          as well as extensive green spaces. They're designed to meet the
          ever-changing demands of urban dwellers who want peace, convenience,
          and a vibrant lifestyle.
        </h2>
      </div>
      <Helmet>
        <title>
          Property in UnderConstruction - Flats, Villas, House in gurugram.
        </title>
        <meta
          name="description"
          content="Real Estate Properties in New Panipat- Get Details for Residential &amp; Commercial Properties"
        />
        <link rel="canonical" href="https://www.100acress.com/under-construction-projects-in-gurgaon/" />
      </Helmet>
      <div className="mt-auto">
        <ProjectSearching searchdata={underConstruction} sendDatatoparent={handleDatafromSearch}/>
      </div>
        <CommonProject
        data={filtereddata.length === 0 ? datafromsearch?.underConstruction : filtereddata}
        animation="fade-up"
        />
      <Footer />
    </div>
  );
};

export default UnderConstruction;