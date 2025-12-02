import React from 'react';
import AllListedProperties from '../AdminPage/AllListedProperties';

// Wrapper component that uses the content without the Admin sidebar
const SalesHeadListedProperties = () => {
  // Extract just the content part without the Sidebar
  return <AllListedProperties />;
};

export default SalesHeadListedProperties;
