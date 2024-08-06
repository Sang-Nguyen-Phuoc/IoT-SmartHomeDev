import MainNavigation from '@/components/Navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import classes from '../styles/Settings.module.css';
import ProgressBar from '@/components/ProgressBar';
import { ref, push, set } from 'firebase/database';
import { database } from '@/firebase';

const Settings = () => {
    const routeToLogs = useRouter();

    const [progress, setProgress] = useState(1);

    const handlePushData = () => {
        try {
            const dbRef = ref(database, 'Sensor');
            const newPostRef = push(dbRef);
            const data = {
                motion: 'active',
                light: progress,
                // get time as DD/MM/YYYY HH:MM
                time: new Date().toLocaleString('en-GB')
            }
            set(newPostRef, data);

            alert(`Motion sensor is ${data.motion} and light intensity is ${data.light}`);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress < 1023) {
                    return prevProgress + 1;
                } else {
                    clearInterval(interval);
                    return 1023;
                }
            });
        }, 10);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <MainNavigation />
            <div className={classes.container}>
                <div className={classes.table}>
                    <div className={classes.text}>Preferred light value</div>
                    <ProgressBar width={progress} />
                    <div className={classes.number}>{progress}</div>
                    <div className={classes.cta}>
                        <div className={classes.text}>Toggle motion sensor</div>
                        <button className={classes.button} onClick={handlePushData}>Active</button>
                    </div>
                </div>
                <div className={classes['view-logs']} onClick={() => routeToLogs.push('/logs')}>View sensors logs</div>
            </div>
        </>
    );
}

export default Settings;
