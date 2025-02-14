import React, { useContext } from "react";

import Footer from "../Actual_Components/Footer";
import { DataContext } from "../../MyContext";
import { Helmet } from "react-helmet";
import CommonInside from "../../Utils/CommonInside";
const VillasProjects = () => {
  const { villasProject } = useContext(DataContext);

  return (
    <div>
      <Helmet>
        <title>Secure Your Dream Villas in a Prime Location | 100acress</title>
        <meta
          name="description"
          content="Step into a world of luxury with our exceptional villa designs. Discover your ideal home now. Contact us now!"
        />
        <meta property="og:title" content="Secure Your Dream Villa in a Prime Location | 100acress
"/>
        <meta property="og:site_name" content="100acress" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/logo.webp" />
        <meta property="og:url" content="https://www.100acress.com/projects/villas/" />
        <meta property="og:description" content="Step into a world of luxury with our exceptional villa designs. Discover your ideal home now. Contact us now!" />
        <meta property="og:keywords" content="Villa" />
        <meta name="twitter:title" content="Secure Your Dream Villa in a Prime Location | 100acress" />
        <meta name="twitter:description" content="Step into a world of luxury with our exceptional villa designs. Discover your ideal home now. Contact us now!" />
        <meta name="twitter:url" content="https://twitter.com/100acressdotcom" />
        <meta name="twitter:card" content="summary" />

        <link rel="canonical" href="https://www.100acress.com/projects/villas/" />
      </Helmet>
      
      <CommonInside
        title="India's Luxury Villas for Sale"
        details="Luxury villas in Gurgaon come with top-notch facilities and amenities.
          With privacy and exclusivity, the villa provides a haven for those
          seeking outstanding luxury living, where every detail caters to the
          wise tastes of its residents. They combine elegant design with modern
          comforts ideal for wise individuals selecting amazing living
          experiences."
        Actualdata={villasProject} 
      />
      <Footer />
    </div>
  );
};

export default VillasProjects;
