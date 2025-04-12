import React from "react";
import "./subjects.scss";

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
        <section className="prerequisite-subjects" id="subjects">
        <h2>Prerequisites</h2>
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
                            <li><p key={itemIndex}>{item}</p></li> ))}        
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
        </section>
    );
}

export default Subjects;