import "./sharedSignupPage.scss";
import { useNavigate } from "react-router-dom";
import { useSurvey } from "../../context/SurveyContext/SurveyContext";

function SignupPage2B() {
    const navigate = useNavigate();
    const { surveyData, updateSurveyData } = useSurvey();

    const handleNext = () => {
        if (surveyData.strengths.management !== null) {
            navigate("/signup/strengths/sports");
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
        updateSurveyData("strengths", { management: isYes });
    };

    return (
        <div className="child-container">
            <div className="question-heading">
                <p className="main-question">
                    Are you confident enough to host an event in your school or college?
                </p>
            </div>
            <div className="span-inputs">
                {["Yes", "No"].map((option) => (
                    <label key={option} className="radio-label">
                        <input
                            type="radio"
                            name="management"
                            value={option}
                            checked={surveyData.strengths.management === (option === "Yes")}
                            onChange={() => handleChange(option)}
                        />
                        <span className="radio-text">{option}</span>
                    </label>
                ))}
            </div>
            <div className="navi-buttons">
                <button className="pre-btn" onClick={() => navigate("/signup/strengths/maths")}>
                    Previous
                </button>
                <button className="next-btn" onClick={handleNext}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default SignupPage2B;