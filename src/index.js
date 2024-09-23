/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// import { EnquiryProvider } from "./Context/enquiryContext";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <>
      <ChakraProvider>
        <BrowserRouter>
          <App />
          </BrowserRouter>
      </ChakraProvider>
    </>
);
