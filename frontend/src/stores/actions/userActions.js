import {
    getUserById,
    loginUser,
    registerUser,
    updateUserProfile,
} from "../../services/loginService.js";
import {
    addItemToLocalStorage,
    removeFromLocalStorage,
} from "../../utils/localStorageUtil.js";
import {
    ORDER_LIST_ME_RESET,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET,
    USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
} from "../constants.js";

export const loginAction = (email, password) => async dispatch => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        const { user } = await loginUser({ email, password });
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
};

export const registerAction = (name, email, password) => async dispatch => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });
        const { user } = await registerUser({ email, password, name });
        dispatch({ type: USER_REGISTER_SUCCESS, payload: user });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: user });
        addItemToLocalStorage("userInfo", user);
    } catch (e) {
        dispatch({ type: USER_REGISTER_FAIL, payload: e.message });
    }
};

export const getProfileAction = id => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const { user } = await getUserById(id, userInfo.token);
        dispatch({ type: USER_DETAILS_SUCCESS, payload: user });
    } catch (e) {
        dispatch({ type: USER_DETAILS_FAIL, payload: e.message });
    }
};

export const updateUserProfileAction =
    userData => async (dispatch, getState) => {
        try {
            dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

            const {
                userLogin: { userInfo },
            } = getState();

            const { user } = await updateUserProfile(userData, userInfo.token);
            dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: user });
        } catch (e) {
            dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: e.message });
        }
    };
