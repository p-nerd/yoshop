import { useEffect } from "react";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product.jsx";
import { getAllProducts } from "../services/productService.js";

const HomeScreen = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { products } = await getAllProducts();
            setProducts(products);
        };
        fetchProducts();
    }, []);

    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default HomeScreen;
