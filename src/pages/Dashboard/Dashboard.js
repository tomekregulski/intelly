import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
// import styles from '../styles/DashboardStyles';
// import BarChart from '../../components/BarChart/BarChart';
import VelocityTable from '../../components/VelocityTable/VelocityTable';
import RevenueTable from '../../components/RevenueTable/RevenueTable';
import WeeklyTable from '../../components/WeeklyTable/WeeklyTable';
import './dashboard.css';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TotalSalesStores from '../../components/TotalSalesStores/TotalSalesStores';
import TotalSalesWeeklyStores from '../../components/TotalSalesWeeklyStores/TotalSalesWeeklyStores';
import TotalSalesStoresByProduct from '../../components/TotalSalesStoresByProduct/TotalSalesStoresByProduct';
import TestChart from '../../components/TestChart/TestChart';

import { useAPI } from '../../context/apiContext';

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
  const { setRegion } = useAPI();
  const classes = useStyles();

  const handleChange = (event) => {
    event.preventDefault();
    setRegion(event.target.value);
    console.log(event.target.value);
  };

  return (
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
        <RevenueTable />
        <VelocityTable />
        <WeeklyTable />
        <TotalSalesWeeklyStores />
        <TotalSalesStores />
        <TotalSalesStoresByProduct />
        <TestChart />
      </div>
    </main>
  );
}

export default Dashboard;
