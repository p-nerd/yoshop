import { log } from "../utils/loggerUtil";

const addDecimal = num => {
    return Number((Math.round(num * 100) / 100).toFixed(2));
};

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

export const calculateTotalPriceOfItemWithQty = (qty, price) => {
    let xQty = 0,
        xPrice = 0;
    if (typeof qty === "number" && typeof price === "number") {
        xQty = qty;
        xPrice = price;
    } else {
        try {
            xQty = parseFloat(qty);
            xPrice = parseFloat(price);
        } catch (e) {
            log(e.message);
        }
    }

    return xQty * xPrice;
};

export const calculateShippingPrice = itemsPrice => {
    return addDecimal(itemsPrice > 10000 ? 0 : 100);
};

export const calculateTexPrice = itemsPrice => {
    return addDecimal(Number((0.15 * itemsPrice).toFixed(2)));
};

export const calculateTotalPrice = (itemsPrice, shippingPrice, texPrice) => {
    return (
        parseFloat(itemsPrice) +
        parseFloat(shippingPrice) +
        parseFloat(texPrice)
    ).toFixed(2);
};
