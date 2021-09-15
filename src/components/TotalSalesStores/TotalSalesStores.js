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

const TotalSalesStores = (props) => {
  const [dataChart, setDataChart] = useState({});

  // console.log(props);

  useEffect(() => {
    if (props) {
      // let totalSalesByStore = [];
      let stores = [];
      let sales = [];
      // let storesChunked = [];
      // let salesChunked = [];
      // for (let i = 0; i < 22; i++) {
      //   let storeTotal = 0;
      //   let storeName = timeframeStoreData[i].name;
      //   for (const sku in timeframeStoreData[i].sales) {
      //     let number = 0;
      //     if (timeframeStoreData[i].sales[sku].week1) {
      //       number = timeframeStoreData[i].sales[sku].week1;
      //     }
      //     storeTotal = storeTotal + number;
      //   }
      //   let obj = {};
      //   obj['name'] = storeName;
      //   obj['sales'] = storeTotal;
      //   totalSalesByStore.push(obj);
      // }

      // totalSalesByStore.sort((a, b) => (a.sales > b.sales ? -1 : 1));
      // console.log(totalSalesByStore);

      for (let i = 0; i < props.data.length; i++) {
        stores.push(props.data[i].name);
        sales.push(props.data[i].sales);
      }

      // console.log(stores);
      // console.log(sales);

      // let size = 20;
      // let index = 0;
      // while (index < stores.length) {
      //   storesChunked.push(stores.slice(index, index + size));
      //   salesChunked.push(sales.slice(index, index + size));
      //   index += size;
      // }
      // console.log(storesChunked);
      // console.log(salesChunked);

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
  }, [props]);

  return (
    <div id='salesByStore'>
      <Bar data={dataChart} options={options} />
    </div>
  );
};
export default TotalSalesStores;
