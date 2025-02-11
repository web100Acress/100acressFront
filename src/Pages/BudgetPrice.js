import React, { useContext } from "react";
import Footer from "../Components/Actual_Components/Footer";
import { DataContext } from "../MyContext";
import { Helmet } from "react-helmet";
import CommonProject from "../Utils/CommonProject";
import NoPropertiesMessage from "../Components/NoPropertiesMessage ";
const BudgetPrice = () => {
  const { filteredProjects } = useContext(DataContext);
  return (
    <div style={{ overflowX: "hidden" }} className="mt-10">
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
      {filteredProjects.length === 0 ? 
      <div className="my-10">
        <NoPropertiesMessage/>      
      </div>
      :
      <CommonProject 
        data={filteredProjects}
      />
    }
      <Footer />
    </div>
  );
};

export default BudgetPrice;
