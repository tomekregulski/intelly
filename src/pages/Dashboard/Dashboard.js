import React, { useState } from 'react';
import VelocityTable from '../../components/VelocityTable/VelocityTable';
import SalesRecap from '../../components/SalesRecap/SalesRecap';
import WeeklyTable from '../../components/WeeklyTable/WeeklyTable';
import './dashboard.css';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ChartTabsFullView from '../../components/ChartTabs/ChartTabsFullView';
import ChartTabsTotalSalesMediumView from '../../components/ChartTabs/ChartTabsTotalSalesMediumView';
import ChartTabsSkuSalesMediumView from '../../components/ChartTabs/ChartTabsSkuSalesMediumView';

// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import TotalSalesStores from '../../components/TotalSalesStores/TotalSalesStores';
// import TotalSalesWeeklyStores from '../../components/TotalSalesWeeklyStores/TotalSalesWeeklyStores';
// import TotalSalesStoresByProduct from '../../components/TotalSalesStoresByProduct/TotalSalesStoresByProduct';
import { useAPI } from '../../context/apiContext';
// import MaterialAdvancedTable from '../../components/MaterialAdvancedTable/MaterialAdvancedTable';
import TotalSalesByStoreData from '../../components/TotalSalesStores/TotalSalesByStoreData';
import TotalSalesStoresByProductData from '../../components/TotalSalesStoresByProduct/TotalSalesStoresByProductData';
import TotalStoresAll from '../../components/TotalSalesStores/TotalStoresAll';
import TotalSalesStoresByProductAll from '../../components/TotalSalesStoresByProduct/TotalSalesStoresByProductAll';
import WeeklyChangeByStore from '../../components/WeeklyChangeByStore/WeeklyChangeByStore';
import UnitsSoldPerStorePerWeek from '../../components/UnitsSoldPerStorePerWeek/UnitsSoldPerStorePerWeek';

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

  const breakpoint = 1350;
  React.useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      // unsubscribe "onComponentDestroy"
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
            <div id='secondLevel'>
              <div className='tableContainer'>
                <SalesRecap />
              </div>
              <div className='tableContainer'>
                <UnitsSoldPerStorePerWeek />
              </div>
              <div className='tableContainer'>
                <UnitsSoldPerStorePerWeek />
              </div>
            </div>
            <WeeklyChangeByStore />
          </div>

          {region !== 'all regions' && (
            <div id='charts'>
              {width > breakpoint ? (
                <ChartTabsFullView />
              ) : (
                <>
                  <ChartTabsTotalSalesMediumView />
                  <ChartTabsSkuSalesMediumView />
                  {/* <TotalSalesByStoreData /> */}
                  {/* <TotalSalesStoresByProductData /> */}
                </>
              )}
            </div>
          )}
        </div>
      </main>
    );
  } else {
    return <h1 className='loading'>Please wait while we fetch your data...</h1>;
  }
}

export default Dashboard;
