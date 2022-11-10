import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userRegisterAction } from "../../stores/actions/userActions.js";
import { isObjectEmpty } from "../../logic/commonLogic.js";
import FormContainer from "../components/FormContainer.jsx";
import Message from "./../components/Message.jsx";
import Loader from "./../components/Loader.jsx";
import FormField from "../components/FormField.jsx";
import PasswordShowToggle from "../components/PasswordShowToggle.jsx";
import SubmitButton from "../components/SubmitButton.jsx";
import RedirectOption from "../components/RedirectOption.jsx";

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
            dispatch(userRegisterAction(name, email, password));
        }
    };

    return (
        <FormContainer>
            <>
                <h1>Register</h1>
                {message && <Message variant="danger">{message}</Message>}{" "}
                {error && <Message variant="danger">{error}</Message>}{" "}
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
                    <SubmitButton label="Register" />
                </Form>
                <RedirectOption
                    msg="Have an Account? "
                    redirect={redirect}
                    to="/login"
                    toName="Login"
                />
            </>
        </FormContainer>
    );
};

export default RegisterScreen;
