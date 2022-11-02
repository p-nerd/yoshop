import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../stores/actions/userActions.js";
import { isObjectEmpty } from "../../logic/commonLogic.js";
import FormContainer from "../components/FormContainer.jsx";
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

    useEffect(() => {
        if (isObjectEmpty(userInfo)) {
            navigate(`/login`);
        } else {
            if (!user.name) {
                dispatch(getProfile("/profile"));
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [navigate, userInfo, dispatch]);

    const handlerSubmit = async e => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Password do not match");
        } else {
            console.log("Update user");
        }
    };

    return <></>;
};

export default ProfileScreen;
