import React, { Fragment, useEffect, useState } from 'react';
import MainNavigation from '@/components/Navigation';
import Login from '@/pages/login';
import { getUser } from '@/components/User';
import LineChart from '@/components/LineChart';
import classes from '@/styles/Dashboard.module.css';
import Clock from '@/components/Clock';

const Index = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser(setUser);
  }, []);

  return (
    <>
      {!user ? (
        <Login />
      ) : (
        <Fragment>
          <MainNavigation user={user} />
          <div className={classes.timer}>
            <Clock />
            <h2>Last update: {new Date().toLocaleTimeString()}</h2>
          </div>
          <div className={classes.container}>
            <div className={classes['left-ele']}>
              <div className={classes.percent}>83%</div>
              <div className={classes.text}>Humidity</div>
            </div>
            <div className={`${classes['line-chart']} ${classes['right-ele']}`}>
              <LineChart category="Temperature" />
            </div>
            <div className={classes['left-ele']}>
              <div className={classes['motion-text']}>Motion Detected!</div>
              <div className={classes.time}>At 02:54 am</div>
            </div>
            <div className={`${classes['line-chart']} ${classes['right-ele']}`}>
              <LineChart category="Light intensity" />
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
};

export default Index;
