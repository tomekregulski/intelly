import React, { useState, useEffect } from 'react';
// import { Button } from '@material-ui/core';
// import { withStyles } from '@material-ui/styles';
// import styles from '../styles/DashboardStyles';
import practiceData from '../data/data';
import BarChart from '../charts/BarChart';
import './dashboard.css';

function Dashboard(props) {
  const [data, setData] = useState([]);
  const [classic, setClassic] = useState([]);
  const [basil, setBasil] = useState([]);
  const [garlic, setGarlic] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [avgSales, setAvgSales] = useState(0);

  useEffect(() => {
    setData(practiceData);
    if (!data.length) {
      practiceData.map((item) =>
        setClassic((classic) => [
          ...classic,
          { store: item.name, sales: item.classic },
        ])
      );
      practiceData.map((item) =>
        setBasil((basil) => [...basil, { store: item.name, sales: item.basil }])
      );
      practiceData.map((item) =>
        setGarlic((garlic) => [
          ...garlic,
          { store: item.name, sales: item.garlic },
        ])
      );
    }
    // calcSales();
  }, []);

  const calcSales = () => {
    console.log(' hello sales');
  };

  useEffect(() => {
    if (data.length) {
      let total = 0;
      data.map(
        (item) => (total = totalSales + item.garlic + item.classic + item.basil)
      );
      setTotalSales(total);
    }
  }, [data, setData]);

  useEffect(() => {
    if (data.length) {
      console.log(totalSales);
      console.log(data.length);
      console.log(totalSales / data.length);
      setAvgSales(totalSales / data.length);
    }
  }, [totalSales, setTotalSales]);

  return (
    <div>
      <main>
        <div className='chartContainer'>
          {classic.length ? <BarChart data={classic} datakey='sales' /> : null}
          {basil.length ? <BarChart data={basil} datakey='sales' /> : null}
          {garlic.length ? <BarChart data={garlic} datakey='sales' /> : null}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
