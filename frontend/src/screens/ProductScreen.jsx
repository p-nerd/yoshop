import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Row, Col, Image, Card, Button, ListGroup } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions.js";
import Rating from "../components/Rating.jsx";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import { useState } from "react";

const { Item } = ListGroup;

const ListGroupItem = ({ title, children }) => {
    return (
        <Item>
            <Row>
                <Col>{title}</Col>
                <Col>{children}</Col>
            </Row>
        </Item>
    );
};

export default () => {
    const [qty, setQty] = useState(1);

    const productId = useParams().id;
    const dispatch = useDispatch();
    const history = useNavigate();

    const { loading, error, product } = useSelector(
        state => state.productDetails
    );

    useEffect(() => {
        dispatch(listProductDetails(productId));
    }, [dispatch]);

    const addToCartHandler = () => {
        history(`/cart/${productId}?qty=${qty}`);
    };

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
                                <ListGroupItem title="Price:">
                                    <strong>৳{product.price}</strong>
                                </ListGroupItem>
                            </ListGroup>
                            <ListGroup variant="flush">
                                <ListGroupItem title="Status:">
                                    <strong>
                                        {product.countInStock > 0
                                            ? "In Stock"
                                            : "Out of Stock"}
                                    </strong>
                                </ListGroupItem>
                                {product.countInStock > 0 && (
                                    <ListGroupItem title="Qty:">
                                        <FormControl
                                            as="select"
                                            value={qty}
                                            onChange={e =>
                                                setQty(e.target.value)
                                            }
                                        >
                                            {[
                                                ...Array(
                                                    product.countInStock
                                                ).keys(),
                                            ].map(x => (
                                                <option
                                                    key={x + 1}
                                                    value={x + 1}
                                                >
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </FormControl>
                                    </ListGroupItem>
                                )}
                                <Item>
                                    <Button
                                        onClick={addToCartHandler}
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
