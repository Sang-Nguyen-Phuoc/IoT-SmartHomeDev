import React from 'react';
import classes from '../styles/ProgressBar.module.css';

const ProgressBar = ({ width, style }) => {
    return (
        <div className={classes['progress-bar']}>
            <div
                className={classes['progress-bar-inner']}
                style={{ width: `${(width / 2000) * 100}%`, ...style }}
            />
        </div>
    );
};

export default ProgressBar;
