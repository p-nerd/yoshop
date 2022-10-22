import PropTypes from "prop-types";

const ratingIcon = (value, first, second, color) => {
    return (
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
    );
};

const Rating = ({ value, text, color }) => {
    return (
        <div className="rating">
            <span>{ratingIcon(value, 1, 0.5, color)}</span>
            <span>{ratingIcon(value, 2, 1.5, color)}</span>
            <span>{ratingIcon(value, 3, 2.5, color)}</span>
            <span>{ratingIcon(value, 4, 3.5, color)}</span>
            <span>{ratingIcon(value, 5, 4.5, color)}</span>
            <span>{text && text}</span>
        </div>
    );
};

Rating.defaultProps = {
    color: "#f8e825",
};

Rating.propTypes = {
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
};

export default Rating;
