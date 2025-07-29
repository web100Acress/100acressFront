import React, {useEffect, useState } from "react";
import Footer from "../Components/Actual_Components/Footer";
import { Helmet } from "react-helmet";
import NoPropertiesMessage from "../Components/NoPropertiesMessage ";
import { useSelector } from "react-redux";
import Api_Service from "../Redux/utils/Api_Service";
import CommonInside from "../Utils/CommonInside";
import axios from "axios";
import { API_ROUTES_PROJECTS } from "../Redux/utils/Constant_Service";

const BudgetPrice = () => {  
  const [allProjects, setAllProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const minprice = useSelector(store => store?.PriceBased?.minprice);
  const maxprice = useSelector(store => store?.PriceBased?.maxprice);

  // Fetch all projects when component mounts
  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        setIsLoading(true);
        // Fetch all projects without any filters
        const response = await axios.get(`${API_ROUTES_PROJECTS}/projectsearch?limit=1000`);
        setAllProjects(response.data.data || []);
      } catch (error) {
        console.error("Error fetching all projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllProjects();
  }, []);

  // Filter projects by price range
  useEffect(() => {
    if (minprice !== undefined && maxprice !== undefined && allProjects.length > 0) {
      setIsLoading(true);
      
      const filtered = allProjects.filter(project => {
        const projectMinPrice = project.minPrice || 0;
        const projectMaxPrice = project.maxPrice || Infinity;
        
        // A project should appear if its price range overlaps with the selected budget range
        return projectMinPrice <= maxprice && projectMaxPrice >= minprice;
      });
      
      setFilteredProjects(filtered);
      setIsLoading(false);
    }
  }, [minprice, maxprice, allProjects]);

  const getPriceRangeText = () => {
    if (maxprice === Infinity) {
      return `Above ₹${minprice} Cr`;
    } else if (minprice === 0) {
      return `Under ₹${maxprice} Cr`;
    } else {
      return `₹${minprice} Cr - ₹${maxprice} Cr`;
    }
  };

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

      {isLoading ? (
        <div className="my-10 text-center">
          <p className="text-gray-600">Loading properties...</p>
      </div>
      ) : filteredProjects.length === 0 ? (
      <div className="my-10">
        <NoPropertiesMessage/>      
      </div>
      ) : (
      <CommonInside 
          Actualdata={filteredProjects}
          title={`Properties in Budget Range: ${getPriceRangeText()}`}
      />
      )}
      <Footer />
    </div>
  );
};

export default BudgetPrice;
