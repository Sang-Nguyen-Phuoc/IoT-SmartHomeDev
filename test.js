import React, { Fragment, useEffect, useState } from 'react';
import MainNavigation from '@/components/Navigation';
import Login from '@/pages/login';
import { getUser } from '@/Utils/User';
import LineChart from '@/components/LineChart';
import classes from '@/styles/Dashboard.module.css';
import Clock from '@/components/Clock';
import { fetchData } from '@/components/FetchLogs';
import { useAuth } from '@/contexts/authContext';
const Index = () => {
    const [user, setUser] = useState(null);
    const [humid, setHumid] = useState(0);
    const [temp, setTemp] = useState(0);
    const [light, setLight] = useState(0);
    const [motion, setMotion] = useState(false);
    const [timeUpdated, setTimeUpdated] = useState(new Date().toLocaleTimeString());
    const { toggle } = useAuth();

    useEffect(() => {
        getUser(setUser);
    }, []);

    useEffect(() => {
        const getLogs = async () => {
            const fetchedSensor = await fetchData('Sensor');

            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const formattedDate = yesterday.toISOString().split('T')[0].split('-').reverse().join('-');

            const humidData = fetchedSensor.map((log) => log.humidity);

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
            setTemp(tempData);
            setLight(lightData);

            if (toggle) {
                const fetchedMotion = await fetchData('Motion');
                const motionData = fetchedMotion.map((log) => log.time);
                setMotion(motionData);

            }

            setTimeUpdated(new Date().toLocaleTimeString());
        };

        getLogs();
    }, [setUser, setHumid, setTemp, setLight, setMotion,]);





    let humidity = humid[0];
    let motionDetected = motion[0];
    const motionTime = motionDetected ? motionDetected.split(' - ')[1] : '';
    const motionDate = motionDetected ? motionDetected.split(' - ')[0] : '';

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


