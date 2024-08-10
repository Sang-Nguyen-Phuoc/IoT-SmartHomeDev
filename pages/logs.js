import MainNavigation from '@/components/Navigation'
import React from 'react'
import classes from '@/styles/Logs.module.css'
import { useState, useEffect } from 'react'
import { ref, get } from 'firebase/database';
import { database } from '@/firebase';

const logs = () => {
    const [logs, setLogs] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const dbRef = ref(database, 'Sensor');
        get(dbRef).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const logsArray = Object.keys(data).map((key) => {
                    return {
                        id: key,
                        ...data[key]
                    }
                });
                setLogs(logsArray);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    useEffect(() => {
        setTotalPages(Math.ceil(logs.length / 15));
    }, [logs]);

    const handlePageChange = (action) => {
        if (action === '-') {
            setPage((prevPage) => Math.max(prevPage - 1, 1));
        } else if (action === '+') {
            setPage((prevPage) => Math.min(prevPage + 1, totalPages));
        }
    }

    const startIdx = (page - 1) * 15;
    const currentLogs = logs.slice(startIdx, startIdx + 15);
    return (
        <>
            <MainNavigation />
            <div className={classes['logs-container']}>
                <div className={classes['logs']}>
                    <div className={classes['label']}>
                        <div className={classes['temperature']}> Temperature
                        </div>
                        <div className={classes['light-intensity']}> Light intensity </div>
                        <div className={classes['motion']}> Motion sensor </div>
                    </div>
                    {currentLogs.map((log) => (
                        <div key={log.id} className={classes['log']}>
                            <div className={classes['light']}>{log.light}</div>
                            <div className={classes['light-intensity']}>{log.motion}</div>
                            <div className={classes['motion']}>{log.time}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={classes['action']}>
                <div className={classes['jump-to']}>Jump to</div>
                <button className={classes['button']}>
                    <div className={classes['arrow']}
                        onClick={() => handlePageChange('-')}
                        disabled={page === 1}>-</div>
                    <div className={classes['page']}>{page}</div>
                    <div className={classes['arrow']} onClick={() => handlePageChange('+')}
                        disabled={page === totalPages}>+</div>
                </button>
            </div>
        </>
    )
}

export default logs