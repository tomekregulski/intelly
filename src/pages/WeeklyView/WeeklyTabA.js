import React from 'react';

import UnitsSoldPerStorePerWeek from '../../components/UnitsSoldPerStorePerWeek/UnitsSoldPerStorePerWeek';
import WeeklyTable from '../../components/WeeklyTable/WeeklyTable';
import SalesRecap from '../../components/SalesRecap/SalesRecap';

import './weeklyView.css';

const WeeklyTabA = () => {
  return (
    <div id='weeklyTabA'>
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
  );
};

export default WeeklyTabA;
