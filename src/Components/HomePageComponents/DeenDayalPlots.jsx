import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import CommonInside from "../../Utils/CommonInside";
import { useSelector } from "react-redux";
import Api_Service from "../../Redux/utils/Api_Service";

const DeenDayalPlots = () => {
  let query = "deendayalplots";
  const {getAllProjects} = Api_Service();
  const deenDayalPlots = useSelector(store => store?.allsectiondata?.deendayalplots);

  useEffect(()=>{
    getAllProjects(query,0);
  },[]);
  
  return (
    <div>
      <Helmet>
        <title>
        Buy Plots in Gurugram | Best Investment Opportunities
        </title>
        <meta
          name="description"
          content="Find affordable plots in Gurugram. Invest in land with strong potential for growth and future returns. Visit 100acress now!"
        />
        <meta property="og:title" content="Buy Plots in Gurugram | Best Investment Opportunities" />
        <meta property="og:site_name" content="100acress" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/logo.webp" />
        <meta property="og:url" content="https://www.100acress.com/projects/plots/" />
        <meta property="og:description" content="Find affordable plots in Gurugram. Invest in land with strong potential for growth and future returns. Visit 100acress now!" />
        <meta property="og:keywords" content="Plots in Gurugram" />
        <meta name="twitter:title" content="Buy Plots in Gurugram | Best Investment Opportunities" />
        <meta name="twitter:description" content="Find affordable plots in Gurugram. Invest in land with strong potential for growth and future returns. Visit 100acress now!"/>
        <meta name="twitter:url" content="https://twitter.com/100acressdotcom" />
        <meta name="twitter:card" content="summary" />

           <link rel="canonical" href="https://www.100acress.com/projects/plots/" />
      </Helmet>

      <CommonInside
        title="Plots in Gurugram"
        details="Plots in Gurugram offer a unique opportunity for
          residential development in the rapidly growing city.With convenient
          access to amenities, infrastructure, and transportation networks, Deen
          Dayal Plots cater to the burgeoning demand for quality residential
          spaces in Gurugram, making them an attractive choice for homebuyers
          and investors alike."
        Actualdata={deenDayalPlots}
      />
    </div>
  );
};

export default DeenDayalPlots;
