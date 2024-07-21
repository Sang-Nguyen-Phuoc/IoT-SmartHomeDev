// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyA6tda6GLLieKfBQTJR6Dt7sEaX3PMuwk8",
    authDomain: "iot-smart-home-device.firebaseapp.com",
    projectId: "iot-smart-home-device",
    storageBucket: "iot-smart-home-device.appspot.com",
    messagingSenderId: "447041099293",
    appId: "1:447041099293:web:8b929dff1e532fb8d5d8f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;