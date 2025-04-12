import "./sharedSignupPage.scss";
import { useNavigate } from "react-router-dom";

function SignupPage1B() {
    const navigate = useNavigate();

    return (
        <div className="child-container">
            <div className="heading-wrapper">
                <div className="question-heading">
                    <p className="main-question">How old are you Kartik?</p>
                </div>
            </div>
            <div className="input-wrapper">
                <div className="labels-inputs">
                    <label htmlFor="age">Age</label>
                    <input type="number" placeholder="eg., 10-59 yrs." required/>
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
        </div>
    );
}

export default SignupPage1B;