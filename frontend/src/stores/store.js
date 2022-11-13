import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
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
    productCreateReviewReducer,
    productDeleteReducer,
    productDetailsReducer,
    productListReducer,
    productTopListReducer,
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
    productTopList: productTopListReducer,
    productDetails: productDetailsReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    productCreateReview: productCreateReviewReducer,
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
    },
    userLogin: { userInfo: extractFromLocalStorage("userInfo", {}) },
};

const middlewares = [reduxThunk];

const store = createStore(
    indexReducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
