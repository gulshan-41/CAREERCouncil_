import "./jobOpportunities.scss";
import AddBtn from "/src/assets/icons/addIcon.svg";

function Opportunities() {
    return (
        <section className="job-opportunities" id="job-opportunities">
            <h3>Job opportunities afterwards</h3>
            <details>
                <summary>
                    <img src={AddBtn} alt="plus-btn" />
                    <h4>AI Engineer</h4>
                </summary>
                <p>
                    Develop AI-powered applications, automation, and intelligent systems.
                </p>
            </details>
            <details>
                <summary>
                    <img src={AddBtn} alt="plus-btn" />
                    <h4>Data scientist</h4>
                </summary>
                <p>
                    Analyze large datasets, extract insights, and create predictive models.
                </p>
            </details>
            <details>
                <summary>
                    <img src={AddBtn} alt="plus-btn" />
                    <h4>Natural Language Processing (NLP) Engineer</h4>
                </summary>
                <p>
                    Build chatbots, speech recognition, and language translation models.
                </p>
            </details>
            <details>
                <summary>
                    <img src={AddBtn} alt="plus-btn" />
                    <h4>Robotics Engineer</h4>
                </summary>
                <p>
                    Develop AI-driven robots for industries like healthcare, manufacturing, and defense.
                </p>
            </details>
            <details>
                <summary>
                    <img src={AddBtn} alt="plus-btn" />
                    <h4>AI project manager</h4>
                </summary>
                <p>
                    Oversee the development of AI-based products and solutions.
                </p>
            </details>
        </section>
    );
}

export default Opportunities;