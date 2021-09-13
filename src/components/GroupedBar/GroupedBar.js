import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useAPI } from '../../context/apiContext';

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
};

const GroupedBar = () => {
  const [dataChart, setDataChart] = useState({});
  // const [data, setData] = useState({});

  const { storeData } = useAPI();

  useEffect(() => {
    if (storeData) {
      let stores = [];
      let classic = [];
      let garlic = [];
      let basil = [];

      for (let i = 0; i < storeData.length; i++) {
        stores.push(storeData[i].name);
        classic.push(storeData[i].sales.Classic.week1);
        garlic.push(storeData[i].sales.Garlic.week1);
        basil.push(storeData[i].sales.Basil.week1);
      }

      console.log(stores);
      console.log(classic);
      console.log(garlic);
      console.log(basil);

      // setData(totalSalesByStore);
      setDataChart({
        labels: stores,
        datasets: [
          {
            label: 'Classic',
            data: classic,
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
          },
          {
            label: 'Garlic',
            data: garlic,
            backgroundColor: ['rgba(54, 162, 235, 0.2)'],
          },
          {
            label: 'Basil',
            data: basil,
            backgroundColor: ['rgba(75, 192, 192, 0.2)'],
          },
        ],
      });
    }
  }, [storeData]);
  return (
    <>
      <div className='header'>
        <h1 className='title'>Sales x Store x Product</h1>
      </div>
      <Bar data={dataChart} options={options} />
    </>
  );
};
export default GroupedBar;
