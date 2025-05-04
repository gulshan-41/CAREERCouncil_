import "./sharedSignupPage.scss";
import { useNavigate } from "react-router-dom";
import { useSurvey } from "../../context/SurveyContext/SurveyContext";

function SignupPage3B() {
    const navigate = useNavigate();
    const { surveyData, updateSurveyData } = useSurvey();

    const handleNext = () => {
        if (surveyData.interests.history !== null) {
            navigate("/signup/interest/fields");
        } else {
            alert("Please select an option.");
        }
    };

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
                {["Yes! I'm", "No"].map((option) => (
                    <label key={option}>
                        <input
                            type="radio"
                            name="history"
                            value={option}
                            checked={surveyData.interests.history === (option === "Yes! I'm")}
                            onChange={() => updateSurveyData("interests", { history: option === "Yes! I'm" })}
                        />
                        {option}
                    </label>
                ))}
            </div>
            <div className="navi-buttons">
                <button className="pre-btn" onClick={() => navigate("/signup/interest/science")}>
                    Previous
                </button>
                <button className="next-btn" onClick={handleNext}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default SignupPage3B;