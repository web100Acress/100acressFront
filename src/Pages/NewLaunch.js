import React, { useContext , useState} from "react";
import Footer from "../Components/Actual_Components/Footer";
import { DataContext } from "../MyContext";
import { Helmet } from "react-helmet";
import CommonProject from "../Utils/CommonProject.js";
import ProjectSearching from "./ProjectSearching.js";

const NewLaunch = () => {
  const { newLaunch } = useContext(DataContext);
  const [filteredProjectsParent, setFilteredProjectsParent] = useState([]);
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
