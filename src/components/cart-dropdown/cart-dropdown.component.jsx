import { useCallback, useState, useMemo } from "react";

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

const sleep = (milliseconds) => {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();
    const [count, setCount] = useState(0);

    const hundredCount = () => {
        console.log('start');
        sleep(2000);
        console.log('end');
        return 100 + count;
    }

    const val = useMemo(() => hundredCount(), [count]);

    const goToCheckoutHandler = useCallback(() => {
        navigate("/checkout");
    }, [navigate]);

    return (
        <CartDropdownContainer>
            <CartItems>
                {val}
                {/* {
                    cartItems.length === 0 ?
                        <EmptyMessage>Your cart is empty</EmptyMessage> :
                        cartItems.map((cartItem) => (
                            <CartItem key={cartItem.id} cartItem={cartItem} />
                        ))
                } */}
            </CartItems>
            <Button onClick={() => setCount(count + 1)}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;