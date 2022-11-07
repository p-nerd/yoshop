import {
    createOrderRequest,
    getOrderByIdRequest,
    payOrderRequest,
} from "../../services/orderService.js";
import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
} from "../constants.js";

export const createOrderAction = order => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const { data } = await createOrderRequest(order, userInfo.token);
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
    } catch (e) {
        dispatch({ type: ORDER_CREATE_FAIL, payload: e.message });
    }
};

export const getOrderByIdAction = orderId => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const { data } = await getOrderByIdRequest(orderId, userInfo.token);
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (e) {
        dispatch({ type: ORDER_DETAILS_FAIL, payload: e.message });
    }
};

export const payOrderAction =
    (orderId, paymentResult) => async (dispatch, getState) => {
        try {
            dispatch({ type: ORDER_PAY_REQUEST });

            const {
                userLogin: { userInfo },
            } = getState();

            await payOrderRequest(orderId, paymentResult, userInfo.token);

            dispatch({ type: ORDER_PAY_SUCCESS });
        } catch (e) {
            dispatch({ type: ORDER_PAY_FAIL, payload: e.message });
        }
    };
