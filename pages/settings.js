import MainNavigation from '@/components/Navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import classes from '../styles/Settings.module.css';
import ProgressBar from '@/components/ProgressBar';

const Settings = () => {
    const routeToLogs = useRouter();

    const [progress, setProgress] = useState(1); // Start from 1

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
        }, 10); // Adjust the interval duration as needed

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []); // Add an empty dependency array to ensure it runs once

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
                        <button className={classes.button}>Active</button>
                    </div>
                </div>
                <div className={classes['view-logs']} onClick={() => routeToLogs.push('/logs')}>View sensors logs</div>
            </div>
        </>
    );
}

export default Settings;
