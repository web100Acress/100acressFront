/** @format */

import React,{Suspense} from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {Provider} from "react-redux";
import AppStore from "./Redux/store/AppStore";
// import { EnquiryProvider } from "./Context/enquiryContext";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import CustomSkeleton from "../src/Utils/CustomSkeleton";
import { initAxios } from "./config/axiosSetup";
import { cssLoader } from "./Utils/CSSLoader";
// Import Font Awesome synchronously for mobile navigation icons
import "@fortawesome/fontawesome-free/css/all.min.css";

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

root.render(
  <>
    <Provider store={AppStore}>
      <ChakraProvider>
        <HelmetProvider>
          <BrowserRouter>
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

// Load non-critical CSS asynchronously after initial render
setTimeout(() => {
  // Load CSS files that are not critical for LCP
  const nonCriticalCSS = [
    '/src/index.css',
    'mdb-react-ui-kit/dist/css/mdb.min.css'
  ];
  
  nonCriticalCSS.forEach(cssPath => {
    cssLoader.loadCSS(cssPath, {
      media: 'all',
      onLoad: () => console.log(`Loaded CSS: ${cssPath}`),
      onError: () => console.warn(`Failed to load CSS: ${cssPath}`)
    });
  });
}, 100); // Small delay to ensure initial render is complete
