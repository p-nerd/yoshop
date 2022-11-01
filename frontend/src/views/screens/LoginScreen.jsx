import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { loginUser } from "../../services/loginService.js";
const { Group, Label, Control, Check } = Form;

const LoginScreen = () => {
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = e => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleShowPassword = e => {
        setShowPassword(!showPassword);
    };

    const handlerSubmit = async e => {
        e.preventDefault();
        const { user } = await loginUser(loginData);
        localStorage.setItem("token", user.token);
        navigate("/");
    };

    return (
        <>
            <h1>Login</h1>
            <Form onSubmit={handlerSubmit}>
                <Group className="mb-3" controlId="formBasicEmail">
                    <Label>Email address</Label>
                    <Control
                        onChange={handleChange}
                        name="email"
                        type="email"
                        placeholder="Enter email"
                    />
                </Group>

                <Group className="mb-3" controlId="formBasicPassword">
                    <Label>Password</Label>
                    <Control
                        name="password"
                        onChange={handleChange}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                    />
                </Group>
                <Group className="mb-3" controlId="formBasicCheckbox">
                    <Check
                        type="checkbox"
                        label="Show Password"
                        onClick={handleShowPassword}
                    />
                </Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
};

export default LoginScreen;
