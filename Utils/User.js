import { auth, db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";

export const getUser = (setUser) => {
    auth.onAuthStateChanged(async (user) => {
        if (!user) {
            setUser(null);
            return;
        }
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setUser(docSnap.data()); //
        }
    });
};
