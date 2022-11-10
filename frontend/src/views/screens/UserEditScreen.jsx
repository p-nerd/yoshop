import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    userDetailsAction,
    userUpdateAction,
} from "../../stores/actions/userActions.js";
import { USER_UPDATE_RESET } from "../../stores/constants/userConstants.js";
import FormContainer from "../components/FormContainer.jsx";
import Message from "./../components/Message.jsx";
import Loader from "./../components/Loader.jsx";
import FormField from "../components/FormField.jsx";
import SubmitButton from "../components/SubmitButton.jsx";
import FormCheck from "../components/FormCheck.jsx";

const UserEditScreen = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const userId = params.id;

    const { loading, error, user } = useSelector(s => s.userDetails);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = useSelector(s => s.userUpdate);

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            navigate("/admin/users");
        } else {
            if (!user.name || user._id !== userId) {
                dispatch(userDetailsAction(userId));
            } else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }
    }, [userId, dispatch, successUpdate, user]);

    const handlerSubmit = async e => {
        e.preventDefault();
        dispatch(userUpdateAction(userId, { name, email, isAdmin }));
    };

    return (
        <>
            <Link to="/admin/users" className="btn btn-light my-3">
                Go Back
            </Link>
            <FormContainer>
                <>
                    <h1>Edit User </h1>
                    {loadingUpdate && <Loader />}
                    {errorUpdate && (
                        <Message variant="danger">{errorUpdate}100</Message>
                    )}
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <Message variant="danger">{error}</Message>
                    ) : (
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
                            <FormCheck
                                label="Is Admin"
                                name="isAdmin"
                                value={isAdmin}
                                setFunc={setIsAdmin}
                            />
                            <SubmitButton label="Update" />
                        </Form>
                    )}
                </>
            </FormContainer>
        </>
    );
};

export default UserEditScreen;
