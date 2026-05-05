import { useCallback } from "react";

import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../store/cart/cart.selector";

import {
    CartDropdownContainer,
    CartItems,
    EmptyMessage
} from "./cart-dropdown.styles.jsx";

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();

    const goToCheckoutHandler = useCallback(() => {
        navigate("/checkout");
    }, [navigate]);

    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length === 0 ?
                        <EmptyMessage>Your cart is empty</EmptyMessage> :
                        cartItems.map((cartItem) => (
                            <CartItem key={cartItem.id} cartItem={cartItem} />
                        ))
                }
            </CartItems>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;