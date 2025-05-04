import "./sharedSignupPage.scss";
import { useNavigate } from "react-router-dom";
import { useSurvey } from "../../context/SurveyContext/SurveyContext";

function SignupPage1B() {
    const navigate = useNavigate();
    const { surveyData, updateSurveyData } = useSurvey();

    const handleNext = () => {
        if (surveyData.age && surveyData.age > 0) {
            navigate("/signup/basic-details/occupation");
        } else {
            alert("Please enter a valid age.");
        }
    };

    return (
        <div className="child-container">
            <div className="question-heading">
                <p className="main-question">How old are you {surveyData.name || "User"}?</p>
            </div>
            <div className="labels-inputs">
                <input
                    type="number"
                    placeholder="Age"
                    value={surveyData.age}
                    onChange={(e) => updateSurveyData("", { age: e.target.value })}
                    required
                />
            </div>
            <div className="navi-buttons">
                <button className="pre-btn" onClick={() => navigate("/signup/basic-details/name")}>
                    Previous
                </button>
                <button className="next-btn" onClick={handleNext}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default SignupPage1B;