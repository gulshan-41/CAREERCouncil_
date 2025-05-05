import "./sharedSignupPage.scss";
import { useNavigate } from "react-router-dom";
import { useSurvey } from "../../context/SurveyContext/SurveyContext";
import { toast } from "react-toastify";

function SignupPage3A() {
    const navigate = useNavigate();
    const { surveyData, updateSurveyData } = useSurvey();

    const handleNext = () => {
        if (surveyData.interests.science !== null) {
            navigate("/signup/interest/history");
        } else {
            toast.error("Please select an option.");
        }
    };

    return (
        <div className="child-container">
            <div className="question-heading">
                <p className="main-question">Have you ever felt it interesting?</p>
                <p className="sub-question">
                    to learn more about the process and logic (Science) behind space - solar system -
                    computers - environmental - phenomenons.
                </p>
            </div>
            <div className="span-inputs">
                {["Yes! I did", "No"].map((option) => (
                    <label key={option}>
                        <input
                            type="radio"
                            name="science"
                            value={option}
                            checked={surveyData.interests.science === (option === "Yes! I did")}
                            onChange={() => updateSurveyData("interests", { science: option === "Yes! I did" })}
                        />
                        <span className="yes-no">{option}</span>
                    </label>
                ))}
            </div>
            <div className="navi-buttons">
                <button className="pre-btn" onClick={() => navigate("/signup/strengths/sports")}>
                    Previous
                </button>
                <button className="next-btn" onClick={handleNext}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default SignupPage3A;