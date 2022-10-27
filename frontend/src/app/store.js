import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import reduxThunk from "redux-thunk";
import { productListReducer } from "../reducers/productReducers.js";

const reducer = combineReducers({ productList: productListReducer });
const initialState = {};
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
