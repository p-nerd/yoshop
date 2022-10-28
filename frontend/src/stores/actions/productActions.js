import {
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
} from "./../constants.js";
import {
    getAllProducts,
    getOneProduct,
} from "../../services/productService.js";

export const listProducts = () => async dispatch => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const { products } = await getAllProducts();
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: products });
    } catch (errMessage) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: errMessage });
    }
};

export const listProductDetails = productId => async dispatch => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
        const { product } = await getOneProduct(productId);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: product });
    } catch (errMessage) {
        dispatch({ type: PRODUCT_DETAILS_FAIL, payload: errMessage });
    }
};
