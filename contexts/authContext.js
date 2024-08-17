import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [toggle, setToggle] = useState(false);
    const [isMounted, setIsMounted] = useState(false); // State to check if component has mounted
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isActiveSending, setIsActiveSending] = useState(false);
    const [lastMotion, setLastMotion] = useState(null);
    useEffect(() => {
        setIsMounted(true); // Mark component as mounted
        if (typeof window !== 'undefined') {
            const savedToggle = localStorage.getItem('motionSensorToggle');
            const savedActiveSending = localStorage.getItem('isActiveSending');
            if (savedToggle !== null) {
                setToggle(JSON.parse(savedToggle));
            }
            if (savedActiveSending !== null) {
                setIsActiveSending(JSON.parse(savedActiveSending));
            }
        }
    }, []);

    useEffect(() => {
        if (isMounted) { // Ensure that this only runs after the component has mounted
            localStorage.setItem('motionSensorToggle', JSON.stringify(toggle));
            if (toggle === false) {
                setIsActiveSending(false); // Set to false when toggle is off
                localStorage.setItem('isActiveSending', JSON.stringify(false));
            } else {
                localStorage.setItem('isActiveSending', JSON.stringify(isActiveSending));
            }
        }
    }, [toggle, isMounted, isActiveSending]);

    const value = {
        user,
        toggle,
        setToggle,
        isMounted,
        isActiveSending,
        setIsActiveSending,
        showSuccessModal,
        setShowSuccessModal,
        lastMotion,
        setLastMotion
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
