import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import reduxThunk from "redux-thunk";
import { extractFromLocalStorage } from "../utils/localStorageUtil.js";
import { cartReducer } from "./reducers/cartReducers.js";
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderListMeReducer,
    orderListReducer,
    orderPayReducer,
} from "./reducers/orderReducers.js";
import {
    productCreateReducer,
    productDeleteReducer,
    productDetailsReducer,
    productListReducer,
    productUpdateReducer,
} from "./reducers/productReducers.js";
import {
    userDetailsReducer,
    userListReducer,
    userLoginReducer,
    userRegisterReducer,
    userRemoveReducer,
    userUpdateReducer,
} from "./reducers/userReducers.js";

const indexReducers = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer,
    userList: userListReducer,
    userRemove: userRemoveReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMe: orderListMeReducer,
    orderList: orderListReducer,
});

const initialState = {
    cart: {
        cartItems: extractFromLocalStorage("cartItems", []),
        shippingAddress: extractFromLocalStorage("shippingAddress", {}),
        paymentMethod: extractFromLocalStorage("paymentMethod", ""),
    },
    userLogin: { userInfo: extractFromLocalStorage("userInfo", {}) },
    userDetails: { user: {} },
};

const middlewares = [reduxThunk];

const store = createStore(
    indexReducers,
    initialState,
    compose(
        applyMiddleware(...middlewares),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;
