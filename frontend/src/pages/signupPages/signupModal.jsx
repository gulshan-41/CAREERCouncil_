import React, { useState } from "react";
import "./signupModal.scss";
import Google from "/src/assets/images/google.svg";
import X from "/src/assets/images/x.svg";
import Apple from "/src/assets/images/apple.svg";
import { useNavigate } from "react-router-dom";
import { useSurvey } from "../../context/SurveyContext/SurveyContext";

function SignupModal() {
    const navigate = useNavigate();
    const { surveyData, updateSurveyData, resetSurveyData } = useSurvey();
    const [isLoginMode, setIsLoginMode] = useState(false);

    const handleToggle = () => {
        setIsLoginMode((prev) => !prev);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { username, password, agreeToDataProcessing } = surveyData.signupDetails;

        if (!username || !password) {
            alert("Please fill in all fields.");
            return;
        }
        if (!agreeToDataProcessing) {
            alert("You must agree to the processing of personal data.");
            return;
        }

        try {
            // Mock successful signup (remove when backend is ready)
            console.log("Mock signup:", surveyData);
            resetSurveyData();
            navigate("/"); // Redirect to dashboard or home
        } catch (error) {
            console.error("Signup error:", error);
            alert("An error occurred during signup.");
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
                        <label htmlFor="username">Name</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Name"
                            value={surveyData.signupDetails.username || ""}
                            onChange={(e) =>
                                updateSurveyData("signupDetails", { username: e.target.value })
                            }
                            required
                        />
                        <label htmlFor="pass">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            value={surveyData.signupDetails.password || ""}
                            onChange={(e) =>
                                updateSurveyData("signupDetails", { password: e.target.value })
                            }
                            required
                        />
                        <div className="agree-personal-data">
                            <input
                                type="checkbox"
                                name="personal-data"
                                id="personalData"
                                checked={surveyData.signupDetails.agreeToDataProcessing || false}
                                onChange={(e) =>
                                    updateSurveyData("signupDetails", {
                                        agreeToDataProcessing: e.target.checked,
                                    })
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
                    <form>
                        <label htmlFor="username">Name</label>
                        <input type="text" id="username" placeholder="Name" required />
                        <label htmlFor="pass">Password</label>
                        <input type="password" placeholder="Password" required />
                        <div className="remember-forgot">
                            <div className="remember-wrapper">
                                <input type="checkbox" name="remember" id="personalData" />
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