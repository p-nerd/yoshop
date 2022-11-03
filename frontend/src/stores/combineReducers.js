import { combineReducers } from "redux";
import { cartReducer } from "./reducers/cartReducers.js";
import {
    productDetailsReducer,
    productListReducer,
} from "./reducers/productReducers.js";
import {
    userDetailsReducer,
    userLoginReducer,
    userRegisterReducer,
    userUpdateProfileReducer,
} from "./reducers/userReducers.js";

const reducers = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
});

export default reducers;
