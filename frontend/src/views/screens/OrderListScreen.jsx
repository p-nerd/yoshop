import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../../logic/commonLogic.js";
import { orderListAction } from "../../stores/actions/orderActions.js";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import XIcon from "../components/XIcon.jsx";

const OrderListScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, orders } = useSelector(s => s.orderList);
    const { userInfo } = useSelector(s => s.userLogin);

    useEffect(() => {
        if (!isAdmin(userInfo)) {
            navigate("/login");
        } else {
            dispatch(orderListAction());
        }
    }, [dispatch, navigate, userInfo]);

    const getShippingAddress = order =>
        `${order.shippingAddress.address}, ` +
        `${order.shippingAddress.city} ${order.shippingAddress.postalCode}, ` +
        `${order.shippingAddress.country}`;

    return (
        <>
            <h1>Orders</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">
                    <>{error}</>
                </Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th>ADDRESS</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>
                                    {order._id.substring(
                                        order._id.length - 6,
                                        order._id.length
                                    )}
                                </td>
                                <td>{order.user.email}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>৳ {order.totalPrice}</td>
                                <td>
                                    {order.isPaid ? (
                                        String(order.paidAt).substring(0, 10)
                                    ) : (
                                        <XIcon />
                                    )}
                                </td>
                                <td>
                                    {order.isDelivered ? (
                                        String(order.deliveredAt).substring(
                                            0,
                                            10
                                        )
                                    ) : (
                                        <XIcon />
                                    )}
                                </td>
                                <td>{getShippingAddress(order)}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button
                                            className="btn-sm"
                                            variant="light"
                                        >
                                            Details
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default OrderListScreen;
