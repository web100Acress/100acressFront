/** @format */
import React,{Suspense} from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/disable-animations.css";
import "./styles/card-animations.css";
import App from "./App.jsx";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {Provider} from "react-redux";
import AppStore from "./Redux/store/AppStore";
// import { EnquiryProvider } from "./Context/enquiryContext";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import CustomSkeleton from "../src/Utils/CustomSkeleton";
import { initAxios } from "./config/axiosSetup";

// Initialize global axios config (base URL + interceptors)
initAxios();

const root = ReactDOM.createRoot(document.getElementById("root"));

// ScrollToTop component using the useLocation hook for react-router v6
const ScrollToTop = ({ children }) => {
  const location = useLocation(); // useLocation hook provides current location

  React.useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when location changes
  }, [location]); // Effect depends on location

  return children; // Render the children components
};

// Enable card animations globally but keep hero static
if (typeof document !== 'undefined' && document.body) {
  document.body.classList.add('enable-card-animations');
}

root.render(
  <>
    <Provider store={AppStore}>
      <ChakraProvider>
        <HelmetProvider>
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true
            }}
          >
            <ScrollToTop>
              <Suspense fallback={<div><CustomSkeleton/></div>}>
                <App />
              </Suspense>
            </ScrollToTop>
          </BrowserRouter>
        </HelmetProvider>
      </ChakraProvider>
    </Provider>
  </>
);
