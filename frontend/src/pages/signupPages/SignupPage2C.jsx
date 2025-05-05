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
                        <span className={`option-spans ${surveyData.strengths?.sports?.includes(sport) ?"selected" : "deselected"}`}>{sport}</span>
                    </label>
                ))}
            </div>
            <div className="navi-buttons">
                <button className="pre-btn" onClick={() => navigate(-1)}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22px"
                    height="22px"
                    fill="#fff"
                    viewBox="0 0 32 32"
                    className="lft-arrow"
                    id="left-arrow"
                >
                    <path d="m12.3 17.71 6.486 6.486a1 1 0 0 0 1.414-1.414L14.418 17l5.782-5.782a1 1 0 0 0-1.414-1.414L12.3 16.29a.997.997 0 0 0-.292.71c0 .258.096.514.292.71z"></path>
                </svg>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22px"
                    height="22px"
                    fill="#203864"
                    viewBox="0 0 32 32"
                    className="lft-arrow-move"
                    id="left-arrow"
                >
                    <path d="m12.3 17.71 6.486 6.486a1 1 0 0 0 1.414-1.414L14.418 17l5.782-5.782a1 1 0 0 0-1.414-1.414L12.3 16.29a.997.997 0 0 0-.292.71c0 .258.096.514.292.71z"></path>
                </svg>
                </button>
                <button className="next-btn" onClick={handleNext}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22px"
                        height="22px"
                        fill="#fff"
                        viewBox="0 0 32 32"
                        className="rght-arrow"
                        id="right-arrow"
                    >
                        <path d="M13.8 24.196a1 1 0 0 0 1.414 0L21.7 17.71a.992.992 0 0 0 .292-.71.997.997 0 0 0-.292-.71l-6.486-6.486a1 1 0 0 0-1.414 1.414L19.582 17 13.8 22.782a1 1 0 0 0 0 1.414z"></path>
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22px"
                        height="22px"
                        fill="#203864"
                        viewBox="0 0 32 32"
                        className="rght-arrow-move"
                        id="right-arrow"
                    >
                        <path d="M13.8 24.196a1 1 0 0 0 1.414 0L21.7 17.71a.992.992 0 0 0 .292-.71.997.997 0 0 0-.292-.71l-6.486-6.486a1 1 0 0 0-1.414 1.414L19.582 17 13.8 22.782a1 1 0 0 0 0 1.414z"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default SignupPage2C;