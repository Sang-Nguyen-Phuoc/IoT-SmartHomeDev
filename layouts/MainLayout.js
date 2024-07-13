
import MainNavigation from '@/components/Navigation';
import classes from '../styles/MainLayout.module.css';

const Layout = (props) => {
    return (
        <div>
            <MainNavigation />
            <main className={classes.main}>{props.children}</main>
        </div>
    );
}

export default Layout;