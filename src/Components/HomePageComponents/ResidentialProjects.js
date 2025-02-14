import React, { useContext } from "react";
import Footer from "../Actual_Components/Footer";
import { DataContext } from "../../MyContext";
import { Helmet } from "react-helmet";

import CommonInside from "../../Utils/CommonInside";
const ResidentialProjects = () => {
  const { residencialProjects } = useContext(DataContext);
  return (
    <div>
      <Helmet>
        <meta
          name="description"
          content="Discover top residential properties for sale or rent in the best locations. Find your dream home today at 100acress."
        />
        <meta property="og:title" content="Explore Residential Properties in Prime Locations" />
        <meta property="og:site_name" content="100acress" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/logo.webp" />
        <meta property="og:url" content="https://www.100acress.com/property/residential/" />
        <meta property="og:description" content="Discover top residential properties for sale or rent in the best locations. Find your dream home today at 100acress." />
        <meta property="og:keywords" content="Residential Properties" />
        <meta name="twitter:title" content="Explore Residential Properties in Prime Locations" />
        <meta name="twitter:description" content="Discover top residential properties for sale or rent in the best locations. Find your dream home today at 100acress." />
        <meta name="twitter:url" content="https://twitter.com/100acressdotcom" />
        <meta name="twitter:card" content="summary" />

        <title>
          Explore Residential Properties in Prime Locations
        </title>
        <link
          rel="canonical"
          href="https://www.100acress.com/property/residential/"
        />
      </Helmet>
      <CommonInside
      title="RESIDENTIAL PROPERTIES"
      details="Residential properties encompass a diverse range of housing options
          tailored to meet varying lifestyle needs. From single-family homes to
          condominiums, townhouses, and apartments, each type offers unique
          features and amenities."
      Actualdata={residencialProjects}

      />
      <Footer />
    </div>
  );
};

export default ResidentialProjects;
