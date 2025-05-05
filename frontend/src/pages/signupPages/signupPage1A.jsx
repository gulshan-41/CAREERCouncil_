import "./sharedSignupPage.scss";
import { useNavigate } from "react-router-dom";
import { useSurvey } from "../../context/SurveyContext/SurveyContext";
import { toast } from "react-toastify";

function SignupPage1A() {
    const navigate = useNavigate();
    const { surveyData, updateSurveyData } = useSurvey();

    const handleNext = () => {
        if (surveyData.name) {
            navigate("/signup/basic-details/age");
        } else {
            toast.error("Please enter your name.");
        }
    };

    return (
        <div className="child-container">
            <div className="question-heading">
                <p className="main-question">What's your name?</p>
            </div>
            <div className="labels-inputs">
                <input
                    type="text"
                    value={surveyData.name}
                    onChange={(e) => updateSurveyData("name", e.target.value)}
                    placeholder="Enter your name"
                    className="input-field"
                />
            </div>
            <div className="navi-buttons">
                <button className="pre-btn" onClick={() => {navigate('/')}}>
                    Back to Homepage 
                </button>
                <button className="next-btn" onClick={handleNext}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default SignupPage1A;