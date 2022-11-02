import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../../stores/actions/userActions.js";
import FormContainer from "../components/FormContainer.jsx";
import Message from "./../components/Message.jsx";
import Loader from "./../components/Loader.jsx";
import { isObjectEmpty } from "../../logic/commonLogic.js";

const { Group, Label, Control, Check } = Form;

const RegisterScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const { loading, error, userInfo } = useSelector(s => s.userRegister);
    const [searchParams, setSearchParams] = useSearchParams();

    const redirect = searchParams.get("redirect");

    useEffect(() => {
        if (!isObjectEmpty(userInfo)) {
            navigate(redirect ? `/${redirect}` : "/");
        }
    }, [navigate, userInfo, redirect]);

    const handlerSubmit = async e => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Password do not match");
        } else {
            dispatch(registerAction(name, email, password));
        }
    };

    return (
        <FormContainer>
            <h1>Register</h1>
            {message && <Message variant="danger">{message}</Message>}{" "}
            {error && <Message variant="danger">{error}</Message>}{" "}
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
                    Register
                </Button>
            </Form>
            <Row className="py-3">
                <Col>
                    Have an Account?{" "}
                    <Link
                        to={redirect ? `/login?redirect=${redirect}` : "/login"}
                    >
                        Login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default RegisterScreen;
