import React, { useState, useEffect } from 'react';
import { useAPI } from '../../context/apiContext';

const TotalSalesStoresByProduct = () => {
  const [data, setData] = useState([]);
  const { storeData } = useAPI();
  // console.log(storeData);
  useEffect(() => {
    if (storeData) {
      setData(storeData);
      // const weeklySalesByStore = [];

      // for (let i = 0; i < storeData.length; i++) {
      //   let week1 = 0;
      //   let week2 = 0;
      //   let week3 = 0;
      //   let week4 = 0;
      //   let storeName = storeData[i].name;
      //   for (const sku in storeData[i].sales) {
      //     week1 = week1 + storeData[i].sales[sku].week1;
      //     week2 = week2 + storeData[i].sales[sku].week2;
      //     week3 = week3 + storeData[i].sales[sku].week3;
      //     week4 = week4 + storeData[i].sales[sku].week4;
      //   }
      //   let obj = {};
      //   obj['name'] = storeName;
      //   obj['week1'] = week1;
      //   obj['week2'] = week2;
      //   obj['week3'] = week3;
      //   obj['week4'] = week4;
      //   weeklySalesByStore.push(obj);
      // }
      // setData(weeklySalesByStore);
    }
  }, []);

  return (
    <div>
      <p>Total Sales Stores by Product</p>
      {/* {data.length && data.map((item) => <span>{item.name}</span>)} */}
    </div>
  );
};

export default TotalSalesStoresByProduct;
