import React from 'react';
// import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import styles from '../styles/DashboardStyles';

function Dashboard(props) {
  const { classes } = props;
  return (
    <div className={classes.homeBackground}>
      <main className={classes.main}>
        <div className={classes.callToAction}>
          {/* <p className={classes.ctaText}>
            Hard Tellin' and Songs From the Bitterroot
          </p>
          <p className={classes.ctaText}>
            are available for purchase on Band Camp!
          </p>
          <Button
            className={classes.ctaBtn}
            href='https://taylorackley.bandcamp.com/album/hard-tellin'
            target='_blank'
            rel='noreferrer'
            variant='contained'
            color='primary'
          >
            Find Them Here!
          </Button> */}
        </div>
      </main>
    </div>
  );
}

export default withStyles(styles)(Dashboard);
