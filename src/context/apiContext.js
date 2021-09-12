import React, { useContext, useState, useEffect, createContext } from 'react';
import { apiResponse, dataByProduct, dataByStore } from '../api/api';
// import testData from '../data/data';
// import axios from 'axios';

const APIContext = createContext();

export function APIContextProvider({ children }) {
  // for more complex state you might set up useReducer for Redux-like state updates
  const [baseData, setBaseData] = useState([]);
  const [storeData, setStoreData] = useState([]);
  const [productData, setProductData] = useState([]);

  // useEffect is a lifecycle method for function components, run once after mount
  useEffect(() => {
    // console.log('context');
    // the callback to useEffect can't be async, but you can declare async within
    function fetchData() {
      // console.log('fetch context');
      // use the await keyword to grab the resolved promise value
      // remember: await can only be used within async functions!
      const data = apiResponse;
      const products = dataByProduct;
      const stores = dataByStore;
      // await axios.get(`https://jsonplaceholder.typicode.com/users`);
      // update local state with the retrieved data
      setBaseData(data);
      setStoreData(stores);
      setProductData(products);
    }
    // fetchData will only run once after mount as the deps array is empty
    fetchData();
  }, []);

  return (
    <APIContext.Provider
      // Add required values to the value prop within an object (my preference)
      value={{
        baseData,
        storeData,
        productData,
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
