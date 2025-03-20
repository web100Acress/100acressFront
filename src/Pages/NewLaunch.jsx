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
      <div className="mt-16">
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
