import React from 'react';
import VelocityTable from '../../components/VelocityTable/VelocityTable';
import SalesRecap from '../../components/SalesRecap/SalesRecap';
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
  const { setRegion, timeframeRegions, region, timeframeStoreData } = useAPI();
  const classes = useStyles();

  const handleChange = (event) => {
    event.preventDefault();
    setRegion('' || event.target.value);
  };
  if (timeframeStoreData.length) {
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
            {timeframeRegions.length
              ? timeframeRegions.map((reg, index) => (
                  <MenuItem key={index} value={reg}>
                    {reg}
                  </MenuItem>
                ))
              : null}
          </Select>
        </FormControl>
        <div>
          <div id='topLevel'>
            <SalesRecap />
            <VelocityTable />
            <WeeklyTable />
            <TotalSalesWeeklyStores />
          </div>
          <div id='charts'>
            <TotalSalesStores />
            <TotalSalesStoresByProduct />
          </div>
        </div>
      </main>
    );
  } else {
    return <h1 className='loading'>Please wait while we fetch your data...</h1>;
  }
}

export default Dashboard;
