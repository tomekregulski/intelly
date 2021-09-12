import React from 'react';
import { api } from '../../api/api';
import { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import './chart.css';

export default function TestChart() {
  const [dataChart, setDataChart] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await api
        .get('dayone/country/brazil/status/confirmed')
        .then((response) => {
          console.log(response);
        });
    };
  }, []);

  return (
    <div>
      <p>Test Chart</p>
    </div>
  );
}
