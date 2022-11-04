import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    getProfileAction,
    updateUserProfileAction,
} from "../../stores/actions/userActions.js";
import { isObjectEmpty } from "../../logic/commonLogic.js";
import Message from "./../components/Message.jsx";
import Loader from "./../components/Loader.jsx";
import FormField from "../components/FormField.jsx";
import PasswordShowToggle from "../components/PasswordShowToggle.jsx";
import SubmitButton from "../components/SubmitButton.jsx";

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
            </Col>
        </Row>
    );
};

export default ProfileScreen;
