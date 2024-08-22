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
    app = initializeApp(firebaseConfig);  // Khởi tạo ứng dụng Firebase
} else {
    app = getApp();  // Lấy ứng dụng Firebase đã tồn tại
}

const auth = getAuth(app);  // Lấy đối tượng Authentication
const db = getFirestore(app);  // Lấy đối tượng Firestore
const database = getDatabase(app);  // Lấy đối tượng Realtime Database

export { auth, db, database };
export default app;
