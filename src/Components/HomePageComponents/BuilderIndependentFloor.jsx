import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import CommonInside from "../../Utils/CommonInside";
import { useSelector } from "react-redux";
import Api_Service from "../../Redux/utils/Api_Service";

const BuilderIndependentFloor = () => {
  let query = "builderindepedentfloor";
  const {getAllProjects} = Api_Service();

  const BuilderIndependentFloor =useSelector(store => store?.allsectiondata?.builderindependentfloor);
    useEffect(()=>{
      getAllProjects(query,0);
    },[])
  return (
    <div>
      <Helmet>
        <title>
          Builder Floor in Gurgaon | Independent Floor | 10acress.com
        </title>
        <meta
          name="description"
          content="Explore premium builder floors in Gurgaon. Find your dream independent floor at 100acress.com. Browse now for exclusive listings on your trusted site!"
        />

        <link
          rel="canonical"
          href="https://www.100acress.com/projects/independentfloors/"
        />
      </Helmet>
     
      <CommonInside
      title="Independent & Builder Floors in Gurugram"
      details="Property is an important part of our lives, if we need a home, we look
          for Residential Property in Gurgaon. Owning a home comes with a slew
          of additional responsibilities, such as finding the assets in the best
          location, proximity to amenities, accessibility, pricing, and other
          financial services, security, proximity to education systems,
          hospitality services, and soon."
      Actualdata={BuilderIndependentFloor}

      />

    </div>
  );
};

export default BuilderIndependentFloor;
