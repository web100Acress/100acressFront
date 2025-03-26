import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ProjectSearching from "../ProjectSearching";
import CommonInside from "../../Utils/CommonInside";
import { useSelector } from "react-redux";
import Api_service from "../../Redux/utils/Api_Service";
const Properties = () => {
  
  let city = "Gurugram";
  const {getProjectbyState} = Api_service();
  const gurugramProject = useSelector(store => store?.stateproject?.gurugram);

  const [filtereddata,setFilteredData] = useState([]);
  const [datafromsearch,setDatafromsearch] = useState({});
  function handleDatafromSearch(data){
    setFilteredData(data);
  };
  useEffect(() => {
    if (gurugramProject.length === 0) {
      getProjectbyState(city, 0)
    }
  }, []);

    useEffect(()=>{
      setDatafromsearch({ gurugramProject });
    },[gurugramProject])


  return (
    <div >
        <Helmet>
        <meta
          name="description"
          content="Upgrade your lifestyle with best real estate Projects in Gurugram. Browse modern apartments, villas, and investment properties at 100acress. Contact us now!"
        />
        <meta property="og:title" content="Best Real Estate Projects in Gurugram - 100acress" />
        <meta property="og:site_name" content="100acress" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/logo.webp" />
        <meta property="og:url" content="https://www.100acress.com/projects-in-gurugram/ " />
        <meta property="og:description" content="Find exclusive SCO plots in Gurgaon for retail, offices, and more. Premium locations designed to grow your business or investment portfolio
"/>
        <meta property="og:keywords" content="Projects in Gurugram" />
        <meta name="twitter:title" content="Best Real Estate Projects in Gurugram - 100acress" />
        <meta name="twitter:description" content="Upgrade your lifestyle with best real estate Projects in Gurugram. Browse modern apartments, villas, and investment properties at 100acress. Contact us now!" />
        <meta name="twitter:url" content="https://twitter.com/100acressdotcom" />
        <meta name="twitter:card" content="summary" />

        <title>
          Best Real Estate Projects in Gurugram - 100acress
        </title>
        <link
          rel="canonical"
          href="https://www.100acress.com/projects-in-gurugram/"
        />
      </Helmet>
    

      <section className="flex flex-col items-center bg-white mt-16">
      <h1 className="mb-2 p-1 text-center text-2xl sm:text-xl md:text-2xl lg:text-3xl text-red-600 font-bold tracking-[0.1em]">
          Projects in Gurugram
        </h1>

        <h2 className="text-sm mb-0 text-center sm:text-xl md:text-xl lg:text-sm font-normal lg:mx-20 md:mx-10 mx-5 sm:mx-4 tracking-[0.1em]">
          Gurugram is transforming with major enterprises, including new housing
          complexes, commercial space, and infrastructure improvements. These
          developments focus on improving connectivity by developing networks
          and modern amenities, to enhance the standard of urban living and
          encourage investment from businesses in the rapidly growing city.
        </h2>
        <ProjectSearching searchdata={gurugramProject} sendDatatoparent={handleDatafromSearch}/>
        <CommonInside
        Actualdata={filtereddata.length === 0 ? datafromsearch?.gurugramProject : filtereddata}
        />
      </section>
    </div>
  );
}

export default Properties;
