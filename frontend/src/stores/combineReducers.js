import { combineReducers } from "redux";
import { cartReducer } from "./reducers/cartReducers.js";
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderListMeReducer,
    orderPayReducer,
} from "./reducers/orderReducers.js";
import {
    productDetailsReducer,
    productListReducer,
} from "./reducers/productReducers.js";
import {
    userDetailsReducer,
    userListReducer,
    userLoginReducer,
    userRegisterReducer,
    userRemoveReducer,
    userUpdateProfileReducer,
    userUpdateReducer,
} from "./reducers/userReducers.js";

const reducers = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
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

export default reducers;
