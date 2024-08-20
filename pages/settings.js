import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Modal from '../components/Modal';
import ProgressBar from '@/components/ProgressBar';
import classes from '../styles/Settings.module.css';
import MainNavigation from '@/components/Navigation';
import { fetchData } from '@/components/FetchLogs';
import { useAuth } from '@/contexts/authContext';
import LightValModal from '@/components/LightValModal';

const Settings = () => {
    const routeToLogs = useRouter();
    const [currentLightValue, setCurrentLightValue] = useState(1);
    const [targetLightValue, setTargetLightValue] = useState(1);
    const [motionSensor, setMotionSensor] = useState(false);
    const { setLastMotion } = useAuth();

    useEffect(() => {
        const fetchSensorData = async () => {
            const data = await fetchData('Sensor');
            const motionData = await fetchData('Motion');

            const motionValues = motionData.map((item) => item.time);
            const lightValues = data.map((item) => item.light);

            const latestMotionValue = motionValues[0];
            const latestLightValue = lightValues[0];

            setMotionSensor(latestMotionValue);
            setLastMotion(latestMotionValue);
            setTargetLightValue(latestLightValue);
        };

        fetchSensorData();
        const interval = setInterval(fetchSensorData, 50); // Fetching every 0.5 seconds

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const transitionInterval = setInterval(() => {
            setCurrentLightValue((prevValue) => {
                const increment = Math.ceil(Math.abs(targetLightValue - prevValue) / 10); // Speed up by incrementing in larger steps
                if (prevValue < targetLightValue) {
                    return Math.min(prevValue + increment, targetLightValue); // Increment towards target
                } else if (prevValue > targetLightValue) {
                    return Math.max(prevValue - increment, targetLightValue); // Decrement towards target
                }
                return prevValue;
            });
        }, 50);

        return () => clearInterval(transitionInterval);
    }, [targetLightValue]);

    const calculateColor = (value) => {
        const ratio = value / 2000;

        // Define start and end colors for dark grey to bright yellowish
        const startColor = { r: 64, g: 64, b: 64, a: 1.0 }; // dark grey, fully opaque
        const endColor = { r: 255, g: 255, b: 100, a: 1.0 }; // bright yellowish, fully opaque

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
                        <Modal motionSensor={motionSensor} />
                        <LightValModal />
                    </div>
                </div>
                <div
                    className={classes['view-logs']}
                    onClick={() => routeToLogs.push('/logs')}
                >
                    View sensors logs
                </div>
            </div >
        </>
    );
};

export default Settings;
