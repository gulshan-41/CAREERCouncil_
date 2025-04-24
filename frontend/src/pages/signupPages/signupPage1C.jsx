import "./sharedSignupPage.scss";
import { useNavigate } from "react-router-dom";

function SignupPage1C() {
    const navigate = useNavigate();

    return (
        <div className="child-container">
            <div className="question-heading">
                <p className="main-question">Are you a Student?</p>
                <p className="sub-question">Working Professional? or a Parent?</p>
            </div>
            <div className="span-inputs">
                <span id="student">Student</span>
                <span id="teacher">Working Professional</span>
                <span id="parent">Parent</span>
            </div>
            <div className="navi-buttons">
                <button className="pre-btn" onClick={() => navigate("/signup/basic-details/age")}>
                    Previous
                </button>
                <button className="next-btn" onClick={() => navigate("/signup/strengths/maths")}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default SignupPage1C;