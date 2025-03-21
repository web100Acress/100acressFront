import React, { useContext, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import { DataContext } from "../MyContext";
import { Helmet } from "react-helmet";
import Footer from "../Components/Actual_Components/Footer";
import ProjectSearching from "./ProjectSearching";
import CommonProject from "../Utils/CommonProject";

const ReadyToMoveProject = () => {
  const { readyToMoveData } = useContext(DataContext);
  const [filteredProjectsParent, setFilteredProjectsParent] = useState([]);
  return (
    <div style={{ overflowX: "hidden" }} className="mt-auto">
            <div className="max-w-screen pt-2 sm:pt-2 md:pt-2" target="_top">
        <h1 className=" p-1 text-center text-2xl mt-16 sm:text-xl md:text-2xl lg:text-3xl text-red-600 font-bold ">
        Ready To Move Projects in Gurgaon
        </h1> 

        <h2 className="text-sm text-justify mb-4  sm:text-xl md:text-xl lg:text-sm font-normal lg:mx-20 md:mx-10 mx-5 sm:mx-4">
        Ready-to-move properties Perfect for buyers seeking immediate possession
         without delays in construction or finishing. These properties allow 
         future homeowners to inspect and move in fast at purchase. 
         Ready-to-move properties guarantee quality construction, verified legal
          licenses, no waiting period, and immediate availability for occupancy 
          or rental income.
        </h2>
      </div>
      <ProjectSearching setFilteredProjectsParent={setFilteredProjectsParent}/>
      <Helmet>
        <meta
          name="description"
          content="Find the best ready-to-move properties in Gurugram. Discover homes ready for immediate possession."
        />
        <meta property="og:title" content="Discover Ready-to-Move Homes in Gurugram | 100acress" />
        <meta property="og:site_name" content="100acress" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/logo.webp" />
        <meta property="og:url" content="https://www.100acress.com/projects-in-gurugram/property-ready-to-move//" />
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
          href="https://www.100acress.com/projects-in-gurugram/ready-to-move/property/"
        />
      </Helmet>
          {filteredProjectsParent.length === 0 &&
          <CommonProject
          data={readyToMoveData}
          animation="fade-up"
          />}

      <Footer />
    </div>
  );
};

export default ReadyToMoveProject;
