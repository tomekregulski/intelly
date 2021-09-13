import React from 'react';
// import { Button } from '@material-ui/core';
// import { withStyles } from '@material-ui/styles';
// import styles from '../styles/DashboardStyles';
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

function Dashboard() {
  const { setRegion, region, regions } = useAPI();
  const classes = useStyles();

  const handleChange = (event) => {
    event.preventDefault();
    setRegion('' || event.target.value);
  };

  return (
    <main>
      <div className='chartContainer'></div>
      <FormControl id='regionSelect' className={classes.formControl}>
        <InputLabel>All Regions</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={region}
          onChange={handleChange}
        >
          <MenuItem value={'all regions'}>All Regions</MenuItem>
          {/* {regions.length &&
            regions.map((reg, index) => (
              <MenuItem key={index} value={reg}>
                {reg}
              </MenuItem>
            ))} */}
          <MenuItem value={'northeast'}>Northeast</MenuItem>
          <MenuItem value={'north atlantic'}>North Atlatic</MenuItem>
          <MenuItem value={'southeast'}>Southeast</MenuItem>
        </Select>
      </FormControl>
      <div>
        <RevenueTable />
        <VelocityTable />
        <TotalSalesStores />
        <WeeklyTable />
        <TotalSalesWeeklyStores />
        <TotalSalesStoresByProduct />
      </div>
    </main>
  );
}

export default Dashboard;
