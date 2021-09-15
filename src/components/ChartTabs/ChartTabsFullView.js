import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TotalStoresAll from '../TotalSalesStores/TotalStoresAll';
import TotalSalesStoresByProductAll from '../TotalSalesStoresByProduct/TotalSalesStoresByProductAll';

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
    backgroundColor: 'rgba(242, 242, 242, 0.2)',
  },
  appBar: {
    color: 'black',
    backgroundColor: 'rgba(20, 175, 242, 0.44)',
    boxShadow: 'none',
  },
}));
export default function ChartTabsFullView() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position='static'>
        <Tabs
          TabIndicatorProps={{ style: { background: 'white' } }}
          value={value}
          onChange={handleChange}
          aria-label='simple tabs example'
        >
          <Tab label='Total Sales by Store' {...a11yProps(0)} />
          <Tab label='Sales by Store by SKU' {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <TotalStoresAll />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TotalSalesStoresByProductAll />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
}
