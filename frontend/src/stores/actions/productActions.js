import {
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_FAIL,
} from "./../constants/productConstants.js";
import {
    getProductsRequest,
    getProductByIdRequest,
    deleteProductByIdRequest,
    updateProductByIdRequest,
} from "../../services/productService.js";
import { getTokenFromState } from "../../logic/commonLogic.js";

export const productListAction = () => async dispatch => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });

        const { products } = await getProductsRequest();

        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: products });
    } catch (e) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: e.message });
    }
};

export const productDetailsAction = productId => async dispatch => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        const { product } = await getProductByIdRequest(productId);

        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: product });
    } catch (e) {
        dispatch({ type: PRODUCT_DETAILS_FAIL, payload: e.message });
    }
};

export const productDeleteAction = productId => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_DELETE_REQUEST });

        const token = getTokenFromState(getState());
        await deleteProductByIdRequest(productId, token);

        dispatch({ type: PRODUCT_DELETE_SUCCESS });
    } catch (e) {
        dispatch({ type: PRODUCT_DELETE_FAIL, payload: e.message });
    }
};

export const productUpdateAction =
    (productId, productData) => async (dispatch, getState) => {
        try {
            dispatch({ type: PRODUCT_UPDATE_REQUEST });

            const token = getTokenFromState(getState());
            await updateProductByIdRequest(productId, productData, token);

            dispatch({ type: PRODUCT_UPDATE_SUCCESS });
            dispatch(productListAction());
        } catch (e) {
            dispatch({ type: PRODUCT_UPDATE_FAIL, payload: e.message });
        }
    };
