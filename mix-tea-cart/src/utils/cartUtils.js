// This file contains utility functions for managing the shopping cart.

export const addToCart = (cart, item) => {
    if (!cart[item.id]) {
        cart[item.id] = { ...item, quantity: 1 };
    } else {
        cart[item.id].quantity++;
    }
    return cart;
};

export const removeFromCart = (cart, itemId) => {
    if (cart[itemId]) {
        delete cart[itemId];
    }
    return cart;
};

export const updateQuantity = (cart, itemId, quantity) => {
    if (cart[itemId]) {
        cart[itemId].quantity += quantity;
        if (cart[itemId].quantity <= 0) {
            delete cart[itemId];
        }
    }
    return cart;
};

export const calculateTotals = (cart) => {
    let total = 0;
    let discount = 0;

    for (let id in cart) {
        const itemTotal = cart[id].price * cart[id].quantity;
        total += itemTotal;
        if (cart[id].discount) {
            discount += (itemTotal * cart[id].discount) / 100;
        }
    }

    return {
        total: total.toFixed(2),
        discount: discount.toFixed(2),
        finalTotal: (total - discount).toFixed(2),
    };
};