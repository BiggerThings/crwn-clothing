import { screen } from '@testing-library/react';
import Category from '../category.component';
import { renderWithProvider } from '../../../utils/test/test.utils';

jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useParams: () => ({
        category: 'mens'
    }),
}));

describe('Category component Tests', () => {
    test('It should render a spinner when isLoading is true', () => {
        renderWithProvider(<Category />, {
            preloadedState: {
                categories: {
                    isLoading: true,
                    categories: [],
                },
            },
        });

        const spinner = screen.getByTestId('spinner');
        expect(spinner).toBeInTheDocument();
    });

    test('It should render Categories when isLoading is false', () => {
        renderWithProvider(<Category />, {
            preloadedState: {
                categories: {
                    isLoading: false,
                    categories: [
                        {
                            title: 'mens',
                            items: [
                                {
                                    id: 1,
                                    name: 'Item 1',
                                    price: 100
                                },
                                {
                                    id: 2,
                                    name: 'Item 2',
                                    price: 150
                                }
                            ],
                        }
                    ],
                },
            },
        });

        const spinner = screen.queryByTestId('spinner');
        expect(spinner).not.toBeInTheDocument();

        const item1Product = screen.getByText('Item 1');
        expect(item1Product).toBeInTheDocument();

        const item2Product = screen.getByText('Item 2');
        expect(item2Product).toBeInTheDocument();
    });
})