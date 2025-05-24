import "./feedbackForm.scss";

function FeedbackForm() {
    return (
        <div className="feedback-form-wrapper">
            <div className="form-wrapper">
                <h2>Feedback form</h2>
                <form action="">
                    <input type="email" placeholder="Enter your email?" required/>
                    <label htmlFor="">Write your query</label>
                    <input type="text" name="" id="" placeholder="Anything..."/>
                    <ul>
                        <li>Ask for any point you want us to include. Like: Job roles, Summarized syllabus, anything you want.</li>
                        <li>Mention any correction needs to done.</li>
                        <li>Any suggestions from your side would be valuable.</li>
                    </ul>          
                </form>
            </div>
        </div>
    );
}

export default FeedbackForm;