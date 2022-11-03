import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./combineReducers.js";
import initialState from "./initialState.js";

const middlewares = [reduxThunk];

export default createStore(
    reducers,
    initialState,
    compose(
        applyMiddleware(...middlewares),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);
