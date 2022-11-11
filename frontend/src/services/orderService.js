import { logReqNotProd } from "../utils/loggerUtil.js";
import * as httpC from "../utils/httpC.js";

export const createOrderRequest = async (order, token) => {
    try {
        const { data, status } = await httpC.post("/orders", order, token);
        return { data, status };
    } catch (e) {
        throw new Error(logReqNotProd(e));
    }
};

export const getOrderByIdRequest = async (orderId, token) => {
    try {
        const { data, status } = await httpC.get(`/orders/${orderId}`, token);
        return { data, status };
    } catch (e) {
        throw new Error(logReqNotProd(e));
    }
};

export const payOrderRequest = async (orderId, data, token) => {
    try {
        const { data, status } = await httpC.put(
            `/orders/${orderId}/pay`,
            data,
            token
        );
        return { data, status };
    } catch (e) {
        throw new Error(logReqNotProd(e));
    }
};

export const orderListLoggedInUserRequest = async token => {
    try {
        const { data, status } = await httpC.get("/orders/me", token);
        return { data, status };
    } catch (e) {
        throw new Error(logReqNotProd(e));
    }
};

export const orderListRequest = async token => {
    try {
        const { data } = await httpC.get("/orders", token);
        return data;
    } catch (e) {
        throw new Error(logReqNotProd(e));
    }
};

export const orderDeliverRequest = async (orderId, token) => {
    try {
        const { data } = await httpC.put(
            `/orders/${orderId}/deliver`,
            {},
            token
        );
        return data;
    } catch (e) {
        throw new Error(logReqNotProd(e));
    }
};
