import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useAPI } from '../../context/apiContext';
import './totalSalesStoresByProduct.css';

const colors = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',
];

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  plugins: {
    legend: {
      position: 'top',
    },
    // title: {
    //   display: true,
    //   text: 'Unit Sales x Store x SKU - Last Week',
    // },
  },
};

const TotalSalesStoresByProduct = (props) => {
  const [dataChart, setDataChart] = useState({});
  const [data, setData] = useState([]);

  const { skusTimeframe, timeframeProductData } = useAPI();

  // console.log(props.data);

  useEffect(() => {
    setData(props.data);
  }, [props]);

  useEffect(() => {
    // console.log('hello useEffect');
    if (data.length && skusTimeframe) {
      // console.log(data);
      let stores = [];
      let salesData = [];
      let currentSkus = [];
      // console.log(timeframeProductData);

      for (let i = 0; i < timeframeProductData.length; i++) {
        currentSkus.push(timeframeProductData[i].name);
      }
      // console.log(currentSkus);

      for (let i = 0; i < currentSkus.length; i++) {
        salesData.push({
          label: currentSkus[i],
          data: [],
          backgroundColor: colors[i],
        });
      }

      // console.log(salesData);

      for (let i = 0; i < data.length; i++) {
        stores.push(data[i].name);
        let salesObj = data[i].skuSales;
        for (const property in salesObj) {
          // if (currentSkus.includes(property)) {
          const index = salesData.find((x) => x.label === property);
          if (salesObj[property]['week1']) {
            index.data.push(salesObj[property]['week1']);
          } else {
            index.data.push(0);
          }
          // }
        }

        // console.log(salesData);
      }
      // console.log(salesData);
      // console.log(stores);

      setDataChart({
        labels: stores,
        datasets: salesData,
      });
    }
  }, [data, setData]);

  return (
    <div id='salesByStoreByProduct'>
      <Bar data={dataChart} options={options} />
    </div>
  );
};
export default TotalSalesStoresByProduct;
