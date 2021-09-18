import React, { useState, useEffect } from 'react';
import { useAPI } from '../../context/apiContext';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TotalSalesStoresByProduct from '../TotalSalesStoresByProduct/TotalSalesStoresByProduct';
import './chartTabs.css';

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
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'rgba(228, 223, 223, 0.2)',
  },
  appBar: {
    color: 'black',
    backgroundColor: 'rgba(0, 180, 249, 0.872)',
    boxShadow: 'none',
  },
}));

export default function ChartTabsSkuSalesMediumView() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [array, setArray] = useState([]);

  const { skusTimeframe, timeframeStoreData } = useAPI();

  useEffect(() => {
    if (timeframeStoreData) {
      let totalChunked = [];

      let size = 20;
      let index = 0;
      while (index < timeframeStoreData.length) {
        totalChunked.push(timeframeStoreData.slice(index, index + size));
        index += size;
      }
      setArray(totalChunked);
    }
  }, [timeframeStoreData, skusTimeframe]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div id='skuSalesChartRoot'>
      <AppBar className={classes.appBar} position='static'>
        <p style={{ marginTop: '10px' }}>
          Unit Sales x Store x SKU - Last Week
        </p>
        <Tabs
          TabIndicatorProps={{ style: { background: 'white' } }}
          value={value}
          onChange={handleChange}
          aria-label='simple tabs example'
        >
          {array.length &&
            array.map((item, index) => (
              <Tab
                key={index}
                label={'Page ' + (index + 1)}
                {...a11yProps(0)}
              />
            ))}
        </Tabs>
      </AppBar>
      {array.length &&
        array.map((item, index) => (
          <>
            <TabPanel key={index} value={value} index={index}>
              <TotalSalesStoresByProduct key={index} data={item} />
            </TabPanel>
          </>
        ))}
    </div>
  );
}
