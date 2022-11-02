import {
    getUserById,
    loginUser,
    registerUser,
} from "../../services/loginService.js";
import {
    addItemToLocalStorage,
    removeFromLocalStorage,
} from "../../utils/localStorageUtil.js";
import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
} from "../constants.js";

export const login = (email, password) => async dispatch => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        const { user } = await loginUser({ email, password });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: user });
        addItemToLocalStorage("userInfo", user);
    } catch (e) {
        dispatch({ type: USER_LOGIN_FAIL, payload: e.message });
    }
};

export const logout = () => async dispatch => {
    removeFromLocalStorage("userInfo");
    dispatch({ type: USER_LOGOUT });
};

export const register = (name, email, password) => async dispatch => {
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

export const getProfile = id => async (dispatch, getState) => {
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
