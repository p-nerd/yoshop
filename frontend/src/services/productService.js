import axios from "axios";

axios.defaults.baseURL = `http://localhost:3000/api`;

export const getAllProducts = async () => {
    const { data: products, status } = await axios.get(`/products`);
    return { products, status };
};

export const getOneProduct = async productId => {
    const { data: product, status } = await axios.get(`/products/${productId}`);
    console.log(product);
    return { product, status };
};
