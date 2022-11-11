import { extractErrorMessage as eem } from "./../logic/commonLogic.js";
import { logIfNotProduction } from "../utils/loggerUtil.js";
import * as httpC from "../utils/httpC.js";

export const createOrderRequest = async (order, token) => {
    try {
        const { data, status } = await httpC.post("/orders", order, token);
        return { data, status };
    } catch (e) {
        const message = eem(e, "Order Create request unsuccessful");
        logIfNotProduction(message);
        throw new Error(message);
    }
};

export const getOrderByIdRequest = async (orderId, token) => {
    try {
        const { data, status } = await httpC.get(`/orders/${orderId}`, token);
        return { data, status };
    } catch (e) {
        const message = eem(e, "Get order by id request unsuccessful");
        logIfNotProduction(message);
        throw new Error(message);
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
        const message = eem(e, "Get order by id request unsuccessful");
        logIfNotProduction(message);
        throw new Error(message);
    }
};

export const orderListLoggedInUserRequest = async token => {
    try {
        const { data, status } = await httpC.get("/orders/me", token);
        return { data, status };
    } catch (e) {
        const message = eem(e, "Get order by id request unsuccessful");
        logIfNotProduction(message);
        throw new Error(message);
    }
};

export const orderListRequest = async token => {
    try {
        const { data } = await httpC.get("/orders", token);
        return data;
    } catch (e) {
        const message = eem(e, "Get order by id request unsuccessful");
        logIfNotProduction(message);
        throw new Error(message);
    }
};
