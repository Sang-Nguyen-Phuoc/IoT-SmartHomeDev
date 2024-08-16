import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ref, push, set } from 'firebase/database';
import { database } from '../firebase';
import Modal from '../components/Modal';
import ProgressBar from '@/components/ProgressBar';
import classes from '../styles/Settings.module.css';
import MainNavigation from '@/components/Navigation';
import { fetchData } from '@/components/FetchLogs';

const Settings = () => {
    const routeToLogs = useRouter();
    const [currentLightValue, setCurrentLightValue] = useState(1);
    const [targetLightValue, setTargetLightValue] = useState(1);

    const handlePushData = () => {
        try {
            const dbRef = ref(database, 'Sensor');
            const newPostRef = push(dbRef);
            const data = {
                motion: 'active',
                light: targetLightValue,
                time: new Date().toLocaleString('en-GB'),
            };
            set(newPostRef, data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchSensorData = async () => {
            const data = await fetchData('Sensor');
            const lightValues = data.map((item) => item.light);
            const latestLightValue = lightValues[lightValues.length - 1];
            setTargetLightValue(latestLightValue);
        };

        fetchSensorData();
        const interval = setInterval(fetchSensorData, 500); // Fetch new data every 5 seconds

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const transitionInterval = setInterval(() => {
            setCurrentLightValue((prevValue) => {
                if (prevValue < targetLightValue) {
                    return Math.min(prevValue + 1, targetLightValue); // Increment towards target
                } else if (prevValue > targetLightValue) {
                    return Math.max(prevValue - 1, targetLightValue); // Decrement towards target
                }
                return prevValue;
            });
        }, 5); // Adjust the interval for a smoother or faster transition

        return () => clearInterval(transitionInterval);
    }, [targetLightValue]);
    const calculateColor = (value) => {
        const ratio = value / 1023;

        // Define start and end colors
        const startColor = { r: 128, g: 128, b: 128, a: 1.0 }; // lighter gray, fully opaque
        const endColor = { r: 255, g: 255, b: 0, a: 0.8 };     // bright yellow, semi-transparent

        // Interpolate between start and end colors
        const r = Math.round(startColor.r + (endColor.r - startColor.r) * ratio);
        const g = Math.round(startColor.g + (endColor.g - startColor.g) * ratio);
        const b = Math.round(startColor.b + (endColor.b - startColor.b) * ratio);
        const a = (startColor.a + (endColor.a - startColor.a) * ratio).toFixed(2);

        return `rgba(${r}, ${g}, ${b}, ${a})`;
    };

    const progressBarStyle = {
        '--width': currentLightValue,
        backgroundColor: calculateColor(currentLightValue),
    };



    return (
        <>
            <MainNavigation />
            <div className={classes.container}>
                <div className={classes.table}>
                    <div className={classes.text}>Preferred light value</div>
                    <ProgressBar width={currentLightValue} style={progressBarStyle} />
                    <div className={classes.number}>{currentLightValue}</div>
                    <div className={classes.cta}>
                        <div className={classes.text}>Toggle motion sensor</div>
                        <Modal />
                    </div>
                </div>
                <div
                    className={classes['view-logs']}
                    onClick={() => routeToLogs.push('/logs')}
                >
                    View sensors logs
                </div>
            </div>
        </>
    );
};

export default Settings;
