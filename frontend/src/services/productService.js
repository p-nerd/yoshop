import axios from "axios";

axios.defaults.baseURL = `http://localhost:3000/api`;

export const getAllProducts = async () => {
    try {
        const { data: products, status } = await axios.get(`/products`);
        return { products, status };
    } catch (e) {
        if (e.response && e.response.data.message) {
            throw e.response.data.message;
        }
        throw "Get all product request unsuccessful";
    }
};

export const getOneProduct = async productId => {
    try {
        const { data: product, status } = await axios.get(
            `/products/${productId}`
        );
        return { product, status };
    } catch (e) {
        if (e.response && e.response.data.message) {
            throw e.response.data.message;
        }
        throw `Get product with id ${productId} request unsuccessful`;
    }
};

export const isProductOutOfStock = product => {
    return product.countInStock <= 0;
};
