import React, { useState, useEffect } from 'react';
// import { Button } from '@material-ui/core';
// import { withStyles } from '@material-ui/styles';
// import styles from '../styles/DashboardStyles';
import practiceData from '../../data/data';
// import BarChart from '../../components/BarChart/BarChart';
import VelocityTable from '../../components/VelocityTable/VelocityTable';
import RevenueTable from '../../components/RevenueTable/RevenueTable';
import WeeklyTable from '../../components/WeeklyTable/WeeklyTable';
import './dashboard.css';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Dashboard(props) {
  const [data, setData] = useState([]);
  const [skuMap, setSkuMap] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const classes = useStyles();

  // console.log(practiceData);

  useEffect(() => {
    setData(practiceData);
    setFilteredData(practiceData);
  }, []);

  useEffect(() => {
    let skus = [];
    // console.log(data);
    if (filteredData.length) {
      filteredData.map((item) => {
        if (!skus.find((o) => o.name === item.sku)) {
          skus.push({
            name: item.sku,
            stores: 0,
            salesWeek: 0,
            salesWeek2: 0,
            salesWeek3: 0,
            salesWeek4: 0,
            sales4W: 0,
            sales12W: 0,
            sales52W: 0,
            price: 0,
          });
        }
      });
    }

    for (var i = 0; i < filteredData.length; i++) {
      for (var j = 0; j < skus.length; j++) {
        if (filteredData[i].sku === skus[j].name) {
          skus[j].stores = skus[j].stores + 1;
          skus[j].salesWeek = skus[j].salesWeek + filteredData[i].salesWeek;
          skus[j].salesWeek2 = skus[j].salesWeek2 + filteredData[i].salesWeek2;
          skus[j].salesWeek3 = skus[j].salesWeek3 + filteredData[i].salesWeek3;
          skus[j].salesWeek4 = skus[j].salesWeek4 + filteredData[i].salesWeek4;
          skus[j].sales4W =
            skus[j].sales4W +
            filteredData[i].salesWeek +
            filteredData[i].salesWeek2 +
            filteredData[i].salesWeek3 +
            filteredData[i].salesWeek4;
          skus[j].sales12W = skus[j].sales12W + filteredData[i].sales12W;
          skus[j].sales52W = skus[j].sales52W + filteredData[i].sales52W;
          skus[j].price = filteredData[i].price;
        }
      }
    }
    setSkuMap(skus);
  }, [filteredData, setFilteredData]);

  const filterRegion = () => {
    const northeast = data.filter((item) => item.region === 'northeast');
    console.log(northeast);
  };

  const handleChange = (event) => {
    event.preventDefault();
    // setRegion(event.target.value);
    console.log(event.target.value);
    const newRegion = event.target.value;
    if (event.target.value === 'all regions') {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter((item) => item.region === newRegion));
    }
  };

  return (
    <div>
      <main>
        <div className='chartContainer'>
          {/* {classic.length ? <BarChart data={classic} datakey='sales' /> : null}
          {basil.length ? <BarChart data={basil} datakey='sales' /> : null}
          {garlic.length ? <BarChart data={garlic} datakey='sales' /> : null} */}
        </div>
        <FormControl className={classes.formControl}>
          <InputLabel id='demo-simple-select-label'>Region</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            onChange={handleChange}
          >
            <MenuItem value={'all regions'}>All Regions</MenuItem>
            <MenuItem value={'northeast'}>Northeast</MenuItem>
            <MenuItem value={'north atlantic'}>North Atlatic</MenuItem>
            <MenuItem value={'southeast'}>Southeast</MenuItem>
          </Select>
        </FormControl>
        <div>
          <RevenueTable data={skuMap} />
          <VelocityTable data={skuMap} />
          <WeeklyTable data={skuMap} />
        </div>
        <button onClick={filterRegion}>Filter</button>
      </main>
    </div>
  );
}

export default Dashboard;
