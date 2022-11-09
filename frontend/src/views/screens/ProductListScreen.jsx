import { useEffect } from "react";
import { Button, Table, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { productsListAction } from "./../../stores/actions/productActions.js";
import { isAdmin } from "../../logic/commonLogic.js";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import EditIcon from "../components/EditIcon.jsx";
import TrashIcon from "../components/TrashIcon.jsx";

const ProductListScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, products } = useSelector(s => s.productList);
    const { userInfo } = useSelector(s => s.userLogin);

    useEffect(() => {
        if (isAdmin(userInfo)) {
            dispatch(productsListAction());
        } else {
            navigate("/login");
        }
    }, [dispatch, navigate, userInfo]);

    const handleDelete = userId => {
        if (window.confirm("Are you sure?")) {
            // delete product todo
        }
    };

    const handleCreateProduct = () => {};

    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-right">
                    <Button className="my-3" onClick={handleCreateProduct}>
                        <i className="fas fa-plus"></i> Create Product
                    </Button>
                </Col>
            </Row>
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
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>$ {product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer
                                        to={`/admin/products/${product._id}/edit`}
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
                                        onClick={() =>
                                            handleDelete(product._id)
                                        }
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

export default ProductListScreen;
