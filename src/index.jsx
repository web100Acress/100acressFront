/** @format */

import React,{Suspense} from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// import { EnquiryProvider } from "./Context/enquiryContext";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, useLocation } from "react-router-dom";
import CustomSkeleton from "../src/Utils/CustomSkeleton";

const root = ReactDOM.createRoot(document.getElementById("root"));

// ScrollToTop component using the useLocation hook for react-router v6
const ScrollToTop = ({ children }) => {
  const location = useLocation(); // useLocation hook provides current location

  React.useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when location changes
  }, [location]); // Effect depends on location

  return children; // Render the children components
};

root.render(
  <>
    <ChakraProvider>
      <BrowserRouter>
        <ScrollToTop>
          <Suspense fallback={<div><CustomSkeleton/></div>}>
            <App />
          </Suspense>
        </ScrollToTop>
      </BrowserRouter>
    </ChakraProvider>
  </>
);
