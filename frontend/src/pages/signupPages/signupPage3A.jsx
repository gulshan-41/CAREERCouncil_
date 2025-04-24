import "./sharedSignupPage.scss";
import { useNavigate } from "react-router-dom";

function SignupPage3A() {
    const navigate = useNavigate();

    return (
        <div className="child-container">
            <div className="question-heading">
                <p className="main-question">Have you ever felt it interesting?</p>
                <p className="sub-question">
                    to learn more about the process and logic (Science)
                        behind space - solar system - computers - enviromnmental
                        - phenomenans.
                </p>
            </div>
            <div className="span-inputs">
                <span>Yes! I did</span>
                <span>NO</span>
            </div>
            <div className="navi-buttons">
                <button className="pre-btn" onClick={() => navigate("/signup/strengths/sports")}>
                    Previous
                </button>
                <button className="next-btn" onClick={() => navigate("/signup/interest/history")}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default SignupPage3A;