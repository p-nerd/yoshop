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
} from "./../constants/productConstants.js";
import {
    getProductsRequest,
    getProductByIdRequest,
    deleteProductByIdRequest,
    updateProductByIdRequest,
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

export const deleteProductByIdAction =
    productId => async (dispatch, getState) => {
        try {
            dispatch({ type: PRODUCT_DETAILS_REQUEST });

            const {
                userLogin: { userInfo },
            } = getState();

            await deleteProductByIdRequest(productId, userInfo.token);

            dispatch({ type: PRODUCT_DELETE_SUCCESS });
            dispatch(productsListAction());
        } catch (e) {
            dispatch({ type: PRODUCT_DETAILS_FAIL, payload: e.message });
        }
    };

export const productUpdateByIdAction =
    productData => async (dispatch, getState) => {
        try {
            dispatch({ type: PRODUCT_UPDATE_REQUEST });

            const {
                userLogin: { userInfo },
            } = getState();

            await updateProductByIdRequest(
                productData._id,
                productData,
                userInfo.token
            );

            dispatch({ type: PRODUCT_UPDATE_SUCCESS });
            dispatch(productsListAction());
        } catch (e) {
            dispatch({ type: PRODUCT_UPDATE_FAIL, payload: e.message });
        }
    };
