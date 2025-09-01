import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
    const existingItem = cartItems.find((item) => item.id === productToAdd.id);

    if (existingItem) {
        return cartItems.map((item) => {
            if (item.id === productToAdd.id) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, productToDecrement) => {
    const existingItem = cartItems.find((item) => item.id === productToDecrement.id);

    if (existingItem.quantity === 1) {
        return cartItems.filter((item) => item.id !== productToDecrement.id);
    }

    return cartItems.map((item) => {
        if (item.id === productToDecrement.id) {
            return { ...item, quantity: item.quantity - 1 };
        }
        return item;
    });
}

const clearCartItem = (cartItems, productToRemove) => {
    return cartItems.filter((item) => item.id !== productToRemove.id);
}

export const setIsCartOpen = (boolean) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, productToDecrement) => {
    const newCartItems = removeCartItem(cartItems, productToDecrement);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, productToRemove) => {
    const newCartItems = clearCartItem(cartItems, productToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};