import axios from "axios";
import { BACKEND_API_URL } from "../utils/envUtil.js";
import { logIfNotProduction } from "../utils/loggerUtil.js";
import { extractErrorMessage as eem } from "./../logic/commonLogic.js";

axios.defaults.baseURL = BACKEND_API_URL;

export const loginUser = async loginData => {
    try {
        const { data: user, status } = await axios.post(
            "/users/login",
            loginData
        );
        return { user, status };
    } catch (e) {
        const message = eem(e, "Login user request unsuccessful");
        logIfNotProduction(message);
        throw new Error(message);
    }
};

export const registerUser = async registerData => {
    try {
        const { data: user, status } = await axios.post("/users", registerData);
        return { user, status };
    } catch (e) {
        const message = eem(e, "Register user request unsuccessful");
        logIfNotProduction(message);
        throw new Error(message);
    }
};
