import React, { useState } from "react";
import "./signupModal.scss";
import Google from "/src/assets/images/google.svg";
import X from "/src/assets/images/x.svg";
import Apple from "/src/assets/images/apple.svg";
import { useSurvey } from "../../context/SurveyContext/SurveyContext";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

function SignupModal() {
    const { surveyData, updateSurveyData, loginData, updateLoginData, setUser } = useSurvey();
    const [isLoginMode, setIsLoginMode] = useState(false);
    const navigate = useNavigate();

    const handleToggle = () => {
        setIsLoginMode((prev) => !prev);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8800/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(loginData),
        }).then((data) => data.json());

        if (response.success) {
            toast.success(response.msg);
            localStorage.setItem("token", JSON.stringify(response.data));
            setUser(response.data);
            navigate('/');
        } else {
            toast.error(response.msg);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        // console.log(surveyData);
        const response = await fetch('http://localhost:8800/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(surveyData),
        }).then((data) => data.json());

        if (response.success) {
            toast.success(response.msg);
            localStorage.setItem("token", JSON.stringify(response.data));
            setUser(response.data);
            navigate('/');
        } else {
            toast.error(response.msg);
        }
    };

    return (
        <div className="signup-login-wrapper">
        <div className="signup-login-container">
            <div className={`signup-main-container ${isLoginMode ? "hidden" : "visible"}`}>
                <div className="signup-head">
                    <h1>Get started</h1>
                </div>
                <div className="user-signup-inputs">
                    <form onSubmit={handleSignup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            value={surveyData.email}
                            onChange={(e) => updateSurveyData("email", e.target.value)}
                            required
                        />
                        <label htmlFor="pass">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            value={surveyData.password}
                            onChange={(e) => updateSurveyData("password", e.target.value)}
                            required
                        />
                        <div className="agree-personal-data">
                            <input
                                type="checkbox"
                                name="personal-data"
                                id="personalData"
                                checked={surveyData.agreeToDataProcessing}
                                onChange={(e) =>
                                    updateSurveyData("agreeToDataProcessing", e.target.checked)
                                }
                            />
                            <label htmlFor="personalData">
                                I agree to the processing of personal data
                            </label>
                        </div>
                        <input type="submit" value="Create account" />
                    </form>
                </div>
                <div className="other-methods-separator">
                    <div className="separator"></div>
                    <div className="signup-with">Sign-up with</div>
                    <div className="separator"></div>
                </div>
                <div className="google-x-apple-way">
                    <button>
                        <img src={Google} alt="google-img" />
                    </button>
                    <button>
                        <img src={X} alt="x-img" />
                    </button>
                    <button>
                        <img src={Apple} alt="apple-img" />
                    </button>
                </div>
            </div>
            <div className={`login-main-container ${isLoginMode ? "visible" : "hidden"}`}>
                <div className="login-head">
                    <h1>Welcome back</h1>
                </div>
                <div className="user-login-inputs">
                    <form onSubmit={handleLogin}>
                        <label htmlFor="email">Email</label>
                        <input name="email" value={loginData.email} onChange={updateLoginData} type="email" id="email1" placeholder="Email" required />
                        <label htmlFor="pass">Password</label>
                        <input name="password" value={loginData.password} onChange={updateLoginData} type="password" placeholder="Password" required />
                        <div className="remember-forgot">
                            <div className="remember-wrapper">
                                <input type="checkbox" name="remember" id="personalData1" />
                                <label htmlFor="remember">Remember me</label>
                            </div>
                            <span className="forgot-pass-shift">Forgot password?</span>
                        </div>
                        <input type="submit" value="Log-in" />
                    </form>
                </div>
                <div className="other-methods-separator">
                    <div className="separator"></div>
                    <div className="login-with">Login with</div>
                    <div className="separator"></div>
                </div>
                <div className="google-x-apple-way">
                    <button>
                        <img src={Google} alt="google-img" />
                    </button>
                    <button>
                        <img src={X} alt="x-img" />
                    </button>
                    <button>
                        <img src={Apple} alt="apple-img" />
                    </button>
                </div>
            </div>
            <div className={`signup-login-overlay ${isLoginMode ? "shift-right" : ""}`}>
                <div className="overlay-container">
                    <div className="shift-login">
                        <p>
                            {isLoginMode ? "Need an account? " : "Already have an account? "}
                            <span className="toggle-login-modal" onClick={handleToggle}>
                                {isLoginMode ? "Sign up" : "Log in"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default SignupModal;