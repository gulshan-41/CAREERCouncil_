import "./sharedSignupPage.scss";
import { useNavigate } from "react-router-dom";

function SignupPage1A() {
    const navigate = useNavigate();

    return (
        <div className="child-container">
            <div className="question-heading">
                <p className="main-question">Your name?</p>
                <p className="sub-question">This is how you will show up in your dashboard!</p>
            </div>
            <div className="labels-inputs">
                <input type="text" placeholder="Name" required/>
            </div>
            <div className="navi-buttons">
                <button className="next-btn" onClick={() => navigate("/signup/basic-details/age")}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default SignupPage1A;