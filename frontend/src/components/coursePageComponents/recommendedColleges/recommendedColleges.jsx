import "./recommendedColleges.scss";

function Recommendation() {
    return (
        <section className="recommended-colleges" id="colleges">
            <h3>Recommended colleges</h3>
            <div className="colleges-container">
                <div className="college-card">
                    <div className="college-img-container">
                        <div className="visit-link">visit</div>
                    </div>
                    <div className="college-info-foot" data-tooltip="Indian Institute of Technology Madras">
                        <p>(IIT) Indian Institute of Technology Madras</p>
                    </div>
                </div>
                <div className="college-card">
                    <div className="college-img-container">
                        <div className="visit-link">visit</div>
                    </div>
                    <div className="college-info-foot">
                        <p>(IIT) Indian Institute of Technology Madras</p>
                    </div>
                </div>
                <div className="college-card">
                    <div className="college-img-container">
                        <div className="visit-link">visit</div>
                    </div>
                    <div className="college-info-foot">
                        <p>(IIT) Indian Institute of Technology Madras</p>
                    </div>
                </div>
                <div className="college-card">
                    <div className="college-img-container">
                        <div className="visit-link">visit</div>
                    </div>
                    <div className="college-info-foot">
                        <p>(IIT) Indian Institute of Technology Madras</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Recommendation;