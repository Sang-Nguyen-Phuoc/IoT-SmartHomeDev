import Link from 'next/link';

import classes from '../styles/Navigation.module.css';
import { useRouter } from 'next/router';

const MainNavigation = () => {
    const router = useRouter();
    const navigateToHome = () => {
        router.push('/');
    }
    return (
        <header className={classes.header}>
            <div className={classes.logo} onClick={navigateToHome}>SmartDev</div>
            <nav>
                <ul>
                    <li>
                        <Link href='/dashboard'>Dashboard</Link>
                    </li>
                    <li>
                        <Link href='/login'>Log out</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;