import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useAPI } from '../../context/apiContext';
import './totalSalesStore.css';

const options = {
  indexAxis: 'y',
  // Elements options apply to all of the options unless overridden in a dataset
  // In this case, we are setting the border of each horizontal bar to be 2px wide
  elements: {
    bar: {
      borderWidth: 1,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Total Unit Sales x Store - Last Week',
    },
  },
};

const TotalSalesStores = () => {
  const [dataChart, setDataChart] = useState({});
  // const [data, setData] = useState({});

  const { storeData } = useAPI();

  useEffect(() => {
    if (storeData) {
      const totalSalesByStore = [];
      let stores = [];
      let sales = [];

      for (let i = 0; i < storeData.length; i++) {
        let storeTotal = 0;
        let storeName = storeData[i].name;
        for (const sku in storeData[i].sales) {
          storeTotal = storeTotal + storeData[i].sales[sku].week1;
        }
        let obj = {};
        obj['name'] = storeName;
        obj['sales'] = storeTotal;
        stores.push(storeName);
        sales.push(storeTotal);
        totalSalesByStore.push(obj);
      }

      // setData(totalSalesByStore);
      setDataChart({
        labels: stores,
        datasets: [
          {
            label: 'Sales',
            data: sales,
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
          },
        ],
      });
    }
  }, [storeData]);

  return (
    <div id='salesByStore'>
      <Bar data={dataChart} options={options} />
    </div>
  );
};
export default TotalSalesStores;
