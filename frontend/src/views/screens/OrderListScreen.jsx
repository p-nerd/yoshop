import { useEffect } from "react";
import { Button, Table, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    productCreateAction,
    productDeleteAction,
    productListAction,
} from "./../../stores/actions/productActions.js";
import { isAdmin } from "../../logic/commonLogic.js";
import { PRODUCT_CREATE_RESET } from "../../stores/constants/productConstants.js";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import EditIcon from "../components/EditIcon.jsx";
import TrashIcon from "../components/TrashIcon.jsx";
import { orderListAction } from "../../stores/actions/orderActions.js";

const OrderListScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, orders } = useSelector(s => s.orderList);
    const { userInfo } = useSelector(s => s.userLogin);

    useEffect(() => {
        if (!isAdmin(userInfo)) navigate("/login");
        else {
            if (orders && orders.length === 0) dispatch(orderListAction());
        }
    }, [dispatch, navigate, userInfo, orders]);

    console.log(orders);

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
                            <th>CREATE_AT</th>
                            <th>TOTAL PRICE</th>
                            <th>OWNER</th>
                            <th>ITEMS</th>
                            <th>PAYMENT METHOD</th>
                            <th>IS PAID</th>
                            <th>IS DELIVERED</th>
                            <th>SHIPPING ADDRESS</th>
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
                                <td>{order.createAt}</td>
                                <td>৳ {order.totalPrice}</td>
                                <td>{order.user.email}</td>
                                <td>{order.orderItems.length}</td>
                                <td>{order.paymentMethod}</td>
                                <td>{order.isPaid ? "YES" : "NO"}</td>
                                <td>{order.isDelivered ? "YES" : "NO"}</td>
                                <td>{getShippingAddress(order)}</td>
                                <td>
                                    <LinkContainer
                                        to={`/admin/orders/${order._id}`}
                                    >
                                        <Button
                                            variant="light"
                                            className="btn-sm"
                                        >
                                            <EditIcon />
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
