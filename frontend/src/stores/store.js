import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import reduxThunk from "redux-thunk";
import { extractFromLocalStorage } from "../utils/localStorageUtil.js";
import { cartReducer } from "./reducers/cartReducers.js";
import {
    productDetailsReducer,
    productListReducer,
} from "./reducers/productReducers.js";
import {
    userDetailsReducer,
    userLoginReducer,
    userRegisterReducer,
} from "./reducers/userReducers.js";

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
});

const initialState = {
    cart: { cartItems: extractFromLocalStorage("cartItems", []) },
    userLogin: { userInfo: extractFromLocalStorage("userInfo", {}) },
    userDetails: { user: {} },
};

const middlewares = [reduxThunk];

export default createStore(
    reducer,
    initialState,
    compose(
        applyMiddleware(...middlewares),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);
