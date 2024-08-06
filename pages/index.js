import MainNavigation from '@/components/Navigation'
import React, { Fragment, useEffect, useState } from 'react'
import Login from '@/pages/login';
import { getDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase";
import LineChart from '@/components/LineChart';
import classes from '@/styles/Dashboard.module.css';
import Clock from '@/components/Clock';


const index = () => {
  const [user, setUser] = useState(null);

  const getUser = () => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setUser(null);
        return;
      }
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUser(docSnap.data());
        console.log(docSnap.data());
      }
    });
  }

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      {!user ? (<Login />) : (
        <Fragment>
          <MainNavigation />
          <div className={classes['timer']}>
            <Clock />
            <h2>Last update: {new Date().toLocaleTimeString()}</h2>
          </div>
          <div className={classes.container}>
            <div className={classes['left-ele']}>Humidity</div>
            <div className={classes['line-chart', 'right-ele']}>
              <LineChart />
            </div>
            <div className={classes['left-ele']}>Motion detect</div>
            <div className={classes['line-chart', 'right-ele']}>
              <LineChart />
            </div>
          </div>

        </Fragment >
      )}
    </>
  );
}
export default index;