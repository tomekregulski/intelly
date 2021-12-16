import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
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
      // position: 'top',
      display: false,
    },
    // title: {
    //   display: true,
    //   text: 'Total Unit Sales x Store - Last Week',
    // },
  },
};

const TotalSalesStores = (props) => {
  const [dataChart, setDataChart] = useState({});

  useEffect(() => {
    if (props) {
      let stores = [];
      let sales = [];

      props.data.forEach((prop) => {
        stores.push(prop.name);
        sales.push(prop.totalSalesWeek1);
      });

      setDataChart({
        labels: stores,
        datasets: [
          {
            // label: 'Sales',
            data: sales,
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
          },
        ],
      });
    }
  }, [props]);

  console.log(dataChart);

  return (
    <div id='salesByStore'>
      {/* {Object.keys(dataChart).length > 0 ? (
        <Bar data={dataChart} options={options} />
      ) : null} */}
    </div>
  );
};
export default TotalSalesStores;
