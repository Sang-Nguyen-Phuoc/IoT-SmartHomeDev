import MainNavigation from '@/components/Navigation'
import React from 'react'
import classes from '@/styles/Logs.module.css'

const logs = () => {
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
                    <div className={classes['data']}>Data</div>
                </div>
            </div>
            <div className={classes['action']}>
                <div className={classes['jump-to']}>Jump to</div>
                <button className={classes['button']}>
                    <div>-</div>
                    <div>2</div>
                    <div>+</div>
                </button>
            </div>
        </>
    )
}

export default logs