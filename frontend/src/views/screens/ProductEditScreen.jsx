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
    productDetailsAction,
    productUpdateAction,
} from "../../stores/actions/productActions.js";
import { IMAGE_API_BASEURL } from "../../utils/envUtil.js";
import { imageUploadRequest } from "../../services/productService.js";

const ProductEditScreen = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState("");
    const [uploading, setUploading] = useState(false);

    const productId = params.id;

    const productDetails = useSelector(s => s.productDetails);
    const productUpdate = useSelector(s => s.productUpdate);

    const { loading, error, product } = productDetails;
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = productUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            navigate("/admin/products");
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(productDetailsAction(productId));
            } else {
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setBrand(product.brand);
                setCategory(product.category);
                setCountInStock(product.countInStock);
                setDescription(product.description);
            }
        }
    }, [dispatch, navigate, productId, product, successUpdate]);

    const handlerSubmit = async e => {
        e.preventDefault();
        dispatch(
            productUpdateAction(productId, {
                name,
                price,
                image,
                brand,
                category,
                countInStock,
                description,
            })
        );
    };

    const handleImageUpload = async e => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        setUploading(true);

        try {
            const data = await imageUploadRequest(formData);
            setImage(`${IMAGE_API_BASEURL}/${data.fileName}`);
            setUploading(false);
        } catch (e) {
            setUploading(false);
        }
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
                            <Form.Group controlId="image">
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter image"
                                    value={image}
                                    onChange={e => setImage(e.target.value)}
                                />
                                <Form.File
                                    id="image-file"
                                    label="Choose File"
                                    custom
                                    onChange={handleImageUpload}
                                />
                                {uploading && <Loader />}
                            </Form.Group>
                            <FormField
                                label="Brand"
                                name="brand"
                                value={brand}
                                setFunc={setBrand}
                            />
                            <FormField
                                label="Category"
                                name="category"
                                value={category}
                                setFunc={setCategory}
                            />
                            <FormField
                                label="Count in Stock"
                                name="countInStock"
                                value={countInStock}
                                setFunc={setCountInStock}
                            />
                            <FormField
                                label="Description"
                                name="description"
                                value={description}
                                setFunc={setDescription}
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
