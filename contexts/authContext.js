import { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase";


const AuthContext = createContext();
export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const value = { user, loading };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;