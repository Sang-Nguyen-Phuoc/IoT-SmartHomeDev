import classes from '../styles/Navigation.module.css';
import { useRouter } from 'next/router';
import { auth } from '../firebase';

const MainNavigation = () => {
    const routeToLogin = useRouter();
    const handleLogOut = async () => {
        try {
            await auth.signOut();
            window.location.href = "/login";
            console.log("User logged out successfully!");
        } catch (error) {
            console.error("Error logging out:", error.message);
        }
    }

    return (
        <header className={classes.header}>
            <div className={classes.logo}>SmartDev</div>
            <nav>
                <ul>
                    <li>
                        <div onClick={handleLogOut} style={{
                            cursor: 'pointer',
                            color: 'white',
                            fontSize: '1.5rem',
                            fontWeight: 'bold'
                        }}>Log out</div>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;