import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Switch from '@mui/material/Switch';

import WeeklyView from '../WeeklyView/WeeklyView';
import WeeklyViewB from '../WeeklyView/WeeklyViewB';
import Welcome from '../Welcome/Welcome';
import MonthlyView from '../MonthlyView/MonthlyView';

import { AuthContext } from '../../context/authContext';

import { useAPI } from '../../context/apiContext';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'div'}>{children}</Typography>
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
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component='a'
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    color: 'black',
    backgroundColor: 'rgba(0, 180, 249, 0.872)',
    boxShadow: 'none',
  },
  categoryBar: {
    height: '40px',
    backgroundColor: 'rgba(0, 180, 249, 0.872)',
    display: 'flex',
    justifyContent: 'space-around',
  },
  categoryButton: {
    backgroundColor: 'transparent',
    width: '100%',
    border: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [checked, setChecked] = React.useState(true);

  const { user } = useContext(AuthContext);
  // eslint-disable-next-line no-unused-vars
  const [userData, setUserData] = user;

  const handleToggleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const {
    setUserBrands,
    setBrand,
    timeframeStoreData,
    categoryList,
    setCategory,
  } = useAPI();

  useEffect(() => {
    const user = userData;
    if (user) {
      const brands = user.brands.split(', ');
      setUserBrands(brands);
      setBrand(brands[0]);
    }
  }, [userData, setBrand, setUserBrands]);

  const handleCategoryChange = (value) => {
    if (categoryList) {
      setCategory(value);
    }
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position='static'>
        <Tabs
          TabIndicatorProps={{
            style: { background: 'rgba(242, 242, 242, .8)' },
          }}
          variant='fullWidth'
          value={value}
          onChange={handleChange}
          aria-label='nav tabs example'
        >
          <LinkTab label='Home' {...a11yProps(0)} />
          <LinkTab label='Weekly View' {...a11yProps(1)} />
          <LinkTab label='Monthly View' {...a11yProps(2)} />
        </Tabs>
      </AppBar>

      {categoryList.length > 1 && (
        <div className={classes.categoryBar}>
          {categoryList.map((category, index) => (
            <button
              key={index}
              className={classes.categoryButton}
              value={categoryList[index]}
              onClick={(e) => handleCategoryChange(e.target.value)}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {timeframeStoreData.length ? (
        <>
          <TabPanel value={value} index={0}>
            <Welcome />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Switch
              checked={checked}
              onChange={handleToggleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            Toggle View
            {checked ? <WeeklyViewB /> : <WeeklyView />}
          </TabPanel>
          <TabPanel value={value} index={2}>
            <MonthlyView />
          </TabPanel>
        </>
      ) : (
        <span className='loading'>Please wait while we fetch your data...</span>
      )}
    </div>
  );
}
