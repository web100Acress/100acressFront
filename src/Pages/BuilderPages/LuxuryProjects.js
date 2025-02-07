import React, { useContext } from "react";
import { DataContext } from "../../MyContext";
import CommonInside from "../../Utils/CommonInside";

const LuxuryProject = () => {
  const { LuxuryProjects, } = useContext(DataContext);
  return (
    <div>
      <CommonInside
        title="Luxury Projects for You"
        Actualdata={LuxuryProjects}
        HelmetTitle="Luxury Projects in Gurugram – Ultra luxury Homes"
        metaContent="Luxury Projects are renowned for ideal locations, impeccable quality of construction, desirable amenities and reasonable prices"
        linkhref="https://www.100acress.com/top-luxury-projects/"
      />
    </div>
  );
};

export default LuxuryProject;
