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
  },
};

const TotalSalesStoresByProduct = (props) => {
  const [dataChart, setDataChart] = useState({});
  const [data, setData] = useState([]);

  const { timeframeProductData } = useAPI();

  useEffect(() => {
    setData(props.data);
  }, [props]);

  useEffect(() => {
    if (data.length) {
      let stores = [];
      let salesData = [];
      let currentSkus = [];

      timeframeProductData.forEach((entry) => {
        currentSkus.push(entry.name);
      });

      currentSkus.forEach((sku, index) => {
        salesData.push({
          label: sku,
          data: [],
          backgroundColor: colors[index],
        });
      });

      data.forEach((entry) => {
        stores.push(entry.name);
        let salesObj = entry.sales;
        for (const property in salesObj) {
          const index = salesData.find((x) => x.label === property);
          if (salesObj[property]['week1']) {
            index.data.push(salesObj[property]['week1']);
          } else {
            index.data.push(0);
          }
        }
      });

      setDataChart({
        labels: stores,
        datasets: salesData,
      });
    }
  }, [data, setData, timeframeProductData]);

  return (
    <div id='salesByStoreByProduct'>
      {Object.keys(dataChart).length > 0 ? (
        <Bar data={dataChart} options={options} />
      ) : null}
    </div>
  );
};
export default TotalSalesStoresByProduct;
