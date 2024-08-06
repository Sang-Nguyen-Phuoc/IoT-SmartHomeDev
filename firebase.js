import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyA6tda6GLLieKfBQTJR6Dt7sEaX3PMuwk8",
    authDomain: "iot-smart-home-device.firebaseapp.com",
    projectId: "iot-smart-home-device",
    databaseURL: "https://iot-smart-home-device-default-rtdb.asia-southeast1.firebasedatabase.app/",
    storageBucket: "iot-smart-home-device.appspot.com",
    messagingSenderId: "447041099293",
    appId: "1:447041099293:web:8b929dff1e532fb8d5d8f4"
};

let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);

export { auth, db, database };
export default app;
