import "./sharedSignupPage.scss";
import { useNavigate } from "react-router-dom";

function SignupPage2A() {
    const navigate = useNavigate();

    return (
        <div className="child-container">
            <div className="heading-wrapper">
                <div className="question-heading">
                    <p className="main-question">Kartik are you good at Mathematics?</p>
                </div>
            </div>
            <div className="input-wrapper">
                <div className="span-inputs">
                    <span>Yes</span>
                    <span>Not really</span>
                </div>
                <div className="navi-buttons">
                    <button className="pre-btn" onClick={() => navigate("/signup/basic-details/occupation")}>
                        Previous
                    </button>
                    <button className="next-btn" onClick={() => navigate("/signup/strengths/management")}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SignupPage2A;