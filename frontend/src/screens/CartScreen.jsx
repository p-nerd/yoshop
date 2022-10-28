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
import { addToCart, removeFromCart } from "../actions/cartActions.js";
import Message from "../components/Message.jsx";

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

    const totalCartItemsQty = () =>
        cartItems.reduce((sum, item) => sum + item.qty, 0);

    const totalCartItemsPrice = () =>
        cartItems
            .reduce((sum, item) => sum + item.qty * item.price, 0)
            .toFixed(2);

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
                                            {[
                                                ...Array(
                                                    item.countInStock
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
                            <h2>Subtotal ({totalCartItemsQty()}) items</h2>
                            <>৳{totalCartItemsPrice()}</>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Button
                                type="button"
                                className="btn-block"
                                disabled={cartItems.length === 0}
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
