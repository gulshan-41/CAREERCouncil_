import "./sharedSignupPage.scss";
import { useNavigate } from "react-router-dom";

function SignupPage1B() {
    const navigate = useNavigate();

    return (
        <div className="child-container">
            <div className="question-heading">
                <p className="main-question">How old are you Kartik?</p>
            </div>
            <div className="labels-inputs">
                <input type="number" placeholder="Age" required/>
            </div>
            <div className="navi-buttons">
                <button className="pre-btn" onClick={() => navigate("/signup/basic-details/name")}>
                    Previous
                </button>
                <button className="next-btn" onClick={() => navigate("/signup/basic-details/occupation")}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default SignupPage1B;