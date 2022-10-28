import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Rating from "./Rating.jsx";

const PLink = ({ children, productId }) => (
    <Link to={`/products/${productId}`}>{children}</Link>
);

const Product = ({ product }) => {
    return (
        <Card className="my-3 p-3 rounded">
            <PLink productId={product._id}>
                <Card.Img src={product.image} variant="top" />
            </PLink>
            <Card.Body>
                <PLink productId={product._id}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </PLink>
                <Card.Text as="div">
                    <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                    />
                </Card.Text>
                <Card.Text as="h3">${product.price}</Card.Text>
            </Card.Body>
        </Card>
    );
};

Product.propTypes = {
    product: PropTypes.object.isRequired,
};

export default Product;
