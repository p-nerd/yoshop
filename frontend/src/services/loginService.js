import { logIfNotProduction } from "../utils/loggerUtil.js";
import { extractErrorMessage as eem } from "./../logic/commonLogic.js";
import * as httpC from "../utils/httpC.js";

export const loginUser = async loginData => {
    try {
        const { data: user, status } = await httpC.post(
            "/users/login",
            loginData,
            null
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
        const { data: user, status } = await httpC.post(
            "/users",
            registerData,
            null
        );
        return { user, status };
    } catch (e) {
        const message = eem(e, "Register user request unsuccessful");
        logIfNotProduction(message);
        throw new Error(message);
    }
};

export const getUserById = async (id, token) => {
    try {
        const { data: user, status } = await httpC.get(`/users/${id}`, token);
        return { user, status };
    } catch (e) {
        const message = eem(e, "Get user profile request unsuccessful");
        logIfNotProduction(message);
        throw new Error(message);
    }
};

export const updateUserProfile = async (userData, token) => {
    try {
        const { data: user, status } = await httpC.put(
            "/users",
            userData,
            token
        );
        return { user, status };
    } catch (e) {
        const message = eem(e, "Update user profile request unsuccessful");
        logIfNotProduction(message);
        throw new Error(message);
    }
};
