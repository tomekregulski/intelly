import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useAPI } from '../../context/apiContext';
import './totalSalesStore.css';

const options = {
  // indexAxis: 'y',
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
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

  const { timeframeStoreData } = useAPI();

  useEffect(() => {
    if (timeframeStoreData) {
      const totalSalesByStore = [];
      let stores = [];
      let sales = [];

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
        stores.push(storeName);
        sales.push(storeTotal);
        totalSalesByStore.push(obj);
      }

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
  }, [timeframeStoreData]);

  return (
    <div id='salesByStore'>
      <Bar data={dataChart} options={options} />
    </div>
  );
};
export default TotalSalesStores;
