export const calculateTotalCartItemsQty = cartItems =>
    cartItems.reduce((sum, item) => sum + item.qty, 0);

export const calculateTotalCartItemsPrice = cartItems =>
    cartItems.reduce((sum, item) => sum + item.qty * item.price, 0).toFixed(2);

export const isCartItemEmpty = cartItems => {
    return cartItems.length === 0;
};

export const convertStockCountToArray = countInStock => {
    return [...Array(countInStock).keys()].map(x => x + 1);
};
