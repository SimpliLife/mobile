import React, { useState } from 'react';
import MainContext from './MainContext';

const ProviderContext = ({ children }) => {
  const [data, setData] = useState({
    location: "",
    latitude: "",
    longitude: "",
    filter: "loc",
    address: "",
    value: ""
  });

  // You can define functions to update the data here.

  return (
    <MainContext.Provider value={{ data, setData }}>
      {children}
    </MainContext.Provider>
  );
};

export default ProviderContext;