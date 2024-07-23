import classes from "../styles/Login.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import AuthContext from "@/contexts/authContext";
import Loading from "./loading";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEmail, setIsEmailed] = useState(true);
    const [isPassworded, setIsPassworded] = useState(true);
    const [isSignedIn, setIsSignedIn] = useState(true);
    const [loading, setLoading] = useState(true);
    const router = useRouter();


    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);

        // Clean up the timer when the component is unmounted
        return () => clearTimeout(timer);
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password).then(() => {
            setIsSignedIn(true);
            router.push("/");
        }
        ).catch((error) => {
            if (error.code === "auth/missing-email" || error.code === "auth/invalid-email") {
                setIsEmailed(false);
                setIsPassworded(true);
                setIsSignedIn(true);
                setEmail("");
            }
            if (error.code === "auth/missing-password" || error.code === "auth/wrong-password") {
                setIsPassworded(false);
                setIsEmailed(true);
                setIsSignedIn(true);
            }
            if (error.code === "auth/invalid-credential") {
                setIsSignedIn(false);
                setIsPassworded(true);
                setIsEmailed(true);
                setEmail("");
                setPassword("");
            }
        }
        );
    }

    return (
        <>
            {loading ? <Loading /> :
                (
                    <div className={classes['login']}>
                        <div className={classes['login-wrapper']}>
                            <h1>SmartDev</h1>
                        </div>
                        <div className={classes['login-container']}>
                            <form className={classes['login-form']} onSubmit={handleLogin}>
                                <h1>Welcome!</h1>
                                {!isSignedIn && <div className={classes['alert']}>User not found</div>}
                                {!isEmail && <div className={classes['alert']}>Email required</div>}
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {!isPassworded ? <div className={classes['alert']}>Invalid Password</div> : null}
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button type="submit" className={classes['login-button']}>Sign In</button>
                                <span>
                                    New to SmartDev? <b className={classes['b']} onClick={() => router.push('/signup')}>Sign up now.</b>
                                </span>
                            </form>
                        </div>
                    </div>
                )}
        </>
    );
}

export default Login;
