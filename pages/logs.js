import MainNavigation from '@/components/Navigation';
import React from 'react';
import classes from '@/styles/Logs.module.css';
import { useState, useEffect } from 'react';
import { fetchData } from '@/components/FetchLogs';

const Logs = () => {
    const [logs, setLogs] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [label, setLabel] = useState('light');

    useEffect(() => {
        const getLogs = async () => {
            const fetchedLogs = await fetchData('Sensor');
            setLogs(fetchedLogs);
        };

        getLogs();
    }, []);

    useEffect(() => {
        setTotalPages(Math.ceil(logs.length / 16));
    }, [logs]);

    const handlePageChange = (action) => {
        if (action === '-') {
            setPage((prevPage) => Math.max(prevPage - 1, 1));
        } else if (action === '+') {
            setPage((prevPage) => Math.min(prevPage + 1, totalPages));
        }
    }

    const handleLabelChange = (newLabel) => {
        setLabel(newLabel);
    }

    const startIdx = (page - 1) * 15;
    const currentLogs = logs.slice(startIdx, startIdx + 16);
    return (
        <>
            <MainNavigation />
            <div className={classes['logs-container']}>
                <div className={classes['log-container']}>
                    <div className={classes['label']}>
                        <div
                            className={`${classes['temperature']} ${label === 'temperature' ? classes.active : ''}`}
                            onClick={() => handleLabelChange('temperature')}
                        >
                            Temperature
                        </div>
                        <div
                            className={`${classes['light-intensity']} ${label === 'light' ? classes.active : ''}`}
                            onClick={() => handleLabelChange('light')}
                        >
                            Light intensity
                        </div>
                        <div
                            className={`${classes['motion']} ${label === 'humidity' ? classes.active : ''}`}
                            onClick={() => handleLabelChange('humidity')}
                        >
                            Humidity
                        </div>
                    </div>
                    <div className={classes['logs']}>
                        {currentLogs.map((log) => (
                            <div key={log.id} className={classes['log']}>
                                <div className={classes['time']}>{log.time}: </div>
                                {label === 'temperature' && <div className={classes['data']}>{log.temperature}°C</div>}
                                {label === 'light' && <div className={classes['data']}>{log.light} lux</div>}
                                {label === 'humidity' && <div className={classes['data']}>{log.humidity}%</div>}
                            </div>
                        ))}
                    </div>

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
    );
}

export default Logs;
