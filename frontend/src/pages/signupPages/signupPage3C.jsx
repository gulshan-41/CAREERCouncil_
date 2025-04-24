import "./sharedSignupPage.scss";
import { useNavigate } from "react-router-dom";

function SignupPage3C () {
    const navigate = useNavigate();
    
    return (
        <div className="child-container">
            <div className="question-heading">
                <p className="main-question">What's the career field your are interested in?</p>
                <p className="sub-question">Yes you can select multiple options.</p>
            </div>
            <div className="span-inputs">
                <span>Engineering</span>
                <span>Medical</span>
                <span>Management</span>
                <span>Civil Services</span>
                <span>Media</span>                    
                <span>Armed Forces</span>               
                <span>IT</span>
                <span>Aviation</span>
                <span>Animation</span>
                <span>Teaching</span>
                <span>Hospitality</span>
                <span>More</span>
            </div>
            <div className="navi-buttons">
                <button className="pre-btn" onClick={() => navigate("/signup/interest/history")}>
                    Previous
                </button>
                <button className="next-btn" onClick={() => navigate("/signup/modal")}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default SignupPage3C;