import { useSelector, useDispatch } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import { addItemToCart, removeItemFromCart, clearItemFromCart } from "../../store/cart/cart.action";

import {
    CheckoutItemContainer,
    CheckoutItemImageContainer,
    CheckoutItemImage,
    CheckoutItemInfo,
    CheckoutItemQuantity,
    CheckoutItemArrow,
    CheckoutItemValue,
    CheckoutItemRemoveItem
} from "./checkout-item.styles.jsx";

const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();

    const addQuantity = () => {
        dispatch(addItemToCart(cartItems, cartItem));
    }

    const decreaseQuantity = () => {
        dispatch(removeItemFromCart(cartItems, cartItem));
    }

    const removeItem = () => {
        dispatch(clearItemFromCart(cartItems, cartItem));
    }


    return (
        <CheckoutItemContainer>
            <CheckoutItemImageContainer>
                <CheckoutItemImage src={imageUrl} alt={`${name}`} />
            </CheckoutItemImageContainer>
            <CheckoutItemInfo>{name}</CheckoutItemInfo>
            <CheckoutItemQuantity>
                <CheckoutItemArrow onClick={decreaseQuantity}>&#10094;</CheckoutItemArrow>
                <CheckoutItemValue>{quantity}</CheckoutItemValue>
                <CheckoutItemArrow onClick={addQuantity}>&#10095;</CheckoutItemArrow>
            </CheckoutItemQuantity>
            <CheckoutItemInfo>{price}</CheckoutItemInfo>
            <CheckoutItemRemoveItem onClick={removeItem}>&#10005;</CheckoutItemRemoveItem>
        </CheckoutItemContainer>
    )
};

export default CheckoutItem;