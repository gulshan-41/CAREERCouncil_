import "./jobRoles.scss";
import React from "react";

function JobRoles({ data }) {
    // Fallback if data is not provided
    if (!data || !data.text) {
        return (
            <section className="job-opportunities courses-sub-section" id="syllabus">
                <h2>Core subjects</h2>
                <p>Not available.</p>
            </section>
        );
    }

    return (
        <section className="job-opportunities courses-sub-section" id="job-opportunities">
            <h2>Job opportunities afterwards</h2>
            <div className="content-box">
                {data.text.map((block, index) => {
                    switch(block.type) {
                        case "section-intro":
                            return <p key={index}>{block.content}</p>
                        case "sub-topics-intro":
                            return (
                                <div key={index} className="sub-topics-intro">
                                    <h3>{block.content.heading}</h3>
                                    <p>{block.content.paragraph}</p>
                                </div>
                            );
                        case "job-roles": 
                            return (
                                <div key={index} className="job-roles">
                                    <h3>{block.content.heading}</h3>
                                    <p>{block.content.paragraph}</p>
                                    <ul>
                                        {block.content.items.map((item, itemIndex) => (
                                            <li key={itemIndex}><p>{item}</p></li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        case "key-organizations": 
                            return (
                                <div key={index} className="key-organizations">
                                    <h3>{block.content.heading}</h3>
                                    <ul>
                                        {block.content.items.map((item, itemIndex) => (
                                            <li key={itemIndex}><p>{item}</p></li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        case "salary-range":
                            return <p key={index}>{block.content}</p>
                        case "key-skills":
                            return (
                                <div key={index} className="key-skills">
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
                            );
                    }
                })}
            </div>
        </section>
    );
}

export default JobRoles;