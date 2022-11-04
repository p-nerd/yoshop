import { Col, ListGroup, Row, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    calculateShippingPrice,
    calculateTotalCartItemsPrice,
    calculateTotalPriceOfItemWithQty,
    calculateTexPrice,
    calculateTotalPrice,
} from "../../logic/cartLogic.js";
import CheckoutSteps from "../components/CheckoutSteps.jsx";
import Message from "../components/Message.jsx";
import ProductLinkAndName from "../components/ProductLinkAndName.jsx";

const PlaceOrderScreen = () => {
    const dispatch = useDispatch();
    const { cartItems, shippingAddress, paymentMethod } = useSelector(
        s => s.cart
    );

    const itemsPrice = calculateTotalCartItemsPrice(cartItems);
    const shippingPrice = calculateShippingPrice(itemsPrice);
    const texPrice = calculateTexPrice(itemsPrice);
    const totalPrice = calculateTotalPrice(itemsPrice, shippingPrice, texPrice);

    const handlePlaceOrder = () => {
        console.log("Order");
    };

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address: </strong>
                                {shippingAddress.address},{" "}
                                {shippingAddress.city}{" "}
                                {shippingAddress.postalCode},{" "}
                                {shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {paymentMethod}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cartItems.length === 0 ? (
                                <Message>Your cart is empty</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {cartItems.map((x, i) => (
                                        <ListGroup.Item key={i}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={x.image}
                                                        alt={x.name}
                                                        fluid
                                                        rounded
                                                    ></Image>
                                                </Col>
                                                <Col>
                                                    <ProductLinkAndName
                                                        productId={x.product}
                                                    >
                                                        <>{x.name}</>
                                                    </ProductLinkAndName>
                                                </Col>
                                                <Col md={4}>
                                                    {x.qty} x ৳{x.price} = ৳
                                                    {calculateTotalPriceOfItemWithQty(
                                                        x.qty,
                                                        x.price
                                                    )}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>৳ {itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>৳ {shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tex Price</Col>
                                    <Col>৳ {texPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total Price</Col>
                                    <Col>৳ {totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type="button"
                                    className="btn-block"
                                    disabled={cartItems.length === 0}
                                    onClick={handlePlaceOrder}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default PlaceOrderScreen;
