import {
    getUserByIdRequest,
    getUserListRequest,
    loginUserRequest,
    registerUserRequest,
    removeUserRequest,
    updateUserProfileRequest,
    updateUserByIdRequest,
} from "../../services/userService.js";
import {
    addItemToLocalStorage,
    removeFromLocalStorage,
} from "../../utils/localStorageUtil.js";
import { ORDER_LIST_ME_RESET } from "../constants/orderConstants.js";
import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET,
    USER_DETAILS_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_RESET,
    USER_LIST_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_RESET,
    USER_REGISTER_SUCCESS,
    USER_REMOVE_FAIL,
    USER_REMOVE_REQUEST,
    USER_REMOVE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
} from "../constants/userConstants.js";

export const loginAction = (email, password) => async dispatch => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        const { user } = await loginUserRequest({ email, password });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: user });
        addItemToLocalStorage("userInfo", user);
    } catch (e) {
        dispatch({ type: USER_LOGIN_FAIL, payload: e.message });
    }
};

export const logoutAction = () => async dispatch => {
    removeFromLocalStorage("userInfo");
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: ORDER_LIST_ME_RESET });
    dispatch({ type: USER_DETAILS_RESET });
    dispatch({ type: USER_LIST_RESET });
    dispatch({ type: USER_REGISTER_RESET });
};

export const registerAction = (name, email, password) => async dispatch => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });
        const { user } = await registerUserRequest({ email, password, name });
        dispatch({ type: USER_REGISTER_SUCCESS, payload: user });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: user });
        addItemToLocalStorage("userInfo", user);
    } catch (e) {
        dispatch({ type: USER_REGISTER_FAIL, payload: e.message });
    }
};

export const getUserDetailsByIdAction = id => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const { user } = await getUserByIdRequest(id, userInfo.token);
        dispatch({ type: USER_DETAILS_SUCCESS, payload: user });
    } catch (e) {
        dispatch({ type: USER_DETAILS_FAIL, payload: e.message });
    }
};

export const userListAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();
        const { data } = await getUserListRequest(userInfo.token);
        dispatch({ type: USER_LIST_SUCCESS, payload: data });
    } catch (e) {
        dispatch({ type: USER_LIST_FAIL, payload: e.message });
    }
};

export const userRemoveByIdAction = userId => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_REMOVE_REQUEST });
        const {
            userLogin: { userInfo },
        } = getState();
        await removeUserRequest(userId, userInfo.token);
        dispatch({ type: USER_REMOVE_SUCCESS });
    } catch (e) {
        dispatch({ type: USER_REMOVE_FAIL, payload: e.message });
    }
};

export const updateUserProfileAction =
    userData => async (dispatch, getState) => {
        try {
            dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

            const {
                userLogin: { userInfo },
            } = getState();

            const { user } = await updateUserProfileRequest(
                userData,
                userInfo.token
            );
            dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: user });
        } catch (e) {
            dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: e.message });
        }
    };

export const userUpdateByIdAction = user => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const { data } = await updateUserByIdRequest(
            user._id,
            user,
            userInfo.token
        );

        dispatch({ type: USER_UPDATE_SUCCESS });
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (e) {
        dispatch({ type: USER_UPDATE_FAIL, payload: e.message });
    }
};
