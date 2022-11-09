import {
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
} from "./../constants/productConstants.js";
import {
    getProductsRequest,
    getProductByIdRequest,
} from "../../services/productService.js";

export const productsListAction = () => async dispatch => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const { products } = await getProductsRequest();
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: products });
    } catch (e) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: e.message });
    }
};

export const productDetailsByIdAction = productId => async dispatch => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
        const { product } = await getProductByIdRequest(productId);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: product });
    } catch (e) {
        dispatch({ type: PRODUCT_DETAILS_FAIL, payload: e.message });
    }
};
