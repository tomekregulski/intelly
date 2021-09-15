import React, { useEffect, useState } from 'react';
import { useAPI } from '../../context/apiContext';
import TotalSalesStoresByProduct from './TotalSalesStoresByProduct';
import './totalSalesStoresByProduct.css';

// const colors = [
//   'rgba(255, 99, 132, 0.2)',
//   'rgba(54, 162, 235, 0.2)',
//   'rgba(255, 206, 86, 0.2)',
//   'rgba(75, 192, 192, 0.2)',
//   'rgba(153, 102, 255, 0.2)',
//   'rgba(255, 159, 64, 0.2)',
// ];

const TotalSalesStoresByProductData = () => {
  // const [dataChart, setDataChart] = useState({});
  const [array, setArray] = useState([]);

  const { skusTimeframe, timeframeStoreData } = useAPI();

  useEffect(() => {
    if (timeframeStoreData && skusTimeframe) {
      // console.log(timeframeStoreData);
      // let stores = [];
      // let salesData = [];
      let newStoresList = [];
      let totalChunked = [];

      for (let i = 0; i < timeframeStoreData.length; i++) {
        let totalSales = 0;
        let storeName = '';

        let salesObj = timeframeStoreData[i].sales;
        for (const property in salesObj) {
          if (storeName === '') {
            storeName = timeframeStoreData[i].name;
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
      }
      // console.log(newStoresList);

      const sortedStoreList = newStoresList.sort((a, b) =>
        a.totalSales > b.totalSales ? -1 : 1
      );
      // console.log(sortedStoreList);

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
      {array.length &&
        array.map((item, index) => (
          <TotalSalesStoresByProduct key={index} data={item} />
        ))}
    </div>
  );
};
export default TotalSalesStoresByProductData;
