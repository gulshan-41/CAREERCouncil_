import "./sharedSignupPage.scss";
import { useNavigate } from "react-router-dom";

function SignupPage3B() {
    const navigate = useNavigate();

    return (
        <div className="child-container">
            <div className="question-heading">
                <p className="main-question">Are you interested in learning the History?</p>
                <p className="sub-question">
                    subjects like - Archaeology (Excavations, Ancient Civilizations such as: 
                        (Harappan, Mesopotamian)) - Epigraphy (Study of Inscriptions & Ancient Writings)
                        - Art & Architectural History.
                </p>
            </div>
            <div className="span-inputs">
                <span>NO</span>
                <span>Yes! I'm</span>
            </div>
            <div className="navi-buttons">
                <button className="pre-btn" onClick={() => navigate("/signup/interest/science")}>
                    Previous
                </button>
                <button className="next-btn" onClick={() => navigate("/signup/interest/fields")}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default SignupPage3B;