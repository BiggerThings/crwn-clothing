import { screen, fireEvent } from '@testing-library/react';

import { renderWithProvider } from '../../../utils/test/test.utils';
import ProductCard from '../product-card.component';

describe('ProductCard tests', () => {
    test("it should add the product item when the Product card button is clicked", () => {
        const mockProduct = {
            id: 1,
            name: 'Test Product',
            price: 100,
            imageUrl: 'test-image.jpg'
        };

        const { store } = renderWithProvider(<ProductCard product={mockProduct} />, {
            preloadedState: {
                cart: {
                    cartItems: []
                }
            }
        });

        const addButton = screen.getByRole('button', { name: /add to cart/i });
        fireEvent.click(addButton);

        expect(store.getState().cart.cartItems).toHaveLength(1);
        expect(store.getState().cart.cartItems[0]).toEqual({ ...mockProduct, quantity: 1 });
    })
})