import { useEffect } from "react";
import { Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productTopListAction } from "../../stores/actions/productActions.js";
import Loader from "./Loader.jsx";
import Message from "./Message.jsx";

const ProductCarousel = () => {
    const dispatch = useDispatch();

    const productTopList = useSelector(s => s.productTopList);

    const { loading, error, products } = productTopList;

    useEffect(() => {
        dispatch(productTopListAction());
    }, []);

    return (
        <>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Carousel pause="hover" className="bg-dark">
                    {products.map(product => (
                        <Carousel.Item key={product._id}>
                            <Link to={`/products/${product._id}`}>
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fluid
                                />
                                <Carousel.Caption className="carousel-caption">
                                    <h2>
                                        {product.name} (৳{product.price})
                                    </h2>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )}
        </>
    );
};

export default ProductCarousel;
