import "./aboutCourse.scss";
import React from "react";

function AboutCourse({ data }) {
    // Fallback if data is not provided
    if (!data || !data.text) {
        return (

            <section className="about-course" id="about-course">
                <h3>About</h3>
                <p>About not available.</p>
            </section>
        );
    }

    return ( 
        <section className="about-course" id="about-course">
        <h2>About this course</h2>
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
                                <li key={itemIndex}>{item}</li> ))}           
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
export default AboutCourse;