import { useEffect } from "react";
import {
    Button,
    Col,
    Image,
    ListGroup,
    ListGroupItem,
    Row,
    FormControl,
    Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    Link,
    useNavigate,
    useParams,
    useSearchParams,
} from "react-router-dom";
import {
    addToCart,
    removeFromCart,
} from "./../../stores/actions/cartActions.js";
import Message from "../components/Message.jsx";
import {
    calculateTotalCartItemsPrice,
    calculateTotalCartItemsQty,
    convertStockCountToArray,
    isCartItemEmpty,
} from "../../services/cartService.js";

export default () => {
    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart);
    const history = useNavigate();

    const productId = params.id;
    const qty = searchParams.get("qty") ? Number(searchParams.get("qty")) : 1;

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = productId => {
        dispatch(removeFromCart(productId));
    };

    const checkoutHandler = () => {
        history("/login?redirect=shipping");
        console.log("checkout");
    };

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message>
                        Your cart is empty <Link to="/">Go Back</Link>
                    </Message>
                ) : (
                    <ListGroup variant="flush">
                        {cartItems.map(item => (
                            <ListGroupItem key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fluid
                                            rounded
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`products/${item.product}`}>
                                            {item.name}
                                        </Link>
                                    </Col>
                                    <Col md={2}>৳{item.price}</Col>
                                    <Col md={2}>
                                        <FormControl
                                            as="select"
                                            value={item.qty}
                                            onChange={e =>
                                                dispatch(
                                                    addToCart(
                                                        item.product,
                                                        Number(e.target.value)
                                                    )
                                                )
                                            }
                                        >
                                            {convertStockCountToArray(
                                                item.countInStock
                                            ).map(x => (
                                                <option key={x} value={x}>
                                                    {x}
                                                </option>
                                            ))}
                                        </FormControl>
                                    </Col>
                                    <Col md={2}>
                                        <Button
                                            type="button"
                                            variant="light"
                                            onClick={() =>
                                                removeFromCartHandler(
                                                    item.product
                                                )
                                            }
                                        >
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <h2>
                                Subtotal (
                                {calculateTotalCartItemsQty(cartItems)}) items
                            </h2>
                            <>৳{calculateTotalCartItemsPrice(cartItems)}</>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Button
                                type="button"
                                className="btn-block"
                                disabled={isCartItemEmpty(cartItems)}
                                onClick={checkoutHandler}
                            >
                                Checkout
                            </Button>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
};
