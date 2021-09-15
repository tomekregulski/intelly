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

const TotalStoresAll = () => {
  const [dataChart, setDataChart] = useState({});

  const { timeframeStoreData } = useAPI();

  useEffect(() => {
    if (timeframeStoreData.length) {
      let totalSalesByStore = [];
      let stores = [];
      let sales = [];
      let sortedData = [];
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

      sortedData = totalSalesByStore.sort((a, b) =>
        a.sales > b.sales ? -1 : 1
      );
      // console.log(sortedData);

      for (let i = 0; i < sortedData.length; i++) {
        stores.push(sortedData[i].name);
        sales.push(sortedData[i].sales);
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
    <div id='totalStoresAllContainer'>
      <Bar data={dataChart} options={options} />
    </div>
  );
};
export default TotalStoresAll;
