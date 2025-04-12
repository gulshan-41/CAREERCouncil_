import "./syllabus.scss";

function Syllabus() {
    return (
        <section className="syllabus" id="syllabus">
            <h3>Summarized syllabus</h3>
            <div className="syllabus-pdf">
                <div className="sy-pdf">
                    <div className="pdf-container"></div>
                    <div className="pdf-foot">pdf1</div>
                </div>
                <div className="sy-pdf">
                    <div className="pdf-container"></div>
                    <div className="pdf-foot">pdf2</div>
                </div>
                <div className="sy-pdf">
                    <div className="pdf-container"></div>
                    <div className="pdf-foot">pdf3</div>
                </div>
            </div>
        </section>
    );
}

export default Syllabus;