import React, { useState, useEffect } from 'react';
// import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import styles from '../styles/DashboardStyles';
import practiceData from '../data/data';
import Test from './Test';
import BarChart from '../charts/BarChart';
import './dashboard.css';

function Dashboard(props) {
  const [data, setData] = useState([]);
  const [classic, setClassic] = useState([]);
  const [basil, setBasil] = useState([]);
  const [garlic, setGarlic] = useState([]);

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
  }, []);

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
