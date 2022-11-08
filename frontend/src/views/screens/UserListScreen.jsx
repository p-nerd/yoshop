import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userListAction } from "../../stores/actions/userActions.js";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import XIcon from "../components/XIcon.jsx";
import CheckIcon from "../components/CheckIcon.jsx";
import EditIcon from "../components/EditIcon.jsx";
import TrashIcon from "../components/TrashIcon.jsx";

const UserListScreen = () => {
    const dispatch = useDispatch();

    const { loading, error, users } = useSelector(s => s.userList);

    useEffect(() => {
        dispatch(userListAction());
    }, [dispatch]);

    const handleDelete = userId => {
        console.log(userId);
    };

    return (
        <>
            <h1>Users</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">
                    <>{error}</>
                </Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>
                                    <a href={`mailto:${user.email}`}>
                                        {user.email}
                                    </a>
                                </td>
                                <td>
                                    {user.isAdmin ? <CheckIcon /> : <XIcon />}
                                </td>
                                <td>
                                    <LinkContainer
                                        to={`/user/${user._id}/edit`}
                                    >
                                        <Button
                                            variant="light"
                                            className="btn-sm"
                                        >
                                            <EditIcon />
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant="danger"
                                        className="btn-sm"
                                        onClick={() => {
                                            handleDelete(user._id);
                                        }}
                                    >
                                        <TrashIcon />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default UserListScreen;
