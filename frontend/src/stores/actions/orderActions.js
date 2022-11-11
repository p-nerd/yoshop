import {
    createOrderRequest,
    getOrderByIdRequest,
    orderDeliverRequest,
    orderListLoggedInUserRequest,
    orderListRequest,
    payOrderRequest,
} from "../../services/orderService.js";
import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_LIST_ME_FAIL,
    ORDER_LIST_ME_REQUEST,
    ORDER_LIST_ME_RESET,
    ORDER_LIST_ME_SUCCESS,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_SUCCESS,
} from "../constants/orderConstants.js";
import { CART_RESET } from "./../constants/cartConstants.js";
import { removeFromLocalStorage } from "../../utils/localStorageUtil.js";
import { getTokenFromState } from "../../logic/commonLogic.js";

export const orderCreateAction = order => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST });

        const token = getTokenFromState(getState());
        const { data } = await createOrderRequest(order, token);

        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
        dispatch({ type: CART_RESET });
        dispatch({ type: ORDER_LIST_ME_RESET });
        removeFromLocalStorage("cartItems");
    } catch (e) {
        dispatch({ type: ORDER_CREATE_FAIL, payload: e.message });
    }
};

export const orderDetailsAction = orderId => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });

        const token = getTokenFromState(getState());
        const { data } = await getOrderByIdRequest(orderId, token);

        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (e) {
        dispatch({ type: ORDER_DETAILS_FAIL, payload: e.message });
    }
};

export const orderPayAction =
    (orderId, paymentResult) => async (dispatch, getState) => {
        try {
            dispatch({ type: ORDER_PAY_REQUEST });

            const token = getTokenFromState(getState());
            await payOrderRequest(orderId, paymentResult, token);

            dispatch({ type: ORDER_PAY_SUCCESS });
        } catch (e) {
            dispatch({ type: ORDER_PAY_FAIL, payload: e.message });
        }
    };

export const orderListMeAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_ME_REQUEST });

        const token = getTokenFromState(getState());
        const { data } = await orderListLoggedInUserRequest(token);

        dispatch({ type: ORDER_LIST_ME_SUCCESS, payload: data });
    } catch (e) {
        dispatch({ type: ORDER_LIST_ME_FAIL, payload: e.message });
    }
};

export const orderListAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_REQUEST });

        const token = getTokenFromState(getState());
        const data = await orderListRequest(token);

        dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
    } catch (e) {
        dispatch({ type: ORDER_LIST_FAIL, payload: e.message });
    }
};

export const orderDeliverAction = orderId => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DELIVER_REQUEST });

        const token = getTokenFromState(getState());
        await orderDeliverRequest(orderId, token);

        dispatch({ type: ORDER_DELIVER_SUCCESS });
    } catch (e) {
        dispatch({ type: ORDER_DELIVER_FAIL, payload: e.message });
    }
};
