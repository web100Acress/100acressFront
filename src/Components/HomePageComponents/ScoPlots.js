import React, { useContext } from "react";
import Footer from "../Actual_Components/Footer";
import { DataContext } from "../../MyContext";
import { Helmet } from "react-helmet";
import CommonInside from "../../Utils/CommonInside";

const ScoPlots = () => {
  const { scoPlots } = useContext(DataContext);
  return (
    <div>
      <Helmet>
        <title>SCO Plots in Gurgaon, Top 10 SCO Plots in Gurgaon</title>
        <meta
          name="description"
          content="Find exclusive SCO plots in Gurgaon for retail, offices, and more. Premium locations designed to grow your business or investment portfolio"
        />
        <meta property="og:title" content="Buy SCO Plots in Gurgaon with 100acress" />
        <meta property="og:site_name" content="100acress" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/logo.webp" />
        <meta property="og:url" content="https://www.100acress.com/sco/plots/" />
        <meta property="og:description" content="Find exclusive SCO plots in Gurgaon for retail, offices, and more. Premium locations designed to grow your business or investment portfolio
"/>
        <meta property="og:keywords" content="SCO Plots in Gurgaon"/>
        <meta name="twitter:title" content="Buy SCO Plots in Gurgaon with 100acress"/>
          <meta name="twitter:description" content="Find exclusive SCO plots in Gurgaon for retail, offices, and more. Premium locations designed to grow your business or investment portfolio"/>
            <meta name="twitter:url" content="https://twitter.com/100acressdotcom"/>
              <meta name="twitter:card" content="summary"/>

        <title>
        Buy SCO Plots in Gurgaon with 100acress
        </title>
         <link rel="canonical" href="https://www.100acress.com/sco/plots/" />
      </Helmet>

      <CommonInside
        title="SCO Plots in Gurugram"
        details="These plots, designated for Shop-Cum-Office establishments, offer a blend of commercial and retail space, catering to diverse business
          ventures.With strategic locations, flexible zoning regulations, and
          burgeoning economic prospects, SCO plots in Gurugram present investors
          with a promising avenue for business growth and expansion."
        Actualdata={scoPlots}
      />


      <Footer />
    </div>
  );
};

export default ScoPlots;
