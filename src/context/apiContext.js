import React, { useContext, useState, useEffect, createContext } from 'react';
import {
  fetchTimeframeProductData,
  fetchTimeframeStoreData,
  fetchWeeklyProductData,
  fetchMonthlyProducts,
} from '../dataProcessing/dataProcessing';
import axios from 'axios';

const APIContext = createContext();

export function APIContextProvider({ children }) {
  const [userBrands, setUserBrands] = useState([]);
  const [brand, setBrand] = useState('');

  const [allBrandTimeframes, setAllBrandTimeframes] = useState([]);
  const [currentTimeframe, setCurrentTimeframe] = useState([]);
  const [weeklyTimeframes, setWeeklyTimeframes] = useState([]);
  const [monthlyTimeframes, setMonthlyTimeframes] = useState([]);

  const [currentTimeframeRawData, setCurrentTimeframeRawData] = useState([]);
  const [weeklyRawData, setWeeklyRawData] = useState([]);
  const [monthlyRawData, setMonthlyRawData] = useState([]);

  const [timeframeProductData, setTimeframeProductData] = useState([]);
  const [timeframeStoreData, setTimeframeStoreData] = useState([]);
  const [weeklyStoreData, setWeeklyStoreData] = useState([]);
  const [weeklyProductData, setWeeklyProductData] = useState([]);

  const [monthlyProductData, setMonthlyProductData] = useState([]);

  const [currentBrandSkus, setCurrentBrandSkus] = useState([]);
  const [currentBrandRegions, setCurrentBrandRegions] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const [region, setRegion] = useState('');
  const [category, setCategory] = useState('');

  // Once user is logged in and brand is set to their brands[0], query DB for a complete list of their WFM data entry dates (timeframes) and default the current selection to the most recent entry
  // POSSIBLY SET UP SEPARATE BRAND TABLE THAT LISTS ALL TIMEFRAMES FOR EACH BRAND
  useEffect(() => {
    setAllBrandTimeframes([]);
    setCurrentTimeframe([]);
    async function fetchData() {
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
      setAllBrandTimeframes(tf);
      setCurrentTimeframe(tf[0]);
    }
    fetchData();
  }, [brand, setBrand]);

  // When the currentTimeframe is set, create a list of 4 consecutive timeframes based on the currentTimeframe to use for the Weekly Data view. Additionally, create a list of timeframes that are each 4 weeks apart for the 4-week "Monthly" Data view.
  useEffect(() => {
    if (allBrandTimeframes.length) {
      let monthly = [];
      for (var i = 0; i < allBrandTimeframes.length; i++) {
        if (allBrandTimeframes[i] === currentTimeframe) {
          setWeeklyTimeframes(allBrandTimeframes.slice(i, i + 4));
          monthly.push(`${allBrandTimeframes[i]}_04_weeks`);
          if (allBrandTimeframes[i + 4]) {
            monthly.push(`${allBrandTimeframes[i + 4]}_04_weeks`);
          }
          if (allBrandTimeframes[i + 8]) {
            monthly.push(`${allBrandTimeframes[i + 8]}_04_weeks`);
          }
        }
      }
      setMonthlyTimeframes(monthly);
    }
  }, [
    setCurrentTimeframe,
    currentTimeframe,
    allBrandTimeframes,
    setAllBrandTimeframes,
  ]);

  // When currentTimeframe is updated, query the DB for a full record (52 weeks) of data based on that timeframe
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
  }, [setCurrentTimeframe, currentTimeframe]);

  // When currentTimeframe is updated, query the DB for the "Last Week" data of the last four timeframes to use for the Weekly Data view
  useEffect(() => {
    async function fetchData() {
      const apiResponse = await axios.get(
        `https://intelly-server.herokuapp.com/api/whole-foods-timeframe-data/weekly`,
        // 'http://localhost:5000/api/whole-foods-timeframe-data/weekly',
        {
          headers: { brand: brand, timeframes: weeklyTimeframes },
        }
      );
      setWeeklyRawData(apiResponse.data);
    }
    fetchData();
  }, [setWeeklyTimeframes, weeklyTimeframes]);

  // When currentTimeframe is updated, query the DB for the "Four Weeks" data of the specified timeframes to use for the Monthly Data view
  useEffect(() => {
    async function fetchData() {
      const apiResponse = await axios.get(
        `https://intelly-server.herokuapp.com/api/whole-foods-timeframe-data/monthly`,
        // 'http://localhost:5000/api/whole-foods-timeframe-data/monthly',
        {
          headers: { brand: brand, timeframes: monthlyTimeframes },
        }
      );
      setMonthlyRawData(apiResponse.data);
    }
    fetchData();
  }, [monthlyTimeframes, setMonthlyTimeframes]);

  // Once the weekly data is set, iterate through it to set states for currentBrandRegions, currentBrandSkus, categoryList, and region
  useEffect(() => {
    if (weeklyRawData.length) {
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

  // Once the raw data has been retrieved, it can be shaped into object that are ready to be consimed by the vizualization components
  useEffect(() => {
    let products;
    let stores;
    let weeklyStores;
    let weeklyProducts;
    let monthlyProducts;

    let categoryCurrentData = currentTimeframeRawData.filter(
      (item) => item.category === category
    );

    let categoryWeeklyData = weeklyRawData.filter(
      (item) => item.category === category
    );

    let categoryMonthlyData = monthlyRawData.filter(
      (item) => item.category === category
    );

    if (categoryCurrentData.length) {
      products = fetchTimeframeProductData(
        categoryCurrentData,
        region,
        currentBrandSkus,
        weeklyTimeframes,
        currentTimeframe,
        category
      );

      stores = fetchTimeframeStoreData(
        categoryCurrentData,
        region,
        currentBrandSkus,
        weeklyTimeframes,
        currentTimeframe,
        category
      );

      weeklyStores = fetchTimeframeStoreData(
        categoryWeeklyData,
        region,
        currentBrandSkus,
        weeklyTimeframes,
        currentTimeframe,
        category
      );

      weeklyProducts = fetchWeeklyProductData(
        categoryWeeklyData,
        region,
        currentBrandSkus,
        weeklyTimeframes,
        currentTimeframe,
        category
      );

      monthlyProducts = fetchMonthlyProducts(
        categoryMonthlyData,
        region,
        currentBrandSkus,
        monthlyTimeframes,
        currentTimeframe,
        category
      );

      if (stores.length) {
        setTimeframeStoreData(stores);
      }
      if (products.length) {
        setTimeframeProductData(products);
      }

      if (weeklyStores.length) {
        setWeeklyStoreData(weeklyStores);
      }

      if (weeklyProducts.length) {
        setWeeklyProductData(weeklyProducts);
      }

      if (monthlyProducts.length) {
        setMonthlyProductData(monthlyProducts);
      }
    }
  }, [
    setCurrentBrandSkus,
    currentBrandSkus,
    region,
    setRegion,
    currentTimeframe,
    setCategory,
    category,
    weeklyTimeframes,
    monthlyRawData,
    setMonthlyRawData,
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
        weeklyTimeframes,
        currentTimeframe,
        setCurrentTimeframe,
        monthlyRawData,
        monthlyProductData,
        allBrandTimeframes,
        brand,
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
