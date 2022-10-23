import PropTypes from "prop-types";

const ratingIcon = (value, first, second, color) => {
    return (
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
};

const Rating = ({ value, text, color }) => {
    return (
        <div className="rating">
            {ratingIcon(value, 1, 0.5, color)}
            {ratingIcon(value, 2, 1.5, color)}
            {ratingIcon(value, 3, 2.5, color)}
            {ratingIcon(value, 4, 3.5, color)}
            {ratingIcon(value, 5, 4.5, color)}
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
