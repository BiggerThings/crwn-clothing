import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { 
    CheckoutItemContainer, 
    CheckoutItemImageContainer, 
    CheckoutItemImage, 
    CheckoutItemInfo, 
    CheckoutItemQuantity, 
    CheckoutItemArrow, 
    CheckoutItemValue, 
    CheckoutItemRemoveItem } from "./checkout-item.styles.jsx";

const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;

    const { incrementCartItemQuantity, decrementCartItemQuantity, removeItemFromCart } = useContext(CartContext);

    const addQuantity = () => {
        incrementCartItemQuantity(cartItem);
    }

    const decreaseQuantity = () => {
        decrementCartItemQuantity(cartItem);
    }

    const removeItem = () => {
        removeItemFromCart(cartItem);
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