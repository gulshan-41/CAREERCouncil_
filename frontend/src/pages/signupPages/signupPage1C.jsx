import "./sharedSignupPage.scss";
import { useNavigate } from "react-router-dom";
import { useSurvey } from "../../context/SurveyContext/SurveyContext";
import { toast } from "react-toastify";

function SignupPage1C() {
    const navigate = useNavigate();
    const { surveyData, updateSurveyData } = useSurvey();

    const handleNext = () => {
        if (surveyData.occupation) {
            navigate("/signup/strengths/maths");
        } else {
            toast.error("Please select an occupation.");
        }
    };

    return (
        <div className="child-container">
            <div className="question-heading">
                <p className="main-question">Are you a Student?</p>
                <p className="sub-question">Working Professional? or a Parent?</p>
            </div>
            <div className="span-inputs">
                {["Student", "Working Professional", "Parent"].map((option) => (
                    <label key={option}>
                        <input
                            type="radio"
                            name="occupation"
                            value={option}
                            checked={surveyData.occupation === option}
                            onChange={() => updateSurveyData("", { occupation: option })}
                        />
                        {option}
                    </label>
                ))}
            </div>
            <div className="navi-buttons">
                <button className="pre-btn" onClick={() => navigate("/signup/basic-details/age")}>
                    Previous
                </button>
                <button className="next-btn" onClick={handleNext}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default SignupPage1C;