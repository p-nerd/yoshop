import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import {
    getUserDetailsByIdAction,
    updateUserProfileAction,
} from "../../stores/actions/userActions.js";
import { isObjectEmpty } from "../../logic/commonLogic.js";
import { listMyOrderAction } from "../../stores/actions/orderActions.js";
import Message from "./../components/Message.jsx";
import Loader from "./../components/Loader.jsx";
import FormField from "../components/FormField.jsx";
import PasswordShowToggle from "../components/PasswordShowToggle.jsx";
import SubmitButton from "../components/SubmitButton.jsx";
import XIcon from "../components/XIcon.jsx";

const ProfileScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const { loading, error, user } = useSelector(s => s.userDetails);
    const { userInfo } = useSelector(s => s.userLogin);
    const { success } = useSelector(s => s.userUpdateProfile);
    const {
        loading: loadingOrders,
        orders,
        error: errorOrders,
    } = useSelector(s => s.orderListMe);

    useEffect(() => {
        if (isObjectEmpty(userInfo)) {
            navigate(`/login`);
        } else {
            if (!user.name) {
                dispatch(getUserDetailsByIdAction("/profile"));
                dispatch(listMyOrderAction());
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [navigate, userInfo, dispatch, user]);

    const handlerSubmit = async e => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Password do not match");
        } else {
            dispatch(
                updateUserProfileAction({
                    _id: user._id,
                    name,
                    email,
                    password,
                })
            );
        }
    };

    return (
        <Row>
            <Col md={3}>
                <h1>User Profile</h1>
                {message && <Message variant="danger">{message}</Message>}
                {error && <Message variant="danger">{error}</Message>}
                {success && !error && (
                    <Message variant="success">"Updated successfully</Message>
                )}
                {loading && <Loader />}
                <Form onSubmit={handlerSubmit}>
                    <FormField
                        label="Name"
                        name="name"
                        value={name}
                        setFunc={setName}
                    />
                    <FormField
                        label="Email address"
                        name="email"
                        value={email}
                        setFunc={setEmail}
                    />
                    <FormField
                        label="Password"
                        name="password"
                        value={password}
                        setFunc={setPassword}
                        type={showPassword ? "text" : "password"}
                    />
                    <FormField
                        label="Confirm Password"
                        name="confirmPassword"
                        value={confirmPassword}
                        setFunc={setConfirmPassword}
                        type="password"
                    />
                    <PasswordShowToggle
                        showPassword={showPassword}
                        setFunc={setShowPassword}
                    />
                    <SubmitButton label="Update" />
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant="danger">
                        <>{errorOrders}</>
                    </Message>
                ) : (
                    <Table
                        striped
                        bordered
                        hover
                        responsive
                        className="table-sm"
                    >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>
                                        {order.isPaid ? (
                                            String(order.paidAt).substring(
                                                0,
                                                10
                                            )
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
                                    <td>
                                        <LinkContainer
                                            to={`/order/${order._id}`}
                                        >
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
            </Col>
        </Row>
    );
};

export default ProfileScreen;
