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
    title: {
      display: true,
      text: 'Unit Sales x Store x SKU - Last Week',
    },
  },
};

const TotalSalesStoresByProductAll = () => {
  const [dataChart, setDataChart] = useState({});

  const { skusTimeframe, timeframeStoreData } = useAPI();

  console.log(timeframeStoreData);

  // useEffect(() => {
  //   if (timeframeStoreData.length) {
  //     timeframeStoreData.sort();
  //   }
  // })

  useEffect(() => {
    let tempData = [];

    for (let i = 0; i < timeframeStoreData.length; i++) {
      let totalSales = 0;
      let salesObj = timeframeStoreData[i].sales;
      for (const property in salesObj) {
        if (salesObj[property]['week1']) {
          totalSales = totalSales + salesObj[property]['week1'];
        }
      }
      let obj = {
        name: timeframeStoreData[i].name,
        totalSales: totalSales,
        sales: timeframeStoreData[i].sales,
      };
      tempData.push(obj);
    }

    tempData.sort((a, b) => (a.totalSales > b.totalSales ? -1 : 1));
    console.log(tempData);
  });

  useEffect(() => {
    if (timeframeStoreData && skusTimeframe) {
      let stores = [];
      let salesData = [];

      for (let i = 0; i < skusTimeframe.length; i++) {
        salesData.push({
          label: skusTimeframe[i],
          data: [],
          backgroundColor: colors[i],
        });
      }

      for (let i = 0; i < timeframeStoreData.length; i++) {
        stores.push(timeframeStoreData[i].name);
        let salesObj = timeframeStoreData[i].sales;
        for (const property in salesObj) {
          const index = salesData.find((x) => x.label === property);
          index.data.push(salesObj[property]['week1']);
        }
      }

      setDataChart({
        labels: stores,
        datasets: salesData,
      });
    }
  }, [timeframeStoreData, skusTimeframe]);

  return (
    <div id='salesStoreByProduct'>
      <Bar data={dataChart} options={options} />
    </div>
  );
};
export default TotalSalesStoresByProductAll;