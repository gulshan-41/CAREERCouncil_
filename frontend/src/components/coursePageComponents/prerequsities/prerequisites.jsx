import "./prerequisites.scss";
import React from "react";

function Subjects({ data }) {
    // Fallback if data is not provided
    if (!data || !data.text) {
        return (
            <section className="prerequisite-subjects" id="subjects">
                <h2>Prerequisites</h2>
                <p>Not available.</p>
            </section>
        );
    }

    return ( 
        <section className="prerequisite-subjects courses-sub-section" id="subjects">
            <h2>Prerequisites</h2>
            <div className="content-box">
            {/* Map over the text array to render each block */}
            {data.text.map((block, index) => {
                switch (block.type) {
                    case "section-intro": 
                        return <p key={index}>{block.content}</p>
                    case "tips":
                        return (
                            <div key={index} className="tips">
                                <h3>{block.content.heading}</h3>
                                <p>{block.content.paragraph}</p>
                            </div>
                        );
                    case "requirements":
                        return (
                            <div key={index} className="requirements">
                                <h3>{block.content.heading}</h3>
                                <p>{block.content.paragraph}</p>
                                <ul>
                                    {block.content.items.map((item, itemIndex) => (
                                        <li key={itemIndex}><p>{item}</p></li>
                                    ))}
                                </ul>
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

export default Subjects;