import { getAllProducts } from "../services/productService.js";
import {
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
} from "./../app/constants.js";

export const listProducts = () => async dispatch => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const { products } = await getAllProducts();
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: products });
    } catch (errMessage) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: errMessage });
    }
};
