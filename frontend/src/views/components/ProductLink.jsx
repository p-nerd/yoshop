import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProductLink = ({ productId, children }) => (
    <Link to={`/products/${productId}`}>{children}</Link>
);

ProductLink.propTypes = {
    productId: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
};

export default ProductLink;
