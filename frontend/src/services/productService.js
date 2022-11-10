import * as httpC from "../utils/httpC.js";
import { logIfNotProduction } from "../utils/loggerUtil.js";
import { extractErrorMessage as eem } from "./../logic/commonLogic.js";

export const getProductsRequest = async () => {
    try {
        const { data: products, status } = await httpC.get("/products", null);
        return { products, status };
    } catch (e) {
        const message = eem(e, "Get all product request unsuccessful");
        logIfNotProduction(message);
        throw new Error(message);
    }
};

export const getProductByIdRequest = async productId => {
    try {
        const { data: product, status } = await httpC.get(
            `/products/${productId}`,
            null
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

export const deleteProductByIdRequest = async (productId, token) => {
    try {
        const { data } = await httpC.deleteR(`/products/${productId}`, token);
        return data;
    } catch (e) {
        const message = eem(
            e,
            `Get product with id ${productId} request unsuccessful`
        );
        logIfNotProduction(message);
        throw new Error(message);
    }
};

export const updateProductByIdRequest = async (
    productId,
    productData,
    token
) => {
    try {
        const { data } = await httpC.put(
            `/products/${productId}`,
            productData,
            token
        );
        return data;
    } catch (e) {
        const message = eem(
            e,
            `Update product with id ${productId} request unsuccessful`
        );
        logIfNotProduction(message);
        throw new Error(message);
    }
};
