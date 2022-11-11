import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import reduxThunk from "redux-thunk";
import { extractFromLocalStorage } from "../utils/localStorageUtil.js";
import { cartReducer } from "./reducers/cartReducers.js";
import {
    orderCreateReducer,
    orderDeliverReducer,
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
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    cart: cartReducer,
    userList: userListReducer,
    userDetails: userDetailsReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userUpdate: userUpdateReducer,
    userRemove: userRemoveReducer,
    orderList: orderListReducer,
    orderListMe: orderListMeReducer,
    orderDetails: orderDetailsReducer,
    orderCreate: orderCreateReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
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
