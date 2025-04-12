import "./sharedSignupPage.scss";
import { useNavigate } from "react-router-dom";

function SignupPage2C() {
    const navigate = useNavigate();

    return (
        <div className="child-container">
            <div className="heading-wrapper">
                <div className="question-heading">
                    <p className="main-question">
                        Which sports you are good at?
                    </p>
                </div>
            </div>
            <div className="input-wrapper">
                <div className="span-inputs">
                    <span>Football</span>
                    <span>Cricket</span>
                    <span>Basketball</span>
                    <span>Marathon</span>
                </div>
                <div className="navi-buttons">
                    <button className="pre-btn" onClick={() => navigate("/signup/strengths/management")}>
                        Previous
                    </button>
                    <button className="next-btn" onClick={() => navigate("/signup/interest/science")}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SignupPage2C;