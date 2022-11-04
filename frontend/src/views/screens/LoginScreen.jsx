import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import { loginAction } from "../../stores/actions/userActions.js";
import { isObjectEmpty } from "../../logic/commonLogic.js";
import FormContainer from "../components/FormContainer.jsx";
import Message from "../components/Message.jsx";
import Loader from "../components/Loader.jsx";
import FormField from "../components/FormField.jsx";
import PasswordShowToggle from "../components/PasswordShowToggle.jsx";
import SubmitButton from "../components/SubmitButton.jsx";
import RedirectOption from "../components/RedirectOption.jsx";

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
                <PasswordShowToggle
                    showPassword={showPassword}
                    setFunc={setShowPassword}
                />
                <SubmitButton label="Sign In" />
            </Form>
            <RedirectOption
                msg="New Customer? "
                redirect={redirect}
                to="/signup"
                toName="Register"
            />
        </FormContainer>
    );
};

export default LoginScreen;
