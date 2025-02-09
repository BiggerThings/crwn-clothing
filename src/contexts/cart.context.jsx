import { useState, createContext, useEffect } from 'react';

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

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartItemsCount, setcartItemsCount] = useState(0);
    const [cartItemsTotal, setcartItemsTotal] = useState(0);

    useEffect(() => {
        const cartCount = cartItems.reduce((accumulator, currentItem) => {
          return accumulator + currentItem.quantity;
        }, 0);
        setcartItemsCount(cartCount);
    }, [cartItems]);

    useEffect(() => {
        const cartTotal = cartItems.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.price * currentItem.quantity;
        }, 0)
        setcartItemsTotal(cartTotal);
    }, [cartItems]);


    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const incrementCartItemQuantity = (productToIncrement) => {
        setCartItems(incrementQuantity(cartItems, productToIncrement));
    };

    const decrementCartItemQuantity = (productToDecrement) => {
        setCartItems(decrementQuantity(cartItems, productToDecrement));
    };

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
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