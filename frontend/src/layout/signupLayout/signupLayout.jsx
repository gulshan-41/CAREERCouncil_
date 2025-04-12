import { Outlet } from "react-router-dom";
import "./signupLayout.scss";
import ProgressBar from "/src/components/progressBar/progressBar";

function SignupLayout({ onClose }) {

    return (
        <>
            <div className="signup-modal-overlay">
                <ProgressBar />
                <section className="signup-main-section">
                    <Outlet />
                    <button className="close-btn" onClick={onClose}>Close</button>
                </section>
            </div>
        </>
        
    );
}

export default SignupLayout;