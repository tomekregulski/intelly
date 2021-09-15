import React, { useState } from 'react';
import { useAPI } from '../../context/apiContext';
import SalesRecap from '../../components/SalesRecap/SalesRecap';
import './weeklyView.css';
import { makeStyles } from '@material-ui/core/styles';
import ChartTabsTotalSalesMediumView from '../../components/ChartTabs/ChartTabsTotalSalesMediumView';
import ChartTabsSkuSalesMediumView from '../../components/ChartTabs/ChartTabsSkuSalesMediumView';
import TotalSalesByStoreTable from '../../components/TotalSalesStores/TotalSalesByStoreTable';
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
  const { timeframeRegions, region, timeframeStoreData } = useAPI();
  const classes = useStyles();

  const breakpoint = 650;
  React.useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  if (timeframeStoreData.length) {
    return (
      <main>
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
