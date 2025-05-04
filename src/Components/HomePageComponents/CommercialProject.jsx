import React, { useContext, useEffect } from "react";
import { DataContext } from "../../MyContext";
import { Helmet } from "react-helmet";
import CommonInside from "../../Utils/CommonInside";
import { useSelector } from "react-redux";
import Api_Service from "../../Redux/utils/Api_Service";

const CommercialProject = () => {
  // let query ="commercial";
  const {getCommercial} = Api_Service();
  const commercialProjectAll = useSelector(store => store?.project?.commercial);

  useEffect(()=>{
    getCommercial();
  },[])
  const {  } = useContext(DataContext);
  return (
    <div>
      <Helmet>
        <title>
        Explore Commercial Properties in India - 100acress
        </title>
        <meta
          name="description"
          content="Unlock growth with 100acress's commercial projects. Modern spaces, strategic locations, and excellent connectivity await. Call now!"
        />
        <meta property="og:title" content="Explore Commercial Properties in India - 100acress" />
        <meta property="og:site_name" content="100acress" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/logo.webp" />
        <meta property="og:url" content="https://www.100acress.com/projects/commercial/" />
        <meta property="og:description" content="Unlock growth with 100acress's commercial projects. Modern spaces, strategic locations, and excellent connectivity await. Call now!" />
        <meta property="og:keywords" content="Commercial Projects in Gurgaon" />

        Twitter Tags:
        <meta name="twitter:title" content="Explore Commercial Properties in India - 100acress" />
        <meta name="twitter:description" content="Unlock growth with 100acress's commercial projects. Modern spaces, strategic locations, and excellent connectivity await. Call now!" />
        <meta name="twitter:url" content="https://twitter.com/100acressdotcom" />
        <meta name="twitter:card" content="summary" />

          <link rel="canonical" href="https://www.100acress.com/projects/commercial/" />
      </Helmet>
      <CommonInside
       title="Commercial Projects"
       Actualdata={commercialProjectAll}
       details="Within the realm of commercial projects, a multitude of ventures
          emerge, spanning office complexes, retail spaces, industrial parks,
          and hospitality establishments. Each category demands distinct
          considerations in terms of location, design, zoning regulations, and
          target client."
      />
    </div>
  );
};

export default CommercialProject;
