import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import indexReducers from "./reducers/indexReducers.js";
import { extractFromLocalStorage } from "../utils/localStorageUtil.js";

const middlewares = [reduxThunk];

const initialState = {
    cart: {
        cartItems: extractFromLocalStorage("cartItems", []),
        shippingAddress: extractFromLocalStorage("shippingAddress", {}),
        paymentMethod: extractFromLocalStorage("paymentMethod", ""),
    },
    userLogin: { userInfo: extractFromLocalStorage("userInfo", {}) },
    userDetails: { user: {} },
};

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
