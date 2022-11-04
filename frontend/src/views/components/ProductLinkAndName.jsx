import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProductLinkAndName = ({ productId, children }) => (
    <Link to={`/products/${productId}`}>{children}</Link>
);

ProductLinkAndName.propTypes = {
    productId: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
};

export default ProductLinkAndName;
