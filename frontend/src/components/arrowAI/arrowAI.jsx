import "./arrowAI.scss";
import { useState } from "react";
import Cross from "/src/assets/icons/cross.svg";
import SendBtn from "/src/assets/icons/send.svg";

function ArrowAI() {
    const [isAIOpen, setAIToOpen] = useState(false);
    
    const toggleAI = () => {
        setAIToOpen((prev) => !prev);
    };
    return (
        <div className="AI-parent-container">
            <div className="arrowAI" onClick={toggleAI}>
                Arrow-AI
            </div>
            {isAIOpen && (
            <div className="arrow-window" >
                <div className="arrow-head">
                     Arrow-AI
                </div>
                <div className="convo-plain">
                    <div className="arrow-description">
                        Welcome to <strong>Arrow AI</strong>! Your personal career guide! Ask questions, get insights, and explore career paths with expert advice.
                    </div>
                    <div className="me">
                        Best companies for freshers in India?
                    </div>
                    <div className="arrow">
                        <div className="question">
                            Different companies excel in different fields. Could you specify your field of interest?
                        </div>
                        <div className="options">
                            <span>Software & IT</span>
                            <span>Data Science & AI</span>
                            <span>Core Engineering</span>
                            <span>Marketing & Advertising</span>
                            <span>Finance & Consulting</span>                                
                            <span>Healthcare & Pharma</span>
                        </div>
                    </div>
                </div>
                <div className="input-send">
                    <input type="text" placeholder="Anything..."/>
                    <div className="send">
                        <img Src={SendBtn} alt="send-btn" />
                    </div>
                </div>
            </div>
            )}
            {isAIOpen && (
            <div className="cutout" onClick={toggleAI}>
                <img Src={Cross} alt="cross-btn" />
            </div>
            )}
        </div>
    );
}

export default ArrowAI;