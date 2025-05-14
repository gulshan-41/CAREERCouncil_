import "./recommendedCoursesCards.scss";

function RecommendedCoursesCards({ name, specialization }) {
    return (
        <div className="recomm-course-cards">
            <div className="course-name">
                <p>{name}</p>
            </div>
            <div className="domain">
                <p>Domain:</p>
                <p>{specialization}</p>
            </div>
            <div className="checkout">
                <p>checkout</p>
            </div>
        </div>
    );
}

export default RecommendedCoursesCards;