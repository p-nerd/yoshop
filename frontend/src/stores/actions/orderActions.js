import { createOrderRequest } from "../../services/orderService.js";
import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
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
