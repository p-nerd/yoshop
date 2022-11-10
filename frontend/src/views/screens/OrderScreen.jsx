import { useEffect } from "react";
import { Col, ListGroup, Row, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { calculateTotalPriceOfItemWithQty } from "../../logic/cartLogic.js";
import { orderDetailsAction } from "../../stores/actions/orderActions.js";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import ProductLinkAndName from "../components/ProductLinkAndName.jsx";

const OrderScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const orderId = params.id;

    const { order, loading, error } = useSelector(s => s.orderDetails);

    useEffect(() => {
        dispatch(orderDetailsAction(orderId));
    }, [dispatch, orderDetailsAction, orderId]);

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">
            <>{error}</>
        </Message>
    ) : (
        order && (
            <>
                <h1>Order {order._id}</h1>
                <Row>
                    <Col md={8}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                <div>
                                    <strong>Name: </strong> {order.user.name}
                                </div>
                                <div>
                                    <a href={`mailto:${order.user.email}`}>
                                        {order.user.email}
                                    </a>
                                </div>
                                <div>
                                    <strong>Address: </strong>
                                    {order.shippingAddress.address},{" "}
                                    {order.shippingAddress.city}{" "}
                                    {order.shippingAddress.postalCode},{" "}
                                    {order.shippingAddress.country}
                                </div>
                                <div>
                                    {order.isDelivered ? (
                                        <Message variant="success">
                                            <>
                                                Delivered on {order.DeliveredAt}
                                            </>
                                        </Message>
                                    ) : (
                                        <Message variant="danger">
                                            <>Not Delivered</>
                                        </Message>
                                    )}
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <div>
                                    <strong>Method: </strong>
                                    {order.paymentMethod}
                                </div>
                                <div>
                                    {order.isPaid ? (
                                        <Message variant="success">
                                            <>Paid on {order.paidAt}</>
                                        </Message>
                                    ) : (
                                        <Message variant="danger">
                                            <>Not Paid</>
                                        </Message>
                                    )}
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                {order.orderItems.length === 0 ? (
                                    <Message>
                                        <>Your cart is empty</>
                                    </Message>
                                ) : (
                                    <ListGroup variant="flush">
                                        {order.orderItems.map((x, i) => (
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
                                                            productId={
                                                                x.product
                                                            }
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
                                        <Col>৳ {order.itemsPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>৳ {order.shippingPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tex Price</Col>
                                        <Col>৳ {order.texPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total Price</Col>
                                        <Col>৳ {order.totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </>
        )
    );
};

export default OrderScreen;
