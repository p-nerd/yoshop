import { extractFromLocalStorage } from "../utils/localStorageUtil.js";

const initialState = {
    cart: {
        cartItems: extractFromLocalStorage("cartItems", []),
        shippingAddress: extractFromLocalStorage("shippingAddress", {}),
    },
    userLogin: { userInfo: extractFromLocalStorage("userInfo", {}) },
    userDetails: { user: {} },
};

export default initialState;
