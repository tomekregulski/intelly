import React, { useContext, useState, useEffect, createContext } from 'react';
import { apiResponse } from '../api/api';
import {
  fetchProductData,
  fetchStoreData,
} from '../dataProcessing/dataProcessing';
// import axios from 'axios';

const APIContext = createContext();

export function APIContextProvider({ children }) {
  // const { region } = useContext(RegionContext);
  // for more complex state you might set up useReducer for Redux-like state updates
  const [storeData, setStoreData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [region, setRegion] = useState('all regions');

  // useEffect is a lifecycle method for function components, run once after mount
  useEffect(() => {
    // the callback to useEffect can't be async, but you can declare async within
    function fetchData() {
      // use the await keyword to grab the resolved promise value
      // remember: await can only be used within async functions!
      const products = fetchProductData(apiResponse, region);
      const stores = fetchStoreData(apiResponse, region);
      // await axios.get(`https://jsonplaceholder.typicode.com/users`);
      // update local state with the retrieved data
      if (stores.length) {
        setStoreData(stores);
      }
      if (products.length) {
        setProductData(products);
      }
    }
    // fetchData will only run once after mount as the deps array is empty
    fetchData();
  }, [region, setRegion]);

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
