import axios from "axios";
import { BACKEND_API_URL } from "../utils/envUtil.js";
import { logIfNotProduction } from "../utils/loggerUtil.js";
import { extractErrorMessage as eem } from "./../logic/commonLogic.js";

axios.defaults.baseURL = BACKEND_API_URL;

export const getAllProducts = async () => {
    try {
        const { data: products, status } = await axios.get(`/products`);
        return { products, status };
    } catch (e) {
        const message = eem(e, "Get all product request unsuccessful");
        logIfNotProduction(message);
        throw new Error(message);
    }
};

export const getOneProduct = async productId => {
    try {
        const { data: product, status } = await axios.get(
            `/products/${productId}`
        );
        return { product, status };
    } catch (e) {
        const message = eem(
            e,
            `Get product with id ${productId} request unsuccessful`
        );
        logIfNotProduction(message);
        throw new Error(message);
    }
};
