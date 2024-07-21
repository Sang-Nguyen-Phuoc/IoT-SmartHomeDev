import classes from "../styles/Signup.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isEmailed, setIsEmailed] = useState(true);
    const [isPassworded, setIsPassworded] = useState(true);
    const [isSignedUp, setIsSignedUp] = useState(true);
    const [isPhoneNumber, setIsPhoneNumber] = useState(true);
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            await setDoc(doc(db, "Users", user.uid), {
                email: user.email,
                phoneNumber: phoneNumber
            });
            router.push("/login");
        } catch (error) {
            if (error.code === "auth/missing-email" || error.code === "auth/invalid-email") {
                setIsEmailed(false);
                setIsPassworded(true);
                setIsSignedUp(true);
                setIsPhoneNumber(true);
                setEmail("");
            }
            if (error.code === "auth/missing-password" || error.code === "auth/weak-password") {
                setIsPassworded(false);
                setIsEmailed(true);
                setIsSignedUp(true);
                setIsPhoneNumber(true);
                setPassword("");
            }
            if (error.code === "auth/email-already-in-use") {
                setIsSignedUp(false);
                setIsEmailed(true);
                setIsPassworded(true);
                setIsPhoneNumber(true);
                setPassword("");
            }

        }
    };

    return (
        <div className={classes['register']}>
            <div className={classes['sign-up-wrapper']}>
                <h1>SmartDev</h1>
            </div>
            <div className={classes['sign-up-container']}>
                <form className={classes['sign-up-form']} onSubmit={handleSignup}>
                    <h1>Sign up</h1>
                    {!isSignedUp && <div className={classes['alert']}>The email address is already in use</div>}
                    {!isEmailed && <div className={classes['alert']}>Email required</div>}
                    <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {!isPhoneNumber && <div className={classes['alert']}>Proper phone number required</div>}
                    <input type="number" placeholder="Phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    {!isPassworded ? <div className={classes['alert']}>Password at least 6 characters</div> : null}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className={classes['register-button']}>
                        Create an account
                    </button>
                    <span>
                        Already signed in to SmartDev? <b className={classes['b']} onClick={() => router.push('/login')}>Sign in now.</b>
                    </span>
                    <small>
                        This page is protected by Google reCAPTCHA to ensure you're not a bot. <b>Learn more</b>.
                    </small>
                </form>
            </div>
        </div>
    );
};

export default Login;
