import MainNavigation from '@/components/Navigation'
import React, { Fragment, useEffect, useState } from 'react'
import Login from '@/pages/login';
import { getDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase";


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
          <h1>Welcome to dashboard</h1>
          {user ? (
            <div>
              <p>Email: {user?.email}</p>
              <p>Phone Number: {user?.phoneNumber}</p>
            </div>
          ) : (<p>Loading...</p>)
          }
        </Fragment>
      )}
    </>
  );
}
export default index;