import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
// import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import WeeklyView from '../WeeklyView/WeeklyView';
import Welcome from '../Welcome/Welcome';
import MonthlyView from '../MonthlyView/MonthlyView';
import { AuthContext } from '../../context/authContext';
import AuthService from '../../Services/auth-service';

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

export default function Navtabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [authState, setauthState] = useContext(AuthContext);

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
    const user = AuthService.getCurrentUser();
    if (user) {
      // console.log(user);
      const brands = user.brands.split(', ');
      // console.log(brands);
      setUserBrands(brands);
      setBrand(brands[0]);
    }
  }, []);

  const handleCategoryChange = (value) => {
    if (categoryList) {
      // console.log(categoryList);
      // console.log(value);
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
      {/* <div style={{ height: '20px', backgroundColor: 'red' }}>
        <button
          value='Condiments'
          onClick={(e) => handleCategoryChange(e.target.value)}
        >
          Condiments
        </button>
        <button
          value='Dips and Salsas'
          onClick={(e) => handleCategoryChange(e.target.value)}
        >
          Salsas
        </button> */}
      {/* </div> */}
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
      {/* </div> */}
      {timeframeStoreData.length ? (
        <>
          <TabPanel value={value} index={0}>
            <Welcome />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <WeeklyView />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <MonthlyView />
          </TabPanel>
        </>
      ) : (
        <h1 className='loading'>Please wait while we fetch your data...</h1>
      )}
    </div>
  );
}
