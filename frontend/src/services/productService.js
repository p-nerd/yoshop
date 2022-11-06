import * as httpC from "../utils/httpC.js";
import { logIfNotProduction } from "../utils/loggerUtil.js";
import { extractErrorMessage as eem } from "./../logic/commonLogic.js";

export const getAllProducts = async () => {
    try {
        const { data: products, status } = await httpC.get("/products", null);
        return { products, status };
    } catch (e) {
        const message = eem(e, "Get all product request unsuccessful");
        logIfNotProduction(message);
        throw new Error(message);
    }
};

export const getOneProduct = async productId => {
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
