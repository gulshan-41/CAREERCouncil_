import "./sharedSignupPage.scss";
import { useNavigate } from "react-router-dom";
import { useSurvey } from "../../context/SurveyContext/SurveyContext";

function SignupPage2A() {
    const navigate = useNavigate();
    const { surveyData, updateSurveyData } = useSurvey();

    const handleNext = () => {
        if (surveyData.strengths.mathematics !== null) {
            navigate("/signup/strengths/management");
        } else {
            alert("Please select an option.");
        }
    };

    const handleChange = (value) => {
        if (!updateSurveyData) {
            console.error("updateSurveyData is undefined. Check SurveyContext setup.");
            return;
        }
        const isYes = value === "Yes";
        updateSurveyData("strengths", { mathematics: isYes });
    };

    return (
        <div className="child-container">
            <div className="question-heading">
                <p className="main-question">{surveyData.name || "User"}, are you good at mathematics?</p>
            </div>
            <div className="span-inputs">
                {["Yes", "Not really"].map((option) => (
                    <label key={option} className="radio-label">
                        <input
                            type="radio"
                            name="mathematics"
                            value={option}
                            checked={surveyData.strengths.mathematics === (option === "Yes")}
                            onChange={() => handleChange(option)}
                        />
                        <span className="radio-text">{option}</span>
                    </label>
                ))}
            </div>
            <div className="navi-buttons">
                <button className="pre-btn" onClick={() => navigate("/signup/basic-details/occupation")}>
                    Previous
                </button>
                <button className="next-btn" onClick={handleNext}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default SignupPage2A;