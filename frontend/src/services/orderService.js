import axios from "axios";
import { BACKEND_API_URL } from "../utils/envUtil.js";

axios.defaults.baseURL = BACKEND_API_URL;

export const createOrderRequest = async (order, token) => {
    try {
        const { data, status } = await axios.post(`/orders`, order, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return { data, status };
    } catch (e) {
        const message = eem(e, "Order Create request unsuccessful");
        logIfNotProduction(message);
        throw new Error(message);
    }
};
