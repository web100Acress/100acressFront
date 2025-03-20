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
  const [filteredProjectsParent, setFilteredProjectsParent] = useState([]);
  const underConstruction = useSelector(store => store?.allsectiondata?.underconstruction);

  useEffect(()=>{
      getAllProjects(query,0);
    },[])

  return (
    <div>
      <Helmet>
        <title>
          Property in UnderConstruction - Flats, Villas, House in gurugram.
        </title>
        <meta
          name="description"
          content="Real Estate Properties in New Panipat- Get Details for Residential &amp; Commercial Properties"
        />
      </Helmet>
      <div className="mt-16">
        <ProjectSearching setFilteredProjectsParent={setFilteredProjectsParent}/>
      </div>
        {filteredProjectsParent.length === 0 &&
        <CommonProject
        data={underConstruction}
        animation="fade-up"
        />}
      <Footer />
    </div>
  );
};

export default UnderConstruction;