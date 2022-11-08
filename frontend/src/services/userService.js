import { logIfNotProduction } from "../utils/loggerUtil.js";
import { extractErrorMessage as eem } from "../logic/commonLogic.js";
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
            "/users/profile",
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

export const getUserListRequest = async token => {
    try {
        const { data, status } = await httpC.get("/users", token);
        return { data, status };
    } catch (e) {
        const message = eem(e, "Get users request unsuccessful");
        logIfNotProduction(message);
        throw new Error(message);
    }
};

export const removeUser = async (userId, token) => {
    try {
        await httpC.deleteR(`/users/${userId}`, token);
        return {};
    } catch (e) {
        const message = eem(e, "Delete user request unsuccessful");
        logIfNotProduction(message);
        throw new Error(message);
    }
};
