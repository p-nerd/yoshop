import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { productListAction } from "./../../stores/actions/productActions.js";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import Product from "../components/Product.jsx";
import Paginate from "../components/Paginate.jsx";
import ProductCarousel from "../components/ProductCarousel.jsx";

export default () => {
    const dispatch = useDispatch();
    const params = useParams();

    const productList = useSelector(s => s.productList);

    const { loading, error, products, pagesCount } = productList;
    const keyword = params.keyword;
    const pageNumber = params.pageNumber || 1;

    useEffect(() => {
        dispatch(productListAction(keyword, pageNumber));
    }, [dispatch, keyword, pageNumber]);

    return (
        <>
            {!keyword && <ProductCarousel />}
            <h1>Latest Products</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate
                        pagesCount={pagesCount}
                        page={pageNumber}
                        keyword={keyword ? keyword : ""}
                    />
                </>
            )}
        </>
    );
};
