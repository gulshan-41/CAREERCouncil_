import React from "react";
import "./coreSubjects.scss";
import { useState } from "react";

function CoreSubjects({ data }) {
    const [openTopics, setOpenTopics] = useState({});

    const toggleTopics = (index) => {
        setOpenTopics((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    // Fallback if data is not provided
    if (!data || !data.text) {
        return (
            <section className="core-subjects courses-sub-section" id="core-subjects">
                <h2>Core subjects</h2>
                <p>Not available.</p>
            </section>
        );
    }
    return (
        <section className="core-subjects courses-sub-section" id="core-subjects">
            <h2>Core subjects</h2>
            <div className="content-box">
                {data.text.map((block, index) => {
                    switch(block.type) {
                        case "heading": 
                            return (
                                <h3 key={index}>{block.content}</h3>
                            );
                        case "paragraph":
                            return (
                                <p key={index}>{block.content}</p>
                            );
                        case "topics-list": 
                            return (
                                <div key={index} className="core-topics">
                                    {block.content.data.filter(subject => subject.heading && (subject.items)) // Filter out invalid/empty objects
                                        .map((subject, subjectIndex) => (
                                        <div key={subjectIndex} className="topics">
                                            <h3 onClick={() => toggleTopics(subjectIndex)}>{subject.heading}</h3>
                                            <div className={`sub-topics-grid ${openTopics[subjectIndex] ? "open" : "close"}`}>
                                                <ul className="sub-topics-list">
                                                    {(subject.items || []).map((item, itemIndex) => (
                                                        <li key={itemIndex}>
                                                            <p>{item}</p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            );
                        default:
                            return (
                                <p key={index} className="unsupported">
                                    [Unsupported content type: {block.type}]
                                </p>
                            ); // Fallback for unknown types
                    }
                })}
            </div>
        </section>
    );
}

export default CoreSubjects;