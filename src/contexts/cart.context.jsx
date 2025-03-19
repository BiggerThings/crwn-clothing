import { useReducer, createContext } from 'react';
import { createAction } from '../utils/reducer/reducer.utils';

const addCartItem = (cartItems, productToAdd) => {
    const existingItem = cartItems.find((item) => item.id === productToAdd.id);

    if(existingItem) {
        return cartItems.map((item) => {
            if(item.id === productToAdd.id) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
    }
    
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const incrementQuantity = (cartItems, productToIncrement) => {
    return cartItems.map((item) => {
        if(item.id === productToIncrement.id) {
            return { ...item, quantity: item.quantity + 1 };
        }
        return item;
    });
}

const decrementQuantity = (cartItems, productToDecrement) => {
    if(productToDecrement.quantity === 1) {
        return cartItems.filter((item) => item.id !== productToDecrement.id);
    }
    
    return cartItems.map((item) => {
        if(item.id === productToDecrement.id) {
            return { ...item, quantity: item.quantity - 1 };
        }
        return item;
    });
}

const removeCartItem = (cartItems, productToRemove) => {
    return cartItems.filter((item) => item.id !== productToRemove.id);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    cartItemsCount: 0,
    cartItemsTotal: 0,
    addItemToCart: () => {},
    incrementCartItemQuantity: () => {},
    decrementCartItemQuantity: () => {},
    removeItemFromCart: () => {}
});

export const CART_ACTION_TYPES = {
    TOGGLE_CART: "TOGGLE_CART",
    SET_CART_ITEMS: "SET_CART_ITEMS"
}

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.TOGGLE_CART:
            return {
                ...state,
                isCartOpen: payload
            };
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                cartItems: payload.newCartItems,
                cartItemsCount: payload.cartItemsCount,
                cartItemsTotal: payload.cartItemsTotal,
            };
        default:
            throw new Error(`Unsupported type ${type} in Cart Reducer`);
    }
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartItemsCount: 0,
    cartItemsTotal: 0
};

export const CartProvider = ({ children }) => {
    const [ { isCartOpen, cartItems, cartItemsCount, cartItemsTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    
    const updateCartTotals = (newCartItems) => {
        const cartItemsCount = newCartItems.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.quantity;
        }, 0);

        const cartItemsTotal = newCartItems.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.price * currentItem.quantity;
        }, 0);

        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, { cartItemsCount, cartItemsTotal, newCartItems }));
    };

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.TOGGLE_CART,  bool ));
    };

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartTotals(newCartItems);
    };

    const incrementCartItemQuantity = (productToIncrement) => {
        const newCartItems = incrementQuantity(cartItems, productToIncrement);
        updateCartTotals(newCartItems);
    };

    const decrementCartItemQuantity = (productToDecrement) => {
        const newCartItems = decrementQuantity(cartItems, productToDecrement);
        updateCartTotals(newCartItems);
    };

    const removeItemFromCart = (productToRemove) => {
        const newCartItems = removeCartItem(cartItems, productToRemove);
        updateCartTotals(newCartItems);;
    };

    const value = { 
        isCartOpen, 
        setIsCartOpen, 
        cartItems, 
        addItemToCart, 
        cartItemsCount, 
        incrementCartItemQuantity, 
        decrementCartItemQuantity, 
        removeItemFromCart,
        cartItemsTotal
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}