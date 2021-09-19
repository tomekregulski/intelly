import React, { useEffect } from 'react';
import { useAPI } from '../../context/apiContext';
import SalesRecap from '../../components/SalesRecap/SalesRecap';
import './weeklyView.css';
import ChartTabsTotalSalesMediumView from '../../components/ChartTabs/ChartTabsTotalSalesMediumView';
import ChartTabsSkuSalesMediumView from '../../components/ChartTabs/ChartTabsSkuSalesMediumView';
import TotalSalesByStoreTable from '../../components/TotalSalesStores/TotalSalesByStoreTable';
import WeeklyChangeByStore from '../../components/WeeklyChangeByStore/WeeklyChangeByStore';
import UnitsSoldPerStorePerWeek from '../../components/UnitsSoldPerStorePerWeek/UnitsSoldPerStorePerWeek';
import WeeklyTable from '../../components/WeeklyTable/WeeklyTable';

function Dashboard() {
  const [width, setWidth] = React.useState(window.innerWidth);
  const { region, timeframeStoreData } = useAPI();

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
          <div id='weeklyTables'>
            <div id='weeklyTablesColumnA'>
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
            <div id='weeklyTablesColumnB'>
              <WeeklyChangeByStore />
            </div>
          </div>

          {region !== 'all regions' && (
            <div id='charts'>
              {width > breakpoint ? (
                <>
                  <ChartTabsTotalSalesMediumView />
                  <div style={{ height: '30px' }}></div>
                  <ChartTabsSkuSalesMediumView />
                </>
              ) : (
                <TotalSalesByStoreTable />
              )}
            </div>
          )}
          <div style={{ height: '30px' }}></div>
        </section>
      </main>
    );
  } else {
    return <h1 className='loading'>Please wait while we fetch your data...</h1>;
  }
}

export default Dashboard;
