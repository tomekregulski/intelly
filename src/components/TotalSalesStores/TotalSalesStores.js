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
      console.log(props);
      let stores = [];
      let sales = [];

      for (let i = 0; i < props.data.length; i++) {
        stores.push(props.data[i].name);
        sales.push(props.data[i].totalSalesWeek1);
      }

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

  return (
    <div id='salesByStore'>
      <Bar data={dataChart} options={options} />
    </div>
  );
};
export default TotalSalesStores;
