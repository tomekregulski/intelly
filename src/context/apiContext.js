import React, { useContext, useState, useEffect, createContext } from 'react';
import {
  fetchTimeframeProductData,
  fetchTimeframeStoreData,
  fetchWeeklyProductData,
} from '../dataProcessing/dataProcessing';
import axios from 'axios';

const APIContext = createContext();

export function APIContextProvider({ children }) {
  const [userBrands, setUserBrands] = useState([]);
  const [brand, setBrand] = useState(''); // eventually becomes userBrands[0]
  const [currentTimeframe, setCurrentTimeframe] = useState([]); // is this needed?
  const [timeframes, setTimeframes] = useState([]);
  const [currentTimeframeRawData, setCurrentTimeframeRawData] = useState([]);
  const [weeklyRawData, setWeeklyRawData] = useState([]);

  // const [timeframes, setTimeframes] = useState([]); // is this needed?

  const [timeframeProductData, setTimeframeProductData] = useState([]); // needed - can it hold more to avoid lower-level computation?
  const [timeframeStoreData, setTimeframeStoreData] = useState([]); // needed - can it hold more to avoid lower-level computation?
  const [weeklyStoreData, setWeeklyStoreData] = useState([]); // needed - can it hold more to avoid lower-level computation?

  const [weeklyProductData, setWeeklyProductData] = useState([]); // needed - can it hold more to avoid lower-level computation?

  const [currentBrandSkus, setCurrentBrandSkus] = useState([]); // is this needed?

  const [currentBrandRegions, setCurrentBrandRegions] = useState([]);
  const [region, setRegion] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState(''); // set to categoryList[0] after API call

  useEffect(() => {
    // console.log(brand);
    async function fetchData() {
      // console.log('initial fetch');
      const apiResponse = await axios.get(
        `https://intelly-server.herokuapp.com/api/whole-foods-timeframe-data/timeframes`,
        // 'http://localhost:5000/api/whole-foods-timeframe-data/timeframes',
        {
          headers: { brand: brand },
        }
      );

      let tf = [];
      for (let i = 0; i < apiResponse.data.length; i++) {
        tf.push(apiResponse.data[i]['timeframe']);
      }
      setTimeframes(tf);
      setCurrentTimeframe(tf[0]);
    }
    fetchData();
  }, [brand, setBrand]);

  useEffect(() => {
    async function fetchData() {
      const apiResponse = await axios.get(
        `https://intelly-server.herokuapp.com/api/whole-foods-timeframe-data`,
        // 'http://localhost:5000/api/whole-foods-timeframe-data',
        {
          headers: { brand: brand, timeframe: currentTimeframe },
        }
      );
      setCurrentTimeframeRawData(apiResponse.data);
    }
    fetchData();
  }, [setTimeframes, setCurrentTimeframe, timeframes, currentTimeframe]);

  useEffect(() => {
    async function fetchData() {
      const apiResponse = await axios.get(
        `https://intelly-server.herokuapp.com/api/whole-foods-timeframe-data/weekly`,
        // 'http://localhost:5000/api/whole-foods-timeframe-data/weekly',
        {
          headers: { brand: brand, timeframes: timeframes },
        }
      );
      setWeeklyRawData(apiResponse.data);
    }
    fetchData();
  }, [setTimeframes, setCurrentTimeframe, timeframes, currentTimeframe]);

  useEffect(() => {
    if (weeklyRawData.length) {
      // console.log('hello weekly');
      let regionList = [];
      let skuList = [];
      let categoryList = [];

      for (let i = 0; i < weeklyRawData.length; i++) {
        if (!regionList.includes(weeklyRawData[i].region)) {
          regionList.push(weeklyRawData[i].region);
        }

        if (!skuList.includes(weeklyRawData[i].sku_name)) {
          skuList.push(weeklyRawData[i].sku_name);
        }

        if (!categoryList.includes(weeklyRawData[i].category)) {
          categoryList.push(weeklyRawData[i].category);
        }
      }

      setCurrentBrandRegions(regionList);
      setCurrentBrandSkus(skuList);
      setCategoryList(categoryList);
      setCategory(categoryList[0]);
      setRegion(regionList[0]);
    }
  }, [
    setCurrentTimeframeRawData,
    setWeeklyRawData,
    currentTimeframeRawData,
    weeklyRawData,
  ]);

  useEffect(() => {
    let products;
    let stores;
    let weeklyStores;
    let weeklyProducts;

    let categoryCurrentData = currentTimeframeRawData.filter(
      (item) => item.category === category
    );

    let categoryWeeklyData = weeklyRawData.filter(
      (item) => item.category === category
    );

    // console.log(categoryWeeklyData);

    if (categoryCurrentData.length) {
      products = fetchTimeframeProductData(
        categoryCurrentData,
        region,
        currentBrandSkus,
        timeframes,
        currentTimeframe,
        category
      );

      stores = fetchTimeframeStoreData(
        categoryCurrentData,
        region,
        currentBrandSkus,
        timeframes,
        currentTimeframe,
        category
      );

      weeklyStores = fetchTimeframeStoreData(
        categoryWeeklyData,
        region,
        currentBrandSkus,
        timeframes,
        currentTimeframe,
        category
      );

      weeklyProducts = fetchWeeklyProductData(
        categoryWeeklyData,
        region,
        currentBrandSkus,
        timeframes,
        currentTimeframe,
        category
      );

      // console.log(weeklyProducts);
      if (stores.length) {
        setTimeframeStoreData(stores);
      }
      if (products.length) {
        setTimeframeProductData(products);
        // console.log(products);
      }

      if (weeklyStores.length) {
        setWeeklyStoreData(weeklyStores);
        // console.log(products);
      }

      if (weeklyProducts.length) {
        setWeeklyProductData(weeklyProducts);
        // console.log(products);
      }
    }
  }, [
    setCurrentBrandSkus,
    currentBrandSkus,
    currentTimeframeRawData,

    setCurrentTimeframeRawData,
    region,
    setRegion,
    // timeframes,
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
        currentBrandRegions,
        currentBrandSkus,
        categoryList,
        setBrand,
        weeklyStoreData,
        weeklyProductData,
        setCategory,
        setUserBrands,
        userBrands,
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
