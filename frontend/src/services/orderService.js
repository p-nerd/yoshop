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
