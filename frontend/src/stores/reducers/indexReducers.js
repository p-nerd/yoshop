import { combineReducers } from "redux";
import { cartReducer } from "./cartReducers.js";
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderListMeReducer,
    orderPayReducer,
} from "./orderReducers.js";
import {
    productDeleteReducer,
    productDetailsReducer,
    productListReducer,
    productUpdateReducer,
} from "./productReducers.js";
import {
    userDetailsReducer,
    userListReducer,
    userLoginReducer,
    userRegisterReducer,
    userRemoveReducer,
    userUpdateProfileReducer,
    userUpdateReducer,
} from "./userReducers.js";

const indexReducers = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productUpdate: productUpdateReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMe: orderListMeReducer,
    userList: userListReducer,
    userRemove: userRemoveReducer,
});

export default indexReducers;
