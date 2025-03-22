import React, {useEffect, useState } from "react";
import Footer from "../Components/Actual_Components/Footer";
import { Helmet } from "react-helmet";
import NoPropertiesMessage from "../Components/NoPropertiesMessage ";
import { useSelector } from "react-redux";
import Api_Service from "../Redux/utils/Api_Service";
import CommonInside from "../Utils/CommonInside";

const BudgetPrice = () => {  const {getProjectBasedOnminPrice,getProjectBasedOnmaxPrice} = Api_Service(); 
  const [commonProjects, setCommonProjects] = useState([]);
  const minprice = useSelector(store => store?.PriceBased?.minprice);
  const maxprice = useSelector(store => store?.PriceBased?.maxprice);
  const maxpriceproject = useSelector(store => store?.PriceBased?.maxpriceproject);
  const minpriceproject = useSelector(store => store?.PriceBased?.minpriceproject);

  useEffect(()=>{
    getProjectBasedOnmaxPrice(maxprice,0);
    getProjectBasedOnminPrice(minprice,0);
  },[minprice,maxprice]);

  useEffect(() => {
    if (maxpriceproject && minpriceproject) {
      const common = maxpriceproject.filter(maxProject =>
        minpriceproject.some(minProject => minProject._id === maxProject._id)
      );
      setCommonProjects(common);
    }
  }, [maxpriceproject, minpriceproject]);



  return (
    <div style={{ overflowX: "hidden" }}>
      <Helmet>
        <meta
          name="description"
          content="Upgrade your lifestyle with best real estate Projects in Gurugram. Browse modern apartments, villas, and investment properties at 100acress. Contact us now!"
        />
        <title>
          Best Real Estate Projects in Gurugram - 100acress
        </title>
        <link
          rel="canonical"
          href="https://www.100acress.com/projects-in-gurugram/"
        />
      </Helmet>
      <div>

      </div>
      {commonProjects.length === 0 ? 
      <div className="my-10">
        <NoPropertiesMessage/>      
      </div>
      :
      <CommonInside 
      Actualdata={commonProjects}
      title={`Projects From Price-Range  ${minprice ? `Between ${minprice} Cr` : 'Upto'} to ${maxprice} Cr`}
      />
    }
      <Footer />
    </div>
  );
};

export default BudgetPrice;
