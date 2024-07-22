import MainNavigation from '@/components/Navigation'
import { useRouter } from 'next/router'
import React from 'react'
import classes from '../styles/Settings.module.css'
const settings = () => {
    const routeToLogs = useRouter();

    return (
        <>
            <MainNavigation />
            <div className={classes.table}>
                <div>Preferred light value</div>
                <div>Bar</div>
                <div className={classes.cta}>
                    <div>Toogle motion sensor</div>
                    <button>Active</button>
                </div>
            </div>
            <h2 onClick={() => routeToLogs.push('/logs')}>View sensors logs</h2>
        </>
    )
}

export default settings