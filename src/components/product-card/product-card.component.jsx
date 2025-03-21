import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import {
    ProductCardContainer,
    ProductCardFooter,
    ProductCardPrice,
    ProductCardName
} from './product-card.styles.jsx';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product;
    const { addItemToCart } = useContext(CartContext);

    const addProductToCart = () => {
        addItemToCart(product);
    }

    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={`${name}`} />
            <ProductCardFooter>
                <ProductCardName>{name}</ProductCardName>
                <ProductCardPrice>{price}</ProductCardPrice>
            </ProductCardFooter>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to card</Button>
        </ProductCardContainer>
    )
}

export default ProductCard;