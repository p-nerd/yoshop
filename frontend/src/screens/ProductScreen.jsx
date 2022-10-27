import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Image, Card, Button, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions.js";
import Rating from "../components/Rating.jsx";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";

const { Item } = ListGroup;

export default () => {
    const productId = useParams().id;
    const dispatch = useDispatch();

    const { loading, error, product } = useSelector(
        state => state.productDetails
    );

    useEffect(() => {
        dispatch(listProductDetails(productId));
    }, [dispatch]);

    return (
        <>
            <Link className="btn btn-light my-3" to="/">
                Go Back
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant="flush">
                            <Item>
                                <h3>{product.name}</h3>
                            </Item>
                            <Item>
                                <Rating
                                    value={product.rating}
                                    text={`${product.numReviews} reviews`}
                                />
                            </Item>
                            <Item>Price: ৳{product.price}</Item>
                            <Item>Description: {product.description}</Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant="flush">
                                <Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>
                                            <strong>৳{product.price}</strong>
                                        </Col>
                                    </Row>
                                </Item>
                            </ListGroup>
                            <ListGroup variant="flush">
                                <Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            <strong>
                                                {product.countInStock > 0
                                                    ? "In Stock"
                                                    : "Out of Stock"}
                                            </strong>
                                        </Col>
                                    </Row>
                                </Item>
                                <Item>
                                    <Button
                                        className="btn-block button"
                                        type="button"
                                        disabled={product.countInStock <= 0}
                                    >
                                        Add to Cart
                                    </Button>
                                </Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}
        </>
    );
};
