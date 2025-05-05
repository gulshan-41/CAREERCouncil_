import "./sharedSignupPage.scss";
import { useNavigate } from "react-router-dom";
import { useSurvey } from "../../context/SurveyContext/SurveyContext";
import { toast } from "react-toastify";

function SignupPage2C() {
    const navigate = useNavigate();
    const { surveyData, updateSurveyData } = useSurvey();

    const handleSportToggle = (sport) => {
        const updatedSports = surveyData.strengths.sports.includes(sport)
            ? surveyData.strengths.sports.filter((s) => s !== sport)
            : [...surveyData.strengths.sports, sport];
        updateSurveyData("strengths", { sports: updatedSports });
    };

    const handleNext = () => {
        if (surveyData.strengths.sports.length > 0) {
            navigate("/signup/interest/science");
        } else {
            toast.error("Please select at least one sport.");
        }
    };

    return (
        <div className="child-container">
            <div className="question-heading">
                <p className="main-question">Which sports are you good at?</p>
            </div>
            <div className="span-inputs">
                {["Football", "Cricket", "Basketball", "Marathon"].map((sport) => (
                    <label key={sport}>
                        <input
                            type="checkbox"
                            value={sport}
                            checked={surveyData.strengths.sports.includes(sport)}
                            onChange={() => handleSportToggle(sport)}
                        />
                        {sport}
                    </label>
                ))}
            </div>
            <div className="navi-buttons">
                <button className="pre-btn" onClick={() => navigate("/signup/strengths/management")}>
                    Previous
                </button>
                <button className="next-btn" onClick={handleNext}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default SignupPage2C;