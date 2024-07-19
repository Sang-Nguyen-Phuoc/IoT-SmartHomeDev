import classes from "../styles/Signup.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isEmailed, setIsEmailed] = useState(true);
    const [isPassworded, setIsPassworded] = useState(true);
    const [isSignedUp, setIsSignedUp] = useState(true);
    const [isPhoneNumber, setIsPhoneNumber] = useState(true);
    const router = useRouter();

    const HandleSignup = (e) => {
        e.preventDefault();
    }

    return (
        <div className={classes['register']}>
            <div className={classes['sign-up-wrapper']}>
                <h1>SmartDev</h1>
            </div>
            <div className={classes['sign-up-container']}>
                <form className={classes['sign-up-form']} onSubmit={HandleSignup}>
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
