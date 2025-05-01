import "./syllabus.scss";
import React from "react";
import { useState } from "react";

function Syllabus({ data }) {
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
            <section className="syllabus courses-sub-section" id="syllabus">
                <h2>Summarized syllabus</h2>
                <p>Not available.</p>
            </section>
        );
    }

    return (
        <section className="syllabus courses-sub-section" id="syllabus">
            <h2>Summarized syllabus</h2>
            <div className="content-box">
            {/* Map over the text array to render each block */}
            {data.text.map((block, index) => {
                switch (block.type) {            
                    case "heading":
                        return <h3 key={index}>{block.content}</h3>;
                    case "paragraph":
                        return <p key={index}>{block.content}</p>;
                    case "list":
                        return (                    
                            <ul key={index}>
                                {block.items.map((item, itemIndex) => (
                                <li key={itemIndex}><p>{item}</p></li> ))}        
                            </ul>
                        );
                    case "topics-covered":
                        return (
                            <div key={index} className="topics-covered">
                                <h3 onClick={() => toggleTopics(index)}>{block.content.heading}</h3>
                                <div className={`toggle-sy-topics ${openTopics[index] ? "open" : "close"}`}>
                                    <div className="sy-wrapper">
                                        <p>{block.content.objective}</p>
                                        <ul>
                                            {block.content.items.map((item, itemIndex) => (
                                            <li key={itemIndex}><p>{item}</p></li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
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

export default Syllabus;