import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { loginAction } from "../../stores/actions/userActions.js";
import FormContainer from "../components/FormContainer.jsx";
import Message from "../components/Message.jsx";
import Loader from "../components/Loader.jsx";
import { isObjectEmpty } from "../../logic/commonLogic.js";

const { Group, Label, Control, Check } = Form;

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { loading, error, userInfo } = useSelector(state => state.userLogin);

    const redirect = searchParams.get("redirect");

    useEffect(() => {
        if (!isObjectEmpty(userInfo)) {
            navigate(redirect ? `/${redirect}` : "/");
        }
    }, [navigate, userInfo, redirect]);

    const handlerSubmit = async e => {
        e.preventDefault();
        dispatch(loginAction(email, password));
    };

    return (
        <FormContainer>
            <h1>Login</h1>
            {error && <Message variant="danger">{error}</Message>}{" "}
            {loading && <Loader />}
            <Form onSubmit={handlerSubmit}>
                <Group className="mb-3" controlId="email">
                    <Label>Email address</Label>
                    <Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Group>
                <Group className="mb-3" controlId="formBasicPassword">
                    <Label>Password</Label>
                    <Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Group>
                <Group className="mb-3" controlId="formBasicCheckbox">
                    <Check
                        type="checkbox"
                        label="Show Password"
                        onClick={() => setShowPassword(!showPassword)}
                    />
                </Group>
                <Button variant="primary" type="submit">
                    Sign In
                </Button>
            </Form>
            <Row className="py-3">
                <Col>
                    New Customer?{" "}
                    <Link
                        to={
                            redirect
                                ? `/signup?redirect=${redirect}`
                                : "/signup"
                        }
                    >
                        Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default LoginScreen;
