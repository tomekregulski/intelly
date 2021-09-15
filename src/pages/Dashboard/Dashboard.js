import React, { useState } from 'react';
import { useAPI } from '../../context/apiContext';
import SalesRecap from '../../components/SalesRecap/SalesRecap';
import './dashboard.css';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ChartTabsTotalSalesMediumView from '../../components/ChartTabs/ChartTabsTotalSalesMediumView';
import ChartTabsSkuSalesMediumView from '../../components/ChartTabs/ChartTabsSkuSalesMediumView';
import TotalSalesByStoreTable from '../../components/TotalSalesStores/TotalSalesByStoreTable';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import WeeklyChangeByStore from '../../components/WeeklyChangeByStore/WeeklyChangeByStore';
import UnitsSoldPerStorePerWeek from '../../components/UnitsSoldPerStorePerWeek/UnitsSoldPerStorePerWeek';
import WeeklyTable from '../../components/WeeklyTable/WeeklyTable';

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
  const [width, setWidth] = React.useState(window.innerWidth);
  const { setRegion, timeframeRegions, region, timeframeStoreData } = useAPI();
  const classes = useStyles();

  const breakpoint = 650;
  React.useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  const handleChange = (event) => {
    event.preventDefault();
    setRegion('' || event.target.value);
  };
  if (timeframeStoreData.length) {
    return (
      <main>
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

        <section id='dataSection'>
          <div id='topLevel'>
            <div id='secondLevel'>
              <div className='tableContainer'>
                <SalesRecap />
              </div>
              <div className='tableContainer'>
                <UnitsSoldPerStorePerWeek />
              </div>
              <div className='tableContainer'>
                <WeeklyTable />
              </div>
            </div>
            <WeeklyChangeByStore />
          </div>

          {region !== 'all regions' && (
            <div id='charts'>
              {width > breakpoint ? (
                <>
                  <ChartTabsTotalSalesMediumView />
                  <ChartTabsSkuSalesMediumView />
                </>
              ) : (
                <TotalSalesByStoreTable />
              )}
            </div>
          )}
          <div style={{ height: '30px' }}>{/* <p>Hello</p> */}</div>
        </section>
      </main>
    );
  } else {
    return <h1 className='loading'>Please wait while we fetch your data...</h1>;
  }
}

export default Dashboard;
