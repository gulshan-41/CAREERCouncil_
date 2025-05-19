import "./sharedSignupPage.scss";
import { useNavigate } from "react-router-dom";
import { useSurvey } from "../../context/SurveyContext/SurveyContext";
// import { toast } from "react-toastify";
import { useAlert } from "../../context/alertContext/alertContext"

function SignupPage3A() {
    const navigate = useNavigate();
    const { surveyData, updateSurveyData } = useSurvey();
    const { showAlert } = useAlert();

    const handleNext = () => {
        if (surveyData.interests.science !== null) {
            navigate("/signup/interest/history");
        } else {
            showAlert("Please select an option!");
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
                        <span className={`option-spans ${surveyData.interests?.science === (option === "Yes! I did") ? "selected" : "deselected"}`}>{option}</span>
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

export default SignupPage3A;