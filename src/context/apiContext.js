import React, { useContext, useState, useEffect, createContext } from 'react';
import {
  fetchProductData,
  fetchStoreData,
} from '../dataProcessing/dataProcessing';
import axios from 'axios';

const APIContext = createContext();

export function APIContextProvider({ children }) {
  const [baseData, setBaseData] = useState([]);
  const [storeData, setStoreData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [region, setRegion] = useState('all regions');
  const { REACT_APP_DATA_API_URL } = process.env;

  useEffect(() => {
    console.log(REACT_APP_DATA_API_URL);
    async function fetchData() {
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

export function useAPI() {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error('Context must be used within a Provider');
  }
  return context;
}
