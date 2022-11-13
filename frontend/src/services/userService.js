import { logIfNotProduction, logReqNotProd } from "../utils/loggerUtil.js";
import { extractErrorMessage as eem } from "../logic/commonLogic.js";
import * as httpC from "../utils/httpC.js";

export const loginUserRequest = async loginData => {
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

export const registerUserRequest = async registerData => {
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

export const getUserByIdRequest = async (id, token) => {
    try {
        const { data: user, status } = await httpC.get(`/users/${id}`, token);
        return { user, status };
    } catch (e) {
        const message = eem(e, "Get user profile request unsuccessful");
        logIfNotProduction(message);
        throw new Error(message);
    }
};

export const updateUserByIdRequest = async (userId, userData, token) => {
    try {
        const { data } = await httpC.put(`/users/${userId}`, userData, token);
        return data;
    } catch (e) {
          throw new Error(logReqNotProd(e));
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

export const removeUserRequest = async (userId, token) => {
    try {
        await httpC.deleteR(`/users/${userId}`, token);
        return {};
    } catch (e) {
        const message = eem(e, "Delete user request unsuccessful");
        logIfNotProduction(message);
        throw new Error(message);
    }
};
