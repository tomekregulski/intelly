import React, { useContext, useState, useEffect, createContext } from 'react';
import {
  fetchTimeframeProductData,
  fetchTimeframeStoreData,
} from '../dataProcessing/dataProcessing';
import axios from 'axios';

const APIContext = createContext();

export function APIContextProvider({ children }) {
  const [timeframeData, setTimeframeData] = useState([]);
  const [currentTimeframe, setCurrentTimeframe] = useState([]);
  const [timeframes, setTimeframes] = useState([]);
  const [timeframeStoreData, setTimeframeStoreData] = useState([]);
  const [timeframeProductData, setTimeframeProductData] = useState([]);
  const [region, setRegion] = useState('all regions');
  const [timeframeRegions, setTimeframeRegions] = useState([]);
  const [skusTimeframe, setSkusTimeframe] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('SIMMER');

  useEffect(() => {
    async function fetchData() {
      const apiResponse = await axios.get(
        `https://intelly-server.herokuapp.com/api/whole-foods-timeframe-data`,
        // 'http://localhost:5000/api/whole-foods-timeframe-data',
        {
          headers: { brand: brand },
        }
      );
      setTimeframeData(apiResponse.data);
    }
    fetchData();
  }, [brand, setBrand]);

  useEffect(() => {
    if (timeframeData.length) {
      let timeframesArray = [];
      let currentTf = null;
      let currentTfData = [];
      let regionList = [];
      let skuList = [];
      let categoryList = [];
      for (let i = 0; i < timeframeData.length; i++) {
        if (
          timeframeData[i].timeframe.length === 8 &&
          !timeframesArray.includes(timeframeData[i].timeframe)
        ) {
          timeframesArray.push(timeframeData[i].timeframe);
        }

        if (!regionList.includes(timeframeData[i].region)) {
          regionList.push(timeframeData[i].region);
        }

        if (!skuList.includes(timeframeData[i].sku_name)) {
          skuList.push(timeframeData[i].sku_name);
        }

        if (!categoryList.includes(timeframeData[i].category)) {
          categoryList.push(timeframeData[i].category);
        }
      }

      timeframesArray.sort().reverse();
      currentTf = timeframesArray[0];

      for (let i = timeframesArray.length; i > 4; i--) {
        timeframesArray.pop();
      }
      setCurrentTimeframe(currentTf);

      for (var i = 0; i < timeframeData.length; i++) {
        if (timeframeData[i].timeframe.startsWith(currentTf)) {
          currentTfData.push(timeframeData[i]);
        }
      }
      setTimeframeRegions(regionList);
      setSkusTimeframe(skuList);
      setCategoryList(categoryList);
      setCategory(categoryList[0]);
      setTimeframes(timeframesArray);
    }
  }, [timeframeData, setTimeframeData]);

  useEffect(() => {
    let products;
    let stores;

    let categoryData = timeframeData.filter(
      (item) => item.category === category
    );
    // console.log('category');
    // console.log(categoryData);

    if (categoryData.length) {
      products = fetchTimeframeProductData(
        categoryData,
        region,
        skusTimeframe,
        timeframes,
        currentTimeframe,
        category
      );

      stores = fetchTimeframeStoreData(
        categoryData,
        region,
        skusTimeframe,
        timeframes,
        currentTimeframe,
        category
      );

      if (stores.length) {
        setTimeframeStoreData(stores);
      }
      if (products.length) {
        setTimeframeProductData(products);
        // console.log(products);
      }
    }
  }, [
    setSkusTimeframe,
    skusTimeframe,
    timeframeData,
    setTimeframeData,
    region,
    setRegion,
    timeframes,
    currentTimeframe,
    setBrand,
    setCategory,
    category,
  ]);

  return (
    <APIContext.Provider
      value={{
        region,
        setRegion,
        timeframeStoreData,
        timeframeProductData,
        timeframeRegions,
        skusTimeframe,
        categoryList,
        setBrand,
        setCategory,
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
