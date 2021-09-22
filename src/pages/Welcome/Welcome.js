import React from 'react';
import WelcomeTable from '../../components/WelcomeTable/WelcomeTable';

const Welcome = () => {
  return (
    <div style={{ textAlign: 'center', margin: '40px auto 0', width: '90%' }}>
      <h1>Retail Data Dashboard</h1>
      <p style={{ marginTop: '15px' }}>
        The table on this page displays a handful of top-level metrics for your
        brand and region.
      </p>
      <p style={{ marginTop: '5px' }}>
        Use the menu in the top-left corner to shift focus, or head into the
        Weekly and Monthly views to dive deeper.
      </p>
      <WelcomeTable />
    </div>
  );
};

export default Welcome;
