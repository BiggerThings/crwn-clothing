import { Link } from "react-router";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);

    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {
                    cartItems.length === 0 ? 
                        <span className="empty-message">Your cart is empty</span> :
                    cartItems.map((cartItem) => (
                        <CartItem key={cartItem.id} cartItem={cartItem} />
                    ))
                }
            </div>
            {
                cartItems.length !== 0 &&
                <Link to="/checkout">
                    <Button>GO TO CHECKOUT</Button>
                </Link>
            }
        </div>
    )
}

export default CartDropdown;