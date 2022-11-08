import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS,
} from "./../constants/cartConstants.js";
import { getOneProduct } from "../../services/productService.js";
import { addItemToLocalStorage } from "../../utils/localStorageUtil.js";

export const addToCartAction =
    (productId, qty) => async (dispatch, getState) => {
        const { product } = await getOneProduct(productId);
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                product: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
                countInStock: product.countInStock,
                qty,
            },
        });
        localStorage.setItem(
            "cartItems",
            JSON.stringify(getState().cart.cartItems)
        );
    };

export const removeFromCartAction = productId => async (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });
    localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
    );
};

export const saveShippingAddressAction = shippingData => async dispatch => {
    dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: shippingData });
    addItemToLocalStorage("shippingAddress", shippingData);
};

export const savePaymentMethodAction = paymentMethod => async dispatch => {
    dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: paymentMethod });
    addItemToLocalStorage("paymentMethod", paymentMethod);
};
