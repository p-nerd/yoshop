import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import Rating from "./Rating.jsx";
import ProductLinkAndName from "./ProductLinkAndName.jsx";

const Product = ({ product }) => (
    <Card className="my-3 p-3 rounded">
        <ProductLinkAndName productId={product._id}>
            <Card.Img src={product.image} variant="top" />
        </ProductLinkAndName>
        <Card.Body>
            <ProductLinkAndName productId={product._id}>
                <Card.Title as="div">
                    <strong>{product.name}</strong>
                </Card.Title>
            </ProductLinkAndName>
            <Card.Text as="div">
                <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                />
            </Card.Text>
            <Card.Text as="h3">৳{product.price}</Card.Text>
        </Card.Body>
    </Card>
);

Product.propTypes = {
    product: PropTypes.object.isRequired,
};

export default Product;
