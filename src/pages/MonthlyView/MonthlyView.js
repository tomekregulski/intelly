import React from 'react';
import MonthlySalesRecap from '../../components/MonthlySalesRecap/MonthlySalesRecap';
import MonthlyVelocityTable from '../../components/MonthlyVelocityTable/MonthlyVelocityTable';
import MonthlyRevenueRecap from '../../components/MonthlyRevenueRecap/MonthlyRevenueRecap';
import './monthlyView.css';

const MonthlyView = () => {
  return (
    <div id='monthlyViewContainer'>
      <MonthlyRevenueRecap />
      <MonthlySalesRecap />
      <MonthlyVelocityTable />
    </div>
  );
};

export default MonthlyView;
