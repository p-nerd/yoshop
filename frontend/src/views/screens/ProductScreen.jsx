import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Row, Col, Image, Card, Button, ListGroup } from "react-bootstrap";
import { Form, FormControl } from "react-bootstrap";
import {
    productCreateReviewAction,
    productDetailsAction,
} from "./../../stores/actions/productActions.js";
import { convertStockCountToArray } from "../../logic/cartLogic.js";
import { isProductOutOfStock } from "../../logic/productLogic.js";
import Rating from "../components/Rating.jsx";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import { isObjectEmpty } from "../../logic/commonLogic.js";
import SubmitButton from "../components/SubmitButton.jsx";
import { PRODUCT_CREATE_REVIEW_RESET } from "../../stores/constants/productConstants.js";
import Meta from "../components/Meta.jsx";

const { Item } = ListGroup;

const ListGroupItem = ({ title, children }) => {
    return (
        <ListGroup.Item>
            <Row>
                <Col>{title}</Col>
                <Col>{children}</Col>
            </Row>
        </ListGroup.Item>
    );
};

export default () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const productDetails = useSelector(state => state.productDetails);
    const productCreateReview = useSelector(state => state.productCreateReview);
    const userLogin = useSelector(state => state.userLogin);

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const {
        loading: loadingProduct,
        error: errorProduct,
        product,
    } = productDetails;
    const {
        loading: loadingReview,
        error: errorReview,
        success: successReview,
    } = productCreateReview;
    const { userInfo } = userLogin;
    const productId = params.id;

    useEffect(() => {
        if (successReview) {
            alert("Review Submitted");
            setRating(0);
            setComment("");
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        }
        dispatch(productDetailsAction(productId));
    }, [dispatch, productId, successReview]);

    const addToCartHandler = () => {
        navigate(`/cart/${productId}?qty=${qty}`);
    };

    const handleReviewSubmit = e => {
        e.preventDefault();
        dispatch(productCreateReviewAction(productId, { rating, comment }));
    };

    return (
        <>
            <Link className="btn btn-light my-3" to="/">
                Go Back
            </Link>
            {loadingProduct ? (
                <Loader />
            ) : errorProduct ? (
                <Message variant="danger">{errorProduct}</Message>
            ) : (
                <>
                    <Meta title={product.name} />

                    <Row>
                        <Col md={6}>
                            <Image
                                src={product.image}
                                alt={product.name}
                                fluid
                            />
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
                                            {isProductOutOfStock(product)
                                                ? "Out of Stock"
                                                : "In Stock"}
                                        </strong>
                                    </ListGroupItem>
                                    {isProductOutOfStock(product) === false && (
                                        <ListGroupItem title="Qty:">
                                            <FormControl
                                                as="select"
                                                value={qty}
                                                onChange={e =>
                                                    setQty(e.target.value)
                                                }
                                            >
                                                {convertStockCountToArray(
                                                    product.countInStock
                                                ).map(x => (
                                                    <option key={x} value={x}>
                                                        {x}
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
                                            disabled={isProductOutOfStock(
                                                product
                                            )}
                                        >
                                            Add to Cart
                                        </Button>
                                    </Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {product.reviews.length === 0 && (
                                <Message>No Reviews</Message>
                            )}
                            <ListGroup variant="flush">
                                {product.reviews.map(review => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} />
                                        <p>
                                            {review.createdAt.substring(0, 10)}
                                        </p>
                                        {review.comment}
                                    </ListGroup.Item>
                                ))}
                                <ListGroup.Item>
                                    <h2>Write a Customer Review</h2>
                                    {loadingReview && <Loader />}
                                    {errorReview && (
                                        <Message variant="danger">
                                            {errorReview}
                                        </Message>
                                    )}
                                    {isObjectEmpty(userInfo) ? (
                                        <Message>
                                            Please{" "}
                                            <Link to="/login">login</Link> to
                                            write a review
                                        </Message>
                                    ) : (
                                        <Form onSubmit={handleReviewSubmit}>
                                            <Form.Group controlId="rating">
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={rating}
                                                    onChange={e =>
                                                        setRating(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        Select...
                                                    </option>
                                                    <option value="1">
                                                        1 - Poor
                                                    </option>
                                                    <option value="2">
                                                        2 - Fair
                                                    </option>
                                                    <option value="3">
                                                        3 - Good
                                                    </option>
                                                    <option value="4">
                                                        4 - Very Good
                                                    </option>
                                                    <option value="5">
                                                        5 - Excellent
                                                    </option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="comment">
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    value={comment}
                                                    row={3}
                                                    onChange={e =>
                                                        setComment(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </Form.Group>
                                            <SubmitButton label="Submit" />
                                        </Form>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};
