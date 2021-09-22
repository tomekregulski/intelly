import React, { useState } from 'react';
import { useAPI } from '../../context/apiContext';

import WeeklyTabA from './WeeklyTabA';
import WeeklyTabB from './WeeklyTabB';
import WeeklyTabC from './WeeklyTabC';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import './weeklyView.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function WeeklyViewB() {
  const { timeframeStoreData } = useAPI();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (timeframeStoreData.length) {
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='basic tabs example'
          >
            <Tab label='Sales x Product' {...a11yProps(0)} />
            <Tab label='Sales x Store - Table' {...a11yProps(1)} />
            <Tab label='Sales x Store - Charts' {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <WeeklyTabA />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <WeeklyTabB />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <WeeklyTabC />
        </TabPanel>
      </Box>
    );
  } else {
    return <h1 className='loading'>Please wait while we fetch your data...</h1>;
  }
}

export default WeeklyViewB;
