export const isProductOutOfStock = product => {
    return product.countInStock <= 0;
};
