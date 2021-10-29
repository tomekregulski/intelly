import React, { useEffect, useState } from 'react';
import { useAPI } from '../../context/apiContext';
import TotalSalesStores from './TotalSalesStores';
import './totalSalesStore.css';

const TotalSalesByStoresData = () => {
  const [array, setArray] = useState([]);

  const { timeframeStoreData } = useAPI();

  useEffect(() => {
    if (timeframeStoreData) {
      let totalSalesByStore = [];

      let totalChunked = [];
      timeframeStoreData.forEach((entry) => {
        let storeTotal = 0;
        let storeName = entry.name;
        for (const sku in entry.sales) {
          let number = 0;
          if (entry.sales[sku].week1) {
            number = entry.sales[sku].week1;
          }
          storeTotal = storeTotal + number;
        }
        let obj = {};
        obj['name'] = storeName;
        obj['sales'] = storeTotal;
        totalSalesByStore.push(obj);
      });

      totalSalesByStore.sort((a, b) => (a.sales > b.sales ? -1 : 1));

      let size = 20;
      let index = 0;
      while (index < totalSalesByStore.length) {
        totalChunked.push(totalSalesByStore.slice(index, index + size));
        index += size;
      }
      setArray(totalChunked);
    }
  }, [timeframeStoreData]);

  return (
    <div id='salesByStoreContainer'>
      {array.length &&
        array.map((item, index) => (
          <TotalSalesStores key={index} data={item} />
        ))}
    </div>
  );
};
export default TotalSalesByStoresData;
