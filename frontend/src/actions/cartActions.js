import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../app/constants.js";
import { getOneProduct } from "../services/productService.js";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
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

export const removeFromCart = productId => async (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });
    localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
    );
};
