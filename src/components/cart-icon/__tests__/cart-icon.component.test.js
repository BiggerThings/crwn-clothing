import { screen } from "@testing-library/react";

import { renderWithProvider } from "../../../utils/test/test.utils";
import CartIcon from "../cart-icon.component";
import '@testing-library/jest-dom';


describe('CartIcon component Tests', () => {
    it('should render the CartIcon component', () => {
        const initialCartItems = [
            { id: 1, name: 'Item 1', quantity: 2, price: 10, imageUrl: 'image1.jpg' },
        ];
        renderWithProvider(<CartIcon />, {
            preloadedState: {
                cart: {
                    cartItems: initialCartItems,
                },
            },
        });
        const cartIconElement = screen.getByText('1');
        expect(cartIconElement).toBeInTheDocument();
    });
});