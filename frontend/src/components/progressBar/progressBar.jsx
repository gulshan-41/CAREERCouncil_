import "./progressBar.scss";
import { useLocation } from "react-router-dom";
import Tick from "/src/assets/icons/greenTick.svg";

function ProgressBar() {
    const location = useLocation();
    const { pathname } = location; // Destructure for cleaner access

    // Define steps and their base URLs
    const steps = [
        { label1: "1", label2: "Basic details", url: "/signup/basic-details" },
        { label1: "2", label2: "Strengths?", url: "/signup/strengths" },
        { label1: "3", label2: "Interest?", url: "/signup/interest" },
        { label1: "4", label2: "Sign-up/ login", url: "/signup/modal" }
    ];

    // Sub-page arrays for each step
    const basicDetailsPages = [
        "/signup/basic-details/name",
        "/signup/basic-details/age",
        "/signup/basic-details/occupation",
    ];

    const strengthPages = [
        "/signup/strengths/maths",
        "/signup/strengths/management",
        "/signup/strengths/sports",
    ];

    const interestPages = [
        "/signup/interest/science",
        "/signup/interest/history",
        "/signup/interest/fields",
    ];

    // Map sub-pages to their step index for efficient lookup
    const stepPageMap = [
        basicDetailsPages,
        strengthPages,
        interestPages,
    ];

    // Determine the current step
    let currentStep = steps.findIndex((step) => step.url === pathname);
    if (currentStep === -1) {
        // Check if the current path is a sub-page of any step
        currentStep = stepPageMap.findIndex((pages) => pages.includes(pathname));
        if (currentStep === -1) {
            currentStep = 0; // Default to first step for invalid paths
        }
    }

    return (
        <div className="progress-container">
            <div className="progress-bar">
                {steps.map((step, index) => {
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;

                return (
                    <div key={step.url} className="progress-item">
                        <div className={`step ${
                            isCompleted ? "completed" : isCurrent ? "current" : ""
                            }`}>
                            <div className="text-circle-wrapper">
                                <div className={`step-circle ${
                                    isCompleted ? "completed" : isCurrent ? "current" : ""
                                    }`}>
                                        <p>{step.label1}</p>
                                    {isCompleted && (
                                        <img src={Tick} alt="Completed" className="checkmark" />
                                    )}
                                </div>
                                <div className="text">
                                    <p>{step.label2}</p>
                                </div>
                            </div>
                        </div>

                        {index < steps.length - 1 && (
                            <div className={`line ${isCompleted ? "completed" : ""}`} />
                        )}
                    </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ProgressBar;