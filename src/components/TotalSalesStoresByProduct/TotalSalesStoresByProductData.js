import React, { useEffect, useState } from 'react';
import { useAPI } from '../../context/apiContext';
import TotalSalesStoresByProduct from './TotalSalesStoresByProduct';
import './totalSalesStoresByProduct.css';

const TotalSalesStoresByProductData = () => {
  const [array, setArray] = useState([]);

  const { skusTimeframe, timeframeStoreData } = useAPI();

  useEffect(() => {
    if (timeframeStoreData && skusTimeframe) {
      let newStoresList = [];
      let totalChunked = [];

      timeframeStoreData.forEach((entry) => {
        let totalSales = 0;
        let storeName = '';

        let salesObj = entry.sales;
        for (const property in salesObj) {
          if (storeName === '') {
            storeName = entry.name;
          }
          if (salesObj[property]['week1']) {
            totalSales = totalSales + salesObj[property]['week1'];
          }
        }
        newStoresList.push({
          name: storeName,
          totalSales: totalSales,
          skuSales: salesObj,
        });
      });

      const sortedStoreList = newStoresList.sort((a, b) =>
        a.totalSales > b.totalSales ? -1 : 1
      );

      let size = 20;
      let index = 0;
      while (index < sortedStoreList.length) {
        totalChunked.push(sortedStoreList.slice(index, index + size));
        index += size;
      }
      setArray(totalChunked);
    }
  }, [timeframeStoreData, skusTimeframe]);

  return (
    <div id='salesByStoreByProductContainer'>
      {/* {array.length &&
        array.map((item, index) => (
          <TotalSalesStoresByProduct key={index} data={item} />
        ))} */}
    </div>
  );
};
export default TotalSalesStoresByProductData;
