import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    getProfileAction,
    updateUserProfileAction,
} from "../../stores/actions/userActions.js";
import { isObjectEmpty } from "../../logic/commonLogic.js";
import Message from "./../components/Message.jsx";
import Loader from "./../components/Loader.jsx";

const { Group, Label, Control, Check } = Form;

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

    useEffect(() => {
        if (isObjectEmpty(userInfo)) {
            navigate(`/login`);
        } else {
            if (!user.name) {
                dispatch(getProfileAction("/profile"));
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
                    <Group className="mb-3" controlId="name">
                        <Label>Name</Label>
                        <Control
                            name="name"
                            type="name"
                            placeholder="Enter name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </Group>
                    <Group className="mb-3" controlId="email">
                        <Label>Email address</Label>
                        <Control
                            name="email"
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Group>
                    <Group className="mb-3" controlId="password">
                        <Label>Password</Label>
                        <Control
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Group>
                    <Group className="mb-3" controlId="confirmPassword">
                        <Label>Confirm Password</Label>
                        <Control
                            name="password"
                            type="password"
                            placeholder="Enter Password Again"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </Group>
                    <Group className="mb-3" controlId="checkbox">
                        <Check
                            type="checkbox"
                            label="Show Password"
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    </Group>
                    <Button variant="primary" type="submit">
                        Update
                    </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
            </Col>
        </Row>
    );
};

export default ProfileScreen;
