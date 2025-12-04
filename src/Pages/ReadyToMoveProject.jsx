import React, {useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import { Helmet } from "react-helmet";
import Footer from "../Components/Actual_Components/Footer";
import ProjectSearching from "./ProjectSearching";
import CommonProject from "../Utils/CommonProject";
import { useSelector } from "react-redux";
import Api_Service from "../Redux/utils/Api_Service";

const ReadyToMoveProject = () => {
  let query = "readytomove";
  const {getAllProjects} = Api_Service();
  const readyToMoveData = useSelector(store => store?.allsectiondata?.readytomove);
  const [filtereddata,setFilteredData] = useState([]);
  const [datafromsearch,setDatafromsearch] = useState({});
  function handleDatafromSearch(data){
    setFilteredData(data);
  };

  useEffect(()=>{
    getAllProjects(query,0);
  },[]);

  useEffect(()=>{
    setDatafromsearch({ readyToMoveData });
  },[readyToMoveData])
  return (
    <div style={{ overflowX: "hidden" }} className="mt-auto">
            <div className="max-w-screen pt-2 sm:pt-2 md:pt-2" target="_top">
        <h1 className=" p-1 text-center text-2xl mt-4 sm:text-xl md:text-2xl lg:text-3xl text-red-600 font-bold tracking-[0.1em] ">
        Ready To Move Projects in Gurgaon
        </h1> 

        <h2 className="text-sm text-justify mb-4  sm:text-xl md:text-xl lg:text-sm font-normal lg:mx-20 md:mx-10 mx-5 sm:mx-4 tracking-[0.1em]">
        Ready-to-move properties Perfect for buyers seeking immediate possession
         without delays in construction or finishing. These properties allow 
         future homeowners to inspect and move in fast at purchase. 
         Ready-to-move properties guarantee quality construction, verified legal
          licenses, no waiting period, and immediate availability for occupancy 
          or rental income.
        </h2>
      </div>
      <Helmet>
        <meta
          name="description"
          content="Find the best ready-to-move properties in Gurugram. Discover homes ready for immediate possession."
        />
        <meta property="og:title" content="Discover Ready-to-Move Homes in Gurugram | 100acress" />
        <meta property="og:site_name" content="100acress" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/logo.webp" />
        <meta property="og:url" content="https://www.100acress.com/projects/ready-to-move/" />
        <meta property="og:description" content="Find the best ready-to-move properties in Gurugram. Discover homes ready for immediate possession." />
        <meta property="og:keywords" content="Ready to Move PROPERTIES" />
        <meta name="twitter:title" content="Discover Ready-to-Move Homes in Gurugram | 100acress" />
        <meta name="twitter:description" content="Find the best ready-to-move properties in Gurugram. Discover homes ready for immediate possession." />
        <meta name="twitter:url" content="https://twitter.com/100acressdotcom" />
        <meta name="twitter:card" content="summary" />

        <title>
          Discover Ready-to-Move Homes in Gurugram | 100acress
        </title>
        <link
          rel="canonical"
          href="https://www.100acress.com/projects/ready-to-move/"
        />
      </Helmet>
      <ProjectSearching searchdata={readyToMoveData} sendDatatoparent={handleDatafromSearch}/>
          <CommonProject
          data={filtereddata.length === 0 ? datafromsearch?.readyToMoveData : filtereddata}
          animation="fade-up"
          />
      <Footer />
    </div>
  );
};

export default ReadyToMoveProject;
