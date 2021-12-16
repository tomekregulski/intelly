import React from 'react';
import { useAPI } from '../../context/apiContext';

import ChartTabsTotalSalesMediumView from '../../components/ChartTabs/ChartTabsTotalSalesMediumView';
import ChartTabsSkuSalesMediumView from '../../components/ChartTabs/ChartTabsSkuSalesMediumView';
import TotalSalesByStoreTable from '../../components/TotalSalesStores/TotalSalesByStoreTable';

import './weeklyView.css';

const WeeklyTabC = () => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const { region } = useAPI();

  const breakpoint = 650;
  React.useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  return (
    <div id='weeklyTabC'>
      {region !== 'all regions' && (
        <div id='charts'>
          {width > breakpoint ? (
            <>
              {/* <ChartTabsTotalSalesMediumView /> */}
              <div style={{ height: '30px' }}></div>
              <ChartTabsSkuSalesMediumView />
            </>
          ) : (
            <TotalSalesByStoreTable />
          )}
        </div>
      )}
    </div>
  );
};

export default WeeklyTabC;
