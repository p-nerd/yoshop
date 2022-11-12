import { useEffect } from "react";
import { Button, Table, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
    productCreateAction,
    productDeleteAction,
    productListAction,
} from "./../../stores/actions/productActions.js";
import { isAdmin } from "../../logic/commonLogic.js";
import { PRODUCT_CREATE_RESET } from "../../stores/constants/productConstants.js";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import EditIcon from "../components/EditIcon.jsx";
import TrashIcon from "../components/TrashIcon.jsx";
import Paginate from "../components/Paginate.jsx";

const ProductListScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const productList = useSelector(s => s.productList);
    const userLogin = useSelector(s => s.userLogin);
    const productDelete = useSelector(s => s.productDelete);
    const productCreate = useSelector(s => s.productCreate);

    const { loading, error, products, pagesCount } = productList;
    const { userInfo } = userLogin;
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = productDelete;

    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct,
    } = productCreate;
    const pageNumber = params.pageNumber || 1;

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET });
        if (!isAdmin(userInfo)) {
            navigate("/login");
        } else {
            if (successCreate) {
                navigate(`/admin/products/${createdProduct._id}/edit`);
            } else {
                dispatch(productListAction("", pageNumber));
            }
        }
    }, [
        dispatch,
        navigate,
        userInfo,
        successDelete,
        successCreate,
        pageNumber,
    ]);

    const handleDelete = productId => {
        if (window.confirm("Are you sure?")) {
            dispatch(productDeleteAction(productId));
        }
    };

    const handleCreateProduct = () => {
        dispatch(productCreateAction());
    };

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
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant="danger">{errorCreate}</Message>}

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">
                    <>{error}</>
                </Message>
            ) : (
                <>
                    <Table
                        striped
                        bordered
                        hover
                        responsive
                        className="table-sm"
                    >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>OWNER</th>
                                <th>STOCK</th>
                                <th>BRAND</th>
                                <th>CATEGORY</th>
                                <th>DESCRIPTION</th>
                                <th>RATING</th>
                                <th>REVIEWS</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td>
                                        {product._id.substring(
                                            product._id.length - 6,
                                            product._id.length
                                        )}
                                    </td>
                                    <td>{product.name}</td>
                                    <td>৳ {product.price}</td>
                                    <td>{product.user.email}</td>
                                    <td>{product.countInStock}</td>
                                    <td>{product.brand}</td>
                                    <td>{product.category}</td>
                                    <td>
                                        {product.description.length > 20
                                            ? product.description.substring(
                                                  0,
                                                  20
                                              ) + "..."
                                            : product.description}
                                    </td>
                                    <td>{product.rating}</td>
                                    <td>{product.numReviews}</td>
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
                    <Paginate
                        pagesCount={pagesCount}
                        page={pageNumber}
                        isAdmin={true}
                    />
                </>
            )}
        </>
    );
};

export default ProductListScreen;
