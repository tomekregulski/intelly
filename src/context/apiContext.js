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
  const [roles, setRoles] = useState('');
  const [access, setAccess] = useState('');
  const [userBrands, setUserBrands] = useState([]);
  const [brand, setBrand] = useState('');

  const [allBrandTimeframes, setAllBrandTimeframes] = useState([]);
  const [currentTimeframe, setCurrentTimeframe] = useState('');
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

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('user'))) {
      const user = JSON.parse(localStorage.getItem('user'));
      setRoles(user.roles);
      setAccess(user.access.split(','));
    }
  }, []);

  // Once user is logged in and brand is set to their brands[0], query DB for a complete list of their WFM data entry dates (timeframes) and default the current selection to the most recent entry
  useEffect(() => {
    if (roles !== '' && access !== '') {
      setAllBrandTimeframes([]);
      setCurrentTimeframe('');
      async function fetchData() {
        const apiResponse = await axios.get(
          `https://intelly-server.herokuapp.com/api/whole-foods-timeframe-data/timeframes`,
          {
            headers: { brand: brand, roles: roles, access: access },
          }
        );

        let tf = [];

        apiResponse.data.forEach((entry) => {
          tf.push(entry['timeframe']);
        });
        setAllBrandTimeframes(tf);
        setCurrentTimeframe(tf[0]);
      }
      fetchData();
    }
  }, [access, brand, roles, setBrand]);

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
    if (currentTimeframe !== '') {
      async function fetchData() {
        const apiResponse = await axios.get(
          `https://intelly-server.herokuapp.com/api/whole-foods-timeframe-data`,
          {
            headers: {
              brand: brand,
              timeframe: currentTimeframe,
              roles: roles,
              access: access,
            },
          }
        );
        setCurrentTimeframeRawData(apiResponse.data);
      }
      fetchData();
    }
  }, [setCurrentTimeframe, currentTimeframe, brand, roles, access]);

  // When currentTimeframe is updated, query the DB for the "Last Week" data of the last four timeframes to use for the Weekly Data view
  useEffect(() => {
    if (weeklyTimeframes.length) {
      async function fetchData() {
        const apiResponse = await axios.get(
          `https://intelly-server.herokuapp.com/api/whole-foods-timeframe-data/weekly`,
          {
            headers: {
              brand: brand,
              roles: roles,
              access: access,
              timeframes: weeklyTimeframes,
            },
          }
        );
        setWeeklyRawData(apiResponse.data);
      }
      fetchData();
    }
  }, [access, brand, roles, setWeeklyTimeframes, weeklyTimeframes]);

  // When currentTimeframe is updated, query the DB for the "Four Weeks" data of the specified timeframes to use for the Monthly Data view
  useEffect(() => {
    if (monthlyTimeframes.length) {
      async function fetchData() {
        const apiResponse = await axios.get(
          `https://intelly-server.herokuapp.com/api/whole-foods-timeframe-data/monthly`,
          {
            headers: {
              brand: brand,
              roles: roles,
              access: access,
              timeframes: monthlyTimeframes,
            },
          }
        );
        setMonthlyRawData(apiResponse.data);
      }
      fetchData();
    }
  }, [access, brand, monthlyTimeframes, roles, setMonthlyTimeframes]);

  // Once the weekly data is set, iterate through it to set states for currentBrandRegions, currentBrandSkus, categoryList, and region
  useEffect(() => {
    if (weeklyRawData.length) {
      let regionList = [];
      let skuList = [];
      let categoryList = [];

      weeklyRawData.forEach((entry) => {
        if (!regionList.includes(entry.region)) {
          regionList.push(entry.region);
        }

        if (!skuList.includes(entry.sku_name)) {
          skuList.push(entry.sku_name);
        }

        if (!categoryList.includes(entry.category)) {
          categoryList.push(entry.category);
        }
      });

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

      if (products.length) {
        setTimeframeProductData(products);
      }

      if (stores.length) {
        setTimeframeStoreData(stores);
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
    currentTimeframeRawData,
    weeklyRawData,
    monthlyTimeframes,
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
