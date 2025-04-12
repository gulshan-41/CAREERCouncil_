import "./sharedSignupPage.scss";
import { useNavigate } from "react-router-dom";

function SignupPage2B() {
    const navigate = useNavigate();

    return (
        <div className="child-container">
            <div className="heading-wrapper">
                <div className="question-heading">
                    <p className="main-question">
                        Are you confident enough to host a event in your school or college?
                    </p>
                </div>
            </div>
            <div className="input-wrapper">
                <div className="span-inputs">
                    <span>NO</span>
                    <span>Yes</span>
                </div>
                <div className="navi-buttons">
                    <button className="pre-btn" onClick={() => navigate("/signup/strengths/maths")}>
                        Previous
                    </button>
                    <button className="next-btn" onClick={() => navigate("/signup/strengths/sports")}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SignupPage2B;