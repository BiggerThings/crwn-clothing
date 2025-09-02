import { useDispatch, useSelector } from 'react-redux';

import { selectIsCartOpen, selectCartCount } from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";

import {
    CartIconContainer,
    ShoppingIcon,
    ItemCount
} from "./cart-icon.styles.jsx";

const CartIcon = () => {
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartItemsCount = useSelector(selectCartCount);
    const dispatch = useDispatch();

    const toggleIsCartOpen = () => {
        dispatch(setIsCartOpen(!isCartOpen));
    }

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon />
            <ItemCount>{cartItemsCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;