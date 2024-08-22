// This is the main page of the application. It displays the dashboard with the sensor data.
import React, { Fragment, useEffect, useState } from 'react';
import MainNavigation from '@/components/Navigation';
import Login from '@/pages/login';
import { getUser } from '@/Utils/User';
import LineChart from '@/components/LineChart';
import classes from '@/styles/Dashboard.module.css';
import Clock from '@/components/Clock';
import { fetchData } from '@/Utils/FetchLogs';
import { useAuth } from '@/contexts/authContext';
import { sendNotification } from '@/Utils/SendNotification'; // Import the sendNotification function

const Index = () => {
  const [user, setUser] = useState(null);
  const [humid, setHumid] = useState(0);
  const [temp, setTemp] = useState(0);
  const [light, setLight] = useState(0);
  const [motion, setMotion] = useState([]);
  const [timeUpdated, setTimeUpdated] = useState(new Date().toLocaleTimeString());
  const { toggle, isActiveSending, setShowSuccessModal, lastMotion, setLastMotion } = useAuth();

  useEffect(() => {
    getUser(setUser);
  }, []);

  useEffect(() => {
    const getLogs = async () => {
      const fetchedSensor = await fetchData('Sensor');
      const humidData = fetchedSensor && fetchedSensor.map((log) => log.humidity);
      const currentDate = new Date();

      // Reset the time part of currentDate to midnight (00:00:00)
      const currentDateMidnight = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

      const filterSensor = fetchedSensor.filter((log) => {
        // Check if log.time is defined before splitting
        if (!log.time) return false;

        let logDate = log.time.split(' - ')[0];
        const [day, month, year] = logDate.split('-');

        const logDateMidnight = new Date(year, month - 1, day);

        const diffTime = currentDateMidnight.getTime() - logDateMidnight.getTime();

        const diffDays = diffTime / (1000 * 3600 * 24);
        return diffDays < 11 && diffDays > 0;
      });

      const tempByDay = {};
      const lightByDay = {};

      filterSensor.forEach((log) => {
        const dayOfMonth = log.time.split(' - ')[0].split('-').slice(0, 2).join('-');

        if (!tempByDay[dayOfMonth]) {
          tempByDay[dayOfMonth] = { sum: 0, count: 0 };
        }
        if (!lightByDay[dayOfMonth]) {
          lightByDay[dayOfMonth] = { sum: 0, count: 0 };
        }

        tempByDay[dayOfMonth].sum += log.temperature;
        tempByDay[dayOfMonth].count += 1;

        lightByDay[dayOfMonth].sum += log.light;
        lightByDay[dayOfMonth].count += 1;
      });

      const avgTempData = tempByDay && Object.keys(tempByDay).map((day) => ({
        time: day,
        value: tempByDay[day].sum / tempByDay[day].count,
      }));

      const avgLightData = lightByDay && Object.keys(lightByDay).map((day) => ({
        time: day,
        value: lightByDay[day].sum / lightByDay[day].count,
      }));

      avgLightData.sort((a, b) => a.time.split('-')[0] > b.time.split('-')[0]);
      avgTempData.sort((a, b) => a.time.split('-')[0] > b.time.split('-')[0]);

      setTemp(avgTempData);
      setLight(avgLightData);
      setHumid(humidData);



      if (toggle) {
        const fetchedMotion = await fetchData('Motion');
        const motionData = fetchedMotion && fetchedMotion.map((log) => log.time);
        setMotion(motionData);

        // Check if the motion detected is new
        const motionDetected = motionData[0];
        if (motionDetected && motionDetected !== lastMotion) {
          const motionTime = motionDetected ? motionDetected.split(' - ')[1] : '';
          const motionDate = motionDetected ? motionDetected.split(' - ')[0] : '';

          const templateParams = {
            email: user && user?.email,
            message: `Motion detected! Date and time: ${motionDate} at ${motionTime}`,
          };

          // Call sendNotification only if it's a new motion detection
          if (isActiveSending) {
            const success = await sendNotification(templateParams);
            if (success) {
              setShowSuccessModal(true);
              setLastMotion(motionDetected); // Update the last motion data
            }
          }
        }
      }

      setTimeUpdated(new Date().toLocaleTimeString());
    };

    getLogs();
  }, [toggle, user, lastMotion, isActiveSending]); // Added lastMotion and isSent as dependencies

  let humidity = humid[0];
  let motionDetected = motion[0];
  let motionTime = motionDetected ? motionDetected.split(' - ')[1] : '';
  let motionDate = motionDetected ? motionDetected.split(' - ')[0] : '';

  return (
    <>
      {!user ? (
        <Login />
      ) : (
        <Fragment>
          <MainNavigation user={user} />
          <div className={classes.timer}>
            <Clock />
            <h2>Last update: {timeUpdated}</h2>
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
              {motionDetected ? (
                <>
                  <div className={classes['motion-active']}>Motion Detected!</div>
                  <div className={classes.time}>At {motionTime}</div>
                  <div className={classes.time}>{motionDate}</div>
                </>) : (
                <div className={classes['motion-inactive']}>No motion detected</div>
              )}
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
