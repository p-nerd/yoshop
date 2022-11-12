import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productListAction } from "./../../stores/actions/productActions.js";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import Product from "../components/Product.jsx";
import { useParams } from "react-router-dom";

export default () => {
    const dispatch = useDispatch();
    const params = useParams();

    const productList = useSelector(s => s.productList);

    const { loading, error, products } = productList;
    const keyword = params.keyword;

    useEffect(() => {
        dispatch(productListAction(keyword));
    }, [dispatch, keyword]);

    return (
        <>
            <h1>Latest Products</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Row>
                    {products.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    );
};
