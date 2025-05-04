import "./courseIntroduction.scss";
import React from "react";

function Introduction({ data }) {
    // Fallback if data is not provided
    if (!data || !data.text) {
        return (
            <section className="introduction" id="course-introduction">
                <h3>Introduction</h3>
                <p>Introduction not available.</p>
            </section>
        );
    }

    return (
        <section className="introduction courses-sub-section" id="course-introduction">
            <h2>Introduction</h2>
            <div className="content-box">
            {/* Map over the text array to render each block */}
            {data.text.map((block, index) => {
                switch (block.type) {
                    case "section-intro":
                        return <p className="sub-section" key={index}>{block.content}</p>;
                    case "main-focus":
                        return (
                            <div key={index} className="main-focus sub-section">
                                <h3>{block.content.heading}</h3>
                                <ul>
                                    {block.content.items.map((item, itemIndex) => (
                                        <li key={itemIndex}><p>{item}</p></li>
                                    ))}
                                </ul>
                            </div>
                        );
                    case "overview":
                        return (
                            <div key={index} className="overview sub-section">
                                <h3>{block.content.heading}</h3>
                                <p>{block.content.paragraph}</p>
                            </div>
                        );
                    case "standard-duration":
                        return <p className="sub-section" key={index}>{block.content}</p>
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

export default Introduction;