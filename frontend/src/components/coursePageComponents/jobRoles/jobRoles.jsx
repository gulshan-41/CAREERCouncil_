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
                switch (block.type) {
                    case "heading":
                        return <h3 key={index}>{block.content}</h3>
                    case "paragraph":
                        return <p key={index}>{block.content}</p>
                    case "list":
                        return (
                            <ul key={index}>
                                {block.items.map((item, itemIndex) => (
                                    <li key={itemIndex}><p>{item}</p></li>
                                ))}
                            </ul>
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

export default JobRoles;