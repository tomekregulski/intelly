import React, { useState, useEffect } from 'react';
import { useAPI } from '../../context/apiContext';

const TotalSalesStores = () => {
  const [data, setData] = useState([]);
  const { storeData } = useAPI();

  useEffect(() => {
    if (storeData) {
      const totalSalesByStore = [];

      for (let i = 0; i < storeData.length; i++) {
        let storeTotal = 0;
        let storeName = storeData[i].name;
        for (const sku in storeData[i].sales) {
          storeTotal = storeTotal + storeData[i].sales[sku].week1;
        }
        let obj = {};
        obj['name'] = storeName;
        obj['sales'] = storeTotal;
        totalSalesByStore.push(obj);
      }
      setData(totalSalesByStore);
    }
  }, []);

  return (
    <div>
      <p>Total Sales Stores</p>
      {/* {data.length && data.map((item) => <span>{item.name}</span>)} */}
    </div>
  );
};

export default TotalSalesStores;
