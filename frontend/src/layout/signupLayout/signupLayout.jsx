import { Outlet } from "react-router-dom";
import "./signupLayout.scss";
import ProgressBar from "/src/components/progressBar/progressBar";

function SignupLayout({ onClose }) {

    return (
        <>
            <div className="signupLayout-body">
                <div className="signupLayout-wrapper">
                    <header className="signup-header-section">
                        <h1>Sign-up (Survey)</h1>
                        <p>
                            Answer the following questions wisely. [your response to this survey matters.]
                        </p>
                    </header>
                    <main className="signup-layout-main-section">
                        <div className="signup-overlay">
                            <ProgressBar />
                            <section className="signup-main-section">
                                <Outlet />
                                <button className="close-btn" onClick={onClose}>Close</button>
                            </section>
                        </div>
                    </main>
                    <div className="signup-limiter">Limiter</div>
                </div>
            </div>
        </>
    );
}

export default SignupLayout;