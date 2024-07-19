import classes from "../styles/Login.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [isPhoneNumber, setIsPhoneNumbered] = useState(true);
    const [isPassworded, setIsPassworded] = useState(true);
    const [isSignedIn, setIsSignedIn] = useState(true);
    const router = useRouter();
    const HandleLogin = (e) => {
        e.preventDefault();
    }
    return (
        <>
            <div className={classes['login']}>
                <div className={classes['login-wrapper']}>
                    <h1>SmartDev</h1>
                </div>
                <div className={classes['login-container']}>
                    <form className={classes['login-form']} onSubmit={HandleLogin}>
                        <h1>Sign In</h1>
                        {!isSignedIn && <div className={classes['alert']}>User not found</div>}
                        {!isPhoneNumber && <div className={classes['alert']}>Phone number required</div>}
                        <input
                            type="number"
                            placeholder="Phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
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
                        <small>
                            This page is protected by Google reCAPTCHA to ensure you're not a bot. <b>Learn more</b>.
                        </small>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
