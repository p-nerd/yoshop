import * as httpC from "../utils/httpC.js";
import { extractFromLocalStorage } from "../utils/localStorageUtil.js";
import { logReqNotProd } from "../utils/loggerUtil.js";

export const getProductsRequest = async (keyword, pageNumber) => {
    try {
        const { data } = await httpC.get(
            `/products?keyword=${keyword}&pageNumber=${pageNumber}&pageSize=10`,
            null
        );
        return data;
    } catch (e) {
        throw new Error(logReqNotProd(e));
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
        throw new Error(logReqNotProd(e));
    }
};

export const deleteProductByIdRequest = async (productId, token) => {
    try {
        const { data } = await httpC.deleteR(`/products/${productId}`, token);
        return data;
    } catch (e) {
        throw new Error(logReqNotProd(e));
    }
};

export const updateProductRequest = async (productId, productData, token) => {
    try {
        const { data } = await httpC.put(
            `/products/${productId}`,
            productData,
            token
        );
        return data;
    } catch (e) {
        throw new Error(logReqNotProd(e));
    }
};

export const createSampleProductRequest = async token => {
    try {
        const { data } = await httpC.post("/products", {}, token);
        return data;
    } catch (e) {
        throw new Error(logReqNotProd(e));
    }
};

export const imageUploadRequest = async formData => {
    try {
        const token = extractFromLocalStorage("userInfo", "f**k").token;
        return await httpC.postFile("/uploads", formData, token);
    } catch (e) {
        throw new Error(logReqNotProd(e));
    }
};

export const productCreateReviewRequest = async (productId, review, token) => {
    try {
        const { data } = await httpC.post(
            `/products/${productId}/reviews`,
            review,
            token
        );
        return data;
    } catch (e) {
        throw new Error(logReqNotProd(e));
    }
};

export const getTopProductsRequest = async () => {
    try {
        const { data } = await httpC.get("/products/top", null);
        return data;
    } catch (e) {
        throw new Error(logReqNotProd(e));
    }
};
