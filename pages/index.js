import React, { Fragment, useEffect, useState } from 'react';
import MainNavigation from '@/components/Navigation';
import Login from '@/pages/login';
import { getUser } from '@/components/User';
import LineChart from '@/components/LineChart';
import classes from '@/styles/Dashboard.module.css';
import Clock from '@/components/Clock';
import { fetchData } from '@/components/FetchLogs';

const Index = () => {
  const [user, setUser] = useState(null);
  const [humid, setHumid] = useState(0);
  const [temp, setTemp] = useState(0);
  const [light, setLight] = useState(0);
  const [motion, setMotion] = useState(false);

  useEffect(() => {
    getUser(setUser);
  }, []);

  useEffect(() => {
    const getLogs = async () => {
      const fetchedSensor = await fetchData('Sensor');
      const fetchedMotion = await fetchData('Motion');

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const formattedDate = yesterday.toISOString().split('T')[0].split('-').reverse().join('-');
      console.log(formattedDate);


      const humidData = fetchedSensor.map((log) => log.humidity);
      const motionData = fetchedMotion.map((log) => log.time);

      const tempData = fetchedSensor
        .filter((log) => log.time.split(' - ')[0] === formattedDate)
        .map((log) => ({
          val: log.temperature,
          time: log.time,
        }));

      const lightData = fetchedSensor
        .filter((log) => log.time.split(' - ')[0] === formattedDate)
        .map((log) => ({
          val: log.light,
          time: log.time
        }));

      setHumid(humidData);
      setMotion(motionData);
      setTemp(tempData);
      setLight(lightData);
    };

    getLogs();
  }, [setUser, setHumid, setTemp, setLight, setMotion]);




  let humidity = humid[0];
  let motionDetected = motion[0];
  const motionTime = motionDetected ? motionDetected.split(' - ')[1] : '';
  console.log("motion: ", motionTime);
  console.log("Motion array: ", motion)
  console.log("Hello", motion[0], motion[1]);

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
              <div className={classes.percent}>{humidity}%</div>
              <div className={classes.text}>Humidity</div>
            </div>
            <div className={`${classes['line-chart']} ${classes['right-ele']}`}>
              <LineChart category="Temperature" dataArray={temp} />
            </div>
            <div className={classes['left-ele']}>
              <div className={classes['motion-text']}>Motion Detected!</div>
              <div className={classes.time}>At {motionTime}</div>
            </div>
            <div className={`${classes['line-chart']} ${classes['right-ele']}`}>
              <LineChart category="Light intensity" dataArray={light} />
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
};

export default Index;
