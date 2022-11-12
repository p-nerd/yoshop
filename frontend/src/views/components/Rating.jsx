import PropTypes from "prop-types";

const ratingIconLogic = (value, first, second, color) => (
    <span>
        <i
            style={{ color }}
            className={
                value >= first
                    ? "fas fa-star"
                    : value >= second
                    ? "fas fa-star-half-alt"
                    : "far fa-star"
            }
        ></i>
    </span>
);

const Rating = ({ value, text, color }) => (
    <div className="rating">
        {ratingIconLogic(value, 1, 0.5, color)}
        {ratingIconLogic(value, 2, 1.5, color)}
        {ratingIconLogic(value, 3, 2.5, color)}
        {ratingIconLogic(value, 4, 3.5, color)}
        {ratingIconLogic(value, 5, 4.5, color)}
        <span>{text && text}</span>
    </div>
);

Rating.propTypes = {
    value: PropTypes.number,
    text: PropTypes.string,
    color: PropTypes.string,
};

Rating.defaultProps = {
    value: 0,
    color: "#f8e825",
};

export default Rating;
