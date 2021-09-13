import React, { useContext, useState, useEffect, createContext } from 'react';
// import { apiResponse } from '../api/api';
import {
  fetchProductData,
  fetchStoreData,
} from '../dataProcessing/dataProcessing';
import axios from 'axios';

const APIContext = createContext();

export function APIContextProvider({ children }) {
  // const { region } = useContext(RegionContext);
  // for more complex state you might set up useReducer for Redux-like state updates
  const [baseData, setBaseData] = useState([]);
  const [storeData, setStoreData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [region, setRegion] = useState('all regions');
  const { REACT_APP_DATA_API_URL } = process.env;

  useEffect(() => {
    console.log(REACT_APP_DATA_API_URL);
    async function fetchData() {
      // const apiResponse = await axios.get(
      //   `https://intelly-server.herokuapp.com/api/whole-foods`
      // );
      const apiResponse = await axios.get(
        REACT_APP_DATA_API_URL + 'api/whole-foods'
      );
      setBaseData(apiResponse.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    let stores = [];
    let products = [];

    if (baseData.length) {
      products = fetchProductData(baseData, region);
      stores = fetchStoreData(baseData, region);
    }

    if (stores.length) {
      setStoreData(stores);
    }
    if (products.length) {
      setProductData(products);
    }
  }, [region, setRegion, baseData, setBaseData]);

  return (
    <APIContext.Provider
      // Add required values to the value prop within an object (my preference)
      value={{
        storeData,
        productData,
        setRegion,
      }}
    >
      {children}
    </APIContext.Provider>
  );
}

// Create a hook to use the APIContext, this is a Kent C. Dodds pattern
export function useAPI() {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error('Context must be used within a Provider');
  }
  return context;
}
