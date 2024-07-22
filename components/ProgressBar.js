import React from 'react';
import classes from '../styles/ProgressBar.module.css';

const ProgressBar = ({ width }) => {
    return (
        <div className={classes['progress-bar']}>
            <div
                className={classes['progress-bar-inner']}
                style={{ '--width': width }}
            ></div>
        </div>
    );
};

export default ProgressBar;
