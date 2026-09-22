import { screen } from "@testing-library/react";

import { renderWithProvider } from "../../../utils/test/test.utils";
import CartIcon from "../cart-icon.component";
import '@testing-library/jest-dom';

jest.mock('../../../assets/shopping-bag.svg', () => ({
    ReactComponent: () => <svg data-testid="shopping-icon" />
}));

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
        const cartIconElement = screen.getByText('2');
        expect(cartIconElement).toBeInTheDocument();
    });
});