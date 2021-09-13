import React, { useContext, useState, useEffect, createContext } from 'react';
import {
  fetchTimeframeProductData,
  fetchTimeframeStoreData,
} from '../dataProcessing/dataProcessing';
import axios from 'axios';

const APIContext = createContext();

export function APIContextProvider({ children }) {
  // const [baseData, setBaseData] = useState([]);
  // const [weeklyArchive, setWeeklyArchive] = useState([]);
  const [timeframeData, setTimeframeData] = useState([]);
  const [currentTimeframe, setCurrentTimeframe] = useState([]);
  // const [currentTimeframeData, setCurrentTimeframeData] = useState([]);
  const [timeframes, setTimeframes] = useState([]);
  // const [storeData, setStoreData] = useState([]);
  // const [productData, setProductData] = useState([]);
  const [timeframeStoreData, setTimeframeStoreData] = useState([]);
  const [timeframeProductData, setTimeframeProductData] = useState([]);
  const [region, setRegion] = useState('all regions');
  const [timeframeRegions, setTimeframeRegions] = useState([]);
  // const [skus, setSkus] = useState([]);
  const [skusTimeframe, setSkusTimeframe] = useState([]);

  // const [regions, setRegions] = useState([]);
  // const [categories, setCategories] = useState([]);
  // const { REACT_APP_DATA_API_URL } = process.env;

  // useEffect(() => {
  //   async function fetchData() {
  //     const apiResponse = await axios.get(
  //       `https://intelly-server.herokuapp.com/api/whole-foods`
  //     );
  //     // const apiResponse = await axios.get(
  //     //   REACT_APP_DATA_API_URL + 'api/whole-foods'
  //     // );
  //     setBaseData(apiResponse.data);
  //   }
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     const apiResponse = await axios.get(
  //       `https://intelly-server.herokuapp.com/api/whole-foods-weekly-archive`
  //     );
  //     setWeeklyArchive(apiResponse.data);
  //   }
  //   fetchData();
  // }, []);

  useEffect(() => {
    async function fetchData() {
      const apiResponse = await axios.get(
        `https://intelly-server.herokuapp.com/api/whole-foods-timeframe-data`
      );
      setTimeframeData(apiResponse.data);
    }
    fetchData();
  }, []);

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
      // setCurrentTimeframeData(currentTfData);
      setTimeframeRegions(regionList);
      setSkusTimeframe(skuList);
      // console.log(categoryList);
      setTimeframes(timeframesArray);
    }
  }, [timeframeData, setTimeframeData]);

  useEffect(() => {
    let products;
    let stores;

    if (timeframeData.length) {
      products = fetchTimeframeProductData(
        timeframeData,
        region,
        skusTimeframe,
        timeframes,
        currentTimeframe
      );

      stores = fetchTimeframeStoreData(
        timeframeData,
        region,
        skusTimeframe,
        timeframes,
        currentTimeframe
      );

      if (stores.length) {
        setTimeframeStoreData(stores);
      }
      if (products.length) {
        setTimeframeProductData(products);
      }
    }
  }, [setTimeframeData, timeframeData, region, setRegion]);

  // useEffect(() => {
  //   if (baseData.length) {
  //     let regionList = [];
  //     let skuList = [];
  //     let categoryList = [];
  //     for (var i = 0; i < baseData.length; i++) {
  //       let capReg =
  //         baseData[i].region.charAt(0).toUpperCase() +
  //         baseData[i].region.slice(1);
  //       if (!regionList.includes(capReg)) {
  //         regionList.push(capReg);
  //       }

  //       if (!skuList.includes(baseData[i].sku)) {
  //         skuList.push(baseData[i].sku);
  //       }

  //       if (!categoryList.includes(baseData[i].category)) {
  //         categoryList.push(baseData[i].category);
  //       }
  //     }
  //     setRegions(regionList);
  //     setSkus(skuList);
  //     setCategories(categoryList);
  //   }
  // }, [baseData, setBaseData]);

  // useEffect(() => {
  //   let stores = [];
  //   let products = [];

  //   if (baseData.length) {
  //     products = fetchProductData(baseData, region);
  //     stores = fetchStoreData(baseData, region);
  //   }

  //   if (stores.length) {
  //     setStoreData(stores);
  //   }
  //   if (products.length) {
  //     setProductData(products);
  //   }
  // }, [region, setRegion, baseData, setBaseData]);

  return (
    <APIContext.Provider
      value={{
        // storeData,
        // productData
        region,
        setRegion,
        // skus,
        // regions,
        timeframeStoreData,
        timeframeProductData,
        timeframeRegions,
        skusTimeframe,
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
