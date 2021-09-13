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
  const [skus, setSkus] = useState([]);
  const [regions, setRegions] = useState([]);
  const [categories, setCategories] = useState([]);
  const { REACT_APP_DATA_API_URL } = process.env;

  useEffect(() => {
    async function fetchData() {
      const apiResponse = await axios.get(
        `https://intelly-server.herokuapp.com/api/whole-foods`
      );
      // const apiResponse = await axios.get(
      //   REACT_APP_DATA_API_URL + 'api/whole-foods'
      // );
      setBaseData(apiResponse.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (baseData.length) {
      let regionList = [];
      let skuList = [];
      let categoryList = [];
      for (var i = 0; i < baseData.length; i++) {
        let capReg =
          baseData[i].region.charAt(0).toUpperCase() +
          baseData[i].region.slice(1);
        if (!regionList.includes(capReg)) {
          regionList.push(capReg);
        }

        if (!skuList.includes(baseData[i].sku)) {
          skuList.push(baseData[i].sku);
        }

        if (!categoryList.includes(baseData[i].category)) {
          categoryList.push(baseData[i].category);
        }
      }
      setRegions(regionList);
      setSkus(skuList);
      setCategories(categoryList);
    }
  }, [baseData, setBaseData]);

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
        skus,
        regions,
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
