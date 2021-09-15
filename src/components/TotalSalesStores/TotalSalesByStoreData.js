import React, { useEffect, useState } from 'react';
import { useAPI } from '../../context/apiContext';
import './totalSalesStore.css';
import TotalSalesStores from './TotalSalesStores';
import './totalSalesStore.css';

const TotalSalesByStoresData = () => {
  // const [dataChart, setDataChart] = useState({});
  // const [storesArray, setStoresArray] = useState([]);
  // const [salesArray, setSalesArray] = useState([]);
  const [array, setArray] = useState([]);

  const { timeframeStoreData } = useAPI();

  useEffect(() => {
    if (timeframeStoreData) {
      let totalSalesByStore = [];
      // let stores = [];
      // let sales = [];
      // let storesChunked = [];
      // let salesChunked = [];
      let totalChunked = [];
      for (let i = 0; i < timeframeStoreData.length; i++) {
        let storeTotal = 0;
        let storeName = timeframeStoreData[i].name;
        for (const sku in timeframeStoreData[i].sales) {
          let number = 0;
          if (timeframeStoreData[i].sales[sku].week1) {
            number = timeframeStoreData[i].sales[sku].week1;
          }
          storeTotal = storeTotal + number;
        }
        let obj = {};
        obj['name'] = storeName;
        obj['sales'] = storeTotal;
        totalSalesByStore.push(obj);
      }

      totalSalesByStore.sort((a, b) => (a.sales > b.sales ? -1 : 1));
      // console.log(totalSalesByStore);

      // for (let i = 0; i < totalSalesByStore.length; i++) {
      //   stores.push(totalSalesByStore[i].name);
      //   sales.push(totalSalesByStore[i].sales);
      // }

      // console.log(stores);
      // console.log(sales);

      let size = 20;
      let index = 0;
      while (index < totalSalesByStore.length) {
        // storesChunked.push(stores.slice(index, index + size));
        // salesChunked.push(sales.slice(index, index + size));
        totalChunked.push(totalSalesByStore.slice(index, index + size));
        index += size;
      }
      // console.log(storesChunked);
      // console.log(salesChunked);
      // console.log(totalChunked);

      // setStoresArray(storesChunked);
      // setSalesArray(salesChunked);
      setArray(totalChunked);

      // setDataChart({
      //   labels: stores,
      //   datasets: [
      //     {
      //       label: 'Sales',
      //       data: sales,
      //       backgroundColor: ['rgba(255, 99, 132, 0.2)'],
      //     },
      //   ],
      // });
    }
  }, [timeframeStoreData]);

  // const renderCharts = () => {
  //   array.map((item) => {
  //      <HorizontalBarChart props={item} />;
  //   });
  // };

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
