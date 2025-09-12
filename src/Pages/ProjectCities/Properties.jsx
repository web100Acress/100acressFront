import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import ProjectSearching from "../ProjectSearching";
import CommonInside from "../../Utils/CommonInside";
import { useSelector } from "react-redux";
import Api_service from "../../Redux/utils/Api_Service";
import Footer from "../../Components/Actual_Components/Footer";
const Properties = () => {
  
  let city = "Gurugram";
  const {getProjectbyState} = Api_service();
  const gurugramProject = useSelector(store => store?.stateproject?.gurugram);
  const [filtereddata,setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
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
    <div>
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
    

      <main className="mt-14">
        {/* Page header (Resale/Rental theme) */}
        <section className="flex flex-col items-center pt-4 px-4">
          <div className="text-center max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold text-[#D32F2F] mb-2">Best Projects in Gurugram</h1>
            <div className="w-16 h-1 mx-auto bg-[#D32F2F] rounded mb-2"></div>
            <p className="text-gray-500 text-base md:text-lg">Value, Location, and Comfort — Discover premium projects in prime Gurugram locations.</p>
          </div>
        </section>

        {/* Top search bar (Resale style) */}
        <section className="flex items-center justify-center mb-6 px-4">
          <input
            type="text"
            placeholder="Search projects by name or city..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full max-w-3xl px-5 py-3 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F] text-base bg-white"
          />
        </section>

        {/* Filter ribbon (sticky) */}
        <section className="max-w-7xl mx-auto w-full">
          <ProjectSearching searchdata={gurugramProject} sendDatatoparent={handleDatafromSearch} city={city}/>
        </section>

        {/* Results grid */}
        <section className="max-w-7xl mx-auto w-full px-4">
          {(() => {
            const base = filtereddata.length === 0 ? (datafromsearch?.gurugramProject || []) : filtereddata;
            const searched = search
              ? base.filter(item =>
                  (item.projectName || "").toLowerCase().includes(search.toLowerCase()) ||
                  (item.city || "").toLowerCase().includes(search.toLowerCase())
                )
              : base;
            return (
              <CommonInside Actualdata={searched} />
            );
          })()}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Properties;
