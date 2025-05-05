import "./sharedSignupPage.scss";
import { useNavigate } from "react-router-dom";
import { useSurvey } from "../../context/SurveyContext/SurveyContext";
import { toast } from "react-toastify";

function SignupPage3C() {
    const navigate = useNavigate();
    const { surveyData, updateSurveyData } = useSurvey();

    const handleFieldToggle = (field) => {
        if (!updateSurveyData) {
            console.error("updateSurveyData is undefined. Check SurveyContext setup.");
            return;
        }
        const updatedFields = surveyData.interests.fields.includes(field)
            ? surveyData.interests.fields.filter((f) => f !== field)
            : [...surveyData.interests.fields, field];
        updateSurveyData("interests", { fields: updatedFields });
    };

    // console.log("Survey data: ", surveyData);

    const handleNext = () => {
        if (surveyData.interests.fields.length > 0) {
            console.log("Navigating to /signup-login-modal");
            navigate("/signup-login-modal");
        } else {
            toast.error("Please select at least one career field.");
        }
    };

    const careerFields = [
        "Engineering",
        "Medical",
        "Management",
        "Civil Services",
        "Media",
        "Armed Forces",
        "IT",
        "Aviation",
        "Animation",
        "Teaching",
        "Hospitality",
        "More",
    ];

    return (
        <div className="child-container">
            <div className="question-heading">
                <p className="main-question">{surveyData.name || "User"}, what's the career field you're interested in?</p>
                <p className="sub-question">Yes, you can select multiple options.</p>
            </div>
            <div className="span-inputs">
                {careerFields.map((field) => (
                    <label key={field} className="checkbox-label">
                        <input
                            type="checkbox"
                            value={field}
                            checked={surveyData.interests.fields.includes(field)}
                            onChange={() => handleFieldToggle(field)}
                        />
                        <span className="checkbox-text">{field}</span>
                    </label>
                ))}
            </div>
            <div className="navi-buttons">
                <button className="pre-btn" onClick={() => navigate("/signup/interest/history")}>
                    Previous
                </button>
                <button className="next-btn" onClick={handleNext}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default SignupPage3C;