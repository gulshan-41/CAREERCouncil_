import "./arrowAI.scss";
import React, { useState } from "react";
import axios from "axios";
import Cross from "/src/assets/icons/cross.svg";
import SendBtn from "/src/assets/icons/send.svg";

function ArrowAI() {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
    e.preventDefault();
        if (!query) return; // Skip empty queries

            try {
                const res = await axios.post('http://localhost:5000/api/chat', { query });
                setResponse(res.data.response); // Show mock response
            } catch (error) {
                setResponse('Error: Could not reach backend');
            }       
    };

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
                    <div className="me"> {/* me is the user input or query */}
                        Best companies for freshers in India?
                    </div>
                    <div className="arrow">  {/* for now I have made a dummy reply myself */}
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

                    {response && <p>Response: {response}</p>}
                </div>
                <form className="input-send" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Anything..."
                    />
                    <button type="submit" className="send">
                        <img src={SendBtn} alt="send-btn" />
                    </button>   
                </form>
            </div>
            )}
            {isAIOpen && (
            <div className="cutout" onClick={toggleAI}>
                <img src={Cross} alt="cross-btn" />
            </div>
            )}
        </div>
    );
}

export default ArrowAI;