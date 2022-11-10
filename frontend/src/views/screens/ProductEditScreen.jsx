import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer.jsx";
import Message from "./../components/Message.jsx";
import Loader from "./../components/Loader.jsx";
import FormField from "../components/FormField.jsx";
import SubmitButton from "../components/SubmitButton.jsx";
import { PRODUCT_UPDATE_RESET } from "../../stores/constants/productConstants.js";
import {
    productDetailsByIdAction,
    productUpdateByIdAction,
} from "../../stores/actions/productActions.js";

const ProductEditScreen = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");

    const productId = params.id;

    const { loading, error, product } = useSelector(s => s.productDetails);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = useSelector(s => s.productUpdate);

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            navigate("/admin/products");
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(productDetailsByIdAction(productId));
            } else {
                setName(product.name);
                setPrice(product.price);
                setCategory(product.category);
                setBrand(product.brand);
            }
        }
    }, [productId, dispatch, successUpdate, product]);

    const handlerSubmit = async e => {
        e.preventDefault();
        dispatch(
            productUpdateByIdAction({
                _id: productId,
                name,
                price,
                category,
                brand,
            })
        );
    };

    return (
        <>
            <Link to="/admin/products" className="btn btn-light my-3">
                Go Back
            </Link>
            <FormContainer>
                <>
                    <h1>Edit Product {productId} </h1>
                    {loadingUpdate && <Loader />}
                    {errorUpdate && (
                        <Message variant="danger">{errorUpdate}</Message>
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
                                label="Price"
                                name="price"
                                value={price}
                                setFunc={setPrice}
                            />
                            <FormField
                                label="Category"
                                name="category"
                                value={category}
                                setFunc={setCategory}
                            />
                            <FormField
                                label="Brand"
                                name="brand"
                                value={brand}
                                setFunc={setBrand}
                            />
                            <SubmitButton label="Update" />
                        </Form>
                    )}
                </>
            </FormContainer>
        </>
    );
};

export default ProductEditScreen;
