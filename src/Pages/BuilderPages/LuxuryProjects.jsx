import React, {  useEffect } from "react";
import CommonInside from "../../Utils/CommonInside";
import { useSelector } from "react-redux";
import Api_Service from "../../Redux/utils/Api_Service";


const LuxuryProject = () => {
  let query = "luxury";

  const LuxuryProjects = useSelector(store => store?.allsectiondata?.luxuryAll);
  const {getAllProjects} = Api_Service();
 useEffect(()=>{
    getAllProjects(query,0);
  },[])
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
