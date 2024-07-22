import classes from '../styles/Navigation.module.css';
import { auth } from '../firebase';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import DateTime from './DateTime';


const MainNavigation = () => {
    const [dashboard, setDashboard] = useState(false);
    const [settings, setSettings] = useState(false);
    const [param, setParam] = useState('');

    const handleLogOut = async () => {
        try {
            await auth.signOut();
            window.location.href = "/login";
            console.log("User logged out successfully!");
        } catch (error) {
            console.error("Error logging out:", error.message);
        }
    }

    const pathname = usePathname();

    useEffect(() => {
        if (pathname === "/") {
            setParam("Dashboard");
            setDashboard(true);
            setSettings(false);
        } else if (pathname === "/settings") {
            setParam("Settings");
            setDashboard(false);
            setSettings(true);
        } else if (pathname === "/logs") {
            setParam("Logs");
            setDashboard(false);
            setSettings(false)
        }
    }, [pathname]);

    return (
        <header className={classes.header}>
            <div className={classes.logo}>{param}</div>
            <div className={classes.datetime}>
                <DateTime />
            </div>
            <nav>
                <ul>
                    <li className={classes.cta}>
                        {!dashboard && <Link href="/">Dashboard</Link>}
                        {!settings && <Link href="/settings">Settings</Link>}
                        <div onClick={handleLogOut} className={classes['log-out']} > Log out</div>
                    </li>
                </ul>
            </nav>
        </header >
    );
}

export default MainNavigation;
